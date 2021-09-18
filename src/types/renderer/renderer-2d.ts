import { Game } from "../../engine/game";
import { Rect } from "../rect";

import { RendererInterface } from "./renderer-interface";

export class Renderer2D implements RendererInterface {
    context: CanvasRenderingContext2D;
    game: Game;

    constructor(
        game: Game,
        context: CanvasRenderingContext2D
    ) {
        this.game = game;
        this.context = context;
    }

    clear(): void {
        this.context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }

    drawRect(rect: Rect, colour: string = "white"): void {
        this.context.fillStyle = colour;
        this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
}