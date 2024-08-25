/**
 * Inserts an item at position index
 */
export declare function addAt<T>(arr: ReadonlyArray<T>, index: number, ...item: ReadonlyArray<T>): Array<T>;
/**
 * Removes or replaces existing elements and/or adding new elements
 */
export declare function splice<T>(arr: ReadonlyArray<T>, start: number, deleteCount: number, ...items: ReadonlyArray<T>): Array<T>;
type mapFn<T> = ((v: T, k: number) => T);
export declare function replaceBetween<T>(arr: ReadonlyArray<T>, start: number, finish: number, item: T | mapFn<T>): Array<T>;
/**
 * Copia uma array substituindo o valor em `index` por `replacement`
 */
export declare function replaceAt<T>(arr: ReadonlyArray<T>, index: number, replacement: T): Array<T>;
export declare function replaceAt<T>(arr: ReadonlyArray<T>, index: number, replacement: findReplaceReplacer<T>): Array<T>;
export type findReplaceFinder<T> = (value: T, key: number) => boolean;
export type findReplaceReplacer<T> = (value: T) => T;
export declare function findReplace<T>(arr: ReadonlyArray<T>, find: T, replace: T): Array<T>;
export declare function findReplace<T>(arr: ReadonlyArray<T>, find: T, replace: findReplaceReplacer<T>): Array<T>;
export declare function findReplace<T>(arr: ReadonlyArray<T>, find: findReplaceFinder<T>, replace: T): Array<T>;
export declare function findReplace<T>(arr: ReadonlyArray<T>, find: findReplaceFinder<T>, replace: findReplaceReplacer<T>): Array<T>;
export {};
