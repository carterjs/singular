import { Component } from "./Component";

/**
 * A visual component.
 * Visual components can render to the canvas and accept styles
 */
export abstract class VisibleComponent extends Component {
    /**
     * X translation
     */
    get x(): number {
        return this.inherit("x", 0);
    }
    set x(x) {
        this._x = x;
        this.shouldRender = true;
    }
    _x?: number;

    /**
     * Y translation
     */
    get y(): number {
        return this.inherit("y", 0);
    }
    set y(y) {
        this._y = y;
        this.shouldRender = true;
    }
    _y?: number;

    /**
     * Scale
     */
    get scale(): number {
        return this.inherit("scale", 1);
    }
    set scale(scale) {
        this._scale = scale;
        this.shouldRender = true;
    }
    _scale?: number;

    /**
     * Rotation (degrees)
     */
    get rotate(): number {
        return this.inherit("rotate", 0);
    }
    set rotate(rotate) {
        this._rotate = rotate;
        this.shouldRender = true;
    }
    _rotate?: number;

    /**
     * X transform origin
     */
    get pivotX(): number {
        return this.inherit("pivotX", 0);
    }
    set pivotX(pivotX) {
        this._pivotX = pivotX;
        this.shouldRender = true;
    }
    _pivotX?: number;

    /**
     * Y transform origin
     */
    get pivotY(): number {
        return this.inherit("pivotY", 0);
    }
    set pivotY(pivotY) {
        this._pivotY = pivotY;
        this.shouldRender = true;
    }
    _pivotY?: number;

    /**
     * Opacity for component
     */
    get opacity(): number {
        return this.inherit("opacity", 1);
    }
    set opacity(opacity) {
        this._opacity = opacity;
        this.shouldRender = true;
    }
    _opacity?: number;

    /**
     * Property for stroke
     */
    get stroke(): string {
        return this.inherit("stroke", "#000");
    }
    set stroke(stroke) {
        this._stroke = stroke;
        this.shouldRender = true;
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
        this.shouldRender = true;
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
        this.shouldRender = true;
    }
    _fill?: string;

    /**
     * All of the attributes that should be tracked.
     * Make sure to call super's version when extending
     */
    static get observedAttributes(): string[] {
        return [
            "x",
            "y",
            "scale",
            "rotate",
            "pivotx",
            "pivoty",
            "opacity",
            "stroke",
            "strokewidth",
            "fill"
        ];
    }

    /**
     * 
     * @param name Property name
     * @param oldValue Previous value
     * @param newValue New value
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x":
            case "y":
            case "scale":
            case "rotate":
            case "opacity":
                this[name] = Number(newValue);
                break;
            case "pivotx":
                this.pivotX = Number(newValue);
                break;
            case "pivoty":
                this.pivotY = Number(newValue);
                break;
            case "strokewidth":
                this.strokeWidth = Number(newValue);
                break;
            case "stroke":
            case "fill":
                this[name] = newValue;
                break;
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
    renderWithStyles(context: CanvasRenderingContext2D, body: () => void) {
        // Don't impact context state
        context.save();

        // Apply scale and translation transformations
        context.transform(this.scale, 0, 0, this.scale, this.x, this.y);

        // Rotate at pivot
        context.translate(this.pivotX, this.pivotY);
        context.rotate(this.rotate * Math.PI / 180);
        context.translate(-this.pivotX, -this.pivotY);

        // Apply opacity
        context.globalAlpha = this.opacity;

        // Execute nested operations
        body();

        context.globalAlpha = this.opacity;

        // Fill
        if(this.fill != "none") {
            context.fillStyle = this.fill;
            context.fill();
        }
        
        // Stroke
        if(this.stroke != "none") {
            // Apply styles
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeWidth;
            context.stroke();
        }

        // Return to initial state
        context.restore();
    }
}
