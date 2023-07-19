import { Game } from '../../engine/game';
import constants from '../../types/constants';
import { GameConfig } from '../../types/game-config';
import { MainScene } from './scenes/mainScene';

// Define the default game configs
const config = new GameConfig(
    constants.CONTEXT_WEBGL2,
    640,
    360
);

// Initalise the game and start the loop
const gameContainer = new Game(config);

export { gameContainer };

export default () => {
    const mainScene = new MainScene();
    gameContainer.scenes.push(mainScene);

    gameContainer.run();
};
