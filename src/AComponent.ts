export abstract class AComponent extends HTMLElement {

    protected inherit<T>(name: string, def: T): T {
        if(name in this && !!(this as any)["_" + name]) {
            return (this as any)["_" + name];
        } else {
            if(this.parentElement instanceof AComponent) {
                return this.parentElement.inherit(name, def);
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
     * Render to canvas
     */
    abstract render(context: CanvasRenderingContext2D): void;

    /**
     * Bubble updates to root
     */
    shouldRender() {
        if(this.parentElement instanceof AComponent) {
            this.parentElement.shouldRender();
        }
    }
}
