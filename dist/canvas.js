function Application()
{
    this.canvas = this.getCanvasById("canvas");

    this.rectangle = new Rectangle("#0ff", "#f00");
    this.circle = new Circle("#ff0", "#f00");
    this.triangle = new Triangle("#f0f", "#09f");

    this.hideInterfaceItems();

    this.setHandlerOnShapeSelector();
    this.setHandlerOnDrawButton();
    this.setHandlerOnClearButton();
    this.setHandlerOnInputChange();
}

Application.prototype.getCanvasById = function(id)
{
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    return new Canvas(context, canvas.width, canvas.height);
};

Application.prototype.changeFillAndBorderColors = function()
{
    var fillColor = this.getSelectedShape().getFillColor();
    var outlineColor = this.getSelectedShape().getBorderColor();
    var outlineThickness = document.getElementById("outlineThickness").value;

    this.canvas.context.fillStyle = fillColor;
    this.canvas.context.strokeStyle = outlineColor;
    this.canvas.context.lineWidth = outlineThickness;
};

Application.prototype.getParamsAndDrawRectangle = function()
{
    this.canvas.clear("#fff");
    this.changeFillAndBorderColors();

    var x = document.getElementById("rectangleX").value;
    var y = document.getElementById("rectangleY").value;

    var width = document.getElementById("rectangleWidth").value;
    var height = document.getElementById("rectangleHeight").value;

    if ((x > 0) && (y > 0) && (width > 0) && (height > 0))
    {
        this.rectangle.x = document.getElementById("rectangleX").value;
        this.rectangle.y = document.getElementById("rectangleY").value;

        this.rectangle.width = document.getElementById("rectangleWidth").value;
        this.rectangle.height = document.getElementById("rectangleHeight").value;
    }

    this.canvas.print("Area: " + this.rectangle.calculateArea().toFixed(2), 460, 430, "#000");
    this.canvas.print("Perimeter: " + this.rectangle.calculatePerimeter().toFixed(2), 460, 460, "#000");

    this.rectangle.draw(this.canvas);
};

Application.prototype.getParamsAndDrawTriangle = function()
{
    this.canvas.clear("#fff");
    this.changeFillAndBorderColors();

    var x1 = document.getElementById("triangleX1").value;
    var y1 = document.getElementById("triangleY1").value;
    var x2 = document.getElementById("triangleX2").value;
    var y2 = document.getElementById("triangleY2").value;
    var x3 = document.getElementById("triangleX3").value;
    var y3 = document.getElementById("triangleY3").value;

    if ((x1 > 0) && (x2 > 0) && (x3 > 0) && (y1 > 0) && (y2 > 0) && (y3 > 0))
    {
        this.triangle.x1 = x1;
        this.triangle.x2 = x2;
        this.triangle.x3 = x3;
        this.triangle.y1 = y1;
        this.triangle.y2 = y2;
        this.triangle.y3 = y3;
    }

    this.canvas.print("Area: " + this.triangle.calculateArea().toFixed(2), 460, 430, "#000");
    this.canvas.print("Perimeter: " + this.triangle.calculatePerimeter().toFixed(2), 460, 460, "#000");

    this.triangle.draw(this.canvas);
};

Application.prototype.getParamsAndDrawCircle = function()
{
    this.canvas.clear("#fff");
    this.changeFillAndBorderColors();

    var x = document.getElementById("circleX").value;
    var y = document.getElementById("circleY").value;
    var radius = document.getElementById("circleRadius").value;

    if ((x > 0) && (y > 0) && (radius > 0))
    {
        this.circle.x = x;
        this.circle.y = y;
        this.circle.radius = radius;
    }

    this.canvas.print("Area: " + this.circle.calculateArea().toFixed(2), 450, 430, "#000");
    this.canvas.print("Perimeter: " + this.circle.calculatePerimeter().toFixed(2), 450, 460, "#000");

    this.circle.draw(this.canvas);
};

Application.prototype.hideInterfaceItems = function()
{
    document.getElementById("colorParams").style.display = "none";
    document.getElementById("rectangleParams").style.display = "none";
    document.getElementById("triangleParams").style.display = "none";
    document.getElementById("circleParams").style.display = "none";
};

