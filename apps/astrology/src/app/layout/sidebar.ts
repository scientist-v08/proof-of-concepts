import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AstroSvgComponent } from '../svg/astrosvg.component';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink, RouterLinkActive, AstroSvgComponent],
    template: `
        <!-- Logo Section -->
        <div class="flex align-center justify-center text-2xl text-white">
            <app-astro-svg />
            Astrology
        </div>

        <!-- Navigation Section -->
        <div class="h-full flex flex-col justify-between pl-4 pr-4">
            <!-- Routes Subsection -->
            <div class="w-full h-[17rem] flex flex-col gap-4">
                <a
                    class="text-white no-underline text-base p-4 rounded ml-[7%] flex items-end w-full hover:bg-white/10 cursor-pointer"
                    routerLink="/houses"
                    routerLinkActive="bg-white/10"
                >
                    <img class="mr-2 h-5" src="/assets/houses.svg" />
                    Houses
                </a>
                <a
                    class="text-white no-underline text-base p-4 rounded ml-[7%] flex items-end w-full hover:bg-white/10 cursor-pointer"
                    routerLink="/bnk"
                    routerLinkActive="bg-white/10"
                >
                    <img class="mr-2 h-5" src="/assets/dashboard.svg" />
                    Balas & Karakatavas
                </a>
                <a
                    class="text-white no-underline text-base p-4 rounded ml-[7%] flex items-end w-full hover:bg-white/10 cursor-pointer"
                    routerLink="/pairing"
                    routerLinkActive="bg-white/10"
                >
                    <img class="mr-2 h-5" src="/assets/chart-line.svg" />
                    Pair matching
                </a>
            </div>
        </div>
    `,
})
export class SideBarComponent {}
