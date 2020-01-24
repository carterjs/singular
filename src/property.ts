import { Component } from "./Component";

export interface PropertyConfig<T> {
    inherit?: boolean,
    defaultValue?: T
}

/**
 * A decorator for creating smart properties that can trigger re-renders, inherit values, and transition between values
 * @param config Configuration of property
 */
export function property<T>(config: PropertyConfig<T> = {
    // Default config
    inherit: false
}) {
    return function(target: any, name: string) {
        Object.defineProperty(target, name, {
            get: function() {
                // Inherit based on config
                if(!config.inherit || (typeof this["_" + name]) != "undefined") {
                    return this["_" + name];
                } else {
                    // Inheriting
                    if(this.parentElement instanceof Component) {
                        // Inherit from parent
                        return this.parentElement[name];
                    } else {
                        //Fall back to default
                        return config.defaultValue;
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

export function inherit<T>(defaultValue: T) {
    return {
        inherit: true,
        defaultValue
    }
}