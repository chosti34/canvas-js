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
