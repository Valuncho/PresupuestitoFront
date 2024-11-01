import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { LoadingService } from "../utils/loading.service";


const loadingService : LoadingService = new LoadingService;
export function loadingIntercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {    
    loadingService.show();
    return next(req).pipe(
        finalize(() => {
        loadingService.hide();
        })
);
}

