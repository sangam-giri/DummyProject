import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './files.service';

@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:image')
  async getFile(@Param('image') image: string, @Res() res: Response) {
    await this.fileService.downloadFile(image, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const image = await this.fileService.uploadFile(file);
    return { image };
  }
}
