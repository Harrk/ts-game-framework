import constants from "../types/constants";
import { GameConfig } from "../types/game-config";
import { Entity } from "./entity";

export class Game {
    is_running: boolean = false;
    target_fps: number = 60;
    timer;
    canvas: HTMLCanvasElement;
    context;
    entities: Entity[] = [];
    config: GameConfig;

    constructor(config) {
        this.config = config;

        this.createCanvas();
        this.initContext();

        this.entities.push(new Entity());
    }

    private createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('style', `background-color: white; display:block; margin: auto; width: ${ this.config.width };`);
        this.canvas.setAttribute('width', String(this.config.width));
        this.canvas.setAttribute('height', String(this.config.height));

        document.body.appendChild(this.canvas);
    }

    private initContext() {
        if (this.config.type === constants.CONTEXT_AUTO) {
            this.context = this.canvas.getContext('webgl')
                || this.canvas.getContext('experimental-webgl')
                || this.canvas.getContext('2d'); 
        }

        if (this.config.type === constants.CONTEXT_CANVAS) {
            this.context = this.canvas.getContext('2d');
        }

        if (this.config.type === constants.CONTEXT_WEBGL) {
            this.context = this.canvas.getContext('webgl');
        }

        if (this.config.type === constants.CONTEXT_WEBGL2) {
            this.context = this.canvas.getContext('webgl2');
        }

        // throw new Error('Context type not supported.');
    }

    run(): void {
        this.timer = setTimeout(() => {
            this.update();
            this.clear();
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
        this.entities.forEach((ent) => ent.update());
    }

    clear(): void {
        // this.context.clearColor(1.0, 1.0, 0.0, 1.0); // WEBGL
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(): void {
        this.entities.forEach((ent) => ent.render(this.context));
    }
}