import { VisualComponent } from "../VisualComponent";

/**
 * A vector rectangle
 */
export class Rectangle extends VisualComponent {
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

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "width":
            case "height":
                this[name] = Number(newValue);
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