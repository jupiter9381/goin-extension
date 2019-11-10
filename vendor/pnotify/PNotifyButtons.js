var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* src/PNotifyButtons.html generated by Svelte v2.15.3 */
var PNotifyButtons = function (PNotify) {
	"use strict";

	PNotify = PNotify && PNotify.__esModule ? PNotify["default"] : PNotify;

	function _showSticker(_ref) {
		var sticker = _ref.sticker,
		    _notice = _ref._notice;

		return sticker && !(_notice && _notice.refs.elem.classList.contains('nonblock'));
	}

	function _showCloser(_ref2) {
		var closer = _ref2.closer,
		    _notice = _ref2._notice;

		return closer && !(_notice && _notice.refs.elem.classList.contains('nonblock'));
	}

	function _pinUpClass(_ref3) {
		var classes = _ref3.classes,
		    _notice = _ref3._notice;

		return _notice ? classes.pinUp === null ? _notice.get()._icons.pinUp : classes.pinUp : '';
	}

	function _pinDownClass(_ref4) {
		var classes = _ref4.classes,
		    _notice = _ref4._notice;

		return _notice ? classes.pinDown === null ? _notice.get()._icons.pinDown : classes.pinDown : '';
	}

	function _closerClass(_ref5) {
		var classes = _ref5.classes,
		    _notice = _ref5._notice;

		return _notice ? classes.closer === null ? _notice.get()._icons.closer : classes.closer : '';
	}

	function data() {
		return _extends({
			'_notice': null, // The PNotify notice.
			'_options': {}, // The options for the notice.
			'_mouseIsIn': false
		}, PNotify.modules.Buttons.defaults);
	};

	var methods = {
		initModule: function initModule(options) {
			var _this = this;

			this.set(options);

			var _get = this.get(),
			    _notice = _get._notice;

			_notice.on('mouseenter', function () {
				return _this.set({ '_mouseIsIn': true });
			});
			_notice.on('mouseleave', function () {
				return _this.set({ '_mouseIsIn': false });
			});
			_notice.on('state', function (_ref6) {
				var changed = _ref6.changed,
				    current = _ref6.current;

				if (!changed.hide) {
					return;
				}

				var _get2 = _this.get(),
				    sticker = _get2.sticker;

				if (!sticker) {
					return;
				}

				// Font Awesome 5 replaces our lovely element with a gross SVG. In
				// order to make it play nice with Svelte, we have to clear the
				// element and make it again.
				var icon = current.hide ? _this.get().classes.pinUp : _this.get().classes.pinDown;
				if (_this.get()._notice.get().icons === 'fontawesome5' || typeof icon === 'string' && icon.match(/(^| )fa[srlb]($| )/)) {
					_this.set({ 'sticker': false });
					_this.set({ 'sticker': true });
				}
			});
		},
		handleStickerClick: function handleStickerClick() {
			var _get3 = this.get(),
			    _notice = _get3._notice;

			_notice.update({ hide: !_notice.get().hide });
		},
		handleCloserClick: function handleCloserClick() {
			this.get()._notice.close(false);
			this.set({ '_mouseIsIn': false });
		}
	};

	function oncreate() {
		this.fire('init', { module: this });
	};

	function setup(Component) {
		Component.key = 'Buttons';

		Component.defaults = {
			// Provide a button for the user to manually close the notice.
			closer: true,
			// Only show the closer button on hover.
			closerHover: true,
			// Provide a button for the user to manually stick the notice.
			sticker: true,
			// Only show the sticker button on hover.
			stickerHover: true,
			// The various displayed text, helps facilitating internationalization.
			labels: {
				close: 'Close',
				stick: 'Stick',
				unstick: 'Unstick'
			},
			// The classes to use for button icons. Leave them null to use the classes from the styling you're using.
			classes: {
				closer: null,
				pinUp: null,
				pinDown: null
			}
		};

		// Register the module with PNotify.
		PNotify.modules.Buttons = Component;
		// Prepend this module to the container.
		PNotify.modulesPrependContainer.push(Component);

		// Add button icons to icons objects.
		_extends(PNotify.icons.brighttheme, {
			closer: 'brighttheme-icon-closer',
			pinUp: 'brighttheme-icon-sticker',
			pinDown: 'brighttheme-icon-sticker brighttheme-icon-stuck'
		});
		_extends(PNotify.icons.bootstrap3, {
			closer: 'glyphicon glyphicon-remove',
			pinUp: 'glyphicon glyphicon-pause',
			pinDown: 'glyphicon glyphicon-play'
		});
		_extends(PNotify.icons.fontawesome4, {
			closer: 'fa fa-times',
			pinUp: 'fa fa-pause',
			pinDown: 'fa fa-play'
		});
		_extends(PNotify.icons.fontawesome5, {
			closer: 'fas fa-times',
			pinUp: 'fas fa-pause',
			pinDown: 'fas fa-play'
		});
	};

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-1yjle82-style';
		style.textContent = ".ui-pnotify-closer.svelte-1yjle82,.ui-pnotify-sticker.svelte-1yjle82{float:right;margin-left:.5em;cursor:pointer}[dir=rtl] .ui-pnotify-closer.svelte-1yjle82,[dir=rtl] .ui-pnotify-sticker.svelte-1yjle82{float:left;margin-right:.5em;margin-left:0}.ui-pnotify-buttons-hidden.svelte-1yjle82{visibility:hidden}";
		append(document.head, style);
	}

	function create_main_fragment(component, ctx) {
		var text, if_block1_anchor;

		var if_block0 = ctx._showCloser && create_if_block_1(component, ctx);

		var if_block1 = ctx._showSticker && create_if_block(component, ctx);

		return {
			c: function c() {
				if (if_block0) if_block0.c();
				text = createText("\n");
				if (if_block1) if_block1.c();
				if_block1_anchor = createComment();
			},
			m: function m(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert(target, text, anchor);
				if (if_block1) if_block1.m(target, anchor);
				insert(target, if_block1_anchor, anchor);
			},
			p: function p(changed, ctx) {
				if (ctx._showCloser) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_1(component, ctx);
						if_block0.c();
						if_block0.m(text.parentNode, text);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (ctx._showSticker) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block(component, ctx);
						if_block1.c();
						if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}
			},
			d: function d(detach) {
				if (if_block0) if_block0.d(detach);
				if (detach) {
					detachNode(text);
				}

				if (if_block1) if_block1.d(detach);
				if (detach) {
					detachNode(if_block1_anchor);
				}
			}
		};
	}

	// (1:0) {#if _showCloser}
	function create_if_block_1(component, ctx) {
		var div, span, div_class_value, div_title_value;

		function click_handler(event) {
			component.handleCloserClick();
		}

		return {
			c: function c() {
				div = createElement("div");
				span = createElement("span");
				span.className = "" + ctx._closerClass + " svelte-1yjle82";
				addListener(div, "click", click_handler);
				div.className = div_class_value = "ui-pnotify-closer " + (!ctx.closerHover || ctx._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82";
				setAttribute(div, "role", "button");
				div.tabIndex = "0";
				div.title = div_title_value = ctx.labels.close;
			},
			m: function m(target, anchor) {
				insert(target, div, anchor);
				append(div, span);
			},
			p: function p(changed, ctx) {
				if (changed._closerClass) {
					span.className = "" + ctx._closerClass + " svelte-1yjle82";
				}

				if ((changed.closerHover || changed._mouseIsIn) && div_class_value !== (div_class_value = "ui-pnotify-closer " + (!ctx.closerHover || ctx._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82")) {
					div.className = div_class_value;
				}

				if (changed.labels && div_title_value !== (div_title_value = ctx.labels.close)) {
					div.title = div_title_value;
				}
			},
			d: function d(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	// (11:0) {#if _showSticker}
	function create_if_block(component, ctx) {
		var div, span, span_class_value, div_class_value, div_aria_pressed_value, div_title_value;

		function click_handler(event) {
			component.handleStickerClick();
		}

		return {
			c: function c() {
				div = createElement("div");
				span = createElement("span");
				span.className = span_class_value = "" + (ctx._options.hide ? ctx._pinUpClass : ctx._pinDownClass) + " svelte-1yjle82";
				addListener(div, "click", click_handler);
				div.className = div_class_value = "ui-pnotify-sticker " + (!ctx.stickerHover || ctx._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82";
				setAttribute(div, "role", "button");
				setAttribute(div, "aria-pressed", div_aria_pressed_value = ctx._options.hide);
				div.tabIndex = "0";
				div.title = div_title_value = ctx._options.hide ? ctx.labels.stick : ctx.labels.unstick;
			},
			m: function m(target, anchor) {
				insert(target, div, anchor);
				append(div, span);
			},
			p: function p(changed, ctx) {
				if ((changed._options || changed._pinUpClass || changed._pinDownClass) && span_class_value !== (span_class_value = "" + (ctx._options.hide ? ctx._pinUpClass : ctx._pinDownClass) + " svelte-1yjle82")) {
					span.className = span_class_value;
				}

				if ((changed.stickerHover || changed._mouseIsIn) && div_class_value !== (div_class_value = "ui-pnotify-sticker " + (!ctx.stickerHover || ctx._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82")) {
					div.className = div_class_value;
				}

				if (changed._options && div_aria_pressed_value !== (div_aria_pressed_value = ctx._options.hide)) {
					setAttribute(div, "aria-pressed", div_aria_pressed_value);
				}

				if ((changed._options || changed.labels) && div_title_value !== (div_title_value = ctx._options.hide ? ctx.labels.stick : ctx.labels.unstick)) {
					div.title = div_title_value;
				}
			},
			d: function d(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	function PNotifyButtons(options) {
		var _this2 = this;

		init(this, options);
		this._state = assign(data(), options.data);

		this._recompute({ sticker: 1, _notice: 1, closer: 1, classes: 1 }, this._state);
		this._intro = true;

		if (!document.getElementById("svelte-1yjle82-style")) add_css();

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(function () {
			oncreate.call(_this2);
			_this2.fire("update", { changed: assignTrue({}, _this2._state), current: _this2._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(PNotifyButtons.prototype, {
		destroy: destroy,
		get: get,
		fire: fire,
		on: on,
		set: set,
		_set: _set,
		_stage: _stage,
		_mount: _mount,
		_differs: _differs
	});
	assign(PNotifyButtons.prototype, methods);

	PNotifyButtons.prototype._recompute = function _recompute(changed, state) {
		if (changed.sticker || changed._notice) {
			if (this._differs(state._showSticker, state._showSticker = _showSticker(state))) changed._showSticker = true;
		}

		if (changed.closer || changed._notice) {
			if (this._differs(state._showCloser, state._showCloser = _showCloser(state))) changed._showCloser = true;
		}

		if (changed.classes || changed._notice) {
			if (this._differs(state._pinUpClass, state._pinUpClass = _pinUpClass(state))) changed._pinUpClass = true;
			if (this._differs(state._pinDownClass, state._pinDownClass = _pinDownClass(state))) changed._pinDownClass = true;
			if (this._differs(state._closerClass, state._closerClass = _closerClass(state))) changed._closerClass = true;
		}
	};

	setup(PNotifyButtons);

	function createElement(name) {
		return document.createElement(name);
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);else node.setAttribute(attribute, value);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function assign(tar, src) {
		for (var k in src) {
			tar[k] = src[k];
		}return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) {
			tar[k] = 1;
		}return tar;
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function get() {
		return this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function cancel() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
		    changed = {},
		    dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
	}

	function blankObject() {
		return Object.create(null);
	}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.shift()();
		}
	}

	function noop() {}
	return PNotifyButtons;
}(PNotify);
//# sourceMappingURL=PNotifyButtons.js.map