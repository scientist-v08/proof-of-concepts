import { Component, inject } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [PopoverModule],
    template: `
        <!-- Account Section -->
        <div
            class="font-lexend text-sm font-medium flex justify-items-center cursor-pointer"
            (click)="op.toggle($event)"
        >
            My Account
            <img class="h-5" src="/assets/user.svg" />
        </div>

        <p-popover #op [dismissable]="true">
            <div
                class="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-3 font-medium"
                (click)="logout(); op.hide()"
            >
                Logout
            </div>
        </p-popover>
    `,
})
export class NavbarComponent {
    private authService = inject(AuthService);
    logout(): void {
        this.authService.logout();
    }
}
