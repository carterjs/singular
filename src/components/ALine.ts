import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector circle
 */
export class ALine extends AComponent {

    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x1",
            "y1",
            "x2",
            "y2"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
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

    constructor() {
        super();
    }

    renderSVG() {
        return svg`
            <line 
                x1=${this.x1}
                y1=${this.y1}
                x2=${this.x2}
                y2=${this.y2}
                stroke=${this.stroke}
                stroke-width=${this.strokeWidth}
                fill=${this.fill}
            />
        `;
    }

    renderCanvas(context: CanvasRenderingContext2D) {

        // Draw rectangle
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);

        // Apply styles
        this.styleContext(context);
    }
}

customElements.define("a-line", ALine);