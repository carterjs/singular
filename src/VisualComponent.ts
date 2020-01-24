import { Component } from "./Component";
import { property, inherit } from "./property";

/**
 * A visual component.
 * Visual components can render to the canvas and accept styles
 */
export abstract class VisualComponent extends Component {
    /**
     * Scale
     */
    @property() scale!: number;

    /**
     * Rotation (degrees)
     */
    @property() rotate!: number;

    /**
     * X transform origin
     */
    @property() pivotX = 0;

    /**
     * Y transform origin
     */
    @property() pivotY = 0;

    /**
     * Opacity for component
     */
    @property() opacity = 1;

    /**
     * Property for stroke
     */
    @property(inherit("#000000")) stroke!: string;

    /**
     * Property for stroke width
     */
    @property(inherit(1)) strokeWidth!: number;

    /**
     * Property for fill
     */
    @property(inherit("none")) fill!: string;

    /**
     * All of the attributes that should be tracked.
     * Make sure to call super's version when extending
     */
    static get observedAttributes(): string[] {
        return [
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

        // Rotate and scale at pivot
        context.translate(this.pivotX, this.pivotY);
        context.scale(this.scale, this.scale);
        context.rotate(this.rotate * Math.PI / 180);
        context.translate(-this.pivotX, -this.pivotY);

        // Apply opacity
        context.globalAlpha = this.opacity;

        // Execute nested operations
        body();

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

    transition(propName: string, newValue: number, duration: number) {
        // Make sure there's a group
        const group = this.group;
        if(!group) {
            return;
        }

        // Animate transition
        const oldValue = (this as any)[propName];
        const startTime = Date.now();
        const diff = newValue - oldValue;
        group.run(`transition of "${propName}" on ${this.tagName}`, () => {
            (this as any)[propName] = oldValue + ease((Date.now() - startTime)/duration) * diff;
            if(Date.now() < startTime + duration) {
                return true;
            } else {
                (this as any)[propName] = newValue;
                return false;
            }
        });
    }
}

function ease(x: number): number {
    return x<.5 ? 4*x*x*x : (x-1)*(2*x-2)*(2*x-2)+1;
}
