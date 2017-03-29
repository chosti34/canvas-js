import { CCircle } from "./Circle";
import { CRectangle } from "./Rectangle";
import { CShape } from "./Shape";
import { ShapeType } from "./Shape";
import { CTriangle } from "./Triangle";

export class CApplication {
    private canvas: CCanvas;

    private rectangle: CRectangle;
    private triangle: CTriangle;
    private circle: CCircle;

    private colorParametrsElement: HTMLElement;
    private rectangleParametrsElement: HTMLElement;
    private triangleParametrsElement: HTMLElement;
    private circleParametrsElement: HTMLElement;

    private shapeSelectorElement: HTMLInputElement;
    private drawButton: HTMLButtonElement;
    private clearButton: HTMLButtonElement;

    private fillColorElement: HTMLInputElement;
    private outlineColorElement: HTMLInputElement;
    private outlineThicknessElement: HTMLInputElement;

    private xRectangleCoordElement: HTMLInputElement;
    private yRectangleCoordElement: HTMLInputElement;
    private rectangleWidthElement: HTMLInputElement;
    private rectangleHeightElement: HTMLInputElement;

    private xCircleCoordElement: HTMLInputElement;
    private yCircleCoordElement: HTMLInputElement;
    private circleRadiusElement: HTMLInputElement;

    private x1TriangleCoordElement: HTMLInputElement;
    private y1TriangleCoordElement: HTMLInputElement;
    private x2TriangleCoordElement: HTMLInputElement;
    private y2TriangleCoordElement: HTMLInputElement;
    private x3TriangleCoordElement: HTMLInputElement;
    private y3TriangleCoordElement: HTMLInputElement;

    constructor() {
        this.canvas = this.getCanvasById("canvas");

        this.rectangle = new CRectangle(300, 200, 120, 110, "#0ff", "#f00");
        this.triangle = new CTriangle(340, 150, 280, 320, 165, 125, "#f0f", "#09f");
        this.circle = new CCircle(350, 230, 50, "#ff0", "#f00");

        // инициализируем элементы интерфейса
        this.initializeInterfaceElements();
        this.hideAllInterfaceItems();

        // ставим обработчики на элементы интерфейса
        this.setHandlerOnShapeSelector();
        this.setHandlerOnDrawButton();
        this.setHandlerOnClearButton();
        this.setHandlerOnInputChange();
    }

    private getCanvasById(id: string): CCanvas {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(id);
        let context: CanvasRenderingContext2D = canvas.getContext("2d");
        return new CCanvas(context, canvas.width, canvas.height);
    }

    private initializeInterfaceElements(): void {
        this.colorParametrsElement = document.getElementById("colorParams");
        this.rectangleParametrsElement = document.getElementById("rectangleParams");
        this.triangleParametrsElement = document.getElementById("triangleParams");
        this.circleParametrsElement = document.getElementById("circleParams");

        this.shapeSelectorElement = <HTMLInputElement> document.getElementById("shapeSelector");
        this.drawButton = <HTMLButtonElement> document.getElementById("canvasDrawButton");
        this.clearButton = <HTMLButtonElement> document.getElementById("canvasClearButton");

        this.fillColorElement = <HTMLInputElement> document.getElementById("fillColor");
        this.outlineColorElement = <HTMLInputElement> document.getElementById("borderColor");
        this.outlineThicknessElement = <HTMLInputElement> document.getElementById("outlineThickness");

        this.xRectangleCoordElement = <HTMLInputElement> document.getElementById("rectangleX");
        this.yRectangleCoordElement = <HTMLInputElement> document.getElementById("rectangleY");
        this.rectangleWidthElement = <HTMLInputElement> document.getElementById("rectangleWidth");
        this.rectangleHeightElement = <HTMLInputElement> document.getElementById("rectangleHeight");

        this.xCircleCoordElement = <HTMLInputElement> document.getElementById("circleX");
        this.yCircleCoordElement = <HTMLInputElement> document.getElementById("circleY");
        this.circleRadiusElement = <HTMLInputElement> document.getElementById("circleRadius");

        this.x1TriangleCoordElement = <HTMLInputElement> document.getElementById("triangleX1");
        this.y1TriangleCoordElement = <HTMLInputElement> document.getElementById("triangleY1");
        this.x2TriangleCoordElement = <HTMLInputElement> document.getElementById("triangleX2");
        this.y2TriangleCoordElement = <HTMLInputElement> document.getElementById("triangleY2");
        this.x3TriangleCoordElement = <HTMLInputElement> document.getElementById("triangleX3");
        this.y3TriangleCoordElement = <HTMLInputElement> document.getElementById("triangleY3");
    }

