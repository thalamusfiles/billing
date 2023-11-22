import { Module } from '@nestjs/common';
import ModelModule from './model.module';
import { StaticFileModule } from './staticfiles.module';
import { AuthModule } from './account/auth/auth.module';
import { RelsModule } from './account/rels/rels.module';

@Module({
  imports: [
    //
    ModelModule,
    AuthModule,
    RelsModule,
    StaticFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
