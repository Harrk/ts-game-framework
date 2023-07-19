import { Rect } from '../types/rect';

export interface RendererInterface {
    clear(): void;

    drawRect(rect: Rect, colour?: string): void;
}
