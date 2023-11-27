import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import billingConfig from './billing.config';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { ProductCost } from '../model/ProductCost';
import { Invoice } from '../model/Invoice';
import { InvoiceProductCost } from '../model/InvoiceProductCost';

const defaultModelConfig = {
  host: 'localhost',
  port: 5001,
  dbName: 'billing',
  user: 'billing',
  password: 'billing',
  charset: 'UTF8',
};

const modelConfig: MikroOrmModuleSyncOptions = {
  migrations: {
    disableForeignKeys: false,
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  entities: [
    User,
    // Billing
    Product,
    ProductCost,
    Invoice,
    InvoiceProductCost,
  ],
  entitiesTs: ['./src/model'],
  type: 'postgresql',
  host: process.env.DATABASE_HOST || defaultModelConfig.host,
  port: parseInt(process.env.DATABASE_PORT, 10) || defaultModelConfig.port,
  dbName: process.env.DATABASE_NAME || defaultModelConfig.dbName,
  user: process.env.DATABASE_USER || defaultModelConfig.user,
  password: process.env.DATABASE_PASS || defaultModelConfig.password,
  charset: process.env.DATABASE_CHARSET || defaultModelConfig.charset,
  driverOptions: {
    connection: billingConfig.PRODCTION_MODE
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
  },
};

export default modelConfig;
