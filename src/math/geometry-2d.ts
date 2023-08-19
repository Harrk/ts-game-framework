
export function collision_line_line(
    x1 : number,
    y1 : number,
    x2 : number,
    y2 : number,

    x3 : number,
    y3 : number,
    x4 : number,
    y4 : number
    ){
        let a = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        let b = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        return (a >= 0 && a <= 1 && b >= 0 && b <= 1);
}

export function collision_rect_rect(
    x1 : number,
    y1 : number,
    x2 : number,
    y2 : number,

    x3 : number,
    y3 : number,
    x4 : number,
    y4 : number,
    ){
        return (
            x2 > x3 &&
            x1 < x4 &&
            y2 > y3 &&
            y1 < y4
        );
}

export function collision_line_rect(
    x1 : number,
    y1 : number,
    x2 : number,
    y2 : number,

    x3 : number,
    y3 : number,
    x4 : number,
    y4 : number,
    ){
        return (
            collision_line_line(x1, y1, x2, y2,  x3, y3, x4, y3) ||
            collision_line_line(x1, y1, x2, y2,  x3, y4, x4, y4) ||
            collision_line_line(x1, y1, x2, y2,  x4, y3, x4, y4) ||
            collision_line_line(x1, y1, x2, y2,  x3, y3, x3, y4)
        );
}