import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { AuthResponse, AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    template: `
        <router-outlet />
    `,
})
export class App implements OnInit, OnDestroy {
    authService = inject(AuthService);
    private readonly refreshIntervalMs = 14 * 60 * 1000;
    unsubscribe$ = new Subject<void>();

    ngOnInit(): void {
        this.authService.loggedIn$
            .pipe(
                switchMap((res: number | null) => {
                    if (res) {
                        return timer(this.refreshIntervalMs, this.refreshIntervalMs).pipe(
                            switchMap(() => {
                                return this.authService.tokenRefresher();
                            }),
                        );
                    }
                    return of(null);
                }),
                takeUntil(this.unsubscribe$),
            )
            .subscribe({
                next: (res: AuthResponse | null) => {
                    if (res) {
                        this.authService.storeTokens(res);
                    }
                },
                error: () => {
                    console.warn('Failed to refresh token');
                },
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
