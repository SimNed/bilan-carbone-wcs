import { Response } from "express";
import UserSession from "../entities/userSession";
import { parse } from "cookie";
import { IncomingMessage } from "node:http";

export function setUserSessionIdInCookie(
  expressResponse: Response,
  session: UserSession
) {
  expressResponse.cookie("userSessionId", session.id, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
}

export function getUserSessionIdFromCookie(req: IncomingMessage) {
  const userSessionId = parse(req.headers.cookie || "").userSessionId;
  return userSessionId || undefined;
}
