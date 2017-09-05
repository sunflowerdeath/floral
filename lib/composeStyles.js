'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = composeStyles;

var _lodash = require('lodash.flatten');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Composes `styles` props for each element.
 * If styles uses functions, they are combined
 * to single function that returns merged results.
 */
function composeStyles() {
	for (var _len = arguments.length, stylesList = Array(_len), _key = 0; _key < _len; _key++) {
		stylesList[_key] = arguments[_key];
	}

	return function (props, state, context) {
		var composed = {};
		var flatStylesList = (0, _lodash2.default)(stylesList);
		for (var i in flatStylesList) {
			var styles = flatStylesList[i];
			var result = typeof styles === 'function' ? styles(props, state, context) : styles;
			for (var elem in result) {
				if (composed[elem] === undefined) composed[elem] = {};
				Object.assign(composed[elem], result[elem]);
			}
		}
		return composed;
	};
}