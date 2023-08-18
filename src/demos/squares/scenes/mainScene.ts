import { Scene } from "../../../engine/scene";
import { Rect } from "../../../types/rect";
import { Vector2 } from "../../../types/vector2";
import { Player } from "../entities/player";
import { Wall } from "../entities/wall";

export class MainScene extends Scene {
    constructor() {
        super();

        this.addEntity(new Wall(new Vector2(100, 50), new Rect(0, 0, 512, 16)));
        this.addEntity(new Wall(new Vector2(100, 66), new Rect(0, 0, 16, 256)));

        this.addEntity(new Player(new Vector2(200, 200), new Rect(0, 0, 32, 32)));
    }
}