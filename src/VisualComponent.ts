import { Component } from "./Component";
import { property } from "./property";
import { inheritableProperty } from "./inheritableProperty";
import { animate } from "./animate";

/**
 * A visual component.
 * Visual components can render to the canvas and accept styles
 */
export abstract class VisualComponent extends Component {
    /**
     * X translation
     */
    @property x = 0;

    /**
     * Y translation
     */
    @property y = 0;

    /**
     * Scale
     */
    @inheritableProperty(1) scale!: number;

    /**
     * Rotation (degrees)
     */
    @inheritableProperty(0)
    rotate!: number;

    /**
     * X transform origin
     */
    @property pivotX!: number;

    /**
     * Y transform origin
     */
    @property pivotY!: number;

    /**
     * Opacity for component
     */
    @inheritableProperty(1) opacity!: number;


    /**
     * Property for stroke
     */
    @inheritableProperty("#000000") stroke!: string;

    /**
     * Property for stroke width
     */
    @inheritableProperty(1) strokeWidth!: number;

    /**
     * Property for fill
     */
    @inheritableProperty("none") fill!: string;

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