Application.prototype.setHandlerOnShapeSelector = function()
{
    var that = this;

    document.getElementById("shapeSelector").addEventListener("change", function() {
        var selectedShape = document.getElementById("shapeSelector").value;

        switch (selectedShape)
        {
        case "Rectangle":
            that.setRectangleValuesToInput();
            that.getParamsAndDrawRectangle();
            document.getElementById("colorParams").style.display = "block";
            document.getElementById("rectangleParams").style.display = "block";
            document.getElementById("triangleParams").style.display = "none";
            document.getElementById("circleParams").style.display = "none";
            break;
        case "Triangle":
            that.setTriangleValuesToInput();
            that.getParamsAndDrawTriangle();
            document.getElementById("colorParams").style.display = "block";
            document.getElementById("rectangleParams").style.display = "none";
            document.getElementById("triangleParams").style.display = "block";
            document.getElementById("circleParams").style.display = "none";
            break;
        case "Circle":
            that.setCircleValuesToInput();
            that.getParamsAndDrawCircle();
            document.getElementById("colorParams").style.display = "block";
            document.getElementById("rectangleParams").style.display = "none";
            document.getElementById("triangleParams").style.display = "none";
            document.getElementById("circleParams").style.display = "block";
            break;
        default:
            // Предполагается что по дефолту выбран параметр <No shape>
            that.hideInterfaceItems();
            that.canvas.clear("#fff");
            break;
        }
    });
};

Application.prototype.setHandlerOnDrawButton = function()
{
    var that = this;

    document.getElementById("canvasDrawButton").addEventListener("click", function() {
        var selector = document.getElementById("shapeSelector");
        var choice = selector.options[selector.selectedIndex].value;

        switch (choice)
        {
        case "Rectangle":
            that.setRectangleValuesToInput();
            that.getParamsAndDrawRectangle();
            break;
        case "Triangle":
            that.setTriangleValuesToInput();
            that.getParamsAndDrawTriangle();
            break;
        case "Circle":
            that.setCircleValuesToInput();
            that.getParamsAndDrawCircle();
            break;
        default:
            alert("Please, choose shape");
            break;
        }
    });
};

Application.prototype.setHandlerOnClearButton = function()
{
    var that = this;

    document.getElementById("canvasClearButton").onclick = function()
    {
        that.canvas.clear("#fff");
        that.clearInputValues();
    };
};

Application.prototype.setHandlerOnInputChange = function()
{
    var that = this;

    document.getElementById("fillColor").addEventListener("input", function() {
        var newFillColor = document.getElementById("fillColor").value;

        switch (document.getElementById("shapeSelector").value)
        {
        case "Rectangle":
            that.rectangle.setFillColor(newFillColor);
            that.getParamsAndDrawRectangle();
            break;
        case "Triangle":
            that.triangle.setFillColor(newFillColor);
            that.getParamsAndDrawTriangle();
            break;
        case "Circle":
            that.circle.setFillColor(newFillColor);
            that.getParamsAndDrawCircle();
            break;
        }
    });

    document.getElementById("borderColor").addEventListener("input", function() {
        var newOutlineColor = document.getElementById("borderColor").value;

        switch (document.getElementById("shapeSelector").value)
        {
        case "Rectangle":
            that.rectangle.setBorderColor(newOutlineColor);
            that.getParamsAndDrawRectangle();
            break;
        case "Triangle":
            that.triangle.setBorderColor(newOutlineColor);
            that.getParamsAndDrawTriangle();
            break;
        case "Circle":
            that.circle.setBorderColor(newOutlineColor);
            that.getParamsAndDrawCircle();
            break;
        }
    });

    document.getElementById("outlineThickness").addEventListener("input", function() {
        switch (document.getElementById("shapeSelector").value)
        {
        case "Rectangle":
            that.getParamsAndDrawRectangle();
            break;
        case "Triangle":
            that.getParamsAndDrawTriangle();
            break;
        case "Circle":
            that.getParamsAndDrawCircle();
            break;
        }
    });

    document.getElementById("rectangleX").addEventListener("input", function() {
        that.rectangle.x = document.getElementById("rectangleX").value;
        that.getParamsAndDrawRectangle();
    });

    document.getElementById("rectangleY").addEventListener("input", function() {
        that.rectangle.y = document.getElementById("rectangleY").value;
        that.getParamsAndDrawRectangle();
    });

    document.getElementById("rectangleWidth").addEventListener("input", function() {
        that.rectangle.width = document.getElementById("rectangleWidth").value;
        that.getParamsAndDrawRectangle();
    });

    document.getElementById("rectangleHeight").addEventListener("input", function() {
        that.rectangle.height = document.getElementById("rectangleHeight").value;
        that.getParamsAndDrawRectangle();
    });

    document.getElementById("circleX").addEventListener("input", function() {
        that.circle.x = document.getElementById("circleX").value;
        that.getParamsAndDrawCircle();
    });

    document.getElementById("circleY").addEventListener("input", function() {
        that.circle.y = document.getElementById("circleY").value;
        that.getParamsAndDrawCircle();
    });

    document.getElementById("circleRadius").addEventListener("input", function() {
        that.circle.radius = document.getElementById("circleRadius").value;
        that.getParamsAndDrawCircle();
    });

    document.getElementById("triangleX1").addEventListener("input", function() {
        that.triangle.x1 = document.getElementById("triangleX1").value;
        that.getParamsAndDrawTriangle();
    });

    document.getElementById("triangleX2").addEventListener("input", function() {
        that.triangle.x2 = document.getElementById("triangleX2").value;
        that.getParamsAndDrawTriangle();
    });

    document.getElementById("triangleX3").addEventListener("input", function() {
        that.triangle.x3 = document.getElementById("triangleX3").value;
        that.getParamsAndDrawTriangle();
    });

    document.getElementById("triangleY1").addEventListener("input", function() {
        that.triangle.y1 = document.getElementById("triangleY1").value;
        that.getParamsAndDrawTriangle();
    });

    document.getElementById("triangleY2").addEventListener("input", function() {
        that.triangle.y2 = document.getElementById("triangleY2").value;
        that.getParamsAndDrawTriangle();
    });

    document.getElementById("triangleY3").addEventListener("input", function() {
        that.triangle.y3 = document.getElementById("triangleY3").value;
        that.getParamsAndDrawTriangle();
    });
};

