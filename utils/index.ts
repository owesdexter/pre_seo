export * from "./verify-methods";
export * from "./datetime";
export * from "./getTradeData";
// export * from "./loading";
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
