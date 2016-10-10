webpackJsonp([5],{

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(14);

	module.exports = function omit(obj, fields) {
	  var copy = assign({}, obj);
	  for (var i = 0; i < fields.length; i++) {
	    var key = fields[i];
	    delete copy[key];
	  }
	  return copy;
	};


/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(15);

	__webpack_require__(72);

/***/ },

/***/ 72:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(8);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Group = function Group(props) {
	    var _classNames;

	    var className = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, props.prefixCls, true), (0, _defineProperty3["default"])(_classNames, props.prefixCls + '-lg', props.size === 'large'), (0, _defineProperty3["default"])(_classNames, props.prefixCls + '-sm', props.size === 'small'), (0, _defineProperty3["default"])(_classNames, props.className, !!props.className), _classNames));
	    return _react2["default"].createElement(
	        'span',
	        { className: className, style: props.style },
	        props.children
	    );
	};
	Group.propTypes = {
	    children: _react2["default"].PropTypes.any
	};
	Group.defaultProps = {
	    prefixCls: 'ant-input-group'
	};
	exports["default"] = Group;
	module.exports = exports['default'];

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = undefined;

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(8);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(11);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(13);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(12);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _calculateNodeHeight = __webpack_require__(99);

	var _calculateNodeHeight2 = _interopRequireDefault(_calculateNodeHeight);

	var _objectAssign = __webpack_require__(14);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _omit = __webpack_require__(38);

	var _omit2 = _interopRequireDefault(_omit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function fixControlledValue(value) {
	    if (typeof value === 'undefined' || value === null) {
	        return '';
	    }
	    return value;
	}
	function onNextFrame(cb) {
	    if (window.requestAnimationFrame) {
	        return window.requestAnimationFrame(cb);
	    }
	    return window.setTimeout(cb, 1);
	}
	function clearNextFrameAction(nextFrameId) {
	    if (window.cancelAnimationFrame) {
	        window.cancelAnimationFrame(nextFrameId);
	    } else {
	        window.clearTimeout(nextFrameId);
	    }
	}
	;

	var Input = function (_Component) {
	    (0, _inherits3["default"])(Input, _Component);

	    function Input(props) {
	        (0, _classCallCheck3["default"])(this, Input);

	        var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.call(this, props));

	        _this.handleKeyDown = function (e) {
	            if (e.keyCode === 13) {
	                _this.props.onPressEnter(e);
	            }
	            _this.props.onKeyDown(e);
	        };
	        _this.handleTextareaChange = function (e) {
	            if (!('value' in _this.props)) {
	                _this.resizeTextarea();
	            }
	            _this.props.onChange(e);
	        };
	        _this.resizeTextarea = function () {
	            var _this$props = _this.props;
	            var type = _this$props.type;
	            var autosize = _this$props.autosize;

	            if (type !== 'textarea' || !autosize || !_this.refs.input) {
	                return;
	            }
	            var minRows = autosize ? autosize.minRows : null;
	            var maxRows = autosize ? autosize.maxRows : null;
	            var textareaStyles = (0, _calculateNodeHeight2["default"])(_this.refs.input, false, minRows, maxRows);
	            _this.setState({ textareaStyles: textareaStyles });
	        };
	        _this.state = {
	            textareaStyles: null
	        };
	        return _this;
	    }

	    Input.prototype.componentDidMount = function componentDidMount() {
	        this.resizeTextarea();
	    };

	    Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        // Re-render with the new content then recalculate the height as required.
	        if (this.props.value !== nextProps.value) {
	            if (this.nextFrameActionId) {
	                clearNextFrameAction(this.nextFrameActionId);
	            }
	            this.nextFrameActionId = onNextFrame(this.resizeTextarea);
	        }
	    };

	    Input.prototype.renderLabledInput = function renderLabledInput(children) {
	        var _classNames;

	        var props = this.props;
	        var wrapperClassName = props.prefixCls + '-group';
	        var addonClassName = wrapperClassName + '-addon';
	        var addonBefore = props.addonBefore ? _react2["default"].createElement(
	            'span',
	            { className: addonClassName },
	            props.addonBefore
	        ) : null;
	        var addonAfter = props.addonAfter ? _react2["default"].createElement(
	            'span',
	            { className: addonClassName },
	            props.addonAfter
	        ) : null;
	        var className = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, props.prefixCls + '-wrapper', true), (0, _defineProperty3["default"])(_classNames, wrapperClassName, addonBefore || addonAfter), _classNames));
	        return _react2["default"].createElement(
	            'span',
	            { className: className },
	            addonBefore,
	            children,
	            addonAfter
	        );
	    };

	    Input.prototype.renderInput = function renderInput() {
	        var _classNames2;

	        var props = (0, _objectAssign2["default"])({}, this.props);
	        // Fix https://fb.me/react-unknown-prop
	        var otherProps = (0, _omit2["default"])(this.props, ['prefixCls', 'onPressEnter', 'autosize', 'addonBefore', 'addonAfter']);
	        var prefixCls = props.prefixCls;
	        if (!props.type) {
	            return props.children;
	        }
	        var inputClassName = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls, true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-sm', props.size === 'small'), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-lg', props.size === 'large'), (0, _defineProperty3["default"])(_classNames2, props.className, !!props.className), _classNames2));
	        if ('value' in props) {
	            otherProps.value = fixControlledValue(props.value);
	            // Input elements must be either controlled or uncontrolled,
	            // specify either the value prop, or the defaultValue prop, but not both.
	            delete otherProps.defaultValue;
	        }
	        switch (props.type) {
	            case 'textarea':
	                return _react2["default"].createElement('textarea', (0, _extends3["default"])({}, otherProps, { style: (0, _objectAssign2["default"])({}, props.style, this.state.textareaStyles), className: inputClassName, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: 'input' }));
	            default:
	                return _react2["default"].createElement('input', (0, _extends3["default"])({}, otherProps, { className: inputClassName, onKeyDown: this.handleKeyDown, ref: 'input' }));
	        }
	    };

	    Input.prototype.render = function render() {
	        return this.renderLabledInput(this.renderInput());
	    };

	    return Input;
	}(_react.Component);

	exports["default"] = Input;

	Input.defaultProps = {
	    disabled: false,
	    prefixCls: 'ant-input',
	    type: 'text',
	    onPressEnter: function onPressEnter() {},
	    onKeyDown: function onKeyDown() {},
	    onChange: function onChange() {},

	    autosize: false
	};
	Input.propTypes = {
	    type: _react.PropTypes.string,
	    id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	    size: _react.PropTypes.oneOf(['small', 'default', 'large']),
	    disabled: _react.PropTypes.bool,
	    value: _react.PropTypes.any,
	    defaultValue: _react.PropTypes.any,
	    className: _react.PropTypes.string,
	    addonBefore: _react.PropTypes.node,
	    addonAfter: _react.PropTypes.node,
	    prefixCls: _react.PropTypes.string,
	    autosize: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
	    onPressEnter: _react.PropTypes.func,
	    onKeyDown: _react.PropTypes.func
	};
	module.exports = exports['default'];

