import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import billingConfig from '../config/billing.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend'),
      serveStaticOptions: {
        maxAge: billingConfig.STATIC_FILE_MAX_AGE,
      },
    }),
  ],
})
export class StaticFileModule {}
