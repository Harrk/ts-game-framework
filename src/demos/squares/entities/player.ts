import { Entity } from "../../../engine/entity";
import { Input } from "../../../engine/systems/input";
import { Rect } from "../../../types/rect";
import { RendererInterface } from "../../../types/renderer/renderer-interface";
import { Vector2 } from "../../../types/vector2";
import { gameContainer } from "../squares";

export class Player extends Entity {
    speed: number = 2;
    velocity: Vector2 = new Vector2();
    input: Input;

    onReady() {
        this.input = gameContainer.getSystem<Input>("Input");
    }

    update() {
        const move = new Vector2(
            Number(this.input.isKeyPressed('D')) - Number(this.input.isKeyPressed('A')),
            Number(this.input.isKeyPressed('S')) - Number(this.input.isKeyPressed('W'))
        );

        this.velocity = new Vector2(
            move.x * this.speed,
            move.y * this.speed
        );

        this.moveAndSlide(this.velocity);
    }

    render(renderer: RendererInterface) {
        renderer.drawRect(new Rect(
            this.collision_rect.x, this.collision_rect.y, this.collision_rect.width, this.collision_rect.height
        ), 'orange');
    }
}