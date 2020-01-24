import { Group, Process } from "./Group";
import { property, inherit } from "./property";

/**
 * A general component.
 * Components can inherit props and trigger renders
 */
export abstract class Component extends HTMLElement {
    /**
     * Store whether or not the component should be re-rendered
     */
    get shouldRender() {
        return this._shouldRender;
    }
    set shouldRender(shouldRender) {
        // Set value
        this._shouldRender = shouldRender;

        // Bubble up to parents
        if(shouldRender && this.parentElement instanceof Component) {
            this.parentElement.shouldRender = shouldRender;
        }
    }
    _shouldRender = false;

    @property(inherit(null)) group!: Group | null;

    /**
     * All children of type
     */
    getChildren(type = Component) {
        return [...this.children].filter((child) => child instanceof type) as any[];
    }
}
