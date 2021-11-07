"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouchExtentions = void 0;
exports.CouchExtentions = {};
//ARRAYS
Array.prototype.all = function (func) {
    return !this.map(function (x) { return func(x); }).includes(false);
};
Array.prototype.count = function () {
    return this.length + 1;
};
Array.prototype.any = function (func) {
    if (!func)
        return this.length > 0;
    return this.map(function (x) { return func(x); }).includes(true);
};
Array.prototype.first = function () {
    return this[0];
};
Array.prototype.isEmpty = function () {
    return this.length <= 0;
};
Array.prototype.single = function (func, thisArg) {
    var value = this.filter(func);
    if (!value.any())
        return null;
    return value[0];
};
Array.prototype.sortByKey = function (sortKey) {
    if (this.isEmpty())
        return [];
    var keyDataType = typeof this[0][sortKey];
    switch (keyDataType.toUpperCase()) {
        case "STRING":
            if (this.length === 0)
                return [];
            return this.sort(function (a, b) {
                if (a[sortKey] !== null && b[sortKey] !== null) {
                    var itemA = a[sortKey].toUpperCase();
                    var itemB = b[sortKey].toUpperCase();
                    return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
                }
            });
        case "DATE":
            if (this.length === 0)
                return [];
            return this.sort(function (a, b) {
                var itemA = new Date(a[sortKey]);
                var itemB = new Date(b[sortKey]);
                return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
            });
        case "BOOLEAN":
            if (this.length === 0)
                return [];
            return this.sort(function (a, b) {
                return (a.dismissed === b.dismissed) ? 0 : !a.dismissed ? -1 : 1;
            });
        case "NUMBER":
            if (this.length === 0)
                return [];
            return this.sort(function (a, b) {
                if (a[sortKey] !== null && b[sortKey] !== null) {
                    var itemA = a[sortKey];
                    var itemB = b[sortKey];
                    return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
                }
            });
    }
};
Array.prototype.prepend = function (item) {
    return __spreadArray([item], this, true);
};
//STRINGS
String.prototype.isEmpty = function () {
    return this.length == 0;
};
String.prototype.first = function () {
    return this[0];
};
String.prototype.removeWhiteSpace = function () {
    return this.replace(/\s/g, '');
};
//must be used with a declared variable for the out
String.prototype.tryParse = function (outCallBack) {
    try {
        if (this === null)
            throw "string is null";
        if (this === undefined)
            throw "string is undefined";
        if (this.length === 0)
            throw "string is empty";
        outCallBack(JSON.parse(this));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
//NUMBERS
Number.prototype.toPercent = function () {
    return Math.round(this * 10000) / 100;
};
Number.prototype.toDecimal = function () {
    return Math.round(this * 100) / 10000;
};
