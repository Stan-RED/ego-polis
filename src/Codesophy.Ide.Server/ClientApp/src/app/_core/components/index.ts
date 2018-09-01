import { MenuComponent } from './menu/menu.component';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { MenuMainContainerComponent } from './menu-main-container/menu-main-container.component';

import { SearchComponent } from './search/search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarContextComponent } from './sidebar-context/sidebar-context.component';
import { SidebarToolbarChildComponent } from './sidebar-toolbar-child/sidebar-toolbar-child.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { TopbarComponent } from './topbar/topbar.component';

export const components: any[] = [
  MenuComponent,
  MenuMainComponent,
  MenuMainContainerComponent,

  SearchComponent,
  SidebarComponent,
  SidebarContextComponent,
  SidebarToolbarChildComponent,
  ThemeSwitcherComponent,
  TopbarComponent
];

export const entryComponents: any[] = [
  SearchComponent,
];

export * from './menu/menu.component';
export * from './menu-main/menu-main.component';
export * from './menu-main-container/menu-main-container.component';

export * from './search/search.component';
export * from './sidebar/sidebar.component';
export * from './sidebar-context/sidebar-context.component';
export * from './sidebar-toolbar-child/sidebar-toolbar-child.component';
export * from './theme-switcher/theme-switcher.component';
export * from './topbar/topbar.component';
