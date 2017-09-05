'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (target) {
	var MixinClass = function (_target) {
		_inherits(MixinClass, _target);

		function MixinClass() {
			_classCallCheck(this, MixinClass);

			return _possibleConstructorReturn(this, (MixinClass.__proto__ || Object.getPrototypeOf(MixinClass)).apply(this, arguments));
		}

		return MixinClass;
	}(target);

	for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		mixins[_key - 1] = arguments[_key];
	}

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {

		for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var mixin = _step.value;

			for (var key in mixin) {
				var value = mixin[key];
				if (typeof value === 'function') {
					(function () {
						var base = MixinClass.prototype[key] || function () {};
						var mixed = value;
						value = function value() {
							var savedSuper = this.__super;
							this.__super = base;

							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}

							var res = mixed.apply(this, args);
							this.__super = savedSuper;
							return res;
						};
					})();
				}
				MixinClass.prototype[key] = value;
			}
		}

		// if IE<=10 copy static props from target to mixin
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	for (var staticProperty in target) {
		MixinClass[staticProperty] = target[staticProperty];
	}

	return MixinClass;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Mixes methods and properties from mixins to target's prototype.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Mixed methods can call super method with `this.__super()`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Super is available only synchronously.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param target {function} - Constructor.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param ...mixins {array<object>} - Mixins.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @return {function} - New constructor with mixins.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */