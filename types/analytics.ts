export interface AnalyticsItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface AnalyticsItem2 {
  name: string;
  user: number;
  post: number;
  report: number;
}

export type TMonthlyCount = {
  _id: number;
  count: number;
};

export type TModelAggregateResponse = {
  userStats: TMonthlyCount[];
  postStats: TMonthlyCount[];
  reportStats: TMonthlyCount[];
};
