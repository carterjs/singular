import { Root } from "./Root";

export abstract class Component extends HTMLElement {
    protected ready = false;
    /**
     * X translation
     */
    get x(): number {
        return this.inherit("x", 0);
    }
    set x(x) {
        this._x = x;
        this.shouldRender();
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
        this.shouldRender();
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
        this.shouldRender();
    }
    _scale?: number;

    /**
     * Rotate
     */
    get rotate(): number {
        return this.inherit("rotate", 0);
    }
    set rotate(rotate) {
        this._rotate = rotate;
        this.shouldRender();
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
        this.shouldRender();
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
        this.shouldRender();
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
            "x",
            "y",
            "scale",
            "rotate",
            "pivotx",
            "pivoty",
            "opacity",
            "smooth",
            "stroke",
            "strokewidth",
            "fill"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "x":
                this.x = Number(newValue);
                break;
            case "y":
                this.y = Number(newValue);
                break;
            case "scale":
                this.scale = Number(newValue);
                break;
            case "rotate":
                this.rotate = Number(newValue);
                break;
            case "pivotx":
                this.pivotX = Number(newValue);
                break;
            case "pivoty":
                this.pivotY = Number(newValue);
                break;
            case "opacity":
                this.opacity = Number(newValue);
                break;
            case "smooth":
                this.smooth = newValue.toLowerCase() == "true";
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

    connectedCallback() {
        this.ready = true;
    }

    /**
     * Inherit a property from parents of a certain type.
     * Works when using getters and setters with an underscored prop
     * @param name the name of the property
     * @param def the default (fallback) value
     * @param type the type to inherit from
     */
    protected inherit<T, K>(name: string, def: T, type = Component): T {
        if((typeof (this as any)["_" + name]) !== "undefined") {
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
     * All children that are ```Component```s
     */
    getChildren(type = Component) {
        return [...this.children].filter((child) => child instanceof type) as any[];
    }

    /**
     * Bubble updates to root
     */
    shouldRender() {
        if(!this.ready) {
            return;
        }
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
    renderWithStyles(context: CanvasRenderingContext2D, body: () => void) {
        // Don't impact context state
        context.save();

        context.transform(this.scale, 0, 0, this.scale, this.x, this.y);


        // context.translate(-10, -10);
        context.translate(this.pivotX, this.pivotY);
        context.rotate(this.rotate * Math.PI / 180);
        context.translate(-this.pivotX, -this.pivotY);
        // context.translate(this.pivotX, this.pivotY);


        body();

        context.globalAlpha = this.opacity;
        context.imageSmoothingEnabled = this.smooth;

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
