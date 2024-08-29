import {
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, concatMap, Observable, of, retryWhen, throwError } from 'rxjs';
import * as alertify from 'alertifyjs';
import { ErrorCode } from '../enums/enums';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        console.log('Interceptor has been started');
        return next.handle(req).pipe(

            retryWhen( error =>
                error.pipe(
                    concatMap((checkError:HttpErrorResponse, count:number)=>{

                        // retry in case of server down
                        if(checkError.status===ErrorCode.serverDown && count<=5){
                            return of(checkError);
                        }


                        // in case to unauthorized error 
                        if(checkError.status===ErrorCode.unauthorised && count<=5){
                            return of(checkError);
                        }


                        return throwError(()=>checkError);
                    })
                )
            ),

            catchError((error: HttpErrorResponse) => {
                const errorMessage = this.setError(error);
                alertify.error(errorMessage);
                return throwError(() => error);
            })
        );
    }

    

    setError(error: HttpErrorResponse):string{
        let errorMessage = "Unknown error occured";
        if(error.error instanceof ErrorEvent){
            errorMessage = error.error.message;
        } else if(error.status!==0) {
            errorMessage = error.error.errorMessage;
        }
        return errorMessage;
    }
}
