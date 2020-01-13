import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector circle
 */
export class ACircle extends AComponent {

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
    _x = 0;

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
    _y = 0;

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
    _radius = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "radius"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "x":
                this.x = Number(newValue);
                break;
            case "y":
                this.y = Number(newValue);
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


        // Apply styles
        if(this.fill != "none") {
            context.fillStyle = this.fill;
            context.fill();
        }
        if(this.stroke != "none") {
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeWidth;
            context.stroke();
        }
    }
}

customElements.define("a-circle", ACircle);
