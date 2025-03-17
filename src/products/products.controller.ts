import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {RoleEnum} from "../auth/enums/role.enum";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthGuard} from "../auth/guards/auth.guard";
import {ProductDto} from "./dto/product.dto";
import {Product} from "./entities/product.entity";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    const product = await this.productsService.create(createProductDto)

    return new ProductDto(
        product.id,
        product.code,
        product.description,
        product.quantity,
        product.price
    )
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<ProductDto[]> {
      const products = await this.productsService.findAll();
      return products.map((p: Product) => {
          return new ProductDto(
              p.id,
              p.code,
              p.description,
              p.quantity,
              p.price
          );
      });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Query('id') id?: number, @Query('code') code?: string): Promise<ProductDto | null> {
      const p = await this.productsService.findOne(id, code);
      return !!p ? new ProductDto(
          p.id,
          p.code,
          p.description,
          p.quantity,
          p.price
      ): null;
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductDto | null> {
      const p = await this.productsService.update(+id, updateProductDto);
      return !!p ?
          new ProductDto(
              p.id,
              p.code,
              p.description,
              p.quantity,
              p.price
          )
          :
          null;
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  async remove(@Param('id') id: string): Promise<number> {
    return this.productsService.remove(+id);
  }
}
