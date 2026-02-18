import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar';
import { SideBarComponent } from './sidebar';

@Component({
    selector: 'app-main-content',
    imports: [RouterOutlet, SideBarComponent, NavbarComponent],
    template: `
        <div class="flex w-full min-h-screen">
            <app-sidebar
                class="grow-0 shrink-0 basis-1/5 bg-[#522793] pt-6 pb-6 flex flex-col gap-10 sticky top-0 h-screen self-start"
            ></app-sidebar>
            <div class="grow-0 shrink-0 basis-4/5 flex flex-col">
                <app-navbar
                    class="h-16 bg-white pt-3 pb-3 pl-10 pr-10 shadow-lg flex justify-end items-center"
                ></app-navbar>
                <div class="flex-1 bg-[#f1f3f4] pt-9 pb-9 pl-10 pr-10 flex flex-col gap-4.75">
                    <router-outlet />
                </div>
            </div>
        </div>
    `,
})
export default class MainContentComponent {}
