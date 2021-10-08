import { Vector3 } from './vector3';

export class Vector2 extends Vector3 {
    constructor(x: number = 0, y: number = 0) {
        super(x, y, 0);
    }

    add(vector: Vector2): Vector2 {
        return super.add(vector) as Vector2;
    }
}
