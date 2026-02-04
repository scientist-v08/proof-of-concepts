import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderRouterInterface } from '../../interfaces/header-router.interface';
import { LoginInterface, LoginRequestBody } from '../../interfaces/login.interface';
import { LoginService } from '../../services/login.service';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule],
    selector: 'app-login',
    template: `
        <div class="container">
            <form
                class="inner__container p-8 w-full max-w-md flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md"
                [formGroup]="loginForm"
                (ngSubmit)="loginSubmission()"
            >
                <h1 class="font-inter text-4xl font-bold mb-4 text-center">Login</h1>

                <div class="width__input">
                    <input
                        class="font-inter input__password px-4 py-4 text-lg rounded-md border border-gray-300 dark:border-gray-600 
                  focus:outline-none focus:ring-2 dark:text-black focus:ring-amber-300 dark:focus:ring-pink-400"
                        id="username"
                        name="username"
                        formControlName="username"
                        type="text"
                        placeholder="User"
                    />
                    @if (
                        loginForm.get('username')?.touched &&
                        loginForm.get('username')?.hasError('required')
                    ) {
                        <div class="text-red-500 text-sm">User is required</div>
                    }
                </div>

                <div class="width__input div__password__container mt-6">
                    <input
                        class="font-inter input__password px-4 py-4 text-lg rounded-md border border-gray-300 dark:border-gray-600 
                  focus:outline-none focus:ring-2 dark:text-black focus:ring-amber-300 dark:focus:ring-pink-400 appearance-none"
                        id="password"
                        [type]="passwordType()"
                        name="password"
                        formControlName="password"
                        placeholder="Password"
                    />
                    <button
                        class="mtn20px inset-y-0 right-0 flex items-center pr-3 text-gray-600 dark:text-gray-300 
                    hover:text-black dark:hover:text-white focus:outline-none"
                        (click)="togglePasswordVisibility()"
                        type="button"
                    >
                        @if (passwordType() === 'password') {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#000"
                                viewBox="0 0 16 16"
                            >
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path
                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                                />
                            </svg>
                        } @else {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#000"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"
                                />
                                <path
                                    d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"
                                />
                            </svg>
                        }
                    </button>
                </div>
                @if (
                    loginForm.get('password')?.touched &&
                    loginForm.get('password')?.hasError('required')
                ) {
                    <div class="text-red-500 text-sm">Password is required</div>
                }
                @if (
                    loginForm.get('password')?.touched &&
                    loginForm.get('password')?.hasError('pattern')
                ) {
                    <div class="text-red-500 text-sm">
                        Password will have 1 capital letter, 1 small letter, 1 number and 1 special
                        character and will be at least 8 characters long
                    </div>
                }
                @if (incorrectPassword()) {
                    <div class="text-red-500 text-sm">Incorrect password. Login failed.</div>
                }

                <button
                    class="font-inter width__input text-black bg-amber-200 dark:text-white dark:bg-pink-600 hover:bg-amber-100 
            dark:hover:bg-pink-500 focus:ring-2 focus:ring-amber-300 dark:focus:ring-pink-400 font-medium px-4 py-4 rounded-md 
            text-lg transition-colors mt-8 p-2"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    `,
    styles: [
        `
            .container {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .width__input {
                width: 100%;
            }

            .div__password__container {
                position: relative;
            }

            .input__password {
                width: 100%;
            }

            .mtn20px {
                position: absolute;
            }

            @media (min-width: 768px) {
                .container {
                    min-height: 80vh;
                    min-width: 90vw;
                    .inner__container {
                        width: 50%;
                        .width__input {
                            width: 66%;
                        }
                    }
                }
            }
        `,
    ],
})
export default class LoginComponent implements OnDestroy {
    #fb = inject(FormBuilder);
    #loginService = inject(LoginService);
    #router = inject(Router);
    passwordType = signal<'password' | 'text'>('password');
    loginForm = this.#fb.group({
        username: this.#fb.control('', Validators.required),
        password: this.#fb.control('', [
            Validators.required,
            Validators.pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            ),
        ]),
    });
    subscription = new Subscription();
    incorrectPassword = signal<boolean>(false);

    togglePasswordVisibility() {
        this.passwordType.update(type => (type === 'password' ? 'text' : 'password'));
    }

    loginSubmission(): void {
        if (this.loginForm.valid) {
            const reqBody: LoginRequestBody = {
                Email: this.loginForm.get('username')?.getRawValue(),
                Password: this.loginForm.get('password')?.getRawValue(),
            };
            this.subscription = this.#loginService.login(reqBody).subscribe({
                next: (res: LoginInterface) => {
                    localStorage.setItem('token', res.access_token);
                    if (res.routes[0].Role === 'ROLE_ADMIN') {
                        localStorage.setItem('admin', 'true');
                    } else {
                        localStorage.setItem('user', 'true');
                    }
                    const headerRoutes: HeaderRouterInterface[] = res.routes.map(
                        ({ Id, Route, Heading }) => ({
                            id: Id,
                            route: Route,
                            heading: Heading,
                        }),
                    );
                    localStorage.setItem('routes', JSON.stringify(headerRoutes));
                    this.#router.navigateByUrl(headerRoutes[0].route);
                    this.#loginService.allRoutes.set(headerRoutes);
                    this.#loginService.isLoggingOut.set(false);
                },
                error: (err: HttpErrorResponse) => {
                    this.incorrectPassword.set(true);
                    console.log(err.message);
                },
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
