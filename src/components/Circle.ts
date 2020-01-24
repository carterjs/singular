import { VisualComponent } from "../VisualComponent";
import { property } from "../property";

/**
 * A vector circle
 */
export class Circle extends VisualComponent {

    /**
     * Center X
     */
    @property() x = 0;

    /**
     * Center Y
     */
    @property() y = 0;

    /**
     * Radius
     */
    @property() radius = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "radius"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x":
            case "y":
            case "radius":
                this[name] = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWithStyles(context, () => {
            context.beginPath();
            context.arc(
                this.x,
                this.y,
                this.radius,
                0,
                2*Math.PI
            );
        });
    }
}

customElements.define("a-circle", Circle);
