import { CoreEffects } from "./core.effect";
import { RouterEffects } from "./router.effect";

export const effects: any[] = [
  CoreEffects,
  RouterEffects,
];

export * from "./core.effect";
export * from "./router.effect";
