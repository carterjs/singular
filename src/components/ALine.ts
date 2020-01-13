import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector circle
 */
export class ALine extends AComponent {

    /**
     * Start point x
     */
    get x1() {
        return this._x1;
    }
    set x1(x1) {
        this._x1 = x1;
        this.shouldRender();
    }
    _x1 = 0;

    /**
     * Start point y
     */
    get y1() {
        return this._y1;
    }
    set y1(y1) {
        this._y1 = y1;
        this.shouldRender();
    }
    _y1 = 0;

    /**
     * End point x
     */
    get x2() {
        return this._x2;
    }
    set x2(x2) {
        this._x2 = x2;
        this.shouldRender();
    }
    _x2 = 0;
    
    /**
     * End point y
     */
    get y2() {
        return this._x2;
    }
    set y2(y2) {
        this._y2 = y2;
        this.shouldRender();
    }
    _y2 = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x1",
            "y1",
            "x2",
            "y2"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "x1":
                this.x1 = Number(newValue);
                break;
            case "y1":
                this.y1 = Number(newValue);
                break;
            case "x2":
                this.x2 = Number(newValue);
                break;
            case "y2":
                this.y2 = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {

        // Draw rectangle
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);

        // Apply styles
        if(this.stroke != "none") {
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeWidth;
            context.stroke();
        }
    }
}

customElements.define("a-line", ALine);