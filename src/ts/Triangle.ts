class CTriangle extends CShape {
    private static getDistanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    constructor(private x1: number, private y1: number,
                private x2: number, private y2: number,
                private x3: number, private y3: number,
                fillColor: string, outlineColor: string) {
        super(fillColor, outlineColor);
    }

    public setX1(x1: number): void {
        this.x1 = x1;
    }

    public getX1(): number {
        return this.x1;
    }

    public setY1(y1: number): void {
        this.y1 = y1;
    }

    public getY1(): number {
        return this.y1;
    }

    public setX2(x2: number): void {
        this.x2 = x2;
    }

    public getX2(): number {
        return this.x2;
    }

    public setY2(y2: number): void {
        this.y2 = y2;
    }

    public getY2(): number {
        return this.y2;
    }

    public setX3(x3: number): void {
        this.x3 = x3;
    }

    public getX3(): number {
        return this.x3;
    }

    public setY3(y3: number): void {
        this.y3 = y3;
    }

    public getY3(): number {
        return this.y3;
    }

    public getArea(): number {
        return 0.5 * Math.abs((this.x1 - this.x3) * (this.y2 - this.y3) - (this.x2 - this.x3) * (this.y1 - this.y3));
    }

    public getPerimeter(): number {
        return CTriangle.getDistanceBetweenPoints(this.x1, this.y1, this.x2, this.y2) +
               CTriangle.getDistanceBetweenPoints(this.x2, this.y2, this.x3, this.y3) +
               CTriangle.getDistanceBetweenPoints(this.x3, this.y3, this.x1, this.y1);
    }

    public draw(canvas: CCanvas): void {
        canvas.drawTriangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    }

    public getType(): ShapeType {
        return ShapeType.Triangle;
    }
}
