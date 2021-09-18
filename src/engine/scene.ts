import { RendererInterface } from "../types/renderer/renderer-interface";
import { Entity } from "./entity";

export class Scene {
    is_running: boolean = false;
    entities: Entity[] = [];

    constructor(is_running: boolean = false) {
        this.is_running = is_running;
    }
    
    start() {
        this.is_running = false;
    }

    pause() {
        this.is_running = false;
    }

    update() {
        this.entities.forEach((ent) => ent.update());
    }

    render(renderer: RendererInterface) {
        this.entities.forEach((ent) => ent.render(renderer));
    }
}