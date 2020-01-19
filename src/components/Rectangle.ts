import { Component } from "../Component";

/**
 * A vector rectangle
 */
export class Rectangle extends Component {
    /**
     * Rectangle width
     */
    get width() {
        return this._width;    
    }
    set width(width) {
        this._width = width;
        this.shouldRender = true;
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
        this.shouldRender = true;
    }
    _height = 0;


    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "width",
            "height"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
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
        this.renderWithStyles(context, () => {
            // Draw rectangle
            context.beginPath();
            context.rect(
                0,
                0,
                this.width,
                this.height
            );
        });
    }
}

customElements.define("a-rectangle", Rectangle);