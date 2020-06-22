import { RequestHandler } from "express";

export const get404: RequestHandler = function (req, res, next): void {
  res.status(404).json("Route doesn't exist");
};