    private hideAllInterfaceItems(): void {
        this.colorParametrsElement.style.display = "none";
        this.rectangleParametrsElement.style.display = "none";
        this.triangleParametrsElement.style.display = "none";
        this.circleParametrsElement.style.display = "none";
    }

    private setHandlerOnShapeSelector(): void {
        this.shapeSelectorElement.addEventListener("change", (event: Event) => {
            let selectedShape: string = this.shapeSelectorElement.value;
            switch (selectedShape) {
                case "Rectangle":
                    this.setCanvasPropertiesToInput();
                    this.setRectanglePropertiesToInput();
                    this.getParametrsAndDrawRectangle();
                    this.colorParametrsElement.style.display = "block";
                    this.rectangleParametrsElement.style.display = "block";
                    this.triangleParametrsElement.style.display = "none";
                    this.circleParametrsElement.style.display = "none";
                    break;
                case "Triangle":
                    this.setCanvasPropertiesToInput();
                    this.setTrianglePropertiesToInput();
                    this.getParametrsAndDrawTriangle();
                    this.colorParametrsElement.style.display = "block";
                    this.rectangleParametrsElement.style.display = "none";
                    this.triangleParametrsElement.style.display = "block";
                    this.circleParametrsElement.style.display = "none";
                    break;
                case "Circle":
                    this.setCanvasPropertiesToInput();
                    this.setCirclePropertiesToInput();
                    this.getParametrsAndDrawCircle();
                    this.colorParametrsElement.style.display = "block";
                    this.rectangleParametrsElement.style.display = "none";
                    this.triangleParametrsElement.style.display = "none";
                    this.circleParametrsElement.style.display = "block";
                    break;
                default: // выбран вариант <No shape>
                    this.hideAllInterfaceItems();
                    this.canvas.clear();
                    break;
            }
        });
    }

    private setHandlerOnDrawButton(): void {
        this.drawButton.addEventListener("click", (event: Event) => {
            let selectedShape = this.shapeSelectorElement.value;
            switch (selectedShape) {
                case "Rectangle":
                    this.setCanvasPropertiesToInput();
                    this.setRectanglePropertiesToInput();
                    this.getParametrsAndDrawRectangle();
                    break;
                case "Triangle":
                    this.setCanvasPropertiesToInput();
                    this.setTrianglePropertiesToInput();
                    this.getParametrsAndDrawTriangle();
                    break;
                case "Circle":
                    this.setCanvasPropertiesToInput();
                    this.setCirclePropertiesToInput();
                    this.getParametrsAndDrawCircle();
                    break;
                default: // выбран параметр <No shape>
                    alert("Choose shape");
                    break;
            }
        });
    }

    private setHandlerOnClearButton(): void {
        this.clearButton.addEventListener("click", (event: Event) => {
            this.canvas.clear();
            this.clearInputValues();
        });
    }

