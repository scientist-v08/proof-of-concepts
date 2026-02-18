import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('access_token');
    const loginService = inject(AuthService);

    let authReq = req;

    if (authToken) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${authToken}` },
        });
    }

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && !loginService.isLoggingOut()) {
                loginService.isLoggingOut.set(true);
                loginService.logout();
            }
            return throwError(() => err);
        }),
    );
};
