import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Logger } from '@nestjs/common';

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
  message: any;
}

export interface TargetHttpExceptionResponse {
  statusCode: number;
  message: any;
  path: string;
  method: string;
  timeStamp: Date;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = this.getHttpErrorMessage(exception);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) Logger.error(errorLog);
    else Logger.log(errorLog);

    response.status(status).json(errorResponse);
  }

  private getHttpErrorMessage(exception: HttpException): any {
    const errorResponse = exception.getResponse();
    const errorMessage =
      (errorResponse as HttpExceptionResponse).message || exception.message;

    return errorMessage;
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): TargetHttpExceptionResponse => ({
    statusCode: status,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
    message: errorMessage,
  });

  private getErrorLog = (
    errorResponse: TargetHttpExceptionResponse,
    request: Request,
    exception: any,
  ): string => {
    const { statusCode } = errorResponse;
    const { method, url } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
        ${JSON.stringify(errorResponse)}\n\n
     
        ${exception.stack ? exception.stack : exception}\n\n`;
    return errorLog;
  };
}
