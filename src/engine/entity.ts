import { RendererInterface } from "../types/renderer/renderer-interface";
import { Vector2 } from "../types/vector2";

export class Entity {
    position: Vector2;

    constructor(position: Vector2 = new Vector2()) {
        this.position = position;
    }

    update() {
        this.position.x++;

        if (this.position.x > 360) {
            this.position.x = 0;
        }
    }

    render(renderer: RendererInterface) {
        renderer.drawRect(this.position.x, this.position.y, 16, 16, "red");
    }
}