import { Root } from "../Root";

/**
 * Group for nesting components
 */
export class Group extends Root {
    constructor() {
        super();
    }

    render(context: CanvasRenderingContext2D) {
        super.render(this.context);
        context.drawImage(this.canvas, 0, 0, this.width, this.height);
    }
}

customElements.define("a-group", Group);