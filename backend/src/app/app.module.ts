import { Module } from '@nestjs/common';
import ModelModule from './model.module';
import { StaticFileModule } from './staticfiles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //
    ModelModule,
    AuthModule,
    StaticFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
