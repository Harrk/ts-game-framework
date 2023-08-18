
export interface SystemInterface {
    name: string;

    update(): void;
    postUpdate(): void;
    destroy(): void;
}