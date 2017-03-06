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
