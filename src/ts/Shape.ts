enum ShapeType {
    Rectangle,
    Triangle,
    Circle,
}

abstract class CShape implements IShape {
    constructor(protected fillColor: string, protected outlineColor: string) {
    }

    public setFillColor(fillColor: string): void {
        this.fillColor = fillColor;
    }

    public getFillColor(): string {
        return this.fillColor;
    }

    public setOutlineColor(outlineColor: string): void {
        this.outlineColor = outlineColor;
    }

    public getOutlineColor(): string {
        return this.outlineColor;
    }

    public abstract getArea(): number;
    public abstract getPerimeter(): number;

    public abstract draw(canvas: CCanvas): void;

    public abstract getType(): ShapeType;
}
