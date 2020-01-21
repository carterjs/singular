import { VisualComponent } from "../VisualComponent";
import { animate, ease } from "../animate";
import { property } from "../property";
import { Component } from "../Component";

/**
 * A vector circle
 */
export class Circle extends VisualComponent {

    @animate(10000)
    radius: number = 0;

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
                this.radius!,
                0,
                2*Math.PI
            );
        });
    }
}

customElements.define("a-circle", Circle);
