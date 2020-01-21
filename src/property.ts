import { Component } from "./Component";

function easeInOut(t: number) {
    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
}

export function property<T>(defaultValue: T, animate = false) {
    return function(target: any, name: string) {
        Object.defineProperty(target, name, {
            get: function() {
                if((typeof this["_" + name]) !== "undefined") {
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
                const group = this.group;
                if(animate && !!group && typeof defaultValue == "number") {
                    const diff = value - this[name];
                    const startTime = Date.now();
                    const startValue = this[name];
                    group.processes.push({
                        name: `changing "${name}"`,
                        body: () => {
                            this["_" + name] = startValue + diff * easeInOut((Date.now() - startTime) / this.animationDuration);
                            this.shouldRender = true;
                            if(Date.now() - startTime < this.animationDuration) {
                                return true;
                            } else {
                                this["_" + name] = value;
                                return false;
                            }
                        }
                    });
                } else {
                    this["_" + name] = value;
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}
