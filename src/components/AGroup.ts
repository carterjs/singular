import { AWrapper } from "../AWrapper";

/**
 * Group for nesting components
 */
export class AGroup extends AWrapper {
    constructor() {
        super();
    }
}

customElements.define("a-group", AGroup);