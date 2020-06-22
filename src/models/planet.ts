import BigNumber from "bignumber.js";

import { pi } from "./pi";
import { kMaxLength } from "buffer";

class Planet {
  static nrPlanets = 0;
  diameterUnit: String;
  diameter: BigNumber;
  id: number;

  constructor(diameter: BigNumber, diameterUnit: String) {
    this.id = Planet.nrPlanets;
    this.diameter = diameter;
    this.diameterUnit = diameterUnit;
    Planet.nrPlanets += 1;
  }

  getCircumference(): BigNumber {
    return pi.multipliedBy(this.diameter);
  }
}

// Initialize Planet Sun
const SUN_DIAMETER = new BigNumber(1.392);
const SUN_DIAMETER_UNIT = "Million km";
export const sun = new Planet(SUN_DIAMETER, SUN_DIAMETER_UNIT);
