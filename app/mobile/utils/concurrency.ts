const DEFAULT_TIMEOUT = 5000; // 5 seconds

export function withTimeout<T>(promise: Promise<T>, ms: number = DEFAULT_TIMEOUT): Promise<T> {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms),
    ),
  ]) as Promise<T>;
}
