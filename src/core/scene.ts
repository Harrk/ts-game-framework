import RendererInterface from '../renderer/renderer-interface.ts';
import Entity from './entity.ts';

export default class Scene {
    is_running: boolean = true;
    entities: Entity[] = [];

    constructor() {
    }

    start() {
        this.is_running = false;
    }

    pause() {
        this.is_running = false;
    }

    update() {
        this.entities.forEach((ent) => ent.preUpdate());
        this.entities.forEach((ent) => ent.update());
        this.entities.forEach((ent) => ent.postUpdate());
    }

    render(renderer: RendererInterface) {
        this.entities.forEach((ent) => ent.render(renderer));
    }

    addEntity(entity: Entity) {
        entity.scene = this;
        this.entities.push(entity);

        entity.onReady();
    }
}
