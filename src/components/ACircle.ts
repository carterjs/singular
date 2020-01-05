import { AComponent } from "../AComponent";
import { html } from "lit-html";

export class ACircle extends AComponent {
    static get observedAttributes() {
        return [
            "x",
            "y",
            "radius"
        ];
    }

    renderEditor() {
        return html`
            <h2>Circle</h2>
            ${super.renderEditor()}
            <div>
                <label>
                    x
                    <input type="number" .value=${this.getAttribute("x")} @change=${(e: any) => this.setAttribute("x", e.target.value.toString())} />
                </label>
                <label>
                    y
                    <input type="number" .value=${this.getAttribute("y")} @change=${(e: any) => this.setAttribute("y", e.target.value.toString())} />
                </label>
                <label>
                    radius
                    <input type="number" .value=${this.getAttribute("radius")} @change=${(e: any) => this.setAttribute("radius", e.target.value.toString())} />
                </label>
            </div>
        `;
    }

    renderSVG() {
        // Create SVG circle
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.getAttribute("x") || "0");
        circle.setAttribute("cy", this.getAttribute("y") || "0");
        circle.setAttribute("r", this.getAttribute("radius") || "0");

        // Style circle
        const styles = this.getStyles();
        circle.setAttribute("stroke", styles.stroke);
        circle.setAttribute("stroke-width", styles.strokeWidth.toString());
        circle.setAttribute("fill", styles.fill);

        return circle;
    }

    renderCanvas() {
        // Create canvas and get context
        const canvas = document.createElement("canvas");
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
        const styles = this.getStyles();
        context.lineWidth = styles.strokeWidth;
        if(styles.fill != "none") {
            context.fillStyle = styles.fill;
            context.fill();
        }
        if(styles.stroke != "none") {
            context.strokeStyle = styles.stroke;
            context.stroke();
        }

        return canvas;
    }
}

customElements.define("a-circle", ACircle);