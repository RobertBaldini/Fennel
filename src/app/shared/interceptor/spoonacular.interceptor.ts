import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpoonacularKeys } from './spoonacular-keys-dev';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders()
            .set('X-RapidAPI-Host', SpoonacularKeys.HOST)
            .set('X-RapidAPI-Key', SpoonacularKeys.KEY);
        
        const modifiedRequest = req.clone({
            headers: headers
        });
        
        return next.handle(modifiedRequest);
    }

}