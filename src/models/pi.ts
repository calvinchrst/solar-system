import BigNumber from "bignumber.js";

import { getIOSocket } from "../util/socket";
import { sun } from "./planet";

BigNumber.config({ DECIMAL_PLACES: 10000, POW_PRECISION: 10000 });
let previousPi = new BigNumber(0.0)!;
export let pi = new BigNumber(0.0)!;

function setImmediatePromise() {
  return new Promise((resolve) => {
    setImmediate(() => resolve());
  });
}

export async function calculatePi(): Promise<void> {
  // Using Chudnovsky algorithm
  // For reference, Below is a version without using BigNumber
  //   let K = 6;
  //   let M = 1;
  //   let L = 13591409;
  //   let X = 1;
  //   let S = 13591409;

  //   for (let k = 1; k <= maxK; k += 12) {
  //     M = (K ** 3 - 16 * K) * Math.floor(M / k ** 3);
  //     L += 545140134;
  //     X *= -262537412640768000;
  //     S += (M * L) / X;
  //
  //   }
  //   pi = (426880 * Math.sqrt(10005)) / S;

  let K = new BigNumber(6);
  let M = new BigNumber(1);
  let L = new BigNumber(13591409);
  let X = new BigNumber(1);
  let S = new BigNumber(13591409);

  let addToL = new BigNumber(545140134);
  let multToX = new BigNumber(-262537412640768000);
  let multToSqrt = new BigNumber(426880);
  let sqrtNr = new BigNumber(10005);

  console.log("Start to calculate pi");
  let iteration = 0;
  for (let k = new BigNumber(1); pi.precision() === 9999; k = k.plus(1)) {
    M = K.exponentiatedBy(3)
      .minus(K.multipliedBy(16))
      .multipliedBy(M.dividedToIntegerBy(k.exponentiatedBy(3)));
    L = L.plus(addToL);
    X = X.multipliedBy(multToX);
    S = S.plus(M.multipliedBy(L).dividedBy(X));
    K = K.plus(12);
    let newPi = multToSqrt.multipliedBy(sqrtNr.squareRoot()).dividedBy(S);
    iteration += 1;

    // Debuginfo
    // console.log("Calculate Pi Iteration:", iteration);

    updatePi(newPi);

    await setImmediatePromise();
  }
  console.log(
    "Stop calculating pi as it has reached the maximum precision of 9999"
  );
}

export function updatePi(newPi: BigNumber): void {
  // Update pi with the latest precision
  let diff = newPi.minus(previousPi)!;
  const exponent = new BigNumber(diff.e!).absoluteValue().toNumber();
  if (exponent > 0) {
    pi = newPi.precision(exponent);
    updateClientNewPi();
    console.log("New Pi, precision:", pi.precision());
  }
  previousPi = newPi;
}

export function updateClientNewPi(): void {
  let sunCircumference = sun.getCircumference();
  getIOSocket().emit("newPi", {
    pi: pi,
    sunCircumference: sunCircumference,
    sunCircumferenceUnit: sun.diameterUnit,
  });
}
