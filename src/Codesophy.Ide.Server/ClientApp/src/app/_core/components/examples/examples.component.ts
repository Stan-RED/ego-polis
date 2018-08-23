// Examples from https://github.com/angular/material2
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material";
import { ThemeService } from "../../services";

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: "app-examples",
  templateUrl: "./examples.component.html",
  styleUrls: ["./examples.component.scss"]
})
export class ExamplesComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  hide = true;

  animalControl = new FormControl('', [Validators.required]);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(public theme: ThemeService) {
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  onThemeChange(event: MatSelectChange) {
    this.theme.change(event.value);
  }
}