/***/ },

/***/ 99:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = calculateNodeHeight;
	// Thanks to https://github.com/andreypopp/react-textarea-autosize/
	/**
	 * calculateNodeHeight(uiTextNode, useCache = false)
	 */
	var HIDDEN_TEXTAREA_STYLE = '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';
	var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];
	var computedStyleCache = {};
	var hiddenTextarea = void 0;
	function calculateNodeStyling(node) {
	    var useCache = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');
	    if (useCache && computedStyleCache[nodeRef]) {
	        return computedStyleCache[nodeRef];
	    }
	    var style = window.getComputedStyle(node);
	    var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');
	    var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
	    var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
	    var sizingStyle = SIZING_STYLE.map(function (name) {
	        return name + ':' + style.getPropertyValue(name);
	    }).join(';');
	    var nodeInfo = {
	        sizingStyle: sizingStyle,
	        paddingSize: paddingSize,
	        borderSize: borderSize,
	        boxSizing: boxSizing
	    };
	    if (useCache && nodeRef) {
	        computedStyleCache[nodeRef] = nodeInfo;
	    }
	    return nodeInfo;
	}
	function calculateNodeHeight(uiTextNode) {
	    var useCache = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var minRows = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var maxRows = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	    if (!hiddenTextarea) {
	        hiddenTextarea = document.createElement('textarea');
	        document.body.appendChild(hiddenTextarea);
	    }
	    // Copy all CSS properties that have an impact on the height of the content in
	    // the textbox

	    var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache);

	    var paddingSize = _calculateNodeStyling.paddingSize;
	    var borderSize = _calculateNodeStyling.borderSize;
	    var boxSizing = _calculateNodeStyling.boxSizing;
	    var sizingStyle = _calculateNodeStyling.sizingStyle;
	    // Need to have the overflow attribute to hide the scrollbar otherwise
	    // text-lines will not calculated properly as the shadow will technically be
	    // narrower for content

	    hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
	    hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';
	    var minHeight = -Infinity;
	    var maxHeight = Infinity;
	    var height = hiddenTextarea.scrollHeight;
	    if (boxSizing === 'border-box') {
	        // border-box: add border, since height = content + padding + border
	        height = height + borderSize;
	    } else if (boxSizing === 'content-box') {
	        // remove padding, since height = content
	        height = height - paddingSize;
	    }
	    if (minRows !== null || maxRows !== null) {
	        // measure height of a textarea with a single row
	        hiddenTextarea.value = '';
	        var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
	        if (minRows !== null) {
	            minHeight = singleRowHeight * minRows;
	            if (boxSizing === 'border-box') {
	                minHeight = minHeight + paddingSize + borderSize;
	            }
	            height = Math.max(minHeight, height);
	        }
	        if (maxRows !== null) {
	            maxHeight = singleRowHeight * maxRows;
	            if (boxSizing === 'border-box') {
	                maxHeight = maxHeight + paddingSize + borderSize;
	            }
	            height = Math.min(maxHeight, height);
	        }
	    }
	    return { height: height, minHeight: minHeight, maxHeight: maxHeight };
	}
	module.exports = exports['default'];

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Input = __webpack_require__(98);

	var _Input2 = _interopRequireDefault(_Input);

	var _Group = __webpack_require__(97);

	var _Group2 = _interopRequireDefault(_Group);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	_Input2["default"].Group = _Group2["default"];
	exports["default"] = _Input2["default"];
	module.exports = exports['default'];

