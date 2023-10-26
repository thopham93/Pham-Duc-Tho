const isValidInteger = (n) => Number.isInteger(n);

var sum_to_n_a = function (n) {
  if (!isValidInteger(n)) {
    console.log("The number input is not integer");
    return;
  }
  let sum = 0;
  let i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  console.log("The sum of integer numbers:", sum);
};

var sum_to_n_b = function (n) {
  if (!isValidInteger(n)) {
    console.log("The number input is not integer");
    return;
  }
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const sum = nums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log("The sum of integer numbers:", sum);
};

var sum_to_n_c = function (n) {
  if (!isValidInteger(n)) {
    console.log("The number input is not integer");
    return;
  }
  const sum = (n * (n + 1)) / 2;
  console.log("The sum of integer numbers:", sum);
};
