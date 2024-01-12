import fs = require('fs');
import Runner from './Runner';
import { spawn } from 'child_process';
import { ProblemType } from '../types/problem';
import path = require('path');
import { $Enums } from '@prisma/client';
import { clearInterval } from 'timers';
var pidusage = require('pidusage');

export default class JavaScriptRunner implements Runner {
  constructor() {}
  run(
    problem: ProblemType,
    userCode: string
  ): Promise<{
    test_case?: any;
    status: $Enums.JudgeStatus;
    timeTaken?: number;
    memoryUsed?: number;
    message?: string;
  }> {
    return new Promise((resolve, reject) => {
      const filename = problem.id + Date.now();
      const code_snippets = JSON.parse(problem.code_snippets);
      const snippet = code_snippets.find(
        (snippet: any) => snippet.lang === 'js'
      );
      const fileCode = snippet.code.replace(
        '//Replace your code here',
        userCode
      );
      const submittedFile = `D:/Nestjs/Online-judge/Online-judge/src/submission-files/${filename}.js`;
      const file = fs.createWriteStream(submittedFile);
      file.write(fileCode);
      const child = spawn('node', [submittedFile], {
        env: { OUTPUT_PATH: `${filename}` },
        cwd: './src/results',
      });
      // writing input to child process
      child.stdin.write(problem.test_cases);
      child.stdin.end();

      // listening on incoming data and error
      child.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      child.stderr.on('data', function (data) {
        child.kill();
        resolve({ status: 'ERROR', message: data.toString() });
      });

      setTimeout(async () => {
        if (child.exitCode === null) {
          child.kill();
        }
        fs.rmSync(submittedFile);
        resolve({ status: 'FAILED', message: 'Time Limit Exceeded' });
      }, 100);

      async function getMemoryUsage() {
        if (child.exitCode !== null) {
          clearInterval(memoryInterval);
          return 0;
        }
        try {
          const stats = await pidusage(child.pid);
          return stats.memory;
        } catch (er) {
          clearInterval(memoryInterval);
        }
        return 0;
      }

      const memoryInterval = setInterval(async () => {
        if (child.exitCode !== null) {
          clearInterval(memoryInterval);
          return;
        }
        const mem = await getMemoryUsage();
        const memInMb = mem / (1024 * 1024);
        if (memInMb > problem.memoryLimit) {
          child.kill();
          resolve({
            status: 'FAILED',
            message: 'Memory Limit Exceed',
            memoryUsed: memInMb,
          });
        }
      }, 100);

      child.on('exit', () => {
        try {
          const out = fs.readFileSync(
            `D:/Nestjs/Online-judge/Online-judge/src/results/${filename}`
          );
          fs.rmSync(submittedFile);
          const result = JSON.parse(out.toString());
          resolve(result);
        } catch (err) {
          resolve({ status: 'FAILED', message: 'FAILED' });
        }
      });
    });
  }
}