Application.prototype.setCanvasValuesToInput = function()
{
    document.getElementById("fillColor").value = this.getSelectedShape().getFillColor();
    document.getElementById("borderColor").value = this.getSelectedShape().getBorderColor();
    document.getElementById("outlineThickness").value = this.canvas.context.lineWidth;
};

Application.prototype.setRectangleValuesToInput = function()
{
    this.setCanvasValuesToInput();
    document.getElementById("rectangleX").value = this.rectangle.x;
    document.getElementById("rectangleY").value = this.rectangle.y;
    document.getElementById("rectangleWidth").value = this.rectangle.width;
    document.getElementById("rectangleHeight").value = this.rectangle.height;
};

Application.prototype.setTriangleValuesToInput = function()
{
    this.setCanvasValuesToInput();
    document.getElementById("triangleX1").value = this.triangle.x1;
    document.getElementById("triangleY1").value = this.triangle.y1;
    document.getElementById("triangleX2").value = this.triangle.x2;
    document.getElementById("triangleY2").value = this.triangle.y2;
    document.getElementById("triangleX3").value = this.triangle.x3;
    document.getElementById("triangleY3").value = this.triangle.y3;
};

Application.prototype.setCircleValuesToInput = function()
{
    this.setCanvasValuesToInput();
    document.getElementById("circleX").value = this.circle.x;
    document.getElementById("circleY").value = this.circle.y;
    document.getElementById("circleRadius").value = this.circle.radius;
};

Application.prototype.clearInputValues = function()
{
    document.getElementById("fillColor").value = "";
    document.getElementById("borderColor").value = "";
    document.getElementById("outlineThickness").value = "";
    document.getElementById("rectangleX").value = "";
    document.getElementById("rectangleY").value = "";
    document.getElementById("rectangleWidth").value = "";
    document.getElementById("rectangleHeight").value = "";
    document.getElementById("circleX").value = "";
    document.getElementById("circleY").value = "";
    document.getElementById("circleRadius").value = "";
    document.getElementById("triangleX1").value = "";
    document.getElementById("triangleY1").value = "";
    document.getElementById("triangleX2").value = "";
    document.getElementById("triangleY2").value = "";
    document.getElementById("triangleX3").value = "";
    document.getElementById("triangleY3").value = "";
};

