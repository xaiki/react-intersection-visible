'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('intersection-observer');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

var Visible = function (_Component) {
  _inherits(Visible, _Component);

  function Visible() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Visible);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Visible.__proto__ || Object.getPrototypeOf(Visible)).call.apply(_ref, [this].concat(args))), _this), _this.handleObserverUpdate = function (entries) {
      var _this$props = _this.props,
          onIntersect = _this$props.onIntersect,
          onShow = _this$props.onShow,
          onHide = _this$props.onHide;
      var intersectionRect = entries[0].intersectionRect;
      var top = intersectionRect.top,
          left = intersectionRect.left,
          bottom = intersectionRect.bottom,
          right = intersectionRect.right;


      if ([top, bottom, left, right].some(Boolean) && onShow) {
        onShow(entries);
      } else if (onHide) {
        onHide(entries);
      }

      onIntersect(entries);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Handles the visibility changes
   *
   * @param {array} entries
   * @memberOf Visible
   */


  _createClass(Visible, [{
    key: 'startObserving',


    /**
     * Starts the observer
     *
     * @memberOf Visible
     */
    value: function startObserving() {
      this.observer.observe(this.node);
    }

    /**
     * Stops the observer
     *
     * @memberOf Visible
     */

  }, {
    key: 'stopObserving',
    value: function stopObserving() {
      this.observer.unobserve(this.node);
    }

    /**
     * Init the observer on mounting
     *
     * @memberOf Visible
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var options = this.props.options;

      this.observer = new IntersectionObserver(this.handleObserverUpdate, options);
    }

    /**
     * Start the observer when the component is mounted
     *
     * @memberOf Visible
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.active) {
        this.startObserving();
      }
    }

    /**
     * Update observer state on prop changes
     *
     * @memberOf Visible
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.active && !this.props.active) {
        this.startObserving();
      }
      if (!nextProps.active && this.props.active) {
        this.stopObserving();
      }
    }

    /**
     * Stop the observer on unmounting
     *
     * @memberOf Visible
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.observer.disconnect();
    }

    /**
     * Render component
     *
     * @returns {JSX}
     *
     * @memberOf Visible
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = this.props.className;

      return _react2.default.createElement(
        'span',
        { className: className, ref: function ref(node) {
            return _this2.node = node;
          } },
        this.props.children
      );
    }
  }]);

  return Visible;
}(_react.Component);

Visible.propTypes = {
  active: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onIntersect: _propTypes2.default.func.isRequired,
  onShow: _propTypes2.default.func,
  onHide: _propTypes2.default.func,
  options: _propTypes2.default.shape({
    root: _propTypes2.default.node,
    rootMargin: _propTypes2.default.number,
    threshold: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.array])
  }),
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)])
};
Visible.defaultProps = {
  active: true,
  className: 'intersection-visible-wrapper' };
exports.default = Visible;