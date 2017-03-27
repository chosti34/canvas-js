class CCanvas {
    constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) {
        this.initialize();
    }

    public setFillStyle(fillStyle: string): void {
        this.ctx.fillStyle = fillStyle;
    }

    public setStrokeStyle(strokeStyle: string): void {
        this.ctx.strokeStyle = strokeStyle;
    }

    public setLineWidth(lineWidth: number): void {
        this.ctx.lineWidth = lineWidth;
    }

    public getLineWidth(): number {
        return this.ctx.lineWidth;
    }

    public clear(color: string = "#fff"): void {
        let prev = this.ctx.fillStyle;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = prev;
    }

    public drawRectangle(x: number, y: number, width: number, height: number): void {
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.fillRect(x, y, width, height);
    }

    // TODO: refactor this
    public drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    public drawCircle(x: number, y: number, radius: number): void {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    public print(data: string, x: number, y: number, color: string): void {
        let textWidth: number = this.ctx.measureText(data).width;
        let offsetX: number = 20;

        let prev: CanvasGradient | string | CanvasPattern = this.ctx.fillStyle;
        this.ctx.fillStyle = color;
        this.ctx.fillText(data, this.width - textWidth - offsetX, y);
        this.ctx.fillStyle = prev;
    }

    private initialize(): void {
        this.ctx.font = "20px Arial";
        this.ctx.lineWidth = 5;
    }
}
