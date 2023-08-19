import Vector2 from './vector2.ts';
import Line from './line.ts';
import { AABB, ShapeInterface } from "./shape.ts";
import * as geometry from "./geometry-2d.ts";

export default class Rect implements ShapeInterface<Rect>{
    type : "Rect" = "Rect"
    aabb: AABB;
    position: Vector2 = Vector2.ZERO;
    size: Vector2 = Vector2.ZERO;

    constructor(x: number = 0, y: number = 0, width: number, height: number) {
        this.aabb = new AABB(0, 0, 0, 0);
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);
        this._updateAABB();
    }

    //#region collision functions
    collides(shape : Line) : boolean;
    collides(shape : Rect) : boolean;
    collides(shape : ShapeInterface<any>) : boolean{
        switch (shape.type){
            case "Line":{
                return geometry.collision_line_rect(
                    shape.position.x, shape.position.y, (shape as Line).end.x, (shape as Line).end.y,
                    this.left, this.top, this.right, this.bottom
                );
            }
            case "Rect":{
                return geometry.collision_rect_rect(
                    this.left, this.top, this.right, this.bottom,
                    (shape as Rect).left, (shape as Rect).top, (shape as Rect).right, (shape as Rect).bottom
                );
            }
            default:{
                throw new Error(`Collision type <${this.type},${shape.type}> unimplemented`);
            }
        }
    }
    //#endregion

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