Application.prototype.getSelectedShape = function()
{
    var that = this;
    var selectedShape = document.getElementById("shapeSelector").value;

    switch (selectedShape)
    {
    case "Rectangle":
        return that.rectangle;
    case "Triangle":
        return that.triangle;
    case "Circle":
        return that.circle;
    }
};

function Canvas(context, width, height)
{
    this.context = context;
    this.width = width;
    this.height = height;
    this.initialize();
}

Canvas.prototype.initialize = function()
{
    // Инициализируем Canvas "значениями по умолчанию"
    this.context.font = "20px Arial";
    this.context.lineWidth = 5;
};

Canvas.prototype.clear = function(color)
{
    var prevFillStyle = this.context.fillStyle;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = prevFillStyle;
};

Canvas.prototype.drawRect = function(x, y, width, height)
{
    this.context.strokeRect(x, y, width, height);
    this.context.fillRect(x, y, width, height);
};

Canvas.prototype.drawTriangle = function(x1, y1, x2, y2, x3, y3)
{
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y3);
    this.context.lineTo(x1, y1);
    this.context.stroke();
    this.context.closePath();
    this.context.fill();
};

Canvas.prototype.drawCircle = function(x, y, radius)
{
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
    this.context.fill();
};

Canvas.prototype.print = function(data, x, y, color)
{
    var textWidth = this.context.measureText(data).width;
    var offsetX = 20;

    var prevFillStyle = this.context.fillStyle;
    this.context.fillStyle = color;
    this.context.fillText(data, this.width - textWidth - offsetX, y);
    this.context.fillStyle = prevFillStyle;
};

function Circle(fillColor, borderColor)
{
    Shape.apply(this, arguments); // вызываем конструктор базового класса

    this.x = 350;
    this.y = 230;
    this.radius = 50;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(canvas)
{
    canvas.drawCircle(this.x, this.y, this.radius);
};

Circle.prototype.calculateArea = function()
{
    return Math.PI * this.radius * this.radius;
};

Circle.prototype.calculatePerimeter = function()
{
    return 2 * Math.PI * this.radius;
};

function Rectangle(fillColor, borderColor)
{
    Shape.apply(this, arguments); // вызываем конструктор базового класса

    this.x = 300;
    this.y = 200;

    this.width = 120;
    this.height = 110;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.draw = function(canvas)
{
    canvas.drawRect(this.x, this.y, this.width, this.height);
};

Rectangle.prototype.calculateArea = function()
{
    return this.width * this.height;
};

Rectangle.prototype.calculatePerimeter = function()
{
    return 2 * this.width + 2 * this.height;
};

function Shape(fillColor, borderColor)
{
    this.setFillColor(fillColor);
    this.setBorderColor(borderColor);
}

Shape.prototype.setFillColor = function(value)
{
    this.fillColor = value;
};

Shape.prototype.getFillColor = function()
{
    return this.fillColor;
};

Shape.prototype.setBorderColor = function(value)
{
    this.borderColor = value;
};

Shape.prototype.getBorderColor = function()
{
    return this.borderColor;
};

// Будут переопределены в классах наследниках
Shape.prototype.draw = function(context)
{
};

Shape.prototype.calculateArea = function()
{
};

Shape.prototype.calculatePerimeter = function()
{
};

function Triangle(fillColor, borderColor)
{
    Shape.apply(this, arguments); // вызываем конструктор базового класса

    // инициализируем координаты "по умолчанию"
    this.x1 = 340;
    this.y1 = 151;

    this.x2 = 280;
    this.y2 = 320;

    this.x3 = 165;
    this.y3 = 125;
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.draw = function(canvas)
{
    canvas.drawTriangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
};

Triangle.prototype.calculateArea = function()
{
    return 0.5 * Math.abs((this.x1 - this.x3) * (this.y2 - this.y3) - (this.x2 - this.x3) * (this.y1 - this.y3));
};

function calculateDistance(x1, y1, x2, y2)
{
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

Triangle.prototype.calculatePerimeter = function()
{
    return calculateDistance(this.x1, this.y1, this.x2, this.y2) +
           calculateDistance(this.x2, this.y2, this.x3, this.y3) +
           calculateDistance(this.x3, this.y3, this.x1, this.y1);
};

window.onload = function()
{
    var application = new Application();
    var x = true;
};
