import { Vector2 } from "../types/vector2";

export class Entity {
    position: Vector2;

    constructor() {
        this.position = new Vector2();
    }

    update() {
        this.position.x++;

        if (this.position.x > 360) {
            this.position.x = 0;
        }
    }

    render(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, 10, 10);
    }
}