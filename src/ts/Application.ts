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

    private colorParametersElement: HTMLElement;
    private rectangleParametersElement: HTMLElement;
    private triangleParametersElement: HTMLElement;
    private circleParametersElement: HTMLElement;

    private shapeSelectorElement: HTMLInputElement;
    private drawButton: HTMLButtonElement;
    private clearButton: HTMLButtonElement;

    private fillColorElement: HTMLInputElement;
    private outlineColorElement: HTMLInputElement;
    private outlineThicknessElement: HTMLInputElement;

    private xRectangleCoordinateElement: HTMLInputElement;
    private yRectangleCoordinateElement: HTMLInputElement;
    private rectangleWidthElement: HTMLInputElement;
    private rectangleHeightElement: HTMLInputElement;

    private xCircleCoordinateElement: HTMLInputElement;
    private yCircleCoordinateElement: HTMLInputElement;
    private circleRadiusElement: HTMLInputElement;

    private x1TriangleCoordinateElement: HTMLInputElement;
    private y1TriangleCoordinateElement: HTMLInputElement;
    private x2TriangleCoordinateElement: HTMLInputElement;
    private y2TriangleCoordinateElement: HTMLInputElement;
    private x3TriangleCoordinateElement: HTMLInputElement;
    private y3TriangleCoordinateElement: HTMLInputElement;

    constructor() {
        this.canvas = this.getCanvasById("canvas");

        this.rectangle = new CRectangle(300, 200, 120, 110, "#0ff", "#f00");
        this.triangle = new CTriangle(340, 150, 280, 320, 165, 125, "#f0f", "#09f");
        this.circle = new CCircle(350, 230, 50, "#ff0", "#f00");

        // interface elements init
        this.initializeInterfaceElements();
        this.hideAllInterfaceItems();

        // add handlers to interface elements
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
        this.colorParametersElement = document.getElementById("colorParams");
        this.rectangleParametersElement = document.getElementById("rectangleParams");
        this.triangleParametersElement = document.getElementById("triangleParams");
        this.circleParametersElement = document.getElementById("circleParams");

        this.shapeSelectorElement = <HTMLInputElement> document.getElementById("shapeSelector");
        this.drawButton = <HTMLButtonElement> document.getElementById("canvasDrawButton");
        this.clearButton = <HTMLButtonElement> document.getElementById("canvasClearButton");

        this.fillColorElement = <HTMLInputElement> document.getElementById("fillColor");
        this.outlineColorElement = <HTMLInputElement> document.getElementById("borderColor");
        this.outlineThicknessElement = <HTMLInputElement> document.getElementById("outlineThickness");

        this.xRectangleCoordinateElement = <HTMLInputElement> document.getElementById("rectangleX");
        this.yRectangleCoordinateElement = <HTMLInputElement> document.getElementById("rectangleY");
        this.rectangleWidthElement = <HTMLInputElement> document.getElementById("rectangleWidth");
        this.rectangleHeightElement = <HTMLInputElement> document.getElementById("rectangleHeight");

        this.xCircleCoordinateElement = <HTMLInputElement> document.getElementById("circleX");
        this.yCircleCoordinateElement = <HTMLInputElement> document.getElementById("circleY");
        this.circleRadiusElement = <HTMLInputElement> document.getElementById("circleRadius");

        this.x1TriangleCoordinateElement = <HTMLInputElement> document.getElementById("triangleX1");
        this.y1TriangleCoordinateElement = <HTMLInputElement> document.getElementById("triangleY1");
        this.x2TriangleCoordinateElement = <HTMLInputElement> document.getElementById("triangleX2");
        this.y2TriangleCoordinateElement = <HTMLInputElement> document.getElementById("triangleY2");
        this.x3TriangleCoordinateElement = <HTMLInputElement> document.getElementById("triangleX3");
        this.y3TriangleCoordinateElement = <HTMLInputElement> document.getElementById("triangleY3");
    }

    private hideAllInterfaceItems(): void {
        this.colorParametersElement.style.display = "none";
        this.rectangleParametersElement.style.display = "none";
        this.triangleParametersElement.style.display = "none";
        this.circleParametersElement.style.display = "none";
    }

    private setHandlerOnShapeSelector(): void {
        this.shapeSelectorElement.addEventListener("change", (event: Event) => {
            let selectedShape: string = this.shapeSelectorElement.value;
            switch (selectedShape) {
                case "Rectangle":
                    this.setCanvasPropertiesToInput();
                    this.setRectanglePropertiesToInput();
                    this.getParametersAndDrawRectangle();
                    this.colorParametersElement.style.display = "block";
                    this.rectangleParametersElement.style.display = "block";
                    this.triangleParametersElement.style.display = "none";
                    this.circleParametersElement.style.display = "none";
                    break;
                case "Triangle":
                    this.setCanvasPropertiesToInput();
                    this.setTrianglePropertiesToInput();
                    this.getParametersAndDrawTriangle();
                    this.colorParametersElement.style.display = "block";
                    this.rectangleParametersElement.style.display = "none";
                    this.triangleParametersElement.style.display = "block";
                    this.circleParametersElement.style.display = "none";
                    break;
                case "Circle":
                    this.setCanvasPropertiesToInput();
                    this.setCirclePropertiesToInput();
                    this.getParametersAndDrawCircle();
                    this.colorParametersElement.style.display = "block";
                    this.rectangleParametersElement.style.display = "none";
                    this.triangleParametersElement.style.display = "none";
                    this.circleParametersElement.style.display = "block";
                    break;
                default: // default choice is <No shape>
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
                    this.getParametersAndDrawRectangle();
                    break;
                case "Triangle":
                    this.setCanvasPropertiesToInput();
                    this.setTrianglePropertiesToInput();
                    this.getParametersAndDrawTriangle();
                    break;
                case "Circle":
                    this.setCanvasPropertiesToInput();
                    this.setCirclePropertiesToInput();
                    this.getParametersAndDrawCircle();
                    break;
                default: // default choice is <No shape>
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
                    this.getParametersAndDrawRectangle();
                    break;
                case ShapeType.Triangle:
                    this.triangle.setFillColor(newFillColor);
                    this.getParametersAndDrawTriangle();
                    break;
                case ShapeType.Circle:
                    this.circle.setFillColor(newFillColor);
                    this.getParametersAndDrawCircle();
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
                    this.getParametersAndDrawRectangle();
                    break;
                case ShapeType.Triangle:
                    this.triangle.setOutlineColor(newOutlineColor);
                    this.getParametersAndDrawTriangle();
                    break;
                case ShapeType.Circle:
                    this.circle.setOutlineColor(newOutlineColor);
                    this.getParametersAndDrawCircle();
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
                    this.getParametersAndDrawRectangle();
                    break;
                case ShapeType.Triangle:
                    this.getParametersAndDrawTriangle();
                    break;
                case ShapeType.Circle:
                    this.getParametersAndDrawCircle();
                    break;
                default:
                    throw new Error("Unknown type");
            }
        });

        this.xRectangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawRectangle();
        });

        this.yRectangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawRectangle();
        });

        this.rectangleWidthElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawRectangle();
        });

        this.rectangleHeightElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawRectangle();
        });

        this.xCircleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawCircle();
        });

        this.yCircleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawCircle();
        });

        this.circleRadiusElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawCircle();
        });

        this.x1TriangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawTriangle();
        });

        this.y1TriangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawTriangle();
        });

        this.x2TriangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawTriangle();
        });

        this.y2TriangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawTriangle();
        });

        this.x3TriangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawTriangle();
        });

        this.y3TriangleCoordinateElement.addEventListener("input", (event: Event) => {
            this.getParametersAndDrawTriangle();
        });
    }

    private setCanvasPropertiesToInput(): void {
        this.fillColorElement.value = this.getSelectedShape().getFillColor();
        this.outlineColorElement.value = this.getSelectedShape().getOutlineColor();
        this.outlineThicknessElement.value = this.canvas.getLineWidth().toString(10);
    }

    private setRectanglePropertiesToInput(): void {
        this.xRectangleCoordinateElement.value = this.rectangle.getX().toString(10);
        this.yRectangleCoordinateElement.value = this.rectangle.getY().toString(10);
        this.rectangleWidthElement.value = this.rectangle.getWidth().toString(10);
        this.rectangleHeightElement.value = this.rectangle.getHeight().toString(10);
    }

    private setTrianglePropertiesToInput(): void {
        this.x1TriangleCoordinateElement.value = this.triangle.getX1().toString(10);
        this.y1TriangleCoordinateElement.value = this.triangle.getY1().toString(10);
        this.x2TriangleCoordinateElement.value = this.triangle.getX2().toString(10);
        this.y2TriangleCoordinateElement.value = this.triangle.getY2().toString(10);
        this.x3TriangleCoordinateElement.value = this.triangle.getX3().toString(10);
        this.y3TriangleCoordinateElement.value = this.triangle.getY3().toString(10);
    }

    private setCirclePropertiesToInput(): void {
        this.xCircleCoordinateElement.value = this.circle.getX().toString(10);
        this.yCircleCoordinateElement.value = this.circle.getY().toString(10);
        this.circleRadiusElement.value = this.circle.getRadius().toString(10);
    }

    private clearInputValues(): void {
        this.fillColorElement.value = "";
        this.outlineColorElement.value = "";
        this.outlineThicknessElement.value = "";

        this.xRectangleCoordinateElement.value = "";
        this.yRectangleCoordinateElement.value = "";
        this.rectangleWidthElement.value = "";
        this.rectangleHeightElement.value = "";

        this.xCircleCoordinateElement.value = "";
        this.yCircleCoordinateElement.value = "";
        this.circleRadiusElement.value = "";

        this.x1TriangleCoordinateElement.value = "";
        this.y1TriangleCoordinateElement.value = "";
        this.x2TriangleCoordinateElement.value = "";
        this.y2TriangleCoordinateElement.value = "";
        this.x3TriangleCoordinateElement.value = "";
        this.y3TriangleCoordinateElement.value = "";
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

    private getParametersAndDrawRectangle(): void {
        this.canvas.clear();
        this.setCanvasProperties();

        this.rectangle.setX(parseInt(this.xRectangleCoordinateElement.value, 10));
        this.rectangle.setY(parseInt(this.yRectangleCoordinateElement.value, 10));
        this.rectangle.setWidth(parseInt(this.rectangleWidthElement.value, 10));
        this.rectangle.setHeight(parseInt(this.rectangleHeightElement.value, 10));

        this.canvas.print("Area: " + this.rectangle.getArea().toFixed(2), 460, 430, "#000");
        this.canvas.print("Perimeter: " + this.rectangle.getPerimeter().toFixed(2), 460, 460, "#000");

        this.rectangle.draw(this.canvas);
    }

    private getParametersAndDrawTriangle(): void {
        this.canvas.clear();
        this.setCanvasProperties();

        this.triangle.setX1(parseInt(this.x1TriangleCoordinateElement.value, 10));
        this.triangle.setY1(parseInt(this.y1TriangleCoordinateElement.value, 10));
        this.triangle.setX2(parseInt(this.x2TriangleCoordinateElement.value, 10));
        this.triangle.setY2(parseInt(this.y2TriangleCoordinateElement.value, 10));
        this.triangle.setX3(parseInt(this.x3TriangleCoordinateElement.value, 10));
        this.triangle.setY3(parseInt(this.y3TriangleCoordinateElement.value, 10));

        this.canvas.print("Area: " + this.triangle.getArea().toFixed(2), 460, 430, "#000");
        this.canvas.print("Perimeter: " + this.triangle.getPerimeter().toFixed(2), 460, 460, "#000");

        this.triangle.draw(this.canvas);
    }

    private getParametersAndDrawCircle(): void {
        this.canvas.clear();
        this.setCanvasProperties();

        this.circle.setX(parseInt(this.xCircleCoordinateElement.value, 10));
        this.circle.setY(parseInt(this.yCircleCoordinateElement.value, 10));
        this.circle.setRadius(parseInt(this.circleRadiusElement.value, 10));

        this.canvas.print("Area: " + this.circle.getArea().toFixed(2), 460, 430, "#000");
        this.canvas.print("Perimeter: " + this.circle.getPerimeter().toFixed(2), 460, 460, "#000");

        this.circle.draw(this.canvas);
    }
}
