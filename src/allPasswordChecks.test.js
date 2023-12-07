///<reference types="jest" />

import { allPasswordChecks } from "./lib";

describe("Make all comparison tests", function () {
  it("should return yes in all comparisons", () => {
    const password1 = { value: "Aq1wwwwwwwww" };
    const theResult = allPasswordChecks(password1);
    expect(theResult).toEqual({
      equal: "yes",
      lowCase: "yes",
      uppCase: "yes",
      numbers: "yes",
      tenChar: "yes",
    });
  });

  it("should return yes in all comparisons except lowCase", () => {
    const password1 = { value: "AQ1WWWWWWWWWWWWWW" };
    const theResult = allPasswordChecks(password1);
    expect(theResult).toEqual({
      equal: "yes",
      lowCase: "no",
      uppCase: "yes",
      numbers: "yes",
      tenChar: "yes",
    });
  });

  it("should return yes in all comparisons except uppCase", () => {
    const password1 = { value: "aq1wwwwwwwww" };
    const theResult = allPasswordChecks(password1);
    expect(theResult).toEqual({
      equal: "yes",
      lowCase: "yes",
      uppCase: "no",
      numbers: "yes",
      tenChar: "yes",
    });
  });

  it("should return yes in all comparisons except numbers", () => {
    const password1 = { value: "Aqwwwwwwwww" };
    const theResult = allPasswordChecks(password1);
    expect(theResult).toEqual({
      equal: "yes",
      lowCase: "yes",
      uppCase: "yes",
      numbers: "no",
      tenChar: "yes",
    });
  });

  it("should return yes in all comparisons except tenChar", () => {
    const password1 = { value: "Aq1ww" };
    const theResult = allPasswordChecks(password1);
    expect(theResult).toEqual({
      equal: "yes",
      lowCase: "yes",
      uppCase: "yes",
      numbers: "yes",
      tenChar: "no",
    });
  });
});
