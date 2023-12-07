///<reference types="jest" />

import { isEqual } from "./lib";

describe("Are both passwords equal", function () {
  it("should be yes", () => {
    const password1 = { value: "Asdfg!mnbvc" };
    const password2 = { value: "Asdfg!mnbvc" };
    const theResult = isEqual(password1, password2);
    expect(theResult).toEqual("yes");
  });

  it("should be no", () => {
    const password1 = { value: "Asdfg!mnbvce" };
    const password2 = { value: "Asdfg!mnbvcä" };
    const theResult = isEqual(password1, password2);
    expect(theResult).toEqual("no");
  });
  it("should be no with different casing", () => {
    const password1 = { value: "Asdfg!mnbvc" };
    const password2 = { value: "asdfg!mnbvc" };
    const theResult = isEqual(password1, password2);
    expect(theResult).toEqual("no");
  });
});
