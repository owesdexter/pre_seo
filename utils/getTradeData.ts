import { TTradeData, TAPITradeData } from "@/types";
import { getLatestPrice } from "@/api";

export const getTradeDataByParams = async (
  url: string
): Promise<TTradeData> => {
  const ctRel = url.split("/trade/")[url.split("/trade/").length - 1];
  let tradeData: TTradeData = {
    base: "BTC",
    target: "TWD",
    baseVolume: "0",
    lastPrice: "0",
    quoteVolume: "0",
  };
  try {
    const [target, base] = ctRel.split("_").map((el) => el.toUpperCase());
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
