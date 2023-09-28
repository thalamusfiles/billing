import { Module } from '@nestjs/common';
import ModelModule from './model.module';
import { StaticFileModule } from './staticfiles.module';

@Module({
  imports: [
    //
    ModelModule,
    StaticFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
