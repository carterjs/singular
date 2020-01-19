import { render, svg } from "lit-html";
import { Root } from "./Root";

import "./components";
/**
 * A custom element for vector graphics
 */
export class AGraphic extends Root {

    /**
     * A wrapper for the svg or canvas element.
     * This is used so that rendering doesn't overwrite styles
     */
    private contentWrapper: HTMLDivElement;

    constructor() {
        super();

        this.attachShadow({mode: "open"});

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
            <slot></slot>
        `;

        // Wrapper for primary content
        this.contentWrapper = document.createElement("div");
        this.contentWrapper.className = "content";
        this.shadowRoot!.appendChild(this.contentWrapper);
    }

    update() {
        // Sizing
        this.realWidth = this.clientWidth;
        this.realHeight = this.clientHeight;
        super.update();
        render(this.canvas, this.contentWrapper);
    }

    render(context: CanvasRenderingContext2D) {
        console.log("Root render");
        this.context.clearRect(0, 0, this.width, this.height);
        super.render(context);
    }
}

customElements.define("a-graphic", AGraphic);