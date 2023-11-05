export type FailedApiResponse = {
  ok: false;
  detail: string;
};

export type ApiResponse<T> =
  | FailedApiResponse
  | {
      ok: true;
      data: T;
    };
