import { render, TemplateResult, html, SVGTemplateResult } from "lit-html";

interface Styles {
    stroke: string,
    strokeWidth: number,
    fill: string
};

const defaultStyles = {
    stroke: "#000000",
    strokeWidth: 1,
    fill: "none"
};

export abstract class AComponent extends HTMLElement {

    static get observedAttributes() {
        return [
            "stroke",
            "stroke-width",
            "fill",
            "name"
        ];
    }

    /**
     * All children that are ```AComponent```s
     */
    get components() {
        return [...this.children].filter((child) => child instanceof AComponent) as AComponent[];
    }

    /**
     * Get styles
     * also gets inherited styles
     */
    get styles(): Styles {
        // Store fallback for inheritence
        let next;
        if(this.parentElement instanceof AComponent) {
            // Fallback is parent (recursive)
            next = this.parentElement.styles;
        } else {
            // Fallback is defaults
            next = defaultStyles;
        }
        const styles = {
            stroke: this.getAttribute("stroke") || next.stroke,
            strokeWidth: Number(this.getAttribute("stroke-width")) || Number(next.strokeWidth),
            fill: this.getAttribute("fill") || next.fill,
        }
        return styles;
    }

    /**
     * Perform updates when attributes change
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        this.update();
    }

    /**
     * Render as an SVG
     */
    abstract renderSVG(): SVGTemplateResult;

    /**
     * Apply styles to the canvas
     * @param canvas the canvas element - for backgrounds and resolution
     * @param context the context - for styling
     */
    styleCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): HTMLCanvasElement {
        // Apply styles
        const styles = this.styles;
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

    /**
     * Render to canvas
     */
    abstract renderCanvas(canvas: HTMLCanvasElement): void;

    /**
     * Bubble updates to root
     */
    update() {
        if(this.parentElement instanceof AComponent) {
            this.parentElement.update();
        }
    }
}
