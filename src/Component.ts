import { Root } from "./Root";

export abstract class Component extends HTMLElement {

    protected canvas?: HTMLCanvasElement;

    /**
     * Inherit a property from parents of a certain type.
     * Works when using getters and setters with an underscored prop
     * @param name the name of the property
     * @param def the default (fallback) value
     * @param type the type to inherit from
     */
    protected inherit<T, K>(name: string, def: T, type = Component): T {
        if(name in this && !!(this as any)["_" + name]) {
            return (this as any)["_" + name];
        } else {
            if(this.parentElement instanceof type) {
                return this.parentElement.inherit(name, def, type);
            } else {
                return def;
            }
        }
    }

    /**
     * Opacity for component
     */
    get opacity(): number {
        return this.inherit("opacity", 1);
    }
    set opacity(opacity) {
        this._opacity = opacity;
        this.shouldRender();
    }
    _opacity?: number;

    /**
     * Smoothing for component
     */
    get smooth(): boolean {
        return this.inherit("smooth", true);
    }
    set smooth(smooth) {
        this._smooth = smooth;
        this.shouldRender();
    }
    _smooth?: boolean;

    /**
     * X translation
     */
    get x(): boolean {
        return this.inherit("x", true, Root);
    }
    set x(x) {
        this._x = x;
        this.shouldRender();
    }
    _x?: boolean;

    /**
     * Y translation
     */
    get y(): boolean {
        return this.inherit("y", true, Root);
    }
    set y(y) {
        this._y = y;
        this.shouldRender();
    }
    _y?: boolean;

    /**
     * Property for stroke
     */
    get stroke(): string {
        return this.inherit("stroke", "#000");
    }
    set stroke(stroke) {
        this._stroke = stroke;
        this.shouldRender();
    }
    _stroke?: string;

    /**
     * Property for stroke width
     */
    get strokeWidth(): number {
        return this.inherit("strokeWidth", 1);
    }
    set strokeWidth(strokeWidth) {
        this._strokeWidth = strokeWidth;
        this.shouldRender();
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
        this.shouldRender();
    }
    _fill?: string;

    static get observedAttributes(): string[] {
        return [
            "opacity",
            "smooth",
            "stroke",
            "strokewidth",
            "fill"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "opacity":
                this.opacity = Number(newValue);
                break;
            case "opacity":
                this.smooth = Boolean(newValue);
                break;
            case "stroke":
                this.stroke = newValue;
                break;
            case "strokewidth":
                this.strokeWidth = Number(newValue);
                break;
            case "fill":
                this.fill = newValue;
                break;
        }
    }

    /**
     * All children that are ```Component```s
     */
    getChildren(type = Component) {
        return [...this.children].filter((child) => child instanceof type) as any[];
    }

    /**
     * Bubble updates to root
     */
    shouldRender() {
        if(this.parentElement instanceof Component) {
            this.parentElement.shouldRender();
        }
    }

    /**
     * Render to canvas
     */
    abstract render(context: CanvasRenderingContext2D): void;

    /**
     * 
     * @param context The rendering context to finish up
     */
    renderWithStyles(context: CanvasRenderingContext2D, fill = true, stroke = true) {
        // Don't impact context state
        context.save();

        context.globalAlpha = this.opacity;
        context.imageSmoothingEnabled = this.smooth;

        // Fill
        if(fill && this.fill != "none") {
            context.fillStyle = this.fill;
            context.fill();
        }
        
        // Stroke
        if(stroke && this.stroke != "none") {
            // Apply styles
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeWidth;
            context.stroke();
        }

        // Return to initial state
        context.restore();
    }
}
