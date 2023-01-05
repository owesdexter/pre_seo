export * from "./verify-methods";
export * from "./datetime";
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
