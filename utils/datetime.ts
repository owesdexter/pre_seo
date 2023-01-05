import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);

export const DATETIME_FORMAT = `YYYY-MM-DD HH:mm:ss`;
export const DATE_FORMAT = `YYYY-MM-DD`;
export const TIME_FORMAT = `HH:mm:ss`;

export const getCurrent = () => {
  const current = dayjs();
  return {
    timestamp: current.valueOf(),
    year: current.year(),
    month: current.month() + 1,
    day: current.date(),
    hour: current.hour(),
    minute: current.minute(),
    second: current.second(),
    datetime: current.format(DATETIME_FORMAT),
    date: current.format(DATE_FORMAT),
    time: current.format(TIME_FORMAT),
  };
};

export const getDatetime = (datetime: Date | string) =>
  datetime ? dayjs(datetime).format(DATETIME_FORMAT) : ``;

export const getDate = (datetime: Date | string) =>
  datetime ? dayjs(datetime).format(DATE_FORMAT) : ``;

export const getTime = (datetime: Date) =>
  datetime ? dayjs(datetime).format(TIME_FORMAT) : ``;

// export const getDatetimeDiff = (d1, d2) =>
//   !d1 || !d2 ? undefined : dayjs(dayjs(d1)).diff(dayjs(d2))

export const getTWTime = (datetime: Date | string) =>
  datetime
    ? dayjs(datetime).add(8, "hour").local().format(DATETIME_FORMAT)
    : ``;

// datetime: timestamp
export const getDuration = (datetime: number) => {
  const interval = dayjs.duration(datetime);
  return {
    day: interval.days(),
    hour: interval.hours(),
    minute: interval.minutes(),
    second: interval.seconds(),
  };
};

/**
 * 確認是否超過設定期間
 * @param startDate - 起算時間
 * @param days - 須通過的天數
 */
export const checkIsPassDays = (startDate: string, days: number): boolean => {
  const today = dayjs();
  const deadLine = dayjs(startDate).add(days, "days");
  const result = deadLine.isSameOrBefore(today);
  return result;
};
