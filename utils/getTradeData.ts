import { TTradeData, TAPITradeData } from "@/types";
import { getLatestPrice } from "@/api";

export const getTradeDataByParams = async (target: string, base: string) => {
  let tradeData: TTradeData = {
    baseVolume: "0",
    lastPrice: "0",
    quoteVolume: "0",
  };
  // const { ctRel } = (params as { ctRel: string[] }) ?? [];
  // const [target, base] =
  //   ctRel && ctRel.length === 2
  //     ? ctRel.map((el) => el.toUpperCase())
  //     : ["BTC", "TWD"];
  // console.log(" ----- SSR render:", `${target}/${base}`);
  try {
    const { data } = await getLatestPrice();
    if (data && data[`${target}/${base}`]) {
      let currentCtRelInfo = data[`${target}/${base}`] as TAPITradeData;
      tradeData = {
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
