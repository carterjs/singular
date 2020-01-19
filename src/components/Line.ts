import { VisibleComponent } from "../VisibleComponent";

/**
 * A vector line
 */
export class Line extends VisibleComponent {

    /**
     * Start point x
     */
    get x1() {
        return this._x1;
    }
    set x1(x1) {
        this._x1 = x1;
        this.shouldRender = true;
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
        this.shouldRender = true;
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
        this.shouldRender = true;
    }
    _x2 = 0;
    
    /**
     * End point y
     */
    get y2() {
        return this._y2;
    }
    set y2(y2) {
        this._y2 = y2;
        this.shouldRender = true;
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

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x1":
            case "y1":
            case "x2":
            case "y2":
                this[name] = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWithStyles(context, () => {
            // Draw line between points
            context.beginPath();
            context.moveTo(this.x1, this.y1);
            context.lineTo(this.x2, this.y2);
        });
    }
}

customElements.define("a-line", Line);