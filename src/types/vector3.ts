export class Vector3 {
    public static readonly AXIS_X = 0;
    public static readonly AXIS_Y = 1;
    public static readonly AXIS_Z = 2;

    public static readonly ZERO = new Vector3(0, 0, 0);
    public static readonly ONE = new Vector3(1, 1, 1);
    public static readonly UP = new Vector3(0, 1, 0);
    public static readonly DOWN = new Vector3(0, -1, 0);
    public static readonly LEFT = new Vector3(-1, 0, 0);
    public static readonly RIGHT = new Vector3(1, 0, 0);
    public static readonly FORWARD = new Vector3(0, 0, 1);
    public static readonly BACKWARD = new Vector3(0, 0, -1);

    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x : number = 0, y : number = 0, z : number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get length(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    /**
     * Basic equality check for two vector3.
     * @param vector - vector to check equality against.
     * @returns {boolean} Equality of this and vector.
     */
    equals(vector : Vector3) : boolean {
        let diff = this.sub(vector).abs();
        return (
            diff.x < Number.EPSILON && diff.y < Number.EPSILON && diff.z < Number.EPSILON
        );
    }

    /**
     * Creates a new vector3 from this.
     * @returns Copy of vector.
     */
    copy() : Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Adds the x, y, z components of this vector and another.
     * @param vector vector to add to this.
     * @returns Added vector3 of this and vector.
     */
    add(vector : Vector3) : Vector3 {
        return new Vector3(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        );
    }

    /**
     * Subtracts from x, y, z components vector.
     * @param vector vector to subtract from this.
     * @returns Subtracted vector3 of this and vector.
     */
    sub(vector : Vector3) : Vector3 {
        return new Vector3(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z
        );
    }

    /**
     * Multiplies the x, y, z components from this vector to another.
     * @param vector vector to multiply with.
     * @returns Multiplied vector3 of this and vector.
     */
    mult(vector : Vector3) : Vector3 {
        return new Vector3(
            this.x * vector.x,
            this.y * vector.y,
            this.z * vector.z
        );
    }

    /**
     * Divides the x, y, z components from this vector by another.
     * @param vector vector to divide with.
     * @returns Quotient vector3 of this and vector.
     */
    div(vector : Vector3) : Vector3 {
        return new Vector3(
            (vector.x == 0) ? 0 : (this.x / vector.x),
            (vector.y == 0) ? 0 : (this.y / vector.y),
            (vector.z == 0) ? 0 : (this.z / vector.z)
        );
    }

    /**
     * Scales the components of the vector by a scalar.
     * @param scalar
     * @returns Scales vector3.
     */
    scale(scalar : number) : Vector3 {
        return new Vector3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    /**
     * Returns the distance between two vectors.
     * @param vector to vector.
     * @returns distance to vector.
     */
    distance_to(vector : Vector3) : number {
        return this.sub(vector).length;
    }

    /**
     * @returns normalized vector.
     */
    normalize() : Vector3 {
        let m = this.length;
        if (m == 0) return new Vector3();
        return this.scale(1 / m);
    }

    /**
     * Returns the linear interpolation between this and to.
     * @param to vector end point.
     * @param t blend amount. 
     * @returns Vector t amount between this and end point.
     */
    lerp(to : Vector3, t : number) : Vector3 {
        var delta = to.sub(this);
        return this.add(delta.scale(t));
    }

    /**
     * Steps toward destination vector.
     * @param vector vector end point. 
     * @param step maximum step amount.
     * @returns vector stepped towards end point.
     */
    move_towards(vector : Vector3, step : number) : Vector3 {
        var delta = vector.sub(this);
        if (delta.length <= step) return new Vector3(vector.x, vector.y, vector.z);
        return this.add(delta.normalize().scale(step));
    }

    /**
     * Returns cross product of this and given vector.
     * @param vector 
     * @returns Cross product.
     */
    cross(vector : Vector3) : Vector3 {
        return new Vector3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    /**
     * Returns dot product of this and given vector.
     * @param vector 
     * @returns dot product.
     */
    dot(vector : Vector3) : number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    /**
     * Returns the vector with its absolute value as components.
     * @returns vector with absolute components.
     */
    abs() : Vector3 {
        return new Vector3(
            Math.abs(this.x),
            Math.abs(this.y),
            Math.abs(this.z)
        );
    }

    /**
     * Return the vector with its components ceiled.
     * @returns vector with ceiled components.
     */
    ceil() : Vector3 {
        return new Vector3(
            Math.ceil(this.x),
            Math.ceil(this.y),
            Math.ceil(this.z)
        );
    }

    /**
     * Returns the vector with its components floored.
     * @returns vector with floored components.
     */
    floor() : Vector3 {
        return new Vector3(
            Math.floor(this.x),
            Math.floor(this.y),
            Math.floor(this.z)
        );
    }

    /**
     * Returns the vector with its components rounded.
     * @returns vector with rounded components.
     */
    round() : Vector3 {
        return new Vector3(
            Math.round(this.x),
            Math.round(this.y),
            Math.round(this.z)
        );
    }

    /**
     * Returns the sign values of the components.
     * @returns sign values of components.
     */
    sign() : Vector3 {
        return new Vector3(
            Math.sign(this.x),
            Math.sign(this.y),
            Math.sign(this.z)
        );
    }

    /**
     * Snaps the vector to the increments of step vector.
     * @param step 
     * @returns snapped components.
     */
    snapped(step : Vector3) : Vector3 {
        return this.div(step).floor().mult(step);
    }

    /**
     * Returns the directional vector from this to to.
     * @param to destination vector. 
     * @returns directional vector.
     */
    direction_to(to : Vector3) : Vector3 {
        return this.sub(to).normalize();
    }

    /**
     * Inverses values of vector as 1/x
     * @returns inverse of vector.
     */
    inverse() : Vector3 {
        return Vector3.ONE.div(this);
    }

    /**
     * Rotates the vector by phi radians over AXIS constant.
     * @param phi angle in radians.
     * @param axis axis constant.
     * @returns rotated vector.
     */
    rotate(phi : number, axis : number = Vector3.AXIS_Z) : Vector3 {
        phi = phi % Math.PI * 2;
        let cos = Math.cos(phi);
        let sin = Math.sin(phi);
        if (axis == Vector3.AXIS_X){
            return new Vector3(
                this.x,
                this.y * cos - this.z * sin,
                this.y * sin + this.z * cos
            );
        }
        if (axis == Vector3.AXIS_Y){
            return new Vector3(
                this.x * cos + this.z * sin,
                this.y,
                this.z * cos - this.x * sin
            );
        }
        return new Vector3(
            this.x * cos - this.y * sin,
            this.y * cos - this.x * sin,
            this.z
        );
    }

}