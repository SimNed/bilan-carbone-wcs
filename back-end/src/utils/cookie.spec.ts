import { IncomingMessage } from "node:http";
import { getUserSessionIdFromCookie } from "./cookie";

describe("getUserSessionIdFromCookie", () => {
  describe("when request has no cookie", () => {
    it("returns undefined", () => {
      const req = { headers: { cookie: undefined } } as IncomingMessage;

      expect(getUserSessionIdFromCookie(req)).toBeUndefined();
    });
  });

  describe("when request has cookie", () => {
    describe("when cookie has no key `userSessionId`", () => {
      it("returns undefined", () => {
        const req = {
          headers: { cookie: "random=whatever" },
        } as IncomingMessage;

        expect(getUserSessionIdFromCookie(req)).toBeUndefined();
      });
    });

    describe("when cookie has key `userSessionId`", () => {
      describe("when key has empty value", () => {
        it("returns undefined", () => {
          const req = {
            headers: { cookie: "random=whatever;userSessionId=" },
          } as IncomingMessage;

          expect(getUserSessionIdFromCookie(req)).toBeUndefined();
        });
      });

      describe("when key has non-empty value", () => {
        it("returns user session ID", () => {
          const req = {
            headers: { cookie: "random=whatever;userSessionId=azerty" },
          } as IncomingMessage;

          expect(getUserSessionIdFromCookie(req)).toEqual("azerty");
        });
      });
    });
  });
});
