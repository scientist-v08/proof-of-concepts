import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SideBarComponent } from './layout/sidebar';
import { NavbarComponent } from './layout/navbar';
import { MainContentComponent } from './layout/main-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, SideBarComponent, NavbarComponent, MainContentComponent],
  templateUrl: './app.html',
})
export class App {}
