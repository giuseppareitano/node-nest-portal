import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {ProductsModule} from './products/products.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {Product} from "./products/entities/product.entity";
import {User} from "./users/user.entity";
import {RolesGuard} from "./auth/guards/roles.guard";
import {APP_GUARD} from "@nestjs/core";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/role.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'nodenestportaldb',
            entities: [User, Role, Product],
            synchronize: true,
        }),
        AuthModule, ProductsModule, UsersModule, RolesModule],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
