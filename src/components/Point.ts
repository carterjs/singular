import { Component } from "../Component";

/**
 * A vector point
 */
export class Point extends Component {
    render(context: CanvasRenderingContext2D) {
        // Do nothing
    }
}

customElements.define("a-point", Point);
