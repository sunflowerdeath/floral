'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _enzyme = require('enzyme');

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('styledComponent', function () {
	var _class;

	var wrapper = void 0;

	afterEach(function () {
		if (wrapper) wrapper.unmount();
	});

	var Styleable = (0, _index2.default)(_class = function (_React$Component) {
		_inherits(Styleable, _React$Component);

		function Styleable() {
			_classCallCheck(this, Styleable);

			return _possibleConstructorReturn(this, (Styleable.__proto__ || Object.getPrototypeOf(Styleable)).apply(this, arguments));
		}

		_createClass(Styleable, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement('div', null);
			}
		}]);

		return Styleable;
	}(_react2.default.Component)) || _class;

	it('gets styles from prop styles', function () {
		var STYLES = { root: { color: 'red' }, elem: { color: 'green' } };
		wrapper = (0, _enzyme.mount)(_react2.default.createElement(Styleable, { styles: STYLES }));

		var styles = wrapper.get(0).styles;
		_assert2.default.deepEqual(STYLES, styles);
	});

	it('gets styles for root from prop style', function () {
		var STYLE = { color: 'red' };
		wrapper = (0, _enzyme.mount)(_react2.default.createElement(Styleable, { style: STYLE }));

		var styles = wrapper.get(0).styles;
		_assert2.default.deepEqual(styles.root, STYLE);
	});

	it('gets styles from static property styles', function () {
		var _class2, _class3, _temp;

		var STYLES = { root: { color: 'red' }, elem: { color: 'green' } };

		var Styleable = (0, _index2.default)(_class2 = (_temp = _class3 = function (_React$Component2) {
			_inherits(Styleable, _React$Component2);

			function Styleable() {
				_classCallCheck(this, Styleable);

				return _possibleConstructorReturn(this, (Styleable.__proto__ || Object.getPrototypeOf(Styleable)).apply(this, arguments));
			}

			_createClass(Styleable, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return Styleable;
		}(_react2.default.Component), _class3.styles = STYLES, _temp)) || _class2;

		wrapper = (0, _enzyme.mount)(_react2.default.createElement(Styleable, null));

		var styles = wrapper.get(0).styles;
		_assert2.default.deepEqual(styles, STYLES);
	});

	it('allows to use function to define styles', function () {
		function getStyles(props) {
			return { root: { color: props.color } };
		}
		wrapper = (0, _enzyme.mount)(_react2.default.createElement(Styleable, { color: 'green', styles: getStyles }));

		var styles = wrapper.get(0).styles;
		_assert2.default.equal(styles.root.color, 'green');
	});

	it('merges styles from different props', function () {
		var _class4, _class5, _temp2;

		var STATIC_PROP = { fromStatic: { color: 'red' }, root: { color: 'red' } };
		var STYLES_PROP = { fromStyles: { color: 'green' }, root: { color: 'green' } };
		var STYLE_PROP = { color: 'blue' };
		var EXPECTED_STYLES = {
			fromStatic: { color: 'red' },
			fromStyles: { color: 'green' },
			root: { color: 'blue' }
		};

		var Styleable = (0, _index2.default)(_class4 = (_temp2 = _class5 = function (_React$Component3) {
			_inherits(Styleable, _React$Component3);

			function Styleable() {
				_classCallCheck(this, Styleable);

				return _possibleConstructorReturn(this, (Styleable.__proto__ || Object.getPrototypeOf(Styleable)).apply(this, arguments));
			}

			_createClass(Styleable, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return Styleable;
		}(_react2.default.Component), _class5.styles = STATIC_PROP, _temp2)) || _class4;

		wrapper = (0, _enzyme.mount)(_react2.default.createElement(Styleable, { styles: STYLES_PROP, style: STYLE_PROP }));

		var styles = wrapper.get(0).styles;
		_assert2.default.deepEqual(styles, EXPECTED_STYLES);
	});

	it('replaces Color objects with rgba colors', function () {
		var STYLE = { color: new _color2.default('red') };
		wrapper = (0, _enzyme.mount)(_react2.default.createElement(Styleable, { style: STYLE }));

		var styles = wrapper.get(0).styles;
		_assert2.default.equal(styles.root.color, 'rgba(255, 0, 0, 1)');
	});
});

describe('styledComponent/composeStyles', function () {
	it('composes styles', function () {
		var STYLES_A = { root: { fontWeight: 'bold' } };
		var STYLES_B = function STYLES_B(props) {
			return { root: { color: props.color } };
		};

		var composed = (0, _index.composeStyles)(STYLES_A, STYLES_B);
		var styles = composed({ color: 'red' });
		_assert2.default.deepEqual(styles, { root: { color: 'red', fontWeight: 'bold' } });
	});
});