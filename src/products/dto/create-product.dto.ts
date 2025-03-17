import {ProductDto} from "./product.dto";

export type CreateProductDto = Omit<ProductDto, 'id'>
