import { Component } from "../Component";

/**
 * A vector circle
 */
export class Circle extends Component {

    /**
     * Circle radius
     */
    get radius() {
        return this._radius;
    }
    set radius(radius) {
        this._radius = radius;
        this.shouldRender = true;
    }
    _radius: number;

    constructor(x = 0, y = 0, radius = 0) {
        super();
        this._radius = radius;
    }

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "radius"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "radius":
                this.radius = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWithStyles(context, () => {
            // Draw rectangle
            context.beginPath();
            context.arc(
                0,
                0,
                Number(this.radius),
                0,
                2*Math.PI
            );
        });
    }
}

customElements.define("a-circle", Circle);
