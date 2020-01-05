import { AComponent } from "./AComponent";
import { render, html, svg } from "lit-html";

import "./components";

/**
 * A custom element for vector graphics
 */
class AGraphic extends AComponent {

    graphic?: Element;

    static get observedAttributes() {
        return [
            "type",
            "editor"
        ];
    }

    /**
     * All children that are ```AComponent```s
     */
    get components() {
        return [...this.children].filter((child) => child instanceof AComponent) as AComponent[];
    }

    renderEditor() {
        return html`
            ${this.hasAttribute("editor") && this.getAttribute("editor") != "false" ? html`<slot></slot>` : ""}
            ${this.graphic}
        `;
    }

    renderSVG() {
        const root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.components.forEach((component) => {
            root.appendChild(component.renderSVG());
        });
        return root;
    }

    renderCanvas() {
        const root = document.createElement("canvas");
        const context = root.getContext("2d");
        this.components.forEach((component) => {
            context?.drawImage(component.renderCanvas(),0,0);
        });
        return root;
    }

    render() {
        // Only render once ready
        if(!this.shadowRoot) {
            return;
        }

        // React to type
        let root;
        if(this.getAttribute("type") == "svg") {
            root = this.renderSVG();
        } else {
            root = this.renderCanvas();
        }

        this.graphic = root;
    }

    update() {
        this.render();
        super.update();
        // this.shadowRoot!.innerHTML = this.graphic!.innerHTML;
    }
}

customElements.define("a-graphic", AGraphic);