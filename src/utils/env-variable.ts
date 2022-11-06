export function getStringEnv(name: string): string {
  const env = process.env[name];

  if (!env) throw new Error(`Missing environment variable : ${name}`);

  return env;
}

export function getNumberEnv(name: string): number {
  try {
    return Number(getStringEnv(name));
  } catch {
    throw new Error(`Unable to parse environment variable "${name}" as a number`);
  }
}

export function getBooleanEnv(name: string): boolean {
  try {
    return Boolean(getStringEnv(name));
  } catch {
    throw new Error(`Unable to parse environment variable "${name}" as a boolean`);
  }
}