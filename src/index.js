'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var values = function values(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};

var IMAGE_FORMATS = {
  // png8 or png (default) specifies the 8-bit PNG format.
  PNG: 'png',

  // png32 specifies the 32-bit PNG format.
  PNG32: 'png32',

  // gif specifies the GIF format.
  GIF: 'gif',

  // jpg specifies the JPEG compression format.
  JPG: 'jpg',

  // jpg-baseline specifies a non-progressive JPEG compression format.
  JPG_BASELINE: 'jpg-baseline'
};

var MAP_TYPES = {
  // roadmap (default) specifies a standard roadmap image, as is normally shown on the Google Maps website.
  ROADMAP: 'roadmap',

  // satellite specifies a satellite image.
  SATELLITE: 'satellite',

  // terrain specifies a physical relief map image, showing terrain and vegetation.
  TERRAIN: 'terrain',

  // hybrid specifies a hybrid of the satellite and roadmap image,
  // showing a transparent layer of major streets and place names on the satellite image.
  HYBRID: 'hybrid'
};

var IMAGE_FORMATS_VALUES = values(IMAGE_FORMATS);
var MAP_TYPES_VALUES = values(MAP_TYPES);

/**
 * A wrapper for Google's Static Maps
 *
 * @see https://developers.google.com/maps/documentation/staticmaps/intro#Overview
 *
 * @example: http://staticmapmaker.com/google/
 */

var GoogleStaticMap = function (_React$Component) {
  _inherits(GoogleStaticMap, _React$Component);

  function GoogleStaticMap() {
    _classCallCheck(this, GoogleStaticMap);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GoogleStaticMap).apply(this, arguments));
  }

  _createClass(GoogleStaticMap, [{
    key: 'render',


    /**
     * https://developers.google.com/maps/documentation/staticmaps/intro#api_key
     */
    value: function render() {
      return _react2.default.createElement('img', {
        style: _extends({}, this.props.style, this.props.size),
        src: this.staticMapUrl
      });
    }
  }, {
    key: 'staticMapUrl',
    get: function get() {
      var _props = this.props;
      var latitude = _props.latitude;
      var longitude = _props.longitude;
      var zoom = _props.zoom;
      var size = _props.size;
      var scale = _props.scale;
      var format = _props.format;
      var mapType = _props.mapType;
      var width = size.width;
      var height = size.height;
      var apiKey = _props.apiKey;

      var rootUrl = this.constructor.RootUrl;

      return rootUrl + '?center=' + latitude + ',' + longitude + '&zoom=' + zoom + '&scale=' + scale + '&size=' + width + 'x' + height + '&maptype=' + mapType + '&format=' + format + '&' + this.markerParams + '&key=' + apiKey;
    }
  }, {
    key: 'markerParams',
    get: function get() {
      var _props2 = this.props;
      var latitude = _props2.latitude;
      var longitude = _props2.longitude;
      var hasCenterMarker = _props2.hasCenterMarker;


      var markerParams = 'markers=' + latitude + ',' + longitude;
      return hasCenterMarker ? markerParams : '';
    }
  }, {
    key: 'apiKeyParam',
    get: function get() {
      var apiKey = this.constructor.ApiKey;
      return apiKey ? 'key=' + apiKey : '';
    }
  }]);

  return GoogleStaticMap;
}(_react2.default.Component);

GoogleStaticMap.ApiKey = null;
GoogleStaticMap.RootUrl = 'http://maps.googleapis.com/maps/api/staticmap';
GoogleStaticMap.ImageFormats = IMAGE_FORMATS;
GoogleStaticMap.MapTypes = MAP_TYPES;
GoogleStaticMap.propTypes = {
  latitude: _react2.default.PropTypes.string.isRequired,

  longitude: _react2.default.PropTypes.string.isRequired,

  size: _react2.default.PropTypes.shape({
    width: _react2.default.PropTypes.number.isRequired,
    height: _react2.default.PropTypes.number.isRequired
  }),

  style: _react2.default.PropTypes.object,

  /**
   * zoom (required if markers not present) defines the zoom level of the map,
   * which determines the magnification level of the map.
   *
   * @see https://developers.google.com/maps/documentation/staticmaps/intro#Zoomlevels
   */
  zoom: _react2.default.PropTypes.number.isRequired,

  /**
   * scale affects the number of pixels that are returned.
   * scale=2 returns twice as many pixels as scale=1 while retaining the same coverage area and level of detail
   * The default value is calculated from the screen PixelRatio.
   */
  scale: _react2.default.PropTypes.number,

  /**
   * @see https://developers.google.com/maps/documentation/staticmaps/intro#ImageFormats
   */
  format: _react2.default.PropTypes.oneOf(IMAGE_FORMATS_VALUES),

  /**
   * @see https://developers.google.com/maps/documentation/staticmaps/intro#MapTypes
   */
  mapType: _react2.default.PropTypes.oneOf(MAP_TYPES_VALUES),

  /**
   * Add an Api key
   */
  apiKey: _react2.default.PropTypes.string,

  /**
   * Add a marker on the center
   */
  hasCenterMarker: _react2.default.PropTypes.bool
};
GoogleStaticMap.defaultProps = {
  format: IMAGE_FORMATS.PNG,
  mapType: MAP_TYPES.ROADMAP,
  hasCenterMarker: true
};
exports.default = GoogleStaticMap;
