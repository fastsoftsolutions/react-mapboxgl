import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGV0ZXJqb2hub250YXJpbyIsImEiOiJjamp6eWl2cmYwMTl0M3FvbW1jMmw1YXdnIn0.xXehFRojYHRwDMZt4oNPJw";

const topMargin = 200;

const options = [
  {
    name: "Default",
    description: "",
    property: "mapbox://styles/peterjohnontario/cjk07tu7883h82sk6dif2j1u2",
    stops: []
  },
  {
    name: "Style 1",
    description: "Description 1",
    property: "mapbox://styles/peterjohnontario/cjk08mn2h1p3i2rqf4xnldp1j",
    stops: []
  },
  {
    name: "Style 2",
    description: "Description 2",
    property: "mapbox://styles/peterjohnontario/cjk07p9vr6wld2spf8xnjq94y",
    stops: []
  }
];

class Application extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: options[0],
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    const mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    if (mapCanvas) {
      mapCanvas.style.height = window.innerHeight;
      mapCanvas.style.width = window.innerWidth;
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  componentDidUpdate() {
    this.map.setStyle(this.state.active.property);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-79.404123, 43.661004],
      zoom: 13
    });

    this.map.on("load", () => {
      //this.map.setStyle(this.state.active.property);
      //      this.map.addSource('countries', {
      //        type: 'geojson',
      //        data
      //});

      //      this.map.addLayer({
      //        id: 'countries',
      //        type: 'fill',
      //        source: 'countries'
      //}, 'country-label-lg'); // ID metches `mapbox/streets-v9`

      this.setFill();
    });
  }

  setFill() {
    //const { property, stops } = this.state.active;
    //    this.map.setPaintProperty('countries', 'fill-color', {
    //      property,
    //stops
    //});
  }


  render() {
    const { name, description, stops, property } = this.state.active;
    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className="txt-s">
          <span
            className="mr6 round-full w12 h12 inline-block align-middle"
            style={{ backgroundColor: stop[1] }}
          />
          <span>{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    };

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input
            onChange={() => this.setState({ active: options[i] })}
            checked={option.property === property}
            name="toggle"
            type="radio"
          />
          <div className="toggle txt-s py3 toggle--active-white">
            {option.name}
          </div>
        </label>
      );
    };

    const dime = {
      width: this.state.width - 5,
      height: this.state.height - topMargin,
      top: topMargin,
      position: "absolute"
    }

    return (
      <div style={dime}>
        <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom">
          <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
            {options.map(renderOptions)}
          </div>
          <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
            <div className="mb6">
              <h2 className="txt-bold txt-s block">{name}</h2>
              <p className="txt-s color-gray">{description}</p>
            </div>
            {stops.map(renderLegendKeys)}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("app"));
