/**
 * Inserts an item at position index
 */
export function addAt(arr, index, ...item) {
    return splice(arr, index, 0, ...item);
}
/**
 * Removes or replaces existing elements and/or adding new elements
 */
export function splice(arr, start, deleteCount, ...items) {
    const copy = arr.concat();
    copy.splice(start, deleteCount, ...items);
    return copy;
}
export function replaceBetween(arr, start, finish, item) {
    const deleteCount = finish - start + 1;
    const fakeArray = { length: deleteCount };
    const mapFn = typeof item === 'function' ? item : () => item;
    const items = Array.from(fakeArray, mapFn);
    return splice(arr, start, deleteCount, ...items);
}
export function replaceAt(arr, index, replacement) {
    if (typeof replacement === 'function') {
        return arr.map((value, key) => key === index ? replacement(value) : value);
    }
    return arr.map((value, key) => key === index ? replacement : value);
}
export function findReplace(arr, find, replace) {
    if (typeof find !== 'function') {
        find = (value) => value === find;
    }
    if (typeof replace !== 'function') {
        replace = () => replace;
    }
    return arr.map((value, key) => find(value, key) ? replace(value) : value);
}
