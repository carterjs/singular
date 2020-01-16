import { AComponent } from "./AComponent";

/**
 * A custom element for vector graphics
 */
export class ARoot extends AComponent {
    /**
     * The canvas.
     * Stored to prevent unnecessary resizing
     */
    protected canvas: HTMLCanvasElement;

    /**
     * The context.
     * Saved for simplicity
     */
    protected context: CanvasRenderingContext2D;

    /**
     * The width of the virtual space
     */
    get width(): number {
        return this.inherit("width", 100, ARoot);
    }
    set width(width) {
        this._width = width;
        this.size();
    }
    _width?: number;

    /**
     * The height of the virtual space
     */
    get height() {
        return this.inherit("height", 100, ARoot);
    }
    set height(height) {
        this._height = height;
        this.size();
    }
    _height?: number;

    /**
     * The actual width of the canvas
     */
    get realWidth() {
        return this.inherit("realWidth", 100, ARoot);
    }
    set realWidth(realWidth) {
        this._realWidth = realWidth;
        this.size();
    }
    _realWidth?: number;

    /**
     * The height of the virtual space
     */
    get realHeight() {
        return this.inherit("realHeight", 100, ARoot);
    }
    set realHeight(realHeight) {
        this._realHeight = realHeight;
        this.size();
    }
    _realHeight?: number;

    get scale() {
        return this.inherit("scale", 1, ARoot);
    }
    set scale(scale) {
        this._scale = scale;
    }
    _scale?: number;

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "space"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "space":
                const nums = newValue.split(/[^0-9]+/);
                if(nums.length == 2) {
                    this.width = Number(nums[0]) || 0;
                    this.height = Number(nums[1]) || 0;
                } else if(nums.length == 1) {
                    this.width = this.height = Number(nums[0]) || 0;
                }
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    constructor() {
        super();
        
        // Canvas
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;
    }

    connectedCallback() {
        this.update();
    }

    size() {
        const unitScale = Math.min(this.realWidth/this.width, this.realHeight/this.height);
        
        // Set resolution
        this.canvas.width = this.width * unitScale * window.devicePixelRatio;
        this.canvas.height = this.height * unitScale * window.devicePixelRatio;

        // Set size
        this.canvas.style.width = Math.round(this.width * unitScale) + "px";
        this.canvas.style.height = Math.round(this.height * unitScale) + "px";

        // Final scaling
        this.scale = window.devicePixelRatio * unitScale;
        this.context.scale(this.scale, this.scale);

        // Re-draw
        this.shouldRender();
    }

    update() {
        // Sizing
        const realWidth = this.clientWidth;
        const realHeight = this.clientHeight;
        if(realWidth != this.realWidth || realHeight != this.realHeight) {
            this.realWidth = realWidth;
            this.realHeight = realHeight;
            this.size();
        }
        window.requestAnimationFrame(this.update.bind(this));
    }

    render(context: CanvasRenderingContext2D) {
        this.components.forEach((component) => {
            component.render(context);
        });        
    }

    shouldRender() {
        this.render(this.context);
        super.shouldRender();
    }
}