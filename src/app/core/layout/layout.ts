import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="layout-wrapper">
  <app-sidebar></app-sidebar>
  <div class="main-content-area">
    <app-header></app-header>
    <main class="page-body">
      <router-outlet></router-outlet>
    </main>
  </div>
</div>
  `,
  styles: [`
    .layout-wrapper { display: flex; height: 100vh; overflow: hidden; }
    .main-content-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .page-body { flex: 1; overflow-y: auto; background-color: #f8fafc; padding: 30px; }
  `,
  ]
})
export class LayoutComponent { }