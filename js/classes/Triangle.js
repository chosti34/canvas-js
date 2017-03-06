function Triangle(fillColor, borderColor)
{
    Shape.apply(this, arguments); // вызываем конструктор базового класса

    this.x1 = 300;
    this.y1 = 160;

    this.x2 = 280;
    this.y2 = 270;

    this.x3 = 180;
    this.y3 = 150;
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
