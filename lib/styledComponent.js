'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _composeStyles = require('./composeStyles');

var _composeStyles2 = _interopRequireDefault(_composeStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixers = {};
var allNotSupportedWarnedOnce = void 0,
    unsuppliedUserAgentWarnedOnce = void 0,
    serverRenderingWarnedOnce = void 0;

var StyledComponentMixin = {
	componentWillMount: function componentWillMount() {
		this.__super();
		if (!this.state) this.state = {};
		this.getStyles(this.props, this.state, this.context);
	},
	componentWillUpdate: function componentWillUpdate(nextProps, nextState, nextContext) {
		this.__super();
		this.getStyles(nextProps, nextState, nextContext);
	},
	getStyles: function getStyles(props, state, context) {
		var rootStyles = Array.isArray(props.style) ? props.style.map(function (style) {
			return { root: style };
		}) : { root: props.style };

		var stylesFn = (0, _composeStyles2.default)(this.constructor.styles, props.styles, rootStyles);
		var styles = stylesFn(props, state, context);

		for (var elem in styles) {
			styles[elem] = this.postprocessStyle(styles[elem]);
		}
		this.styles = styles;
	},
	postprocessStyle: function postprocessStyle(style) {
		for (var i in style) {
			var value = style[i];
			if (value && value.rgbaString) style[i] = value.rgbaString();
		}

		var autoPrefixing = this.context.styledComponentAutoPrefixing;
		if (autoPrefixing === 'off') {
			return style;
		} else if (autoPrefixing === 'all') {
			// FUTURE: remove warn, use Prefixer.prefixAll()
			if (!allNotSupportedWarnedOnce) {
				console.warn('Floral: "all" is not supported, autoprefixing is disabled.');
				allNotSupportedWarnedOnce = true;
			}
			return style;
		} else {
			var prefixer = this.getPrefixer();
			if (prefixer) return prefixer.prefix(style);else return style;
		}
	},
	getPrefixer: function getPrefixer() {
		var userAgent = void 0;
		if (this.context.styledComponentUserAgent !== undefined) {
			userAgent = this.context.stylesMixinUserAgent;
		} else if (typeof navigator !== 'undefined') {
			userAgent = navigator.userAgent;
		} else {
			// FUTURE: do not disable autoprefixing, allow auto fallback to prefixAll
			if (!serverRenderingWarnedOnce) {
				serverRenderingWarnedOnce = true;
				console.warn('Floral: userAgent should be supplied with UserAgentProvider' + 'for server-side rendering, autoprefixing is disabled.');
			}
			return;
		}

		if (!prefixers[userAgent]) prefixers[userAgent] = new _inlineStylePrefixer2.default({ userAgent: userAgent });
		var prefixer = prefixers[userAgent];
		// FUTURE: remove check and warn, allow auto fallback to prefixAll
		if (prefixer._browserInfo.browser === '') {
			if (!unsuppliedUserAgentWarnedOnce) {
				unsuppliedUserAgentWarnedOnce = true;
				console.warn('Floral: supplied userAgent is not supported, ' + 'autoprefixing is disabled.');
			}
			return;
		} else {
			return prefixer;
		}
	}
};

exports.default = function (Component) {
	var StyledComponent = (0, _mixin2.default)(Component, StyledComponentMixin);

	var name = Component.displayName || Component.name;
	StyledComponent.displayName = name ? 'styled(' + name + ')' : 'StyledComponent';

	StyledComponent.contextTypes = _extends({}, StyledComponent.contextTypes, {
		styledComponentUserAgent: _propTypes2.default.string,
		styledComponentAutoPrefix: _propTypes2.default.string
	});

	return StyledComponent;
};