import { VisualComponent } from "./VisualComponent";
import { property, inherit } from "./property";

export interface Process {
    name: string,
    body: () => boolean
}

/**
 * A wrapper for components
 */
export class Group extends VisualComponent {
    /**
     * The canvas.
     * Stored to prevent unnecessary resizing
     */
    protected canvas: HTMLCanvasElement;

    /**
     * The context.
     * Saved for simplicity
     */
    protected context: CanvasRenderingContext2D;

    /**
     * Translation X
     */
    @property() x: number = 0;

    /**
     * Translation Y
     */
    @property() y: number = 0;

    /**
     * The width of the virtual space
     */
    @property(inherit(100)) width!: number;

    /**
     * The height of the virtual space
     */
    @property(inherit(100)) height!: number;

    /**
     * The actual width of the canvas
     */
    @property(inherit(100)) realWidth!: number;

    /**
     * The height of the virtual space
     */
    @property(inherit(100)) realHeight!: number;

    /**
     * The rendering quality
     */
    @property(inherit(window.devicePixelRatio)) quality!: number;

    private processes: {[key: string]: () => boolean} = {};

    group = this;

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "space",
            "quality"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "space":
                // Split at any divider
                const nums = newValue.split(/[^0-9]+/);

                // Interpret
                if(nums.length == 2) {
                    // Two dimensions given - x and y
                    this.width = Number(nums[0]);
                    this.height = Number(nums[1]);
                } else if(nums.length == 1) {
                    // One dimension given - use for both
                    this.width = this.height = Number(nums[0]);
                }
                break;
            case "x":
            case "y":
            case "quality":
                this[name] = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    constructor() {
        super();
        
        // Canvas
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;
    }

    connectedCallback() {
        this.update();
    }

    run(key: string, process: () => boolean) {
        // console.info(`"${key}" has started.`);
        this.processes[key] = process;
    }

    size() {
        // Scale to use defined unit space
        const unitScale = Math.min(this.realWidth/this.width, this.realHeight/this.height);

        // Set resolution
        const width = Math.round(this.width * unitScale * this.quality);
        const height = Math.round(this.height * unitScale * this.quality);

        // Only continue if canvas width has changed
        if(width != this.canvas.width || height != this.canvas.height) {
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            return;
        }

        // Set size
        this.canvas.style.width = Math.round(this.width * unitScale) + "px";
        this.canvas.style.height = Math.round(this.height * unitScale) + "px";

        // Final scaling
        const scale = this.quality * unitScale;
        this.context.scale(scale, scale);

        // Re-draw
        this.shouldRender = true;
    }

    /**
     * Animation frame loop for triggering changes
     */
    update() {
        // Update sizing
        this.size();

        // Run processes and filter
        Object.keys(this.processes).forEach((key) => {
            if(!this.processes[key]()) {
                // console.info(key, "has finished");
                delete this.processes[key];
            } 
        });

        // Re-render
        if(this.shouldRender) {
            this.render(this.context);
            this.shouldRender = false;
        }
        window.requestAnimationFrame(this.update.bind(this));
    }

    render(context: CanvasRenderingContext2D) {
        this.context.clearRect(0, 0, this.width, this.height);

        // Render children with styles
        this.getChildren().forEach((component) => {
            this.renderWithStyles(this.context, () => {
                component.render(this.context);
            });
        });

        // Apply opacity to image
        context.save();
        context.globalAlpha = this.opacity;
        context.drawImage(this.canvas, 0, 0, this.width, this.height);
        context.restore();
    }

    renderWithStyles(context: CanvasRenderingContext2D, body: () => void) {
        // Don't impact context state
        context.save();

        // Translate
        context.translate(this.x, this.y);

        // Rotate and scale at pivot
        context.translate(this.pivotX, this.pivotY);
        context.scale(this.scale, this.scale);
        context.rotate(this.rotate * Math.PI / 180);
        context.translate(-this.pivotX, -this.pivotY);

        // Execute nested operations
        body();

        // Return to initial state
        context.restore();
    }
}

customElements.define("a-group", Group);