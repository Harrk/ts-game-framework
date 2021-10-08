import constants from '../types/constants';
import { GameConfig } from '../types/game-config';
import { Renderer2D } from '../types/renderer/renderer-2d';
import { RendererInterface } from '../types/renderer/renderer-interface';
import { Input } from './input';
import { Scene } from './scene';

export class Game {
    is_running: boolean = false;
    target_fps: number = 60;
    timer: number;
    canvas: HTMLCanvasElement;
    renderer: RendererInterface;
    config: GameConfig;
    scenes: Scene[] = [];
    input: Input;

    constructor(config: GameConfig) {
        this.config = config;

        this.createCanvas();

        // Boots
        this.bootRenderer();
        this.bootInput();
    }

    private createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('style', 'background-color: white;');
        this.canvas.setAttribute('width', String(this.config.width));
        this.canvas.setAttribute('height', String(this.config.height));

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
    private bootRenderer() {
        if (this.config.type === constants.CONTEXT_AUTO) {
            // Todo: Not yet supported
            // if (this.canvas.getContext('webgl')) {
            //     this.renderer = new Renderer2D(this, this.canvas.getContext('webgl'));
            // }

            // if (this.canvas.getContext('experimental-webgl')) {
            //     this.renderer = new Renderer2D(this, this.canvas.getContext('experimental-webg'));
            // }

            if (this.canvas.getContext('2d')) {
                this.renderer = new Renderer2D(this, this.canvas.getContext('2d'));
            }
        }

        if (this.config.type === constants.CONTEXT_CANVAS) {
            this.renderer = new Renderer2D(this, this.canvas.getContext('2d'));
        }

        if (this.config.type === constants.CONTEXT_WEBGL) {
            // Todo: Not yet supported
            // this.renderer = new Renderer2D(this, this.canvas.getContext('webgl'));
        }

        if (this.config.type === constants.CONTEXT_WEBGL2) {
            // Todo: Not yet supported
            // this.renderer = new Renderer2D(this, this.canvas.getContext('webgl2'));
        }

        if (!this.renderer) {
            throw new Error('Renderer not supported');
        }
    }

    private bootInput() {
        this.input = new Input(this);
    }

    run(): void {
        this.timer = setTimeout(() => {
            this.update();
            this.render();
            requestAnimationFrame(() => this.run());
        }, 1000 / this.target_fps);
    }

    stop(): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    update(): void {
        // Update systems first
        this.input.update();

        // Update scenes and their entities
        this.scenes
            .filter((scene) => scene.is_running)
            .forEach((scene) => scene.update());
    }

    render(): void {
        this.renderer.clear();

        this.scenes
            .filter((scene) => scene.is_running)
            .forEach((scene) => scene.render(this.renderer));
    }
}
