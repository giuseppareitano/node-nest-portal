export class ProductDto {
    id: number;
    code: string;
    description: string;
    quantity: number;
    price: number;
    constructor(id: number, code: string, description: string, quantity: number, price: number){
        this.id = id;
        this.code = code;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }
}