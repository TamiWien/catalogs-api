import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './catalogs.schema';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Injectable()
export class CatalogsService {
  constructor(@InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>) {}

  async createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    try {
      const existingCatalog = await this.catalogModel.findOne({ name: createCatalogDto.name }).exec();
      if (existingCatalog) {
        throw new BadRequestException(`Catalog with name "${createCatalogDto.name}" already exists.`);
      }
  
      if (createCatalogDto.isPrimary) {
        const existingPrimaryCatalog = await this.catalogModel.findOne({
          vertical: createCatalogDto.vertical,
          isPrimary: true
        }).exec();
  
        if (existingPrimaryCatalog) {
          existingPrimaryCatalog.isPrimary = false;
          await existingPrimaryCatalog.save();
        }
      }
  
      const createdCatalog = new this.catalogModel(createCatalogDto);
      return await createdCatalog.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Validation Error: ${error.message}`);
      }
      else if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong while creating the catalog');
    }
  }
  
  async getCatalogs() {
    try {
      const catalogs = await this.catalogModel.find().exec();
      return catalogs.map(catalog => ({
        ...catalog.toObject(),
        isMultiLocale: catalog.locales.length > 1,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong while fetching catalogs');
    }
  }

  async getCatalogByName(name: string) {
    try {
      const catalog = await this.catalogModel.findOne({ name }).exec();
      if (!catalog) {
        throw new NotFoundException(`Catalog with name "${name}" not found`);
      }
      return {
        ...catalog.toObject(),
        isMultiLocale: catalog.locales.length > 1,
      };
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
      throw new InternalServerErrorException('Something went wrong while fetching the catalog');
    }
  }

  async updateCatalog(name: string, isPrimary?: boolean, locales?: string[]) {
    try {
        const catalog = await this.getCatalogByName(name);
        if (!catalog) {
            throw new NotFoundException(`Catalog with name "${name}" not found`);
        }

        if (isPrimary) {
            await this.catalogModel.updateMany(
                { vertical: catalog.vertical, isPrimary: true },
                { isPrimary: false }
            );
        }

        const updatedCatalog = await this.catalogModel.findOneAndUpdate(
            { name },
            { isPrimary, locales },
            { new: true } 
        ).exec();

        if (!updatedCatalog) {
            throw new NotFoundException(`Catalog with name "${name}" not found after update`);
        }

        updatedCatalog.set('isMultiLocale', updatedCatalog.locales.length > 1, { strict: false });

        return updatedCatalog;
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new InternalServerErrorException('Something went wrong while updating the catalog');
    }
}
  
  async deleteCatalog(name: string) {
    try {
      const deletedCatalog = await this.catalogModel.findOneAndDelete({ name }).exec();
      if (!deletedCatalog) {
        throw new NotFoundException(`Catalog with name "${name}" not found`);
      }
      return deletedCatalog;
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
      throw new InternalServerErrorException('Something went wrong while deleting the catalog');
    }
  }

  async deleteMultipleCatalogs(names: string[]) {
    try {
      const result = await this.catalogModel.deleteMany({ name: { $in: names } }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`No catalogs found for the provided names`);
      }
      return result;
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
      throw new InternalServerErrorException('Something went wrong while deleting multiple catalogs');
    }
  }
}
