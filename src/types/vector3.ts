export class Vector3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector: Vector3): Vector3 {
        return new Vector3(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        );
    }
}
