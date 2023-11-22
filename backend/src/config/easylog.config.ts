const defaultEasylogConfig = {
  EASYLOGGER_URLS: 'http://easylog_backend:3002/log',
};

const easylogConfig = {
  EASYLOGGER_URLS: process.env.EASYLOGGER_URLS || defaultEasylogConfig.EASYLOGGER_URLS,
  EASYLOGGER_PRODUCT_INDEX: process.env.EASYLOGGER_PRODUCT_INDEX,
};

export default easylogConfig;
