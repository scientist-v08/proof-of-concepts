import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    access_token_expires_at: string;
    refresh_token_expires_at: string;
    username: string;
    full_name: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private refreshSubscription: Subscription | null = null;
    private http = inject(HttpClient);
    private router = inject(Router);
    loggedIn = new Subject<number | null>();
    loggedIn$ = this.loggedIn.asObservable();
    isLoggingOut = signal<boolean>(false);
    url = environment.BASEURLLOGIN;

    login(credentials: { username: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.url + 'login', credentials).pipe(
            tap((response: AuthResponse) => {
                this.storeTokens(response);
            }),
            catchError(err => {
                this.clearTokens();
                return throwError(() => err);
            }),
        );
    }

    tokenRefresher(): Observable<AuthResponse> {
        const refreshToken = this.getRefreshToken(); // Retrieve from storage
        return this.http.post<AuthResponse>(this.url + 'refresh', { refresh_token: refreshToken });
    }

    logout(): void {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
            this.refreshSubscription = null;
        }
        this.clearTokens();
        this.loggedIn.next(null);
        this.router.navigate(['/login']);
    }

    storeTokens(response: AuthResponse): void {
        localStorage.setItem('access_token', response?.access_token ?? '');
        localStorage.setItem('refresh_token', response?.refresh_token ?? '');
        localStorage.setItem('logged_in', 'true');
    }

    private getRefreshToken(): string {
        return localStorage.getItem('refresh_token') || '';
    }

    private clearTokens(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('logged_in');
    }
}
