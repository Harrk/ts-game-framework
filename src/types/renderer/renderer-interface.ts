export interface RendererInterface {
    clear(): void;

    drawRect(x: number, y: number, width: number, height: number, colour?: string): void;
}