import { Component } from "./Component";

export function inheritableProperty<T>(defaultValue?: T) {
    return function(target: any, name: string) {
        Object.defineProperty(target, name, {
            get: function() {
                if((typeof this["_" + name]) != "undefined") {
                    return this["_" + name];
                } else {
                    if(this.parentElement instanceof Component) {
                        return this.parentElement[name];
                    } else {
                        return defaultValue;
                    }
                }
            },
            set: function(value) {
                this["_" + name] = value;
                this.shouldRender = true;
            },
            enumerable: true,
            configurable: true
        });
    }
}