/***/ },

/***/ 612:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(50);

	var _extends3 = _interopRequireDefault(_extends2);

	var _css = __webpack_require__(77);

	var _button = __webpack_require__(58);

	var _button2 = _interopRequireDefault(_button);

	var _css2 = __webpack_require__(45);

	var _input = __webpack_require__(100);

	var _input2 = _interopRequireDefault(_input);

	var _css3 = __webpack_require__(301);

	var _modal = __webpack_require__(300);

	var _modal2 = _interopRequireDefault(_modal);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _dva = __webpack_require__(82);

	__webpack_require__(815);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Login(_ref) {
	    var dispatch = _ref.dispatch;
	    var username = _ref.username;
	    var password = _ref.password;
	    var btnLoading = _ref.btnLoading;

	    function handleLogin() {
	        if (!username) {
	            _modal2.default.error({ title: '账号不能为空' });
	            return;
	        }

	        if (!password) {
	            _modal2.default.error({ title: '密码不能为空' });
	            return;
	        }

	        dispatch({ type: 'login/login', payload: { passWord: password, userName: username } });
	    }

	    function handleKeyDownLogin(e) {
	        var evt = e || window.event; // 获取event对象

	        if (evt.keyCode == 13) {
	            handleLogin();
	        }
	    }

	    return _react2.default.createElement(
	        'div',
	        { className: 'login', onKeyDown: handleKeyDownLogin },
	        _react2.default.createElement(
	            'div',
	            { className: 'loginBox' },
	            _react2.default.createElement(
	                'div',
	                { className: 'loginTitle' },
	                'XX\u5E2E\u4E91\u5E73\u53F0'
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'loginContent' },
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'line' },
	                        _react2.default.createElement(
	                            'label',
	                            { htmlFor: 'username' },
	                            '\u5E10\u53F7'
	                        ),
	                        _react2.default.createElement(_input2.default, {
	                            id: 'username',
	                            autoFocus: 'true',
	                            type: 'text',
	                            value: username,
	                            onChange: function onChange(e) {
	                                return dispatch({ type: 'login/inputChange', data: { username: e.target.value } });
	                            }
	                        })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'line' },
	                        _react2.default.createElement(
	                            'label',
	                            { htmlFor: 'password' },
	                            '\u5BC6\u7801'
	                        ),
	                        _react2.default.createElement(_input2.default, {
	                            id: 'password',
	                            type: 'password',
	                            value: password,
	                            onChange: function onChange(e) {
	                                return dispatch({ type: 'login/inputChange', data: { password: e.target.value } });
	                            }
	                        })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'line' },
	                    _react2.default.createElement(
	                        _button2.default,
	                        {
	                            loading: btnLoading,
	                            onClick: handleLogin
	                        },
	                        '\u767B\u5F55'
	                    )
	                )
	            )
	        )
	    );
	}

	Login.propTypes = {
	    dispatch: _react.PropTypes.func,
	    username: _react.PropTypes.string,
	    password: _react.PropTypes.string,
	    btnLoading: _react.PropTypes.bool
	};

	function mapStateToProps(_ref2) {
	    var login = _ref2.login;

	    return (0, _extends3.default)({}, login);
	}

	exports.default = (0, _dva.connect)(mapStateToProps)(Login);

/***/ },

/***/ 815:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});