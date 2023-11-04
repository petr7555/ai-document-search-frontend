export type ApiResponse<T> =
  | {
      ok: false;
      detail: string;
    }
  | {
      ok: true;
      data: T;
    };
