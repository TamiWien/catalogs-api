import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  @ApiProperty({ description: 'The name of the catalog', example: 'summer_collection' })
  name: string;

  @ApiProperty({ description: 'The vertical of the catalog', example: 'fashion' })
  vertical: string;

  @ApiProperty({ description: 'The locales of the catalog', example: ['en_US', 'es_ES'] })
  locales: string[];

  @ApiProperty({ description: 'Is this catalog primary?', example: true })
  isPrimary: boolean;
}

