import { CShape } from "./Shape";
import { ShapeType } from "./Shape";

export class CRectangle extends CShape {
    constructor(private x: number, private y: number,
                private width: number, private height: number,
                fillColor: string, outlineColor: string) {
        super(fillColor, outlineColor);
    }

    public setX(x: number): void {
        this.x = x;
    }

    public getX(): number {
        return this.x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getY(): number {
        return this.y;
    }

    public setWidth(width: number) {
        this.width = width;
    }

    public getWidth(): number {
        return this.width;
    }

    public setHeight(height: number): void {
        this.height = height;
    }

    public getHeight(): number {
        return this.height;
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    public draw(canvas: CCanvas): void {
        canvas.drawRectangle(this.x, this.y, this.width, this.height);
    }

    public getType(): ShapeType {
        return ShapeType.Rectangle;
    }
}
