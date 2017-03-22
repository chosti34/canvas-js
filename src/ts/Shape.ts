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

    // will be override
    public getArea(): number {
        return 0;
    }

    // will be override
    public getPerimeter(): number {
        return 0;
    }
}
