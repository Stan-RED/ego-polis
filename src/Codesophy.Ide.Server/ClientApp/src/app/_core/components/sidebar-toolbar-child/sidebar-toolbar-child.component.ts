import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";

import { SidebarToolbarChild, SidebarToolbarChildItem } from "../sidebar/sidebar.component";

@Component({
  selector: "app-sidebar-toolbar-child",
  templateUrl: "./sidebar-toolbar-child.component.html",
  styleUrls: [
    "./sidebar-toolbar-child.component.scss",
    "../sidebar/sidebar-panel.component.scss"
  ]
})
export class SidebarToolbarChildComponent implements OnChanges {
  @Input() item: SidebarToolbarChild;

  @ViewChild("componentHost", {read: ViewContainerRef}) componentHost;

  constructor(private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item.component) {
      this.createComponent(this.item.component);
    } else {
      this.clearComponent();
    }
  }

  trigger(item: SidebarToolbarChildItem) {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  private createComponent(component: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.componentHost;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // const componentTypeInstance = (<typeof component>componentRef.instance);
  }

  private clearComponent() {
    this.componentHost.clear();
  }
}
