import Vector2 from './vector2.ts';
import { AABB, ShapeInterface } from "./shape.ts";

export default class Rect implements ShapeInterface<Rect>{
    position : Vector2;
    size : Vector2;

    constructor(x: number = 0, y: number = 0, width: number, height: number) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);
        this._updateAABB();
    }

    //#region collision functions
    collides(shape: Rect): boolean {
        return (
            this.right > shape.left &&
            this.left < shape.right &&
            this.bottom > shape.top &&
            this.top < shape.bottom
        );
    }
    //#endregion

    aabb: AABB;
    _updateAABB(): void {
        this.aabb.x1 = this.left;
        this.aabb.y1 = this.top;
        this.aabb.x2 = this.right;
        this.aabb.y2 = this.bottom;
    }

    setPosition(pos : Vector2) : void {
        this.position = pos;
        this._updateAABB();
    }

    move(delta: Vector2): void {
        this.position = this.position.add(delta);
        this._updateAABB();
    }

    overlaps(rect: Rect): boolean {
        return this.right > rect.left &&
            this.left < rect.right &&
            this.bottom > rect.top &&
            this.top < rect.bottom;
    }

    hasPoint(point: Vector2): boolean {
        return point.x > this.left && point.x < this.right &&
            point.y > this.top && point.y < this.bottom;
    }

    clone(): Rect {
        return new Rect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }

    get width() : number {
        return this.size.x;
    }

    get height() : number {
        return this.size.y;
    }

    get left(): number {
        return this.position.x;
    }

    get right(): number {
        return this.position.x + this.size.x;
    }

    get top(): number {
        return this.position.y;
    }

    get bottom(): number {
        return this.position.y + this.size.y;
    }

    get topLeft(): Vector2 {
        return new Vector2(this.left, this.top);
    }

    get topRight(): Vector2 {
        return new Vector2(this.right, this.top);
    }

    get bottomLeft(): Vector2 {
        return new Vector2(this.left, this.bottom);
    }

    get bottomRight(): Vector2 {
        return new Vector2(this.right, this.bottom);
    }

    get centerX(): number {
        return this.position.x + (this.size.x / 2);
    }

    get centerY(): number {
        return this.position.y + (this.size.y / 2);
    }

    get center(): Vector2 {
        return new Vector2(
            this.centerX,
            this.centerY
        );
    }
}
