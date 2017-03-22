class CCircle extends CShape {
    constructor(private x: number, private y: number, private radius: number, fillColor: string, outlineColor: string) {
        super(fillColor, outlineColor);
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}
