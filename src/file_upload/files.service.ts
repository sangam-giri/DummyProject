import { Injectable } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { Response } from 'express';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadDirectory = './src/uploads/';

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filename = file.originalname;
    await fsPromises.writeFile(`${this.uploadDirectory}${filename}`, file.buffer);
    return filename;
  }

  async downloadFile(filename: string, res: Response) {
    const filePath = join(this.uploadDirectory, filename);
    try {
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  async getFilesInDirectory(): Promise<string[]> {
    try {
      const files = await fsPromises.readdir(this.uploadDirectory);
      return files;
    } catch (error) {
      throw new Error(`Error reading directory: ${error.message}`);
    }
  }
}

