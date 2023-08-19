import Vector2 from "./vector2.ts";

export interface ShapeInterface<T> {
    type : "Rect" | "Line"
    aabb : AABB;
    position : Vector2;

    //internal
    _updateAABB() : void;

    //methods
    clone() : T;
    setPosition(pos : Vector2) : void;
    move(delta : Vector2) : void;
    hasPoint(point : Vector2) : boolean;

    collides(shape : ShapeInterface<any>) : boolean;
}

export class AABB {
    x1 : number = 0;
    y1 : number = 0;
    x2 : number = 0;
    y2 : number = 0;

    constructor(x1: number = 0, y1: number = 0, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x1 = x2;
        this.y2 = y2;
    }

    overlaps(other : AABB) : boolean {
        return this.x2 > other.x1 && this.x1 < other.x2 && this.y2 > other.y1 && this.y1 < other.y2;
    }
}