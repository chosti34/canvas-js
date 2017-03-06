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

Canvas.prototype.clear = function(color = "#000")
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

Canvas.prototype.print = function(data, x, y, color = "#000")
{
    var textWidth = this.context.measureText(data).width;
    var offsetX = 20;

    var prevFillStyle = this.context.fillStyle;
    this.context.fillStyle = color;
    this.context.fillText(data, this.width - textWidth - offsetX, y);
    this.context.fillStyle = prevFillStyle;
};
