"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAt = addAt;
exports.splice = splice;
exports.replaceBetween = replaceBetween;
exports.replaceAt = replaceAt;
exports.findReplace = findReplace;
/**
 * Inserts an item at position index
 */
function addAt(arr, index, ...item) {
    return splice(arr, index, 0, ...item);
}
/**
 * Removes or replaces existing elements and/or adding new elements
 */
function splice(arr, start, deleteCount, ...items) {
    const copy = arr.concat();
    copy.splice(start, deleteCount, ...items);
    return copy;
}
function replaceBetween(arr, start, finish, item) {
    const deleteCount = finish - start + 1;
    const fakeArray = { length: deleteCount };
    const mapFn = typeof item === 'function' ? item : () => item;
    const items = Array.from(fakeArray, mapFn);
    return splice(arr, start, deleteCount, ...items);
}
function replaceAt(arr, index, replacement) {
    if (typeof replacement === 'function') {
        return arr.map((value, key) => key === index ? replacement(value) : value);
    }
    return arr.map((value, key) => key === index ? replacement : value);
}
function findReplace(arr, find, replace) {
    if (typeof find !== 'function') {
        find = (value) => value === find;
    }
    if (typeof replace !== 'function') {
        replace = () => replace;
    }
    return arr.map((value, key) => find(value, key) ? replace(value) : value);
}
