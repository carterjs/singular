import { Component } from "./Component";

export function property(target: any, name: string) {
    Object.defineProperty(target, name, {
        get: function() {
            return this["_" + name];
        },
        set: function(value) {
            this["_" + name] = value;
            this.shouldRender = true;
        },
        enumerable: true,
        configurable: true
    });
}