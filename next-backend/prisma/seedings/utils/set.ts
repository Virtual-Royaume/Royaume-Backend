export async function createSet<T>(func: () => Promise<T> | T, length: number): Promise<T[]> {
  const set: Set<T> = new Set();

  while (set.size < length) set.add(await func());

  return [...set];
}