import Vector2 from "./vector2.ts";
import Rect from "./rect.ts"
import {AABB, ShapeInterface} from "./shape.ts";
import * as geometry from "./geometry-2d.ts";

export default class Line implements ShapeInterface<Line>{
    type: "Line" = "Line";
    aabb: AABB;
    position: Vector2;
    end: Vector2;

    /** @alias position */
    get start() : Vector2 {return this.position;}
    set start(value : Vector2){this.position = value;}

    constructor(x1 : number = 0, y1 : number = 0, x2 : number = 0, y2 : number = 0) {
        this.position = new Vector2(x1, y1);
        this.end = new Vector2(x2, y2);
        this.aabb = new AABB(0, 0, 0, 0);
        this._updateAABB();
    }

    collides(shape : Line) : boolean;
    collides(shape : Rect) : boolean;
    collides(shape : ShapeInterface<any>) : boolean{
        switch (shape.type){
            case "Line":{
                return geometry.collision_line_line(
                    this.position.x, this.position.y, this.end.x, this.end.y,
                    shape.position.x, shape.position.y, (shape as Line).end.x, (shape as Line).end.y
                );
            }
            case "Rect":{
                return geometry.collision_line_rect(
                    this.position.x, this.position.y, this.end.x, this.end.y,
                    (shape as Rect).left, (shape as Rect).top, (shape as Rect).right, (shape as Rect).bottom
                );
            }
            default:{
                throw new Error(`Collision type <${this.type},${shape.type}> unimplemented`);
            }
        }
    }

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