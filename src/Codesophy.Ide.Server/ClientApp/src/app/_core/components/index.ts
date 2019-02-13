import { BranchSelectionComponent } from './branch-selection/branch-selection.component';
import { BranchSelectionBottomSheetComponent } from './branch-selection-bottom-sheet/branch-selection-bottom-sheet.component';
import { SearchComponent } from './search/search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarContextComponent } from './sidebar-context/sidebar-context.component';
import { SidebarToolbarChildComponent } from './sidebar-toolbar-child/sidebar-toolbar-child.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { TopbarComponent } from './topbar/topbar.component';

export const components: any[] = [
  BranchSelectionComponent,
  BranchSelectionBottomSheetComponent,
  SearchComponent,
  SidebarComponent,
  SidebarContextComponent,
  SidebarToolbarChildComponent,
  ThemeSwitcherComponent,
  TopbarComponent
];

export const entryComponents: any[] = [
  BranchSelectionBottomSheetComponent,
  SearchComponent,
];

export * from './branch-selection/branch-selection.component';
export * from './branch-selection-bottom-sheet/branch-selection-bottom-sheet.component';
export * from './search/search.component';
export * from './sidebar/sidebar.component';
export * from './sidebar-context/sidebar-context.component';
export * from './sidebar-toolbar-child/sidebar-toolbar-child.component';
export * from './theme-switcher/theme-switcher.component';
export * from './topbar/topbar.component';
