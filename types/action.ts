export type TBaseActionResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
