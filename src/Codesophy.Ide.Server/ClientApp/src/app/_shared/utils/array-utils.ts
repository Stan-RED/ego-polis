/**
 * Moves array item from one index to another.
 * @param {Array<any>} arr
 * @param {number} from
 * @param {number} to
 * @returns {Array<any>} Copy of the array with moved item.
 */
export function move(arr: Array<any>, from: number, to: number): Array<any> {
  const arrCopy = arr.slice();
  const element = arrCopy[from];

  arrCopy.splice(from, 1);
  arrCopy.splice(to, 0, element);

  return arrCopy;
}
