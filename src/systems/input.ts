import SystemInterface from "./systemInterface.ts";

export default class Input implements SystemInterface {
    keys_pressed: string[] = [];
    keys_up: string[] = [];
    keys_down: string[] = [];
    name: string = "Input";

    handlers = {
        keyUp: null,
        keyDown: null,
        keyPressed: null
    };

    constructor() {
        // Define callbacks for the events in a way that retains `this` scope
        this.handlers.keyUp = (event: KeyboardEvent) => { this.handleKeyUp(event); };
        this.handlers.keyDown = (event: KeyboardEvent) => { this.handleKeyDown(event); };
        this.handlers.keyPressed = (event: KeyboardEvent) => { this.handleKeyPressed(event); };

        window.addEventListener('keyup', this.handlers.keyUp, false);
        window.addEventListener('keydown', this.handlers.keyDown, false);
        window.addEventListener('keypress', this.handlers.keyPressed, false);
    }

    update(): void {
        this.keys_up = [];
    }

    postUpdate(): void {
        
    }

    destroy() {
        // Destruct event listeners
        window.removeEventListener('keyup', this.handlers.keyUp);
        window.removeEventListener('keydown', this.handlers.keyDown);
        window.removeEventListener('keypress', this.handlers.keyPressed);
    }

    handleKeyUp(input_event: KeyboardEvent) {
        if (!this.isKeyUp(input_event.key)) {
            this.keys_up.push(input_event.key.toLowerCase());
            this.keys_pressed.splice(this.keys_pressed.findIndex((k) => k === input_event.key.toLowerCase()), 1);
        }
    }

    handleKeyDown(input_event: KeyboardEvent) {
        if (!this.isKeyDown(input_event.key)) {
            this.keys_down.push(input_event.key.toLowerCase());
        }
    }

    handleKeyPressed(input_event: KeyboardEvent) {
        if (!this.isKeyPressed(input_event.key)) {
            this.keys_pressed.push(input_event.key.toLowerCase());
        }
    }

    isKeyDown(key: string) {
        return undefined !== this.keys_down.find((k) => key.toLowerCase() === k);
    }

    isKeyUp(key: string) {
        return undefined !== this.keys_up.find((k) => key.toLowerCase() === k);
    }

    isKeyPressed(key: string) {
        return undefined !== this.keys_pressed.find((k) => key.toLowerCase() === k);
    }
}