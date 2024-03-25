import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { concat } from 'rxjs';
@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  private static instance: ProductsService;
  private products: Product[];
  private newProduct: Product = {
    id: uuidv4(),
    name: '',
    description: '',
    price: 0,
  };
  constructor() {
    if (!ProductsService.instance) {
      ProductsService.instance = this;
      this.products = [];
    }
    return ProductsService.instance;
  }
  onApplicationBootstrap() {
    this.generateProducts();
  }

  private generateProducts(): void {
    for (let i = 0; i < 10; i++) {
      const product: Product = {
        id: uuidv4(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
      };
      this.products.push(product);
    }
  }
  create(createProductDto: CreateProductDto) {
    const modifiedProduct = { ...this.newProduct, ...createProductDto };
    this.products.push(modifiedProduct);
    return modifiedProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product =
      this.products.filter((item) => item.id == id).length == 0
        ? null
        : this.products.filter((item) => item.id == id)[0];
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
