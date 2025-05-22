export type RolloApiErrorType = {
  message: string | null;
  error: string | null;
};

export const RolloApiError = (
  message: string | null,
  error: string | null = null,
): RolloApiErrorType => {
  return { message: message, error: error };
};
