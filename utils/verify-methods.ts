import * as R from "ramda";

// got 判斷是否非 undefined、false、空值(null)、空字串("")、空陣列([])、空物件({})
export const got = (data: any) => {
  return R.pipe<any, boolean, boolean>(
    R.either(R.isNil, R.isEmpty),
    R.not
  )(data);
};
