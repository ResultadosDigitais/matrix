import { expect } from "chai";
import sinon from "sinon";

import { toggleTheme, getDefaultTheme } from "../../src/morpheus/Themes";

describe("morpheus/Themes", () => {
  describe("toggleTheme()", () => {
    it("should toggle from light to dark", () => {
      expect(toggleTheme("light")).to.equal("dark");
    });

    it("should toggle from dark to light", () => {
      expect(toggleTheme("dark")).to.equal("light");
    });
  });

  describe("getDefaultTheme()", () => {
    after(() => {
      window.matchMedia = undefined;
    });

    it("should return light theme by default", () => {
      window.matchMedia = sinon.fake.returns({ match: false });

      expect(getDefaultTheme()).to.equal("light");
    });

    it("should return dark theme when browser is configured to prefer dark", () => {
      window.matchMedia = sinon.fake.returns({ match: true });

      expect(getDefaultTheme()).to.equal("dark");
    });

    it("should return light theme when window.matchMedia is not present", () => {
      window.matchMedia = undefined;

      expect(getDefaultTheme()).to.equal("light");
    });
  });
});
