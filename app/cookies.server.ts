import { createCookie } from "react-router";

export const themeCookie = createCookie("theme", {
  maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
});
