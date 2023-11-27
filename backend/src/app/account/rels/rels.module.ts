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
//import { User } from 'src/model/User';
import { InvoiceProductCost } from 'src/model/InvoiceProductCost';

@Module({
  imports: [MikroOrmModule.forFeature([/*User,*/ Product, ProductCost, Invoice, InvoiceProductCost])],
  providers: [
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
