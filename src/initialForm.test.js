///<reference types="jest" />

import { initialForm } from "./lib";

describe("Testing the creation of the form state", function () {
  it("should have type password and text Show Passwords", () => {
    const currentButton = { innerText: "Show Passwords" };
    const currentPassword = { type: "password" };
    const theResult = initialForm(currentButton, currentPassword);
    const theResultKeys = Object.keys(theResult);
    expect(theResultKeys.length).toBe(2);
    expect(theResult).toEqual({
      buttonText: "Show Passwords",
      inputType: "password",
    });
  });

  it("should have type 'text' and text 'Hide Passwords'", () => {
    const currentButton = { innerText: "Hide Passwords" };
    const currentPassword = { type: "text" };
    const theResult = initialForm(currentButton, currentPassword);
    const theResultKeys = Object.keys(theResult);
    expect(theResultKeys.length).toBe(2);
    expect(theResult).toEqual({
      buttonText: "Hide Passwords",
      inputType: "text",
    });
  });
});
