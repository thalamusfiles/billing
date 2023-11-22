import { Logger, Module, NestModule } from '@nestjs/common';
import { UserUsageRelsController } from './controller/user-usage-rels.controller';

@Module({
  controllers: [UserUsageRelsController],
})
export class RelsModule implements NestModule {
  private readonly logger = new Logger(RelsModule.name);

  configure() {
    this.logger.log('configure');
  }
}
