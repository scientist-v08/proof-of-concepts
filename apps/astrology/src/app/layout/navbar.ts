import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    imports: [],
    template: `
        <!-- Search Section -->
        <div></div>

        <!-- Account Section -->
        <div class="font-lexend text-sm font-medium flex justify-items-center">
            My Account
            <img class="h-5" src="/assets/user.svg" />
        </div>
    `,
})
export class NavbarComponent {}
