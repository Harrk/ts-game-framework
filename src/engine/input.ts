import { Game } from "./game";

export const KeyCode = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 89,
};

export class Input {
    game: Game;
    keys_pressed: string[] = [];
    keys_up: string[] = [];
    keys_down: string[] = [];

    handlers = {
        keyUp: null,
        keyDown: null,
        keyPressed: null,
    };

    constructor(game: Game) {
        this.game = game;

        // Define callbacks for the events in a way that retains `this` scope
        this.handlers.keyUp = (event: KeyboardEvent) => { this.handleKeyUp(event); };
        this.handlers.keyDown = (event: KeyboardEvent) => { this.handleKeyDown(event); };
        this.handlers.keyPressed = (event: KeyboardEvent) => { this.handleKeyPressed(event); };

        window.addEventListener("keyup", this.handlers.keyUp, false);
        window.addEventListener("keydown", this.handlers.keyDown, false);
        window.addEventListener("keypress", this.handlers.keyPressed, false);
    }

    destroy() {
        // Destruct event listeners
        window.removeEventListener("keyup", this.handlers.keyUp);
        window.removeEventListener("keydown", this.handlers.keyDown);
        window.removeEventListener("keypress", this.handlers.keyPressed);
    }

    update() {
        this.keys_up = [];
    }

    handleKeyUp(input_event: KeyboardEvent) {
        if (! this.isKeyUp(input_event.key)) {
            this.keys_up.push(input_event.key.toLowerCase());
            this.keys_pressed.splice(this.keys_pressed.findIndex((k) => k === input_event.key.toLowerCase()), 1);
        }
    }

    handleKeyDown(input_event: KeyboardEvent) {
        if (! this.isKeyDown(input_event.key)) {
            this.keys_down.push(input_event.key.toLowerCase());
        }
    }

    handleKeyPressed(input_event: KeyboardEvent) {
        if (! this.isKeyPressed(input_event.key)) {
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