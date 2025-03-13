import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; 

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @ApiProperty({ description: 'The name of the catalog', example: 'summer_collection' })  
  @Prop({ required: true, unique: true, match: /^[A-Za-z]+$/ })
  name: string;

  @ApiProperty({ description: 'The vertical of the catalog', example: 'fashion' }) 
  @Prop({ required: true, enum: ['fashion', 'home', 'general'] })
  vertical: string;

  @ApiProperty({ description: 'The locales of the catalog', example: ['en_US', 'es_ES'] }) 
  @Prop({ required: true })
  locales: string[];

  @ApiProperty({ description: 'Is this catalog primary?', example: true }) 
  @Prop({ required: true })
  isPrimary: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
