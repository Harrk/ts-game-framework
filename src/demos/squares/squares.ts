import { Entity } from "../../engine/entity";
import { Game } from "../../engine/game";
import { Scene } from "../../engine/scene";
import constants from "../../types/constants";
import { GameConfig } from "../../types/game-config";
import { Rect } from "../../types/rect";
import { RendererInterface } from "../../types/renderer/renderer-interface";

class Square1 extends Entity {
    update() {
        this.position.x++;

        if (this.position.x > 300) {
            this.position.x = 0;
        }
    }

    render(renderer: RendererInterface) {
        renderer.drawRect(new Rect(
            this.position.x, this.position.y, 16, 16
        ), "red");
    }
}

class Square2 extends Entity {
    update() {
        this.position.y++;

        if (this.position.y > 300) {
            this.position.y = 0;
        }
    }

    render(renderer: RendererInterface) {
        renderer.drawRect(new Rect(
            this.position.x, this.position.y, 16, 16
        ), "blue");
    }
}

export default () => {
    // Define the default game configs
    let config = new GameConfig(
        constants.CONTEXT_CANVAS,
        640,
        360
    );

    let testScene = new Scene(true);

    testScene.entities.push(new Square1());
    testScene.entities.push(new Square2());

    // Initalise the game and start the loop
    let game = new Game(config);
    game.scenes.push(testScene);

    game.run();
}
