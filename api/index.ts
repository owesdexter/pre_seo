export * from "./modules";
//list 清單 post.request 參數
//後續會統一為 {pagination: number; pageSize: number;}
export type PageListParamsType =
  | { pagination: number; pageSize: number }
  | { page: number; rows: number }
  | { start: number; size: number }
  | { pageNo: number; pageSize: number }
  | { pageNum: number; pageSize: number }
  | { page: number; pageCount: number };

//list 清單 response 參數
export type PageListDataType<T> = {
  count: number;
  pages: number;
  data: T[];
};

//新後端，list 清單 response 參數
export type NewPageListDataType<T> = {
  list: T[];
  total: number; //總筆數
};
