import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Product} from "./entities/product.entity";
import {FindOptionsWhere, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>
  ){}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.code = createProductDto.code;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.quantity = createProductDto.quantity;
    return this.productRepository.save(
        this.productRepository.create(product)
    );
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id?: number, code?: string): Promise<Product | null> {
    if(!id && !code){
      throw new BadRequestException("Not enough product params")
    }
    let params: FindOptionsWhere<Product> = {};
    if(id){
      params.id = id;
    }
    if(code){
      params.code = code;
    }
    return this.productRepository.findOneBy(params);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Product not found");
    }
    return result.affected || 0;
  }
}
