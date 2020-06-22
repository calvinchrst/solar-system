import { RequestHandler } from "express";

import { sun } from "../models/planet";

export const getCircumference: RequestHandler = function (req, res, next) {
  const planetName = req.body.planetName;

  if (!planetName) {
    return res.status(400).json({ Message: "No planetName specified in body" });
  }

  if (planetName !== "sun") {
    return res.status(400).json({ Message: "Invalid planetName specified" });
  }

  return res.status(200).json({
    circumference: sun.getCircumference(),
    circumferenceUnit: sun.diameterUnit,
  });
};
