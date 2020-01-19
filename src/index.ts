import { Group } from "./Group";
import { render } from "lit-html";

// Register components
import "./components";

/**
 * A custom element for vector graphics
 */
export class AGraphic extends Group {
    /**
     * A wrapper for the svg or canvas element.
     * This is used so that rendering doesn't overwrite styles
     */
    private contentWrapper: HTMLDivElement;

    constructor() {
        super();

        // Attach the shadow root
        this.attachShadow({mode: "open"});

        // Apply styles
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    margin: 0;
                    display: block;
                    width: ${this.width}px;
                    height: ${this.height}px;
                    position: relative;
                    overflow: hidden;
                }
                .content {
                    margin: 0;
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                canvas {
                    transition: all 250ms ease-in-out;
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            </style>
        `;

        // Add wrapper for primary content
        this.contentWrapper = document.createElement("div");
        this.contentWrapper.className = "content";
        this.shadowRoot!.appendChild(this.contentWrapper);
    }

    update() {
        // Resize dimensions to match element size
        this.realWidth = this.clientWidth;
        this.realHeight = this.clientHeight;

        // Trigger general update
        super.update();

        // Render canvas to DOM
        render(this.canvas, this.contentWrapper);
    }
}

customElements.define("a-graphic", AGraphic);