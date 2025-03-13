import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatalogsModule } from './catalogs/catalogs.module';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
  throw new Error('MONGO_URI is not defined in the environment variables');
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoUri),
    CatalogsModule,
  ],
})
export class AppModule {}
