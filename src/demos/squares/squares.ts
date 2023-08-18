import { Game } from '../../core/game';
import constants from '../../types/constants';
import { GameConfig } from '../../types/game-config';
import { MainScene } from './scenes/main-scene';

// Define the default game configs
const config = new GameConfig(
    constants.CONTEXT_CANVAS,
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
