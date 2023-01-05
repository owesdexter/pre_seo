import request from "../request";
import { omit, compose, prop, assoc, mergeLeft, mergeRight } from "ramda";

export const fetchTradeKline = (params: {
  baseCurrencyId: number;
  tradeCurrencyId: number;
  type: number;
  limit: number;
  interval?: string;
}) => {
  const { baseCurrencyId, tradeCurrencyId, limit, interval } = params;
  return request.get(`/quote/getKline`, {
    params: {
      ...params,
      type: interval ?? "1",
      interval: undefined,
    },
  });
};

export const getLatestPrice = () => request.get(`/list/tradePrice`);

export const checkAirDropCoinTask = (data: { csvList: string }) =>
  request.post(`/activitiesCoin/checkUpload`, data);
