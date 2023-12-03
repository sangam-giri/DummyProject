import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FileService } from './files.service';

@Module({
  controllers: [FilesController],
  providers:[FileService]
})
export class FilesModule {}

