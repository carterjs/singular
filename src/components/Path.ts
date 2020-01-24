import { VisualComponent } from "../VisualComponent";
import { Point } from "./Point";
import { property } from "../property";

/**
 * A group of points
 */
export class Path extends VisualComponent {
    
    /**
     * The list of points to render
     */
    @property() points: {x: number, y: number}[] = [];

    /**
     * Add a new point to the path and trigger an update
     * 
     * @param x The x value
     * @param y The y value
     */
    addPoint(x: number, y: number) {
        this.points = [...this.points, {x, y}];
    }

    constructor() {
        super();
    }

    render(context: CanvasRenderingContext2D) {

        this.renderWithStyles(context, () => {
            // Draw the path
            context.beginPath();
            this.getChildren(Point).forEach((point, index) => {
                if(index == 0) {
                    // Move to starting position
                    context.moveTo(point.x, point.y);
                } else {
                    // Draw line to point
                    context.lineTo(point.x, point.y);
                }
            });
        });
    }
}

customElements.define("a-path", Path);