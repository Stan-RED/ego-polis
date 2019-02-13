/*
 * https://angular.io/guide/styleguide#style-04-12
 * Only the root AppModule should import the CoreModule.
 * Do guard against reimporting of CoreModule and fail fast by adding guard logic.
 */

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
