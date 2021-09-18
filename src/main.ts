import { Entity } from "./engine/entity";
import { Game } from "./engine/game";
import constants from "./types/constants";
import { GameConfig } from "./types/game-config";
import { Vector2 } from "./types/vector2";

// Define the default game configs
let config = new GameConfig(
    constants.CONTEXT_CANVAS,
    640,
    360
);

// Initalise the game and start the loop
let game = new Game(config);

game.entities.push(new Entity(new Vector2(150, 150)));

game.run();