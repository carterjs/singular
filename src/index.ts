import { AWrapper } from "./AWrapper";
import { render, svg } from "lit-html";

import "./components";

/**
 * A custom element for vector graphics
 */
export class AGraphic extends AWrapper {
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
                canvas {
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

    render(context: CanvasRenderingContext2D) {
        context.scale(2,2);
        context.clearRect(0,0,this.width,this.height);
        this.components.forEach((component) => {
            component.render(context);
        });
    }

    shouldRender() {
        this.render(this.context);
        render(this.canvas, this.contentWrapper);
    }
}

customElements.define("a-graphic", AGraphic);