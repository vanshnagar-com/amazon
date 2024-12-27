import { formatcurrency } from "../utils/Money.js";

console.log("test suite: formatcurrency");

console.log("1.  cents into dollors");
if (formatcurrency(2095) === `20.95`) {
  console.log("passed");
} else {
  console.log("fail");
}
console.log("2.  0 into points");

if (formatcurrency(0) === `0.00`) {
  console.log("passed");
} else {
  console.log("fail");
}

console.log("3.  rounding of no.");
if (formatcurrency(2000.5) === `20.01`) {
  console.log("passed");
} else {
  console.log("fail");
}
