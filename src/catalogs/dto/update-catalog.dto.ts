import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatalogDto {
  @ApiProperty({ description: 'Indicates whether the catalog is primary', example: true, required: false })
  isPrimary?: boolean;

  @ApiProperty({ description: 'The locales of the catalog', example: ['en_US', 'es_ES'], required: false })
  locales?: string[];
}
