export const REGEX_EMAIL = new RegExp(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
);

export const Currency = {
  INR: {
    value: "INR",
    symbol: "Rs.",
  },
  USD: {
    value: "USD",
    symbol: "$",
  },
};

export const SplitMethod = {
  EQUALLY: {
    value: "EQUALLY",
    text: "equally",
  },
  EXACT_AMOUNT: {
    value: "EXACT_AMOUNT",
    text: "unequally",
  },
  PERCENTAGE: {
    value: "PERCENTAGE",
    text: "unequally",
  },
  FULL_AMOUNT: {
    value: "FULL_AMOUNT",
    text: "full amount",
  },
};
