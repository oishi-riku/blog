import { loadEnvConfig } from '@next/env';

// eslint-disable-next-line @typescript-eslint/require-await
const setup = async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd());
};

export default setup;
