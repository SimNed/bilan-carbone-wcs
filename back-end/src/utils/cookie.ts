import { Response, Request } from "express";
import UserSession from "../entities/userSession";

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

export function getUserSessionIdFromCookie(req: Request): string | undefined {
  const userSessionId = req.cookies ? req.cookies.userSessionId : undefined;
  return userSessionId || undefined;
}

export function clearUserSessionIdInCookie(expressResponse: Response) {
  expressResponse.clearCookie("userSessionId", {
    secure: true,
    httpOnly: true,
  });
}
