import { Injectable } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { head } from "lodash-es";

export interface Theme {
  cssClass: string;
  label: string;
}

@Injectable()
export class ThemeService {
  availableThemes: Array<Theme> = [
    {
      cssClass: `default-theme`,
      label: `Default`
    },

    {
      cssClass: `dark-theme`,
      label: `Dark`
    },
  ];

  // Use this to set correct theme css class on app holder.
  themeCssClass: string;

  constructor(private overlayContainer: OverlayContainer) {
    this.change(head(this.availableThemes).cssClass);
  }

  change(newThemeCssClass: string) {
    this.themeCssClass = newThemeCssClass.toLowerCase();

    // Removes old theme css class and adds new theme css class.
    // Pattern: contains '-theme' string.
    const overlayContainerClassList = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClassList).filter((item: string) => item.includes("-theme"));
    if (themeClassesToRemove.length) {
      overlayContainerClassList.remove(...themeClassesToRemove);
    }
    overlayContainerClassList.add(this.themeCssClass);
  }
}
