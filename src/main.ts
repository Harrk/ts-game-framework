import { Game } from "./engine/game";
import constants from "./types/constants";
import { GameConfig } from "./types/game-config";

// Define the default game configs
let config = new GameConfig(
    constants.CONTEXT_CANVAS,
    640,
    360
);

// Initalise the game and start the loop
let game = new Game(config);

game.run();