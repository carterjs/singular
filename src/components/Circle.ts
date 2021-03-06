import { VisualComponent } from "../VisualComponent";

/**
 * A vector circle
 */
export class Circle extends VisualComponent {

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
    _radius?: number;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "radius"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "radius":
                this.radius = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWithStyles(context, () => {
            // Draw at 0 - translation handles positioning
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
