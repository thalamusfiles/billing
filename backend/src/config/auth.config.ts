import billingConfig from './billing.config';

const defaultAuthConfig = {
  OAUTH_URL: 'http://iam_backend:3000/auth',
  CLIENT_SECRET: 'IAM_JWT_SECRET_YTLXQ3PRMC',
};

const authConfig = {
  //
  TOKEN_HEADER_NAME: 'x-access-token',
  // URL de autenticação do sistema.
  OAUTH_URL: process.env.OAUTH_URL || defaultAuthConfig.OAUTH_URL,
  // Oauth scope
  OAUTH_SCOPE: 'iam_all',
  // Oauth callback
  CLIENT_CALLBACK: billingConfig.PRODCTION_MODE
    ? 'http://billing.thalamus.digital/auth/iam/callback'
    : `http://localhost:${billingConfig.PORT}/auth/iam/callback`,
  CLIENT_ID: 'cea146ef-07a3-4df6-9b3d-e4b8c9629114',
  CLIENT_SECRET: process.env.CLIENT_SECRET || defaultAuthConfig.CLIENT_SECRET,
};

export default authConfig;
