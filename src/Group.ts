import { VisualComponent } from "./VisualComponent";
import { property } from "./property";

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
     * The width of the virtual space
     */
    @property(100)
    width: any;

    /**
     * The height of the virtual space
     */
    @property(100)
    height: any;

    /**
     * The actual width of the canvas
     */
    @property(0)
    realWidth: any;

    /**
     * The height of the virtual space
     */
    @property(0)
    realHeight: any;

    /**
     * The rendering quality
     */
    @property(window.devicePixelRatio)
    quality: any;

    processes: Process[] = [];

    get group() {
        return this;
    }

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "space",
            "quality"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "space":
                // Split at any divider
                const nums = newValue.split(/[^0-9]+/);

                if(nums.length == 2) {
                    // Two dimensions given - x and y
                    this.width = Number(nums[0]);
                    this.height = Number(nums[1]);
                } else if(nums.length == 1) {
                    // One dimension given - use for both
                    this.width = this.height = Number(nums[0]);
                }
                break;
            case "quality":
                this.quality = Number(newValue);
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

    size() {
        // Scale to use defined unit space
        const unitScale = Math.min(this.realWidth/this.width, this.realHeight/this.height);

        if(unitScale == 0) {
            return;
        }

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
        this.processes = this.processes.filter((process) => {
            return process.body();
        });

        // Re-render
        if(this.shouldRender) {
            this.render(this.context);
            this.shouldRender = false;
        }
        window.requestAnimationFrame(this.update.bind(this));
    }

    render(context: CanvasRenderingContext2D) {
        if(context == this.context) {
            // Render children only on self calls
            context.clearRect(0, 0, this.width, this.height);
            this.getChildren().forEach((component) => {
                component.render(context);
            });
        } else {
            // Simply use saved state for parent calls
            context.drawImage(this.canvas, 0, 0, this.width, this.height);
        }
        
    }
}

customElements.define("a-group", Group);