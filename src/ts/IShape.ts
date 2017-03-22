interface IShape {
    setFillColor(fillColor: string): void;
    getFillColor(): string;

    setOutlineColor(outlineColor: string): void;
    getOutlineColor(): string;

    getArea(): number;
    getPerimeter(): number;
}
