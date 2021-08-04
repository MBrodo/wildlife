// numToWords :: (Number a, String a) => a -> String
const toReadable = (n) => {
  const arr = (x) => Array.from(x);
  const num = (x) => Number(x) || 0;
  const isEmpty = (xs) => xs.length === 0;
  const take = (n) => (xs) => xs.slice(0, n);
  const drop = (n) => (xs) => xs.slice(n);
  const reverse = (xs) => xs.slice(0).reverse();
  const comp = (f) => (g) => (x) => f(g(x));
  const not = (x) => !x;
  const chunk = (n) => (xs) =>
    isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

  const a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const g = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
  ];
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  const makeGroup = ([ones, tens, huns]) => {
    return [
      num(huns) === 0 ? "" : a[huns] + " hundred ",
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + " ") || "",
      a[tens + ones] || a[ones],
    ].join("");
  };
  // "thousands" constructor; no real good names for this, i guess
  const thousand = (group, i) => (group === "" ? group : `${group} ${g[i]}`);
  // execute !
  if (typeof n === "number") return toReadable(String(n));
  if (n === "0") return "zero";

  return comp(chunk(3))(reverse)(arr(n))
    .map(makeGroup)
    .map(thousand)
    .filter(comp(not)(isEmpty))
    .reverse()
    .join(" ");
};

// console.log(toReadable(1));
// console.log(toReadable(997));

// Reverse Int

const reverse = (num) => parseInt(String(num).split("").reverse().join(""), 10);
// console.log(reverse(124323));

// Towel Sort
const towelSort = (matrix = []) => {
  const sortedArr = [];
  matrix.forEach((arr) => sortedArr.push(...arr));

  return sortedArr;
};
// console.log(
//   towelSort([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );

// Brackets

const check = (str, bracketsConfig) => {
  const stack = [];

  const lenstr = str.length;

  if (lenstr % 2 != 0) return false;

  const lenConfig = bracketsConfig.length;
  let checkeven = 1;
  let cheven;
  let chClose;

  for (let i = 0; i < lenstr; i++) {
    let ch = str.charAt(i);
    let close = false;
    let open = false;
    let even = false;

    for (let j = 0; j < lenConfig; j++) {
      if (
        bracketsConfig[j][0] == bracketsConfig[j][1] &&
        ch == bracketsConfig[j][0]
      ) {
        even = true;
        checkeven = -1 * checkeven;
        cheven = ch;

        break;
      }
      if (ch == bracketsConfig[j][0]) {
        open = true;

        break;
      }
      if (ch == bracketsConfig[j][1]) {
        close = true;
        chClose = bracketsConfig[j][0];

        break;
      }
    }
    if (even == true) {
      if (checkeven == -1) {
        stack.push(ch);
      }
      if (checkeven == 1 && cheven == stack[stack.length - 1]) {
        stack.pop();
      }
    } else {
      if (open === true) {
        stack.push(ch);
      }
      if (close === true && chClose == stack[stack.length - 1]) {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
};
