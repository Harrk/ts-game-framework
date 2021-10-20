import { Rect } from '../types/rect';
import { RendererInterface } from '../types/renderer/renderer-interface';
import { Vector2 } from '../types/vector2';
import { Scene } from './scene';

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
        if (!this.collision_rect) {
            return false;
        }

        return this.scene.entities
            .filter((ent) => ent.collision_rect &&
                ent !== this &&
                this.collision_rect.overlaps(ent.collision_rect)
            )
            .length > 0;
    }

    test_collision(position: Vector2): boolean {
        const test_rect: Rect = this.collision_rect.clone();
        test_rect.setPosition(position);

        return this.scene.entities
            .filter((ent) => ent.collision_rect &&
                ent !== this &&
                test_rect.overlaps(ent.collision_rect)
            )
            .length > 0;
    }

    move_and_collide(position: Vector2) {
        if (! this.test_collision(this.position.add(position))) {
            this.position = this.position.add(position);
        }
    }

    move_and_slide(position: Vector2) {
        let xVec = this.position.add(new Vector2(position.x , 0));
        if (! this.test_collision(xVec)) {
            this.position = xVec;
        }

        let yVec = this.position.add(new Vector2(0 , position.y));
        if (! this.test_collision(yVec)) {
            this.position = yVec;
        }
    }

    preUpdate() {

    }

    update() {
        // OVeride
    }

    postUpdate() {
        this.updateCollisionMask();
    }

    render(renderer: RendererInterface) {
        // OVeride
    }
}
