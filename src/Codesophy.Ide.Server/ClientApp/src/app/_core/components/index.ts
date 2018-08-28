import { MenuComponent } from './menu/menu.component';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { MenuMainContainerComponent } from './menu-main-container/menu-main-container.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

export const components: any[] = [
  MenuComponent,
  MenuMainComponent,
  MenuMainContainerComponent,

  SidebarComponent,
  ThemeSwitcherComponent
];

export * from './menu/menu.component';
export * from './menu-main/menu-main.component';
export * from './menu-main-container/menu-main-container.component';

export * from './sidebar/sidebar.component';
export * from './theme-switcher/theme-switcher.component';
