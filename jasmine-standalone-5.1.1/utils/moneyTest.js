import { formatcurrency } from "../../scripts/utils/Money.js";

describe("test suite: formatcurrency", () => {
  it("convert cents into dollars", () => {
    expect(formatcurrency(2095)).toEqual("20.95");
  });

  it("convert 0 into 0.00", () => {
    expect(formatcurrency(0)).toEqual("0.00");
  });

  it("round the no. properly", () => {
    expect(formatcurrency(2000.5)).toEqual("20.01");
  });
});
