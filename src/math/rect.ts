import Vector2 from './vector2.ts';

export default class Rect {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    constructor(x: number = 0, y: number = 0, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setPosition(pos: Vector2): void {
        this.x = pos.x;
        this.y = pos.y;
    }

    overlaps(rect: Rect): boolean {
        return this.right > rect.left &&
            this.left < rect.right &&
            this.bottom > rect.top &&
            this.top < rect.bottom;
    }

    pointCollides(point: Vector2): boolean {
        return point.x > this.left && point.x < this.right &&
            point.y > this.top && point.y < this.bottom;
    }

    clone(): Rect {
        return new Rect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
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
        return this.x + (this.width / 2);
    }

    get centerY(): number {
        return this.y + (this.height / 2);
    }

    get center(): Vector2 {
        return new Vector2(
            this.centerX,
            this.centerY
        );
    }
}