    private setHandlerOnInputChange(): void {
        this.fillColorElement.addEventListener("input", (event: Event) => {
            let newFillColor: string = this.fillColorElement.value;
            switch (this.getSelectedShape().getType()) {
                case ShapeType.Rectangle:
                    this.rectangle.setFillColor(newFillColor);
                    this.getParametrsAndDrawRectangle();
                    break;
                case ShapeType.Triangle:
                    this.triangle.setFillColor(newFillColor);
                    this.getParametrsAndDrawTriangle();
                    break;
                case ShapeType.Circle:
                    this.circle.setFillColor(newFillColor);
                    this.getParametrsAndDrawCircle();
                    break;
                default:
                    throw new Error("Unknown shape");
            }
        });

        this.outlineColorElement.addEventListener("input", (event: Event) => {
            let newOutlineColor: string = this.outlineColorElement.value;
            switch (this.getSelectedShape().getType()) {
                case ShapeType.Rectangle:
                    this.rectangle.setOutlineColor(newOutlineColor);
                    this.getParametrsAndDrawRectangle();
                    break;
                case ShapeType.Triangle:
                    this.triangle.setOutlineColor(newOutlineColor);
                    this.getParametrsAndDrawTriangle();
                    break;
                case ShapeType.Circle:
                    this.circle.setOutlineColor(newOutlineColor);
                    this.getParametrsAndDrawCircle();
                    break;
                default:
                    throw new Error("Unknown type");
            }
        });

        this.outlineThicknessElement.addEventListener("input", (event: Event) => {
            let newOutlineThickness: number = parseInt(this.outlineThicknessElement.value, 10);
            this.canvas.setLineWidth(newOutlineThickness);
            switch (this.getSelectedShape().getType()) {
                case ShapeType.Rectangle:
                    this.getParametrsAndDrawRectangle();
                    break;
                case ShapeType.Triangle:
                    this.getParametrsAndDrawTriangle();
                    break;
                case ShapeType.Circle:
                    this.getParametrsAndDrawCircle();
                    break;
                default:
                    throw new Error("Unknown type");
            }
        });

        this.xRectangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawRectangle();
        });

        this.yRectangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawRectangle();
        });

        this.rectangleWidthElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawRectangle();
        });

        this.rectangleHeightElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawRectangle();
        });

        this.xCircleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawCircle();
        });

        this.yCircleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawCircle();
        });

        this.circleRadiusElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawCircle();
        });

        this.x1TriangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawTriangle();
        });

        this.y1TriangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawTriangle();
        });

        this.x2TriangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawTriangle();
        });

        this.y2TriangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawTriangle();
        });

        this.x3TriangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawTriangle();
        });

        this.y3TriangleCoordElement.addEventListener("input", (event: Event) => {
            this.getParametrsAndDrawTriangle();
        });
    }

    private setCanvasPropertiesToInput(): void {
        this.fillColorElement.value = this.getSelectedShape().getFillColor();
        this.outlineColorElement.value = this.getSelectedShape().getOutlineColor();
        this.outlineThicknessElement.value = this.canvas.getLineWidth().toString(10);
    }

    private setRectanglePropertiesToInput(): void {
        this.xRectangleCoordElement.value = this.rectangle.getX().toString(10);
        this.yRectangleCoordElement.value = this.rectangle.getY().toString(10);
        this.rectangleWidthElement.value = this.rectangle.getWidth().toString(10);
        this.rectangleHeightElement.value = this.rectangle.getHeight().toString(10);
    }

    private setTrianglePropertiesToInput(): void {
        this.x1TriangleCoordElement.value = this.triangle.getX1().toString(10);
        this.y1TriangleCoordElement.value = this.triangle.getY1().toString(10);
        this.x2TriangleCoordElement.value = this.triangle.getX2().toString(10);
        this.y2TriangleCoordElement.value = this.triangle.getY2().toString(10);
        this.x3TriangleCoordElement.value = this.triangle.getX3().toString(10);
        this.y3TriangleCoordElement.value = this.triangle.getY3().toString(10);
    }

    private setCirclePropertiesToInput(): void {
        this.xCircleCoordElement.value = this.circle.getX().toString(10);
        this.yCircleCoordElement.value = this.circle.getY().toString(10);
        this.circleRadiusElement.value = this.circle.getRadius().toString(10);
    }

    private clearInputValues(): void {
        this.fillColorElement.value = "";
        this.outlineColorElement.value = "";
        this.outlineThicknessElement.value = "";

        this.xRectangleCoordElement.value = "";
        this.yRectangleCoordElement.value = "";
        this.rectangleWidthElement.value = "";
        this.rectangleHeightElement.value = "";

        this.xCircleCoordElement.value = "";
        this.yCircleCoordElement.value = "";
        this.circleRadiusElement.value = "";

        this.x1TriangleCoordElement.value = "";
        this.y1TriangleCoordElement.value = "";
        this.x2TriangleCoordElement.value = "";
        this.y2TriangleCoordElement.value = "";
        this.x3TriangleCoordElement.value = "";
        this.y3TriangleCoordElement.value = "";
    }

    private getSelectedShape(): CShape {
        let selectedShape: string = this.shapeSelectorElement.value;
        switch (selectedShape) {
            case "Rectangle":
                return this.rectangle;
            case "Triangle":
                return this.triangle;
            case "Circle":
                return this.circle;
            default:
                throw new Error("Unknown shape");
        }
    }

    private setCanvasProperties(): void {
        this.canvas.setFillStyle(this.getSelectedShape().getFillColor());
        this.canvas.setStrokeStyle(this.getSelectedShape().getOutlineColor());
        this.canvas.setLineWidth(parseInt(this.outlineThicknessElement.value, 10));
    }

    private getParametrsAndDrawRectangle(): void {
        this.canvas.clear();
        this.setCanvasProperties();

        this.rectangle.setX(parseInt(this.xRectangleCoordElement.value, 10));
        this.rectangle.setY(parseInt(this.yRectangleCoordElement.value, 10));
        this.rectangle.setWidth(parseInt(this.rectangleWidthElement.value, 10));
        this.rectangle.setHeight(parseInt(this.rectangleHeightElement.value, 10));

        this.canvas.print("Area: " + this.rectangle.getArea().toFixed(2), 460, 430, "#000");
        this.canvas.print("Perimeter: " + this.rectangle.getPerimeter().toFixed(2), 460, 460, "#000");

        this.rectangle.draw(this.canvas);
    }

    private getParametrsAndDrawTriangle(): void {
        this.canvas.clear();
        this.setCanvasProperties();

        this.triangle.setX1(parseInt(this.x1TriangleCoordElement.value, 10));
        this.triangle.setY1(parseInt(this.y1TriangleCoordElement.value, 10));
        this.triangle.setX2(parseInt(this.x2TriangleCoordElement.value, 10));
        this.triangle.setY2(parseInt(this.y2TriangleCoordElement.value, 10));
        this.triangle.setX3(parseInt(this.x3TriangleCoordElement.value, 10));
        this.triangle.setY3(parseInt(this.y3TriangleCoordElement.value, 10));

        this.canvas.print("Area: " + this.triangle.getArea().toFixed(2), 460, 430, "#000");
        this.canvas.print("Perimeter: " + this.triangle.getPerimeter().toFixed(2), 460, 460, "#000");

        this.triangle.draw(this.canvas);
    }

    private getParametrsAndDrawCircle(): void {
        this.canvas.clear();
        this.setCanvasProperties();

        this.circle.setX(parseInt(this.xCircleCoordElement.value, 10));
        this.circle.setY(parseInt(this.yCircleCoordElement.value, 10));
        this.circle.setRadius(parseInt(this.circleRadiusElement.value, 10));

        this.canvas.print("Area: " + this.circle.getArea().toFixed(2), 460, 430, "#000");
        this.canvas.print("Perimeter: " + this.circle.getPerimeter().toFixed(2), 460, 460, "#000");

        this.circle.draw(this.canvas);
    }
}
