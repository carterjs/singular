import { VisualComponent } from "../VisualComponent";
import { property } from "../property";

/**
 * A vector rectangle
 */
export class Rectangle extends VisualComponent {

    /**
     * Left x
     */
    @property() x = 0;

    /**
     * Top y
     */
    @property() y = 0;

    /**
     * Rectangle width
     */
    @property() width = 0;

    /**
     * Rectangle height
     */
    @property() height = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "width",
            "height"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x":
            case "y":
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
                this.x,
                this.y,
                this.width,
                this.height
            );
        });
    }
}

customElements.define("a-rectangle", Rectangle);