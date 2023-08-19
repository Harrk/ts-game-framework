import Vector2 from "./vector2.ts";
import {AABB, ShapeInterface} from "./shape.ts";

export default class Line implements ShapeInterface<Line>{
    position : Vector2;
    end : Vector2 = Vector2.ZERO;

    /** @alias position */
    get start() : Vector2 {return this.position;}
    set start(value : Vector2){this.position = value;}

    constructor(x1 : number = 0, y1 : number = 0, x2 : number = 0, y2 : number = 0) {
        this.start.x = x1;
        this.start.y = y1;
        this.end.x = x2;
        this.end.y = y2;
    }

    //#region collision functions
    collides(shape: Line): boolean {
        let a = ((shape.end.x - shape.position.x) * (this.position.y - shape.position.y) - (shape.end.y - shape.position.y) * (this.position.x - shape.position.x)) / ((shape.end.y - shape.position.y) * (this.end.x - this.position.x) - (shape.end.x - shape.position.x) * (this.end.y - this.position.y));
        let b = ((this.end.x - this.position.x) * (this.position.y - shape.position.y) - (this.end.y - this.position.y) * (this.position.x - shape.position.x)) / ((shape.end.y - shape.position.y) * (this.end.x - this.position.x) - (shape.end.x - shape.position.x) * (this.end.y - this.position.y));
        return (a >= 0 && a <= 1 && b >= 0 && b <= 1);
    }
    //#endregion

    aabb: AABB;
    _updateAABB(): void {
        this.aabb.x1 = Math.min(this.position.x, this.end.x);
        this.aabb.y1 = Math.min(this.position.y, this.end.y);
        this.aabb.x2 = Math.max(this.position.x, this.end.x);
        this.aabb.y2 = Math.max(this.position.y, this.end.y);
    }

    setPosition(pos: Vector2): void {
        let d : Vector2 = this.end.sub(this.position);
        this.position = pos;
        this.end = this.position.add(d);
        this._updateAABB();
    }

    hasPoint(point: Vector2): boolean {
        let l = this.length;
        let l1 = point.sub(this.position).length;
        let l2 = point.sub(this.end).length;
        return l == (l1 + l2);
    }
    
    clone() : Line {
        return new Line(
            this.position.x,
            this.position.y,
            this.end.x,
            this.end.y
        );
    }

    setStart(pos : Vector2) : void {
        this.start.x = pos.x;
        this.start.y = pos.y;
        this._updateAABB();
    }


    setEnd(pos : Vector2) : void {
        this.end.x = pos.x;
        this.end.y = pos.y;
        this._updateAABB();
    }

    move(delta : Vector2) : void {
        this.position = this.start.add(delta);
        this.end = this.end.add(delta);
        this._updateAABB();
    }

    get length() : Number {
        return this.start.distance_to(this.end);
    }
}