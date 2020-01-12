import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector rectangle
 */
export class ARectangle extends AComponent {

    x = 0;
    y = 0;
    width = 0;
    height = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "width",
            "height"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "x":
            case "y":
            case "width":
            case "height":
                this[name] = Number(newValue);
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    renderSVG() {
        return svg`
            <rect
                x=${this.x}
                y=${this.y}
                width=${this.width}
                height=${this.height}
                stroke=${this.stroke}
            />
        `;
    }

    renderCanvas(context: CanvasRenderingContext2D) {
        // Draw rectangle
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.styleContext(context);
    }
}

customElements.define("a-rectangle", ARectangle);