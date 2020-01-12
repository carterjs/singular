import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * Group for nesting components
 */
export class AGroup extends AComponent {

    renderSVG() {
        return svg`
            <g>
                ${this.components.map((component) => component.renderSVG())}
            </g>
        `;
    }

    renderCanvas(context: CanvasRenderingContext2D) {
        this.components.forEach((component) => {
            component.renderCanvas(context);
        });
    }
}

customElements.define("a-group", AGroup);