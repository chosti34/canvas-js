class CCircle extends CShape {
    constructor(private x: number, private y: number, private radius: number, fillColor: string, outlineColor: string) {
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

    public setRadius(radius: number): void {
        this.radius = radius;
    }

    public getRadius(): number {
        return this.radius;
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    public draw(canvas: CCanvas): void {
        canvas.drawCircle(this.x, this.y, this.radius);
    }

    public getType(): ShapeType {
        return ShapeType.Circle;
    }
}
