import { Component } from "./Component";
import { property } from "./property";

/**
 * A visual component.
 * Visual components can render to the canvas and accept styles
 */
export abstract class VisualComponent extends Component {
    /**
     * X translation
     */
    @property(0) x: any;

    /**
     * Y translation
     */
    @property(0)
    y: any;

    /**
     * Scale
     */
    @property(1)
    scale: any;

    /**
     * Rotation (degrees)
     */
    @property(0)
    rotate: any;

    /**
     * X transform origin
     */
    @property(0)
    pivotX: any;

    /**
     * Y transform origin
     */
    @property(0)
    pivotY : any;

    /**
     * Opacity for component
     */
    @property(1)
    opacity: any;


    /**
     * Property for stroke
     */
    @property("#000000")
    stroke: any;

    /**
     * Property for stroke width
     */
    @property(1)
    strokeWidth: any;

    /**
     * Property for fill
     */
    @property("none")
    fill: any;

    /**
     * All of the attributes that should be tracked.
     * Make sure to call super's version when extending
     */
    static get observedAttributes(): string[] {
        return [
            "x",
            "y",
            "scale",
            "rotate",
            "pivotx",
            "pivoty",
            "opacity",
            "stroke",
            "strokewidth",
            "fill"
        ];
    }

    /**
     * 
     * @param name Property name
     * @param oldValue Previous value
     * @param newValue New value
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x":
            case "y":
            case "scale":
            case "rotate":
            case "opacity":
                this[name] = Number(newValue);
                break;
            case "pivotx":
                this.pivotX = Number(newValue);
                break;
            case "pivoty":
                this.pivotY = Number(newValue);
                break;
            case "strokewidth":
                this.strokeWidth = Number(newValue);
                break;
            case "stroke":
            case "fill":
                this[name] = newValue;
                break;
        }
    }

    /**
     * Render to canvas
     */
    abstract render(context: CanvasRenderingContext2D): void;

    /**
     * 
     * @param context The rendering context to finish up
     */
    renderWithStyles(context: CanvasRenderingContext2D, body: () => void) {
        // Don't impact context state
        context.save();

        // Apply scale and translation transformation
        context.transform(this.scale, 0, 0, this.scale, this.x, this.y);

        // Rotate at pivot
        context.translate(this.pivotX, this.pivotY);
        context.rotate(this.rotate * Math.PI / 180);
        context.translate(-this.pivotX, -this.pivotY);

        // Apply opacity
        context.globalAlpha = this.opacity;

        // Execute nested operations
        body();

        context.globalAlpha = this.opacity;

        // Fill
        if(this.fill != "none") {
            context.fillStyle = this.fill;
            context.fill();
        }
        
        // Stroke
        if(this.stroke != "none") {
            // Apply styles
            context.strokeStyle = this.stroke;
            context.lineWidth = this.strokeWidth;
            context.stroke();
        }

        // Return to initial state
        context.restore();
    }
}
