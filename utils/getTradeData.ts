import { ParsedUrlQuery } from "querystring";
import { TTradeData, TAPITradeData } from "@/types";
import { getLatestPrice } from "@/api";

const getTradeData = async (
  target: string,
  base: string
): Promise<TTradeData> => {
  let tradeData: TTradeData = {
    base: "BTC",
    target: "TWD",
    baseVolume: "0",
    lastPrice: "0",
    quoteVolume: "0",
  };
  try {
    const { data } = await getLatestPrice();
    if (data && data[`${target}/${base}`]) {
      let currentCtRelInfo = data[`${target}/${base}`] as TAPITradeData;
      tradeData = {
        base,
        target,
        baseVolume: currentCtRelInfo.base_volume,
        lastPrice: currentCtRelInfo.last_price,
        quoteVolume: currentCtRelInfo.quote_volume,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return tradeData;
};

export const getTradeDataByUrl = async (url: string): Promise<TTradeData> => {
  const ctRel = url.split("/trade/")[url.split("/trade/").length - 1];
  const [target, base] =
    ctRel.split("_").length === 2
      ? ctRel.split("_").map((el) => el.toUpperCase())
      : ["BTC", "TWD"];
  return getTradeData(target, base);
};

export const getTradeDataByParams = async (
  params: ParsedUrlQuery | undefined
): Promise<TTradeData> => {
  let target = "BTC";
  let base = "TWD";
  const ctRelArray = params?.ctRel ? params.ctRel : [];

  if (Array.isArray(ctRelArray) && ctRelArray.length === 2) {
    [target, base] = ctRelArray.map((el) => el.toUpperCase());
  }
  return getTradeData(target, base);
};
