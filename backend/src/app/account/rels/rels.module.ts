import { Logger, Module, NestModule } from '@nestjs/common';
import { UserUsageRelsController } from './controller/user-usage-rels.controller';
import { ProductService } from './service/product.service';
import { Product } from 'src/model/Product';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductCost } from 'src/model/ProductCost';
import { ProductCostService } from './service/product-cost.service';
import { InvoiceService } from './service/invoice.service.';
import { UserInvoiceRelsController } from './controller/user-invoice-rels.controller';
import { Invoice } from 'src/model/Invoice';
import { JwtModule } from '@nestjs/jwt';
import { InvoiceProductCost } from 'src/model/InvoiceProductCost';
import authConfig from 'src/config/auth.config';
import { AccessStrategy } from '../auth/passaport/access.strategy';

@Module({
  imports: [
    //
    JwtModule.register({ secret: authConfig.CLIENT_SECRET }),
    MikroOrmModule.forFeature([Product, ProductCost, Invoice, InvoiceProductCost]),
  ],
  providers: [
    AccessStrategy,
    //
    ProductService,
    ProductCostService,
    InvoiceService,
  ],
  controllers: [
    //
    UserUsageRelsController,
    UserInvoiceRelsController,
  ],
})
export class RelsModule implements NestModule {
  private readonly logger = new Logger(RelsModule.name);

  configure() {
    this.logger.log('configure');
  }
}
