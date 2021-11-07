export const CouchExtentions = {};

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
        tryParse<T>(out): T;
    }

    interface Number {
        toPercent(): number;
        toDecimal(): number;
    }
}

//ARRAYS
Array.prototype.all = function (func: any): boolean {
    return !this.map(x => func(x)).includes(false);
}

Array.prototype.count = function (): number {
    return this.length + 1;
}

Array.prototype.any = function (func?: any): boolean {
    if(!func)
        return this.length > 0;

    return this.map(x => func(x)).includes(true);
}

Array.prototype.first = function () {
    return this[0];
}

Array.prototype.isEmpty = function (): boolean {
    return this.length <= 0;
}

Array.prototype.single = function (func: (value: any, index: number, array: any[]) => any, thisArg?: any) {
    const value = this.filter(func);
    if (!value.any())
        return null;

    return value[0];
}

Array.prototype.sortByKey = function (sortKey: string) {
    if (this.isEmpty()) return [];
    const keyDataType = typeof this[0][sortKey];
    switch (keyDataType.toUpperCase()) {
        case "STRING":
            if (this.length === 0) return [];
            return this.sort((a, b) => {
                if (a[sortKey] !== null && b[sortKey] !== null) {
                    const itemA = a[sortKey].toUpperCase();
                    const itemB = b[sortKey].toUpperCase();
                    return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
                }

            });

        case "DATE":
            if (this.length === 0) return [];
            return this.sort((a, b) => {
                const itemA = new Date(a[sortKey]);
                const itemB = new Date(b[sortKey]);
                return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;

            });

        case "BOOLEAN":
            if (this.length === 0) return [];
            return this.sort((a, b) => {
                return (a.dismissed === b.dismissed) ? 0 : !a.dismissed ? -1 : 1;
            })

        case "NUMBER":
            if (this.length === 0) return [];
            return this.sort((a, b) => {
                if (a[sortKey] !== null && b[sortKey] !== null) {
                    const itemA = a[sortKey];
                    const itemB = b[sortKey];
                    return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
                }

            });
    }
}

Array.prototype.prepend = function (item: any) {
    return [item, ...this];
}

//STRINGS
String.prototype.isEmpty = function (): boolean {
    return this.length == 0;
}

String.prototype.first = function (): string {
    return this[0];
}

String.prototype.removeWhiteSpace = function (): string {
    return this.replace(/\s/g, '');
}

//must be used with a declared variable for the out
String.prototype.tryParse = function (outCallBack): any {    
    try {
        if (this === null) throw "string is null";

        if(this === undefined) throw "string is undefined";
    
        if(this.length === 0) throw "string is empty";

        outCallBack(JSON.parse(this));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

//NUMBERS
Number.prototype.toPercent = function (): number {
    return Math.round(this * 10000) / 100;
}

Number.prototype.toDecimal = function (): number {
    return Math.round(this * 100) / 10000;
}

