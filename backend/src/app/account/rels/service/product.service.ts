import { EntityRepository, FilterQuery, FindOptions, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Product } from 'src/model/Product';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {
    this.logger.log('starting');
  }

  /**
   * Busca por vários registros
   * @param query
   * @returns
   */
  async findByNamesWithCost(productNames: string[]): Promise<Product[]> {
    this.logger.verbose('findByNamesWithCost');

    const options: FindOptions<Product> | any = {
      orderBy: { name: QueryOrder.ASC },
      populate: ['costs'],
    };

    const where: FilterQuery<Product> = {
      name: { $in: productNames },
    };

    return this.productRepository.find(where, options);
  }
}
