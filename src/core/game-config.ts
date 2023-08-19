import constants from './constants.ts';

export default class GameConfig {
    type = constants.CONTEXT_AUTO;
    width = 640;
    height = 480;

    constructor(type = constants.CONTEXT_AUTO, width = 640, height = 480) {
        this.type = type;
        this.width = width;
        this.height = height;
    }
}
