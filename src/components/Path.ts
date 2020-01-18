import { Component } from "../Component";
import { Point } from "./Point";

/**
 * A vector path
 */
export class Path extends Component {
    
    get points() {
        return this._points;
    }
    set points(points) {
        this._points = points;
        this.shouldRender();
    }
    _points: {x: number, y: number}[] = [];

    addPoint(x: number, y: number) {
        this.points.push({x, y});
        this.shouldRender();
    }

    constructor() {
        super();

        this.points = this.getChildren(Point).map((point) => {
            return {x: point.x, y: point.y};
        }) as {x: number, y: number}[];
    }

    render(context: CanvasRenderingContext2D) {
        // Draw rectangle
        context.beginPath();
    
        this.points.forEach((point, index) => {
            if(index == 0) {
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
            }
        });

        this.renderWithStyles(context, false);
    }
}

customElements.define("a-path", Path);