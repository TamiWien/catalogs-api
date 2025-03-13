import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { Catalog, CatalogSchema } from './catalogs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])],
  controllers: [CatalogsController],
  providers: [CatalogsService],
})
export class CatalogsModule {}
