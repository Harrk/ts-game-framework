import { Rect } from "../types/rect";
import { RendererInterface } from "../types/renderer/renderer-interface";
import { Vector2 } from "../types/vector2";
import { Scene } from "./scene";

export abstract class Entity {
    position: Vector2;
    collision_rect: Rect;
    scene: Scene;

    constructor(position: Vector2 = new Vector2(), collision_rect: Rect = null) {
        this.position = position;
        this.collision_rect = collision_rect;
    }

    updateCollisionMask() {
        if (this.collision_rect) {
            this.collision_rect.setPosition(this.position);
        }
    }

    get isColliding(): boolean {
        if (! this.collision_rect) {
            return false;
        }

        return this.scene.entities
            .filter((ent) => ent.collision_rect 
                && ent !== this
                && this.collision_rect.overlaps(ent.collision_rect)
            )
            .length > 0;
    }

    test_collision(position: Vector2): boolean {
        let test_rect: Rect = this.collision_rect.clone();
        test_rect.setPosition(position);

        return this.scene.entities
            .filter((ent) => ent.collision_rect 
                && ent !== this
                && test_rect.overlaps(ent.collision_rect)
            )
            .length > 0;
    }

    preUpdate() {

    }

    abstract update();

    postUpdate() {
        this.updateCollisionMask();
    }

    abstract render(renderer: RendererInterface);
}