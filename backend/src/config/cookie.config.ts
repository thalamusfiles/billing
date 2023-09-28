const defaultConfig = {
  BILLING_SESSION_SECRET: 'BILLING_SESSION_SECRET_I1vS3cxO807i',
};

const cookieConfig = {
  NAME: 'billing',
  PATH: '/auth',
  SECRET: process.env.BILLING_SESSION_SECRET || defaultConfig.BILLING_SESSION_SECRET,
  HTTP_ONLY: process.env.NODE_ENV === 'production',
  SAME_SITE: process.env.NODE_ENV === 'production' ? undefined : false,
  MAX_AGE: 60 * 60 * 24 * 30 * 3,
};

export default cookieConfig;
