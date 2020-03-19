import { expect } from "chai";

import environment from "../../app/helpers/environment";

describe(".parseVariable()", () => {
  it("should return undefined when variable is undefined", () => {
    expect(environment.parseVariable()).to.be.undefined;
  });

  it("should return undefined when variable is null", () => {
    expect(environment.parseVariable(null)).to.be.undefined;
  });

  it("should return undefined when variable is empty string", () => {
    expect(environment.parseVariable("")).to.be.undefined;
  });

  it("should return parsed object", () => {
    expect(environment.parseVariable("{\"someProps\":true}"))
      .to.deep.equal({ someProps: true });
  });

  it("should return parsed array", () => {
    expect(environment.parseVariable("[1,2,3]"))
      .to.deep.equal([1, 2, 3]);
  });

  it("should return parsed number", () => {
    expect(environment.parseVariable("852"))
      .to.deep.equal(852);
  });
});
