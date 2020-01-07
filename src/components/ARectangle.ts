import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector rectangle
 */
export class ARectangle extends AComponent {

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "width",
            "height"
        ];
    }

    renderSVG() {
        const styles = this.styles;
        return svg`
            <rect
                x=${this.getAttribute("x")}
                y=${this.getAttribute("y")}
                width=${this.getAttribute("width")}
                height=${this.getAttribute("height")}
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
        context.rect(
            Number(this.getAttribute("x")),
            Number(this.getAttribute("y")),
            Number(this.getAttribute("width")),
            Number(this.getAttribute("height"))
        );

        this.styleCanvas(canvas, context);
    }
}

customElements.define("a-rectangle", ARectangle);