import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem("token")!=null){
    const modifiedreq=request.clone({
      headers:request.headers.append("Authorization","Bearer "+localStorage.getItem("token"))
    });
    return next.handle(modifiedreq);
    }
    if(localStorage.getItem("admintoken")!=null){
      const modifiedreq=request.clone({
        headers:request.headers.append("Authorization","Bearer "+localStorage.getItem("admintoken"))
      });
      return next.handle(modifiedreq);
      }
    return next.handle(request);
  }
}
