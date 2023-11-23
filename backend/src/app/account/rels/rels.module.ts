import { Logger, Module, NestModule } from '@nestjs/common';
import { UserUsageRelsController } from './controller/user-usage-rels.controller';
import { ProductService } from './service/product.service';
import { Product } from 'src/model/Product';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductCost } from 'src/model/ProductCost';
import { ProductCostService } from './service/product-cost.service';

@Module({
  imports: [MikroOrmModule.forFeature([Product, ProductCost])],
  providers: [ProductService, ProductCostService],
  controllers: [UserUsageRelsController],
})
export class RelsModule implements NestModule {
  private readonly logger = new Logger(RelsModule.name);

  configure() {
    this.logger.log('configure');
  }
}
