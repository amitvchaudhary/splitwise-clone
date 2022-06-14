import { SPLIT_METHOD } from "../models/enums/core.enums";

export function whichSplitMethod(method: string) {
  if (method === SPLIT_METHOD.EQUALLY) {
    return "equally";
  } else if (method === SPLIT_METHOD.EXACT_AMOUNT) {
    return "exact amount";
  } else if (method === SPLIT_METHOD.FULL_AMOUNT) {
    return "full amount";
  } else if (method === SPLIT_METHOD.PERCENTAGE) {
    return "percentage";
  }
}
