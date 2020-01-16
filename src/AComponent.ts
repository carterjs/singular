export abstract class AComponent extends HTMLElement {

    protected canvas?: HTMLCanvasElement;

    protected inherit<T, K>(name: string, def: T, type = AComponent): T {
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
            "stroke",
            "strokewidth",
            "fill"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
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
     * All children that are ```AComponent```s
     */
    get components() {
        return [...this.children].filter((child) => child instanceof AComponent) as AComponent[];
    }

    /**
     * Bubble updates to root
     */
    shouldRender(canvas?: HTMLCanvasElement) {
        if(!!this.canvas && this.parentElement instanceof AComponent) {
            this.parentElement.shouldRender(canvas);
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
        if(fill && this.fill != "none") {
            context.fillStyle = this.fill;
            context.fill();
        }
        if(stroke && this.stroke != "none") {
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeWidth;
            context.stroke();
        }
    }
}
