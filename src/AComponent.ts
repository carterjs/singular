import { render, TemplateResult, html } from "lit-html";

interface Styles {
    stroke: string,
    strokeWidth: number,
    fill: string
};

export abstract class AComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.update();
    }

    getStyles(): Styles {
        const styles = getComputedStyle(this);
        return {
            stroke: styles.getPropertyValue("--stroke") || "#000",
            strokeWidth: Number(styles.getPropertyValue("--stroke-width") || 1),
            fill: styles.getPropertyValue("--fill") || "none"
        };
    }

    attributeChangedCallback() {
        this.update();
    }

    renderEditor() {
        const styles = this.getStyles();
        const changeStyle = (property: string, value: string) => {
            this.style.setProperty(property, value);
            this.update();
        };
        return html`
            <div>
                <h2>Styles</h2>
                <label>
                    Stroke Color
                    <input type="color" .value=${styles.stroke} @change=${(e: any) => changeStyle("--stroke", e.target.value)} />
                </label>
                <label>
                    Stroke Width
                    <input type="number" .value=${styles.strokeWidth} @change=${(e: any) => changeStyle("--stroke-width", e.target.value)} />
                </label>
                <label>
                    Fill Color
                    <input type="color" .value=${styles.fill} @change=${(e: any) => changeStyle("--fill", e.target.value)} />
                </label>
            </div>
        `;
    }

    abstract renderSVG(): SVGElement;
    abstract renderCanvas(): HTMLCanvasElement;

    update() {
        render(this.renderEditor(), this.shadowRoot!);
        if(this.parentElement instanceof AComponent) {
            this.parentElement.update();
        }
    }
}
