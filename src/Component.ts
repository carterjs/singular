export abstract class Component extends HTMLElement {
    /**
     * Store whether or not the component should be re-rendered
     */
    get shouldRender() {
        return this._shouldRender;
    }
    set shouldRender(shouldRender) {
        // Bubble up to parents
        if(shouldRender && this.parentElement instanceof Component) {
            this.parentElement.shouldRender = shouldRender;
        }
        this._shouldRender = shouldRender;
    }
    _shouldRender = false;

    /**
     * Inherit a property from parents of a certain type.
     * Works when using getters and setters with an underscored prop
     * @param name the name of the property
     * @param def the default (fallback) value
     * @param type the type to inherit from
     */
    protected inherit<T>(name: string, def: T, type = Component): T {
        if((typeof (this as any)["_" + name]) !== "undefined") {
            return (this as any)["_" + name];
        } else {
            if(this.parentElement instanceof type) {
                return this.parentElement.inherit(name, def, type);
            } else {
                return def;
            }
        }
    }

    /**
     * All children of type
     */
    getChildren(type = Component) {
        return [...this.children].filter((child) => child instanceof type) as any[];
    }
}
