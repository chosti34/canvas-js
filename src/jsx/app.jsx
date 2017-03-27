var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <ShapePropertiesForm />
                    <Canvas />
                </div>
            </div>
        );
    }
});

var ShapePropertiesForm = React.createClass({
    render() {
        return (
            <div className="main-form-block col-md-4">
                <form>
                    <ShapeSelector />
                    <ColorPropertiesBlock />
                    <RectanglePropertiesBlock />
                    <TrianglePropertiesBlock />
                    <CirclePropertiesBlock />
                    <MainButtonsBlock />
                </form>
            </div>
        );
    }
});

var ShapeSelector = React.createClass({
    render() {
        return (
            <div>
                <label htmlFor="shapeSelector">Select shape:</label>
                <select id="shapeSelector" className="shape-selector">
                    <option selected>&lt;No shape selected&gt;</option>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Triangle">Triangle</option>
                    <option value="Circle">Circle</option>
                </select>
            </div>
        );
    }
});

var ColorPropertiesBlock = React.createClass({
    render() {
        return (
            <div id="colorParams">
                <label className="main-form-input-label">
                    <span>Fill color:</span>
                    <input id="fillColor" type="text" placeholder="#hex" />
                </label>
                <label className="main-form-input-label">
                    <span>Outline color:</span>
                    <input id="borderColor" type="text" placeholder="#hex" />
                </label>
                <label className="main-form-input-label">
                    <span>Outline thickness:</span>
                    <input id="outlineThickness" type="number" placeholder="Number" />
                </label>
            </div>
        );
    }
});

var RectanglePropertiesBlock = React.createClass({
    render() {
        return (
            <div id="rectangleParams">
                <label className="main-form-input-label">
                    <span>X coord:</span>
                    <input id="rectangleX" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Y coord:</span>
                    <input id="rectangleY" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Width:</span>
                    <input id="rectangleWidth" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Height:</span>
                    <input id="rectangleHeight" type="number" placeholder="Number" />
                </label>
            </div>
        );
    }
});

var TrianglePropertiesBlock = React.createClass({
    render() {
        return (
            <div id="triangleParams">
                <label className="main-form-input-label">
                    <span>X1 coord:</span>
                    <input id="triangleX1" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Y1 coord:</span>
                    <input id="triangleY1" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>X2 coord:</span>
                    <input id="triangleX2" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Y2 coord:</span>
                    <input id="triangleY2" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>X3 coord:</span>
                    <input id="triangleX3" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Y3 coord:</span>
                    <input id="triangleY3" type="number" placeholder="Number" />
                </label>
            </div>
        );
    }
});

var CirclePropertiesBlock = React.createClass({
    render() {
        return (
            <div id="circleParams">
                <label className="main-form-input-label">
                    <span>X coord:</span>
                    <input id="circleX" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Y coord:</span>
                    <input id="circleY" type="number" placeholder="Number" />
                </label>
                <label className="main-form-input-label">
                    <span>Radius:</span>
                    <input id="circleRadius" type="number" placeholder="Number" />
                </label>
            </div>
        );
    }
});

var MainButtonsBlock = React.createClass({
    render() {
        return (
            <div className="main-form-buttons-block">
                <input id="canvasDrawButton" type="button" value="Draw" />
                <input id="canvasClearButton" type="button" value="Clear" />
            </div>
        );
    }
});

var Canvas = React.createClass({
    render() {
        return (
            <div className="col-md-8">
                <label htmlFor="canvas">Canvas output:</label>
                <canvas id="canvas" className="canvas img-responsive" width="749" height="480">
                    Sorry, your browser doesn't support HTML5 canvas.
                </canvas>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
