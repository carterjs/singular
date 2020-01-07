import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector circle
 */
export class ACircle extends AComponent {

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "radius"
        ];
    }

    renderSVG() {
        const styles = this.styles;
        return svg`
            <circle 
                cx=${this.getAttribute("x")}
                cy=${this.getAttribute("y")}
                r=${this.getAttribute("radius")}
                stroke=${styles.stroke}
                stroke-width=${styles.strokeWidth}
                fill=${styles.fill}
            />
        `;
    }

    renderCanvas(canvas: HTMLCanvasElement) {
        // Get context
        const context = canvas.getContext("2d");
        if(!context) {
            return canvas;
        }

        // Draw rectangle
        context.beginPath();
        context.arc(
            Number(this.getAttribute("x")),
            Number(this.getAttribute("y")),
            Number(this.getAttribute("radius")),
            0,
            2*Math.PI
        );

        // Apply styles
        this.styleCanvas(canvas, context);
    }
}

customElements.define("a-circle", ACircle);