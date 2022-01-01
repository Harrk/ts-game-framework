import { Entity } from "../../../engine/entity";
import { Rect } from "../../../types/rect";
import { RendererInterface } from "../../../types/renderer/renderer-interface";

export class Wall extends Entity { 
    render(renderer: RendererInterface) {
        renderer.drawRect(new Rect(
            this.position.x, this.position.y, this.collision_rect.width, this.collision_rect.height
        ), 'gray');
    }
}