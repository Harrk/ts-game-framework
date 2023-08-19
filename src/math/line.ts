import Vector2 from './vector2.ts';

export class Line {
    start : Vector2 = Vector2.ZERO;
    end : Vector2 = Vector2.ZERO;

    constructor(x1 : number = 0, y1 : number = 0, x2 : number = 0, y2 : number = 0) {
        this.start.x = x1;
        this.start.y = y1;
        this.end.x = x2;
        this.end.y = y2;
    }

    clone() : Line {
        return new Line(
            this.start.x,
            this.start.y,
            this.end.x,
            this.end.y
        );
    }

    setStart(pos : Vector2) : void {
        this.start.x = pos.x;
        this.start.y = pos.y;
    }

    setEnd(pos : Vector2) : void {
        this.end.x = pos.x;
        this.end.y = pos.y;
    }

    move(delta : Vector2) : void {
        this.start.add(delta);
        this.end.add(delta);
    }

    get length() : Number {
        return this.start.distance_to(this.end);
    }
}
