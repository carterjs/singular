import { AComponent } from "./AComponent";
import { render, svg } from "lit-html";

import "./components";

type method = "svg" | "canvas";

/**
 * A custom element for vector graphics
 */
export class AGraphic extends AComponent {

    /**
     * The rendering method
     */
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
        this.update();
    }
    _type: method = "svg";

    /**
     * The width of the virtual space
     */
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        this.update();
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
        this.update();
    }
    _height = 100;


    /**
     * A wrapper for the svg or canvas element.
     * This is used so that rendering doesn't overwrite styles
     */
    private contentWrapper: HTMLDivElement;

    /**
     * The canvas.
     * Stored to prevent unnecessary resizing
     */
    private canvas: HTMLCanvasElement;

    /**
     * The context.
     * Saved for simplicity
     */
    private context: CanvasRenderingContext2D;

    /**
     * The actual width
     */
    private displayWidth = 100;

    /**
     * The actual height
     */
    private displayHeight = 100;

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "type",
            "width",
            "height"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log(name);
        switch(name) {
            case "type":
                this.type = newValue;
                break;
            case "width":
            case "height":
                this[name] = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    overflow: hidden;
                    width: ${this.width}px;
                    height: ${this.height}px;
                }
                .content {
                    width: 100%;
                    height: 100%;
                }
                canvas, svg {
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            </style>
            <slot></slot>
        `;  

        // Wrapper for primary content
        this.contentWrapper = document.createElement("div");
        this.contentWrapper.className = "content";
        this.shadowRoot!.appendChild(this.contentWrapper);

        // Virtual canvas
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;
    }

    /**
     * After the component has mounted.
     * Size canvas and add global event listener
     */
    connectedCallback() {
        this.sizeCanvas();
        window.addEventListener("resize", this.sizeCanvas.bind(this));
    }

    /**
     * Remove global event listener
     */
    disconnectedCallback() {
        window.addEventListener("resize", this.sizeCanvas.bind(this));
    }

    sizeCanvas() {
        // Get scale for canvas units. Fit to screen
        let unitScale = Math.min(this.clientWidth / this.width, this.clientHeight / this.height);

        // Get actual size in pixels
        this.displayWidth = this.width * unitScale;
        this.displayHeight = this.height * unitScale;

        // Set canvas resolution
        this.canvas.width = this.displayWidth * window.devicePixelRatio;
        this.canvas.height = this.displayHeight * window.devicePixelRatio;

        // Set canvas size
        this.canvas.style.width = this.displayWidth + "px";
        this.canvas.style.height = this.displayHeight + "px";

        // Apply the scale
        this.canvas.getContext("2d")?.scale(window.devicePixelRatio * unitScale, window.devicePixelRatio * unitScale);
    
        this.update();
    }

    renderSVG() {
        return svg`
            <svg viewBox=${`0 0 ${this.width} ${this.height}`} width=${this.displayWidth} height=${this.displayHeight}>
                ${this.components.map((component) => component.renderSVG())}
            </svg>
        `;
    }

    renderCanvas(context: CanvasRenderingContext2D) {
        this.components.forEach((component) => {
            component.renderCanvas(context);
        });
    }

    update() {
        // Render graphic
        if(this.type == "canvas") {
            this.context.clearRect(0, 0, this.width, this.height);
            this.renderCanvas(this.context);
            render(this.canvas, this.contentWrapper);
        } else {
            render(this.renderSVG(), this.contentWrapper);
        }
    }
}

customElements.define("a-graphic", AGraphic);