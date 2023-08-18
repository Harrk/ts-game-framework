import { GameConfig } from '../types/game-config';
import { Scene } from './scene';
import { Input } from '../systems/input';
import { Renderer } from '../systems/renderer';
import { SystemInterface } from '../systems/systemInterface';

export class Game {
    target_fps: number = 100;
    timer: number;
    config: GameConfig;
    scenes: Scene[] = [];
    systems: SystemInterface[] = [];

    constructor(config: GameConfig) {
        this.config = config;

        this.addSystem(new Renderer(this));
        this.addSystem(new Input());
    }

    public addSystem(system: SystemInterface) {
        this.systems.push(system);
    }

    public getSystem<T extends SystemInterface>(system: String): T {
        return this.systems.find((sys) => {
            return sys.name === system
        }) as T;
    }

    run(): void {
        this.timer = setTimeout(() => {
            this.update();
            requestAnimationFrame(() => this.run());
        }, 1000 / this.target_fps);
    }

    stop(): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    update(): void {
        // Update systems
        this.systems.forEach((sys) => sys.update())
        this.systems.forEach((sys) => sys.postUpdate())
    }
}
