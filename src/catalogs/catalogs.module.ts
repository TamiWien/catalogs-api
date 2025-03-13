import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from './catalogs.schema';
import { CatalogsService } from './catalogs.service';
import { CatalogsController } from './catalogs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])],
  providers: [CatalogsService],
  controllers: [CatalogsController],
  exports: [MongooseModule]
})
export class CatalogsModule {}
