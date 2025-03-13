import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CatalogsService } from './catalogs.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new catalog' })
  @ApiBody({ type: CreateCatalogDto })
  async createCatalog(@Body() body: CreateCatalogDto) {
    return this.catalogsService.createCatalog(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all catalogs' })
  async getCatalogs() {
    return this.catalogsService.getCatalogs();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get catalog by name' })
  async getCatalogByName(@Param('name') name: string) {
    return this.catalogsService.getCatalogByName(name);
  }

  @Put(':name')
  @ApiOperation({ summary: 'Update catalog details' })
  @ApiBody({ type: UpdateCatalogDto })
  async updateCatalog(@Param('name') name: string, @Body() body: UpdateCatalogDto) {
    return await this.catalogsService.updateCatalog(name, body.isPrimary, body.locales);
  }

  @Delete(':name')
  @ApiOperation({ summary: 'Delete a catalog' })
  async deleteCatalog(@Param('name') name: string) {
    return this.catalogsService.deleteCatalog(name);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete multiple catalogs' })
  @ApiBody({ type: [String] })
  async deleteMultipleCatalogs(@Body() names: string[]) {
    return this.catalogsService.deleteMultipleCatalogs(names);
  }
}
