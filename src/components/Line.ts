import { VisualComponent } from "../VisualComponent";
import { property } from "../property";

/**
 * A vector line
 */
export class Line extends VisualComponent {

    /**
     * Start point x
     */
    @property() x1 = 0;

    /**
     * Start point y
     */
    @property() y1 = 0;

    /**
     * End point x
     */
    @property() x2 = 0;
    
    /**
     * End point y
     */
    @property() y2 = 0;

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