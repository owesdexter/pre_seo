// Trade Data
export type TTradeData = {
  base: string;
  target: string;
  baseVolume: string;
  lastPrice: string;
  changeRate: string;
  quoteVolume: string;
};
export type TAPITradeData = {
  base_volume: string;
  last_price: string;
  change_rate: string;
  quote_volume: string;
};
// 幣
export type CoinType = {
  currencyId: number | null; //幣種編號
  currencyName: string; //幣種名稱
  currencyNameEn: string; //英文簡寫
  country: string; //國家
  countryIco: string; //國家 icon
  note: string; //幣種描述=英文簡寫
  initPrice: number; //初始價格
  icoUrl: string; //幣種 icon
  rechargeRate: string; //充幣手續費
  rechargeRateType: number; //充幣手續費方式，1固定額度;2比例;
  withDrawRate: string; //提幣手續費
  withDrawRateType: number; //提幣手續費方式，1固定額度;2比例;
  withDrawRateTypeUserOption: number; //提幣手續費，可修改但不可以低於設定值，1選取;2不選取;
  transferRate: string; //轉帳手續費
  transferRateType: number; //轉帳手續費方式，1固定額度;2比例;
  buyRate: string; //買入手續費
  buyRateType: number; //買入手續費方式，2比例;
  sellRate: string; //賣出手續費
  sellRateType: number; //賣出手續費方式，2比例;
  rechargeCoin: number; //充幣，1開放;2停用;
  withdrawCoin: number; //提幣，1開放;2停用;
  buy: number; //買入，1開放;2停用;
  sell: number; //賣出，1開放;2停用;
  upType: number; //(必填)
  minWithDraw: number | null; //最小提幣額度
  maxWithDraw: number | null; //最大提幣額度
  priceMinDecimal: number; //價格小數位數
  numberMinDecimal: number; //數量小數位數
  minEntrusNumber: number | null; //最小委託數量
  maxEntrusNumber: number | null; //最大委託數量
  minEntrusPrice: string; //最小委託價格
  maxEntrusPrice: string; //最大委託價格
  maxEntrusAmount: string; //委託最大金額
};

//幣種行為
export type CoinUserGradeActionType = {
  userGradeActionId: number;
  amountHighLimit: number;
  amountLowLimit: number;
  status: number;
  userActionId: number;
};

// export type TKlinePayLoad = {
//   baseCurrencyId: number;
//   tradeCurrencyId: number;
//   type: number;
//   limit: number;
//   interval: number;
// };
