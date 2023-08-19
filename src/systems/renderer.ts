import Renderer2D from "../renderer/renderer-2d.ts";
import RendererInterface from "../renderer/renderer-interface.ts";
import SystemInterface from "./systemInterface.ts";
import constants from '../core/constants.ts';
import Game from "../core/game.ts";
import RendererWebGl from "../renderer/renderer-webgl.ts";

export default class Renderer implements SystemInterface {
    canvas: HTMLCanvasElement;
    renderer: RendererInterface;
    game: Game;
    name: string = "Renderer";

    constructor(game: Game) {
        this.game = game;

        this.createCanvas();
        this.createRenderer();
    }

    private createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('style', 'background-color: white;');
        this.canvas.setAttribute('width', String(this.game.config.width));
        this.canvas.setAttribute('height', String(this.game.config.height));

        document.body.appendChild(this.canvas);

        const textFallback = document.createElement('p');
        textFallback.textContent = 'Your browser does not support HTMl5 canvas.';

        this.canvas.appendChild(textFallback);
    }

    /**
     * Boot up a renderer based on the given config.
     *
     * AUTO: Will attempt to use webgl before falling over on 2d
     * WEBGL: Use the webgl renderer
     * WEBGL2: Use the webgl2 renderer
     * 2D: Use the 2d renderer
     */
     private createRenderer() {
        if (this.game.config.type === constants.CONTEXT_AUTO) {
            // Todo: Not yet supported
            // if (this.canvas.getContext('webgl')) {
            //     this.renderer = new Renderer2D(this.canvas.getContext('webgl'));
            // }

            // if (this.canvas.getContext('experimental-webgl')) {
            //     this.renderer = new Renderer2D(this.canvas.getContext('experimental-webg'));
            // }

            if (this.canvas.getContext('2d')) {
                this.renderer = new Renderer2D(this.canvas.getContext('2d'));
            }
        }

        if (this.game.config.type === constants.CONTEXT_CANVAS) {
            this.renderer = new Renderer2D(this.canvas.getContext('2d'));
        }

        if (this.game.config.type === constants.CONTEXT_WEBGL) {
            // Todo: Not yet supported
            // this.renderer = new Renderer2D(this.canvas.getContext('webgl'));
        }

        if (this.game.config.type === constants.CONTEXT_WEBGL2) {
            this.renderer = new RendererWebGl(this.canvas.getContext('webgl2'));
        }

        if (! this.renderer) {
            throw new Error('Renderer not supported');
        }
    }

    update(): void {
        // Update scenes and their entities
        this.game.scenes
            .filter((scene) => scene.is_running)
            .forEach((scene) => scene.update());
    }

    postUpdate(): void {
        this.renderer.clear();

        this.game.scenes
            .filter((scene) => scene.is_running)
            .forEach((scene) => scene.render(this.renderer));
    }

    destroy(): void {
        // todo
    }
}