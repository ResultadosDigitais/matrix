import environment from "./environment";

describe(".parseVariable()", () => {
  it("should return undefined when variable is undefined", () => {
    expect(environment.parseVariable()).toBeUndefined();
  });

  it("should return undefined when variable is null", () => {
    expect(environment.parseVariable(null)).toBeUndefined();
  });

  it("should return undefined when variable is empty string", () => {
    expect(environment.parseVariable("")).toBeUndefined();
  });

  it("should return parsed object", () => {
    expect(environment.parseVariable("{\"someProps\":true}"))
      .toEqual({ someProps: true });
  });

  it("should return parsed array", () => {
    expect(environment.parseVariable("[1,2,3]"))
      .toEqual([1, 2, 3]);
  });

  it("should return parsed number", () => {
    expect(environment.parseVariable("852"))
      .toEqual(852);
  });
});
