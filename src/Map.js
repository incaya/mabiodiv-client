import ReactDOM from "react-dom";
import React, { Component } from "react";

import moment from "moment";

import { Box } from "grommet";

import "ol/ol.css";
import { Feature, Map, View } from "ol";
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource, OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import Circle from "ol/geom/Circle.js";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { Point } from "ol/geom";

const familyIcons = {
  1: "butterfly.png",
  2: "bumblebee.png"
};

class OLMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.setMapRef = element => {
      this.mapRef = element;
    };
  }

  componentDidMount() {
    //const mapDOMNode = ReactDOM.findDOMNode(this.mapRef);

    var image = new CircleStyle({
      radius: 5,
      fill: new Fill({ color: "white" }),
      stroke: new Stroke({ color: "red", width: 1 })
    });

    var styles = {
      Point: (familyId, opacity = 1) =>
        new Style({
          image: new Icon(
            /** @type {olx.style.IconOptions} */ ({
              anchor: [0.5, 1],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              opacity,
              src: "img/" + familyIcons[familyId]
            })
          )
        }),
      LineString: new Style({
        stroke: new Stroke({
          color: "green",
          width: 1
        })
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: "green",
          width: 1
        })
      }),
      MultiPoint: new Style({
        image: image
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: "yellow",
          width: 1
        }),
        fill: new Fill({
          color: "rgba(255, 255, 0, 0.1)"
        })
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: "blue",
          lineDash: [4],
          width: 3
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)"
        })
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: "magenta",
          width: 2
        }),
        fill: new Fill({
          color: "magenta"
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: "magenta"
          })
        })
      }),
      Circle: new Style({
        stroke: new Stroke({
          color: "red",
          width: 2
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.2)"
        })
      })
    };
    // style determination
    var styleFunction = function(feature) {
      // opacity = f(distance in time)
      const opacity = 1 / (parseInt(feature.values_.daysAgo) / 30);
      return styles[feature.getGeometry().getType()](
        feature.values_.family,
        opacity
      );
    };
    // features from database
    const features = this.props.data.observations.map(obs => {
      // distance in time (days)
      const todayTimestamp = moment().unix();
      const joursDiff = Math.floor(
        (parseInt(todayTimestamp) - parseInt(obs.date) / 1000) / 60 / 60 / 24
      );
      console.log("Diff: " + joursDiff + " jours");
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: fromLonLat(obs.point.coordinates)
        },
        properties: {
          abondance: 5,
          family: obs.taxon.famille.id,
          daysAgo: joursDiff
        }
      };
    });
    var geojsonObject = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "EPSG:3857"
        }
      },
      features
    };

    var vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject)
    });

    //vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

    var geojsonVectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction
    });

    var baseMapLayer = new TileLayer({
      source: new OSM()
    });
    var map = new Map({
      target: "map",
      layers: [baseMapLayer],
      view: new View({
        center: fromLonLat([-0.3470121, 49.1816993]),
        zoom: 12 //Initial Zoom Level
      })
    });

    map.addLayer(geojsonVectorLayer);
    //Adding a marker on the map
    /* var marker = new Feature({
      geometry: new Point(fromLonLat([-0.3470121, 49.1816993]))
    });
    var vectorSource = new VectorSource({
      features: [marker]
    });
    var markerVectorLayer = new VectorLayer({
      source: vectorSource
    });
    map.addLayer(markerVectorLayer); */
  }

  render() {
    return <Box id="map" ref={this.setMapRef}></Box>;
  }
}

export default OLMap;
