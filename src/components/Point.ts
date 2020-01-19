import { Component } from "../Component";

/**
 * A vector point
 */
export class Point extends Component {
    /**
     * X value
     */
    get x(): number {
        return this.inherit("x", 0);
    }
    set x(x) {
        this._x = x;
        this.shouldRender = true;
    }
    _x?: number;

    /**
     * Y value
     */
    get y(): number {
        return this.inherit("y", 0);
    }
    set y(y) {
        this._y = y;
        this.shouldRender = true;
    }
    _y?: number;

    static get observedAttributes() {
        return [
            "x",
            "y"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x":
            case "y":
                this[name] = Number(newValue);
                break;
        }
    }
}

customElements.define("a-point", Point);
