export function enumToValuesArray(customEnum): number[] {
  const values = [];

  for (const n in customEnum) {
    if (typeof customEnum[n] === 'number') {
      values.push(customEnum[n]);
    }
  }

  return values;
}
