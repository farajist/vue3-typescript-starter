interface Env {
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
}

export const env: Env = {
  apiBaseUrl: process.env.VUE_APP_API_BASE_URL || '',
  environment: process.env.NODE_ENV || 'development',
};

const requiredVars: (keyof Env)[] = [];

// guard against missing variables
const missingVars = requiredVars.filter((key: keyof Env) => !env[key]);
if (missingVars.length) {
  throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

export default env;
