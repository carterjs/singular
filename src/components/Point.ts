import { Component } from "../Component";

/**
 * A vector point
 */
export class Point extends Component {

    /**
     * Point x
     */
    get x(): number {
        return this._x;
    }
    set x(x) {
        this._x = x
        this.shouldRender();
    }
    _x = 0;

    /**
     * Point y
     */
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
        this.shouldRender();
    }
    _y = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "x":
                this.x = Number(newValue);
                break;
            case "y":
                this.y = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    constructor(x?: number, y?: number) {
        super();
        this.x = x || 0;
        this.y = y || 0;
    }

    render(context: CanvasRenderingContext2D) {
        // Draw rectangle
    }
}

customElements.define("a-point", Point);
