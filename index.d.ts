export declare const CouchExtentions: {};
declare global {
    export interface Array<T> {
        all(func: any): boolean;
        any(func?: any): boolean;
        count(): number;
        first(): T;
        isEmpty(): boolean;
        prepend(item: T): Array<T>;
        single(func: (value: any, index: number, array: any[]) => any, thisArg?: any): T;
        sortByKey(key: string): Array<T>;
    }
    interface String {
        isEmpty(): boolean;
        first(): string;
        removeWhiteSpace(): string;
        tryParse<T>(out: any): T;
    }
    interface Number {
        toPercent(): number;
        toDecimal(): number;
    }
}
