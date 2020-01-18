import { Component } from "../Component";

/**
 * A vector circle
 */
export class Circle extends Component {

    /**
     * Center x
     */
    get x(): number {
        return this._x;
    }
    set x(x) {
        this._x = x
        this.shouldRender();
    }
    _x: number;

    /**
     * Center y
     */
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
        this.shouldRender();
    }
    _y: number;

    /**
     * Circle radius
     */
    get radius() {
        return this._radius;
    }
    set radius(radius) {
        this._radius = radius;
        this.shouldRender();
    }
    _radius: number;

    constructor(x = 0, y = 0, radius = 0) {
        super();
        this._x = x;
        this._y = y;
        this._radius = radius;
    }

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "radius"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log(name);
        switch(name) {
            case "x":
                this.x = Number(newValue);
                break;
            case "y":
                this.y = Number(newValue);
                break;
            case "radius":
                this.radius = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {
        // Draw rectangle
        context.beginPath();
        context.arc(
            Number(this.x),
            Number(this.y),
            Number(this.radius),
            0,
            2*Math.PI
        );

        this.renderWithStyles(context);
    }
}

customElements.define("a-circle", Circle);
