import { RendererInterface } from "../types/renderer/renderer-interface";
import { Vector2 } from "../types/vector2";

export abstract class Entity {
    position: Vector2;

    constructor(position: Vector2 = new Vector2()) {
        this.position = position;
    }

    abstract update();

    abstract render(renderer: RendererInterface);
}