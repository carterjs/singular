import { VisibleComponent } from "../VisibleComponent";
import { Point } from "./Point";

/**
 * A vector path
 */
export class Path extends VisibleComponent {
    
    get points() {
        return this._points;
    }
    set points(points) {
        this._points = points;
        this.shouldRender = true;
    }
    _points: {x: number, y: number}[] = [];

    addPoint(x: number, y: number) {
        this.points.push({x, y});
        this.shouldRender = true;
    }

    constructor() {
        super();

        // Get all points to start
        this.points = this.getChildren(Point).map((point) => {
            return {x: point.x, y: point.y};
        }) as {x: number, y: number}[];
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWithStyles(context, () => {
            // Draw rectangle
            context.beginPath();
                
            // Draw lines to points
            this.points.forEach((point, index) => {
                if(index == 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            });

            console.log(this.points);
        });
    }
}

customElements.define("a-path", Path);