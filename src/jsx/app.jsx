var App = React.createClass({
    render: function() {
        return (
            <div class="container">
                <div class="row">
                    <ShapePropertiesForm />
                </div>
            </div>
        );
    }
});

var ShapePropertiesForm = React.createClass({
    render() {
        return (
            <div class="main-form-block col-md-4">
                <form>
                    <span>Здесь123</span>
                </form>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
