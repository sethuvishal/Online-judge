const fs = require('fs');

let input = '';
process.stdin.on('data', function (data) {
  input += data.toString();
});

process.stdin.on('end', function (data) {
  main();
});

//Replace your code here

function addSolution(a, b) {
  return a + b;
}

function main() {
  const inputArr = JSON.parse(input);
  for (let i = 0; i < inputArr.length; i++) {
    let a = inputArr[i].a;
    let b = inputArr[i].b;
    const answer = add(a, b);
    const correctAnswer = addSolution(a, b);
    if (answer != correctAnswer) {
      const out = fs.createWriteStream(process.env.OUTPUT_PATH);
      out.write(
        JSON.stringify({
          status: 'FAILED',
          test_case: inputArr[i],
          answer,
          Expected: correctAnswer,
        })
      );
      return;
    }
  }
  const out = fs.createWriteStream(process.env.OUTPUT_PATH);
  out.write(JSON.stringify({ status: 'ACCEPTED' }));
}
