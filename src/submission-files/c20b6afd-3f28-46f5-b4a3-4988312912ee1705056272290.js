const fs = require('fs');

let input = '';
process.stdin.on('data', function (data) {
  input += data.toString();
});

process.stdin.on('end', function (data) {
  main();
});

function findTarget(a,b){
 for(let i = 0;i < a.length;i++){
if(a[i]==b)return i;
}
return -1;
}

function findTargetSolution(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}

function main() {
  const inputArr = JSON.parse(input);
  for (let i = 0; i < inputArr.length; i++) {
    let a = inputArr[i].nums;
    let b = inputArr[i].target;
    const answer = findTarget(a, b);
    const correctAnswer = findTargetSolution(a, b);
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