import { Request, Response } from "express";
import {
  clearUserSessionIdInCookie,
  getUserSessionIdFromCookie,
} from "./cookie";

describe("getUserSessionIdFromCookie", () => {
  describe("when request has no cookie", () => {
    it("returns undefined", () => {
      const req = { cookies: {} } as Request;

      expect(getUserSessionIdFromCookie(req)).toBeUndefined();
    });
  });

  describe("when request has cookie", () => {
    describe("when cookie has no key `userSessionId`", () => {
      it("returns undefined", () => {
        const req = {
          cookies: { random: "whatever" },
        } as Request;

        expect(getUserSessionIdFromCookie(req)).toBeUndefined();
      });
    });

    describe("when cookie has key `userSessionId`", () => {
      describe("when key has empty value", () => {
        it("returns undefined", () => {
          const req = {
            cookies: { random: "whatever", userSessionId: "" },
          } as Request;

          expect(getUserSessionIdFromCookie(req)).toBeUndefined();
        });
      });

      describe("when key has non-empty value", () => {
        it("returns user session ID", () => {
          const req = {
            cookies: { random: "whatever", userSessionId: "azerty" },
          } as Request;

          expect(getUserSessionIdFromCookie(req)).toEqual("azerty");
        });
      });

      describe("clearUserSessionIdInCookie", () => {
        it("clears the userSessionId cookie with the correct options", () => {
          const res = {
            clearCookie: jest.fn(),
          } as Partial<Response>;

          clearUserSessionIdInCookie(res as Response);

          expect(res.clearCookie).toHaveBeenCalledWith("userSessionId", {
            secure: true,
            httpOnly: true,
          });
        });
      });
    });
  });
});
