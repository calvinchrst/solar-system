import { RequestHandler } from "express";

import { pi } from "../models/pi";

export const getPi: RequestHandler = function (req, res, next): void {
  res.status(200).json({ pi: pi });
};
