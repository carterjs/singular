import { AComponent } from "../AComponent";
import { render, html } from "lit-html";

export class ARectangle extends AComponent {
    static get observedAttributes() {
        return [
            "x",
            "y",
            "width",
            "height"
        ];
    }

    renderEditor() {
        return html`
            <h2>Rectangle</h2>
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
                    width
                    <input type="number" .value=${this.getAttribute("width")} @change=${(e: any) => this.setAttribute("width", e.target.value.toString())} />
                </label>
                <label>
                    height
                    <input type="number" .value=${this.getAttribute("height")} @change=${(e: any) => this.setAttribute("height", e.target.value.toString())} />
                </label>
            </div>
        `;
    }

    renderSVG() {
        // Create SVG rect
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", this.getAttribute("x") || "0");
        rect.setAttribute("y", this.getAttribute("y") || "0");
        rect.setAttribute("width", this.getAttribute("width") || "0");
        rect.setAttribute("height", this.getAttribute("height") || "0");

        // Style rect
        const styles = this.getStyles();
        rect.setAttribute("stroke", styles.stroke);
        rect.setAttribute("stroke-width", styles.strokeWidth.toString());
        rect.setAttribute("fill", styles.fill);

        return rect;
    }

    renderCanvas() {
        // Create canvas and get context
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if(!context) {
            return canvas;
        }
        context.imageSmoothingEnabled = false;

        // Draw rectangle
        context.beginPath();
        context.rect(
            Number(this.getAttribute("x")),
            Number(this.getAttribute("y")),
            Number(this.getAttribute("width")),
            Number(this.getAttribute("height"))
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

customElements.define("a-rectangle", ARectangle);