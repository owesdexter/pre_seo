import { ParsedUrlQuery } from "querystring";
import { TTradeData, TAPITradeData } from "@/types";
import { getLatestPrice } from "@/api";
import { UNKNOWN } from "@/constant";

const getTradeData = async (
  target: string,
  base: string
): Promise<TTradeData> => {
  let tradeData: TTradeData = {
    base: base,
    target: target,
    baseVolume: UNKNOWN,
    lastPrice: UNKNOWN,
    changeRate: UNKNOWN,
    quoteVolume: UNKNOWN,
  };
  try {
    const { data } = await getLatestPrice();
    if (data && data[`${target}/${base}`]) {
      let currentCtRelInfo = data[`${target}/${base}`] as TAPITradeData;
      tradeData = {
        base,
        target,
        baseVolume: currentCtRelInfo.base_volume ?? UNKNOWN,
        lastPrice: currentCtRelInfo.last_price ?? UNKNOWN,
        changeRate: currentCtRelInfo.changeRate ?? UNKNOWN,
        quoteVolume: currentCtRelInfo.quote_volume ?? UNKNOWN,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return tradeData;
};

export const getTradeDataByUrl = async (url: string): Promise<TTradeData> => {
  const ctRel = url.split("/static/")[url.split("/static/").length - 1];
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
