import { Group, Process } from "./Group";
import { property } from "./property";
import { inheritableProperty } from "./inheritableProperty";

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
    
    @inheritableProperty()
    animationDuration?: number;

    get group(): Group | null {
        if(this.parentElement instanceof Component) {
            return this.parentElement.group;
        } else {
            return null;
        }
    }

    runProcess(name: string, body: () => boolean, render = true) {
        const group = this.group;
        if(!group) {
            console.error("This component is not within a group, so processes cannot be run.");
            return;
        }
        group.processes.push({name, body: () => {
            if(render) {
                this.shouldRender = true;
            }
            return body();
        }});
    }

    /**
     * All children of type
     */
    getChildren(type = Component) {
        return [...this.children].filter((child) => child instanceof type) as any[];
    }
}
