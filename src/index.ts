import { AComponent } from "./AComponent";
import { render, html, svg } from "lit-html";

import "./components";

/**
 * A custom element for vector graphics
 */
class AGraphic extends AComponent {

    contentWrapper: HTMLDivElement;
    canvas: HTMLCanvasElement;
    canvasScale = window.devicePixelRatio;

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "type",
            "editor"
        ];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        // Wrapper for primary content
        this.contentWrapper = document.createElement("div");
        this.contentWrapper.className = "content";
        this.shadowRoot!.appendChild(this.contentWrapper);

        // Virtual canvas
        this.canvas = document.createElement("canvas");
    }

    connectedCallback() {
        this.sizeCanvas();
        window.addEventListener("resize", this.sizeCanvas.bind(this));
    }

    disconnectedCallback() {
        window.addEventListener("resize", this.sizeCanvas.bind(this));
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if(name == "type" && newValue == "canvas") {
            this.sizeCanvas();
        }
    }

    sizeCanvas() {
        if(this.hasAttribute("type") && this.getAttribute("type") != "canvas") {
            return;
        }
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.canvas.width = width * this.canvasScale;
        this.canvas.height = height * this.canvasScale;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.getContext("2d")?.scale(this.canvasScale, this.canvasScale);
        this.update();
    }

    renderSVG() {
        return svg`
            <svg>
                ${this.components.map((component) => component.renderSVG())}
            </svg>
        `;
    }

    renderCanvas(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");
        context?.clearRect(0, 0, canvas.width, canvas.height);
        this.components.forEach((component) => {
            component.renderCanvas(canvas);
        });
    }

    update() {
        // Render graphic
        if(this.hasAttribute("type") && this.getAttribute("type") == "canvas") {
            this.renderCanvas(this.canvas);
            render(this.canvas, this.contentWrapper);
        } else {
            render(this.renderSVG(), this.contentWrapper);
        }
    }
}

customElements.define("a-graphic", AGraphic);