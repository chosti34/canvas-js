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
