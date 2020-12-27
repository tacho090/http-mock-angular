import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { mockDog } from "./dog.service.spec";

@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url && request.url.indexOf('https://dog.ceo/api/breeds/image/random') > -1) {
            return of(new HttpResponse({ status: 200, body: mockDog }));
        }
        return next.handle(request);
    }
}
