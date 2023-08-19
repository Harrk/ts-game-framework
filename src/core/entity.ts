import Rect from '../math/rect.ts';
import RendererInterface from '../renderer/renderer-interface.ts';
import Vector2 from '../math/vector2.ts';
import Scene from './scene.ts';

export default abstract class Entity {
    position: Vector2;
    collision_rect: Rect;
    scene: Scene;

    constructor(position: Vector2 = new Vector2(), collision_rect: Rect = null) {
        this.position = position;
        this.collision_rect = collision_rect;
    }

    onReady() {

    }

    updateCollisionMask() {
        if (this.collision_rect) {
            this.collision_rect.setPosition(this.position);
        }
    }

    get is_colliding(): boolean {
        if (!this.collision_rect) {
            return false;
        }

        return this.scene.entities
            .filter((ent) => ent.collision_rect &&
                ent !== this &&
                this.collision_rect.overlaps(ent.collision_rect)
            ).length > 0;
    }

    testCollision(position: Vector2): boolean {
        const test_rect: Rect = this.collision_rect.clone();
        test_rect.setPosition(position);

        return this.scene.entities
            .filter((ent) => ent.collision_rect &&
                ent !== this &&
                test_rect.overlaps(ent.collision_rect)
            ).length > 0;
    }

    moveAndCollide(position: Vector2) {
        if (! this.testCollision(this.position.add(position))) {
            this.position = this.position.add(position);
        }
    }

    moveAndSlide(position: Vector2) {
        let xVec = this.position.add(new Vector2(position.x , 0));
        if (! this.testCollision(xVec)) {
            this.position = xVec;
        }

        let yVec = this.position.add(new Vector2(0 , position.y));
        if (! this.testCollision(yVec)) {
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

    render(_renderer: RendererInterface) {
        // OVeride
    }
}
