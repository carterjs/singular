import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector rectangle
 */
export class ARectangle extends AComponent {

    /**
     * Top left x
     */
    get x() {
        return this._x;    
    }
    set x(x) {
        this._x = x;
        this.shouldRender();
    }
    _x = 0;

    /**
     * Top left y
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
     * Rectangle width
     */
    get width() {
        return this._width;    
    }
    set width(width) {
        this._width = width;
        this.shouldRender();
    }
    _width = 0;

    /**
     * Rectangle height
     */
    get height() {
        return this._height;    
    }
    set height(height) {
        this._height = height;
        this.shouldRender();
    }
    _height = 0;


    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "width",
            "height"
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
            case "width":
                this.width = Number(newValue);
                break;
            case "height":
                this.height = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {
        // Draw rectangle
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        context.stroke();
    }
}

customElements.define("a-rectangle", ARectangle);