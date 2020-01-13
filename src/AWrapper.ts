import { AComponent } from "./AComponent";
import { render } from "lit-html";

export abstract class AWrapper extends AComponent {
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
     * The actual width
     */
    private displayWidth = 0;

    /**
     * The actual height
     */
    private displayHeight = 0;

    /**
     * The width of the virtual space
     */
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        this.shouldRender();
    }
    _width = 100;

    /**
     * The height of the virtual space
     */
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
        this.shouldRender();
    }
    _height = 100;

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "width",
            "height"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "width":
                this.width = Number(newValue);
                break;
            case "height":
                this.height = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
    
    constructor() {
        super();

        // Virtual canvas
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;
    }

    connectedCallback() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    disconnectedCallback() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize() {
        
        const width = this.offsetWidth;
        const height = this.clientHeight;

        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
    }

    render(context: CanvasRenderingContext2D) {
        this.context.clearRect(0,0,this.width,this.height);
        this.components.forEach((component) => {
            component.render(this.context);
        });
        context.drawImage(this.canvas, 0, 0);
    }

    shouldRender() {
        this.render(this.context);
        super.shouldRender();
    }
}