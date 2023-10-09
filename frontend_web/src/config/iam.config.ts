const iamConfig = {
  PRODCTION_MODE: process.env.NODE_ENV === 'production',
  // Default Login Scope
  DEFAULT_SCOPE: 'iam_all',
  // Applicação Principal
};

export default iamConfig;
