import { render, TemplateResult, html, SVGTemplateResult } from "lit-html";
import { AGraphic } from ".";

export abstract class AComponent extends HTMLElement {

 
    private inherit(name: string, defaultValue: any) {
        const local = "_" + name;
        if(local in this && !!(this as any)[local]) {
            return (this as any)[local];
        } else {
            if(this.parentElement instanceof AComponent) {
                return (this.parentElement as any)[local];
            } else {
                return defaultValue;
            }
        }
    }

    /**
     * Property for stroke
     */
    get stroke(): string {
        return this.inherit("stroke", "#000");
    }
    set stroke(stroke) {
        this._stroke = stroke;
        this.update();
    }
    _stroke?: string;

    /**
     * Property for stroke width
     */
    get strokeWidth(): number {
        // return this.inherit("strokeWidth", 1);
        return this._strokeWidth || (this.parentElement instanceof AComponent ? this.parentElement.strokeWidth : 1);
    }
    set strokeWidth(strokeWidth) {
        this._strokeWidth = strokeWidth;
        this.update();
    }
    _strokeWidth?: number;

    /**
     * Property for fill
     */
    get fill(): string {
        return this.inherit("fill", "none");
    }
    set fill(fill) {
        this._fill = fill;
        this.update();
    }
    _fill?: string;

    static get observedAttributes(): string[] {
        return [
            "stroke",
            "strokewidth",
            "fill"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "stroke":
                this._stroke = newValue;
                break;
            case "strokewidth":
                this._strokeWidth = Number(newValue);
                break;
            case "fill":
                this._fill = newValue;
                break;
        }
        this.update();
    }

    /**
     * All children that are ```AComponent```s
     */
    get components() {
        return [...this.children].filter((child) => child instanceof AComponent) as AComponent[];
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
    styleContext(context: CanvasRenderingContext2D): void {
        // Apply styles
        context.lineWidth = this.strokeWidth;

        if(this.fill != "none") {
            context.fillStyle = this.fill;
            context.fill();
        }
        if(this.stroke != "none") {
            context.strokeStyle = this.stroke;
            context.stroke();
        }
    }

    /**
     * Render to canvas
     */
    abstract renderCanvas(context: CanvasRenderingContext2D): void;

    /**
     * Bubble updates to root
     */
    update() {
        if(this.parentElement instanceof AComponent) {
            this.parentElement.update();
        }
    }
}
