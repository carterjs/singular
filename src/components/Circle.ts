import { VisualComponent } from "../VisualComponent";
import { property } from "../property";

/**
 * A vector circle
 */
export class Circle extends VisualComponent {

    @property(0, true)
    radius?: number;

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
