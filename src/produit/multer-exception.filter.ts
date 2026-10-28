import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { unlink } from 'fs/promises';

@Catch(HttpException)
export class MulterExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>();
    const res = host.switchToHttp().getResponse<Response>();

    // Si la requête avait un fichier, on le supprime
    if (req.file?.path) {
      await unlink(req.file.path).catch(() => {
        // Le fichier n'existe peut-être plus, on ignore l'erreur
      });
    }

    res.status(exception.getStatus()).json(exception.getResponse());
  }
}