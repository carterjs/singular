import { Component } from "./Component";

export function animate(duration: number, style: (x: number) => number = linear) {
    return function(target: any, name: string) {
        Object.defineProperty(target, name, {
            get: function() {
                return this["_" + name];
            },
            set: function(value) {
                const group = this.group;
                if(!!group && typeof this[name] == "number") {
                    const diff = value - this[name];
                    const startTime = Date.now();
                    const startValue = this[name];
                    group.processes.push({
                        name: `changing "${name}"`,
                        body: () => {
                            this["_" + name] = startValue + diff * (Date.now() - startTime) / duration;
                            this.shouldRender = true;
                            if(Date.now() - startTime < duration) {
                                return true;
                            } else {
                                this["_" + name] = value;
                                return false;
                            }
                        }
                    });
                } else {
                    this["_" + name] = value;
                    this.shouldRender = true;
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}

export function linear(x: number) {
    return x;
}

export function ease(x: number) {
    return 1 - x * x;
}