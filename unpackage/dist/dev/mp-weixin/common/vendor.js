(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"demo","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*******************************************!*\
  !*** E:/web/uni-app/demo/demo/pages.json ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/*!*********************************************************************!*\
  !*** E:/web/uni-app/demo/demo/lib/lufylegend-2.0.0.beta4.simple.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * lufylegend
                                                                                                      * @version 2.0.0.beta4
                                                                                                      * @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
                                                                                                      * @author lufy(lufy_legend)
                                                                                                      * @blog http://blog.csdn.net/lufy_Legend
                                                                                                      * @email lufy.legend@gmail.com
                                                                                                      * @homepage http://lufylegend.com/lufylegend
                                                                                                      * @github https://github.com/lufylegend/lufylegend.js
                                                                                                      */
var OS_PC = "pc",
OS_IPHONE = "iPhone",
OS_IPOD = "iPod",
OS_IPAD = "iPad",
OS_ANDROID = "Android",
OS_WINDOWS_PHONE = "Windows Phone",
OS_BLACK_BERRY = "BlackBerry",
NONE = "none",
UNDEFINED = "undefined",
LANDSCAPE = "landscape",
PORTRAIT = "portrait",
mouseX,
mouseY;

function LEvent(type) {
  this.eventType = type;
  this._ll_preventDefault = false;
}
LEvent.prototype.preventDefault = function () {
  this._ll_preventDefault = true;
};
LEvent.INIT = "init";
LEvent.COMPLETE = "complete";
LEvent.ERROR = "error";
LEvent.PROGRESS = "progress";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.WINDOW_RESIZE = "resize";
LEvent.WINDOW_ORIENTATIONCHANGE = "orientationchange";
LEvent.SOUND_COMPLETE = "sound_complete";
LEvent.END_CONTACT = "endContact";
LEvent.PRE_SOLVE = "preSolve";
LEvent.POST_SOLVE = "postSolve";
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.addEventListener = function (n, t, f, b) {
  if (b == null) {
    b = false;
  }
  if (n.addEventListener) {
    n.addEventListener(t, f, b);
  } else if (n.attachEvent) {
    n["e" + t + f] = f;
    n[t + f] = function () {
      n["e" + t + f]();
    };
    n.attachEvent("on" + t, n[t + f]);
  }
};
LEvent.removeEventListener = function (n, t, f, b) {
  if (b == null) {
    b = false;
  }
  if (n.removeEventListener) {
    n.removeEventListener(t, f, b);
  } else if (n.detachEvent) {
    n["e" + t + f] = f;
    n[t + f] = function () {
      n["e" + t + f]();
    };
    n.detachEvent("on" + t, n[t + f]);
  }
};
var LMouseEvent = function LMouseEvent() {throw "LMouseEvent cannot be instantiated";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OVER = "mouseover";
LMouseEvent.MOUSE_OUT = "mouseout";
LMouseEvent.DOUBLE_CLICK = "dblclick";
var LMultitouchInputMode = function LMultitouchInputMode() {throw "LMultitouchInputMode cannot be instantiated";};
LMultitouchInputMode.NONE = "none";
LMultitouchInputMode.GESTURE = "gesture";
LMultitouchInputMode.TOUCH_POINT = "touchPoint";
var LMultitouch = function LMultitouch() {throw "LMultitouch cannot be instantiated";};
LMultitouch.inputMode = "none";
LMultitouch.touchs = [];
var LTimerEvent = function LTimerEvent() {throw "LTimerEvent cannot be instantiated";};
LTimerEvent.TIMER = "timer";
LTimerEvent.TIMER_COMPLETE = "timerComplete";
var LTextEvent = function LTextEvent() {throw "LTextEvent cannot be instantiated";};
LTextEvent.TEXT_INPUT = "textInput";
LTextEvent.WIND_COMPLETE = "windComplete";
var LFocusEvent = function LFocusEvent() {throw "LFocusEvent cannot be instantiated";};
LFocusEvent.FOCUS_IN = "focusIn";
LFocusEvent.FOCUS_OUT = "focusOut";
var LMouseEventContainer = function () {
  function MouseEventContainer() {
    var s = this;
    s.container = {};
    s.dispatchAllEvent = false;
    s.mouseDownContainer = [];
    s.mouseUpContainer = [];
    s.mouseMoveContainer = [];
    s.mouseOverContainer = [];
    s.mouseOutContainer = [];
    s.mouseDblContainer = [];
    s.textFieldInputContainer = [];
    s.buttonContainer = [];
  };
  MouseEventContainer.prototype = {
    pushInputBox: function pushInputBox(d) {
      var s = this,
      c = s.textFieldInputContainer,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (d.objectIndex == c[i].objectIndex) {
          return;
        }
      }
      s.textFieldInputContainer.push(d);
    },
    removeInputBox: function removeInputBox(d) {
      var s = this,
      c = s.textFieldInputContainer,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (d.objectIndex == c[i].objectIndex) {
          s.textFieldInputContainer.splice(i, 1);
          break;
        }
      }
    },
    pushButton: function pushButton(d) {
      var s = this,
      c = s.buttonContainer,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (d.objectIndex == c[i].objectIndex) {
          return;
        }
      }
      s.buttonContainer.push(d);
    },
    removeButton: function removeButton(d) {
      var s = this,
      c = s.buttonContainer,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (d.objectIndex == c[i].objectIndex) {
          s.buttonContainer.splice(i, 1);
          break;
        }
      }
    },
    dispatchEventButton: function dispatchEventButton(e) {
      var s = this,
      c = s.buttonContainer,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (typeof s.buttonContainer[i].ll_button_mode == "function") {
          s.buttonContainer[i].ll_button_mode(e);
        }
      }
    },
    addEvent: function addEvent(o, list, f, _this) {
      var s = this;
      list.push({ container: o, listener: f, _this: _this });
    },
    removeEvent: function removeEvent(o, list, f, _this) {
      var s = this,
      i,l;
      for (i = 0, l = list.length; i < l; i++) {
        if (list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f) && (
        !_this || !list[i]._this || list[i]._this.objectIndex == _this.objectIndex)) {
          list.splice(i, 1);
          break;
        }
      }
    },
    addMouseDownEvent: function addMouseDownEvent(o, f, _this) {
      var s = this;
      s.addEvent(o, s.mouseDownContainer, f, _this);
    },
    addMouseUpEvent: function addMouseUpEvent(o, f, _this) {
      var s = this;
      s.addEvent(o, s.mouseUpContainer, f, _this);
    },
    addMouseMoveEvent: function addMouseMoveEvent(o, f, _this) {
      var s = this;
      s.addEvent(o, s.mouseMoveContainer, f, _this);
    },
    addMouseOverEvent: function addMouseOverEvent(o, f, _this) {
      var s = this;
      s.addEvent(o, s.mouseOverContainer, f, _this);
    },
    addMouseOutEvent: function addMouseOutEvent(o, f, _this) {
      var s = this;
      s.addEvent(o, s.mouseOutContainer, f, _this);
    },
    addMouseDblEvent: function addMouseDblEvent(o, f, _this) {
      var s = this;
      s.addEvent(o, s.mouseDblContainer, f, _this);
    },
    addMouseEvent: function addMouseEvent(o, t, f, _this) {
      var s = this;
      if (t === LMouseEvent.MOUSE_DOWN) {
        s.addMouseDownEvent(o, f, _this);
      } else if (t === LMouseEvent.MOUSE_UP) {
        s.addMouseUpEvent(o, f, _this);
      } else if (t === LMouseEvent.MOUSE_OVER) {
        s.addMouseOverEvent(o, f, _this);
      } else if (t === LMouseEvent.MOUSE_OUT) {
        s.addMouseOutEvent(o, f, _this);
      } else if (t === LMouseEvent.MOUSE_MOVE) {
        s.addMouseMoveEvent(o, f, _this);
      } else {
        s.addMouseDblEvent(o, f, _this);
      }
    },
    hasEventListener: function hasEventListener(o, t, f) {
      var s = this,
      list;
      if (t == LMouseEvent.MOUSE_DOWN) {
        list = s.mouseDownContainer;
      } else if (t == LMouseEvent.MOUSE_UP) {
        list = s.mouseUpContainer;
      } else if (t == LMouseEvent.MOUSE_OVER) {
        list = s.mouseOverContainer;
      } else if (t == LMouseEvent.MOUSE_OUT) {
        list = s.mouseOutContainer;
      } else if (t == LMouseEvent.MOUSE_MOVE) {
        list = s.mouseMoveContainer;
      } else {
        list = s.mouseDblContainer;
      }
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f)) {
          return true;
        }
      }
      return false;
    },
    removeMouseDownEvent: function removeMouseDownEvent(o, f, _this) {
      var s = this;
      s.removeEvent(o, s.mouseDownContainer, f, _this);
    },
    removeMouseUpEvent: function removeMouseUpEvent(o, f, _this) {
      var s = this;
      s.removeEvent(o, s.mouseUpContainer, f, _this);
    },
    removeMouseMoveEvent: function removeMouseMoveEvent(o, f, _this) {
      var s = this;
      s.removeEvent(o, s.mouseMoveContainer, f, _this);
    },
    removeMouseOverEvent: function removeMouseOverEvent(o, f, _this) {
      var s = this;
      s.removeEvent(o, s.mouseOverContainer, f, _this);
    },
    removeMouseOutEvent: function removeMouseOutEvent(o, f, _this) {
      var s = this;
      s.removeEvent(o, s.mouseOutContainer, f, _this);
    },
    removeMouseDblEvent: function removeMouseDblEvent(o, f, _this) {
      var s = this;
      s.removeEvent(o, s.mouseDblContainer, f, _this);
    },
    removeMouseEvent: function removeMouseEvent(o, t, f, _this) {
      var s = this;
      if (t == LMouseEvent.MOUSE_DOWN) {
        s.removeMouseDownEvent(o, f, _this);
      } else if (t == LMouseEvent.MOUSE_UP) {
        s.removeMouseUpEvent(o, f, _this);
      } else if (t == LMouseEvent.MOUSE_OVER) {
        s.removeMouseOverEvent(o, f, _this);
      } else if (t == LMouseEvent.MOUSE_OUT) {
        s.removeMouseOutEvent(o, f, _this);
      } else if (t == LMouseEvent.MOUSE_MOVE) {
        s.removeMouseMoveEvent(o, f, _this);
      } else {
        s.removeMouseDblEvent(o, f, _this);
      }
    },
    dispatchMouseEvent: function dispatchMouseEvent(event, type) {
      var s = this;
      if (type == LMouseEvent.MOUSE_DOWN) {
        s.dispatchEvent(event, s.mouseDownContainer, LMouseEvent.MOUSE_DOWN);
        s.dispatchEvent(event, s.textFieldInputContainer);
      } else if (type == LMouseEvent.MOUSE_UP) {
        s.dispatchEvent(event, s.mouseUpContainer, LMouseEvent.MOUSE_UP);
      } else if (type == LMouseEvent.DOUBLE_CLICK) {
        s.dispatchEvent(event, s.mouseDblContainer, LMouseEvent.DOUBLE_CLICK);
      } else {
        s.dispatchEventButton(event);
        s.dispatchEvent(event, s.mouseOutContainer, LMouseEvent.MOUSE_OUT);
        s.dispatchEvent(event, s.mouseOverContainer, LMouseEvent.MOUSE_OVER);
        s.dispatchEvent(event, s.mouseMoveContainer, LMouseEvent.MOUSE_MOVE);
      }
    },
    getRootParams: function getRootParams(s) {
      var p = s.parent,
      r = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
      while (p && p != "root") {
        r.x *= p.scaleX;
        r.y *= p.scaleY;
        r.x += p.x;
        r.y += p.y;
        r.scaleX *= p.scaleX;
        r.scaleY *= p.scaleY;
        p = p.parent;
      }
      return r;
    },
    _mouseEnabled: function _mouseEnabled(sp) {
      var self = this;
      if (!sp || !sp.parent) {
        return false;
      }
      if (!sp.visible || typeof sp.mouseEnabled != UNDEFINED && !sp.mouseEnabled) {
        return false;
      }
      var p = sp.parent;
      while (p && p != "root") {
        if (!p.mouseEnabled || !p.mouseChildren || !p.visible) {
          return false;
        }
        p = p.parent;
        if (!p) {
          return false;
        }
      }
      return true;
    },
    _dispatchEvent: function _dispatchEvent(event, type, st, index, fromIndex, endIndex) {
      var self = this,
      i,j,o,l = st.length;
      for (i = fromIndex; i <= endIndex && i < l; i++) {
        o = st[i];
        if (o.sp.objectIndex != index) {
          continue;
        }
        event.currentTarget = event.clickTarget = o.sp;
        if (!event.target) {
          event.target = o.sp;
        }
        event.event_type = type;
        event.selfX = (event.offsetX - o.co.x - o.sp.x) / (o.co.scaleX * o.sp.scaleX);
        event.selfY = (event.offsetY - o.co.y - o.sp.y) / (o.co.scaleY * o.sp.scaleY);
        o.listener.call(o._this ? o._this : o, event, o.sp);
      }
    },
    dispatchEvent: function dispatchEvent(event, list, type) {
      var self = this,
      sp,co,st = [],
      o,i,l;
      for (i = 0, l = list.length; i < l; i++) {
        sp = list[i].container || list[i];
        if (!self._mouseEnabled(sp)) {
          continue;
        }
        co = self.getRootParams(sp);
        if (!type && sp.mouseEvent) {
          sp.mouseEvent(event, LMouseEvent.MOUSE_DOWN, co);
          continue;
        }
        if (sp.ismouseon(event, co)) {
          if (type == LMouseEvent.MOUSE_OUT) {
            continue;
          }
          if (type == LMouseEvent.MOUSE_OVER) {
            if (sp.ll_mousein) {
              continue;
            }
          }
          if (type != LMouseEvent.MOUSE_UP) {
            sp.ll_mousein = true;
          }
          st.push({ sp: sp, co: co, listener: list[i].listener, _this: list[i]._this });
        } else {
          if (type != LMouseEvent.MOUSE_OUT && type != LMouseEvent.MOUSE_OVER) {
            continue;
          }
          if (!sp.ll_mousein) {
            continue;
          }
          sp.ll_mousein = false;
          st.push({ sp: sp, co: co, listener: list[i].listener, _this: list[i]._this });
        }
      }
      if (st.length == 0) {
        return;
      }
      if (st.length > 1) {
        st = st.sort(self._sort.bind(self));
      }
      l = st.length;
      for (i = 0; i < l; i++) {
        o = st[i];
        self._dispatchEvent(event, type, st, o.sp.objectIndex, i, self.dispatchAllEvent ? l - 1 : i);
        if (i < st.length - 1 && o.sp.objectIndex == st[i + 1].sp.objectIndex) {
          st.splice(i, 1);
          i--;
          continue;
        }
        var p;
        while (true) {
          if (!p) {
            p = o.sp.parent;
            event.target = o.sp;
          }
          if (!p || p == "root") {
            break;
          }
          self._dispatchEvent(event, type, st, p.objectIndex, i + 1, l);
          event.target = p;
          p = p.parent;
          if (!p || p == "root") {
            break;
          }
        }
        if (!self.dispatchAllEvent) {
          break;
        } else {
          continue;
        }
      }
    },
    set: function set(t, v) {
      this.container[t] = v;
    },
    _sort: function _sort(a, b) {
      var s = this,
      o1,o2,al = s._getSort(a.sp),
      bl = s._getSort(b.sp),
      i,l1,l2;
      for (i = 0, l1 = al.length, l2 = bl.length; i < l1 && i < l2; i++) {
        o1 = al[i];
        o2 = bl[i];
        if (o1.objectIndex == o2.objectIndex) {
          continue;
        }
        return o2.parent.getChildIndex(o2) - o1.parent.getChildIndex(o1);
      }
      return bl.length - al.length;
    },
    _getSort: function _getSort(layer) {
      var p = layer.parent,
      list = [layer];
      while (p && p != "root") {
        list.unshift(p);
        p = p.parent;
      }
      return list;
    } };

  var container = new MouseEventContainer();
  container.set(LMouseEvent.MOUSE_DOWN, true);
  container.set(LMouseEvent.MOUSE_UP, true);
  container.set(LMouseEvent.MOUSE_MOVE, true);
  return container;
}();
var LKeyboardEvent = function LKeyboardEvent() {throw "LKeyboardEvent cannot be instantiated";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PRESS = "keypress";
var LAccelerometerEvent = function LAccelerometerEvent() {throw "LAccelerometerEvent cannot be instantiated";};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";

function LStageAlign() {throw "LStageAlign cannot be instantiated";}
LStageAlign.TOP = "T";
LStageAlign.BOTTOM = "B";
LStageAlign.LEFT = "L";
LStageAlign.RIGHT = "Re";
LStageAlign.TOP_LEFT = "TL";
LStageAlign.TOP_RIGHT = "TR";
LStageAlign.TOP_MIDDLE = "TM";
LStageAlign.BOTTOM_LEFT = "BL";
LStageAlign.BOTTOM_RIGHT = "BR";
LStageAlign.BOTTOM_MIDDLE = "BM";
LStageAlign.MIDDLE = "M";

function LStageScaleMode() {throw "LStageScaleMode cannot be instantiated";}
LStageScaleMode.EXACT_FIT = "exactFit";
LStageScaleMode.SHOW_ALL = "showAll";
LStageScaleMode.NO_BORDER = "noBorder";
LStageScaleMode.NO_SCALE = "noScale";
var LGlobal = function () {
  function LGlobal() {
    throw "LGlobal cannot be instantiated";
  }
  LGlobal.FULL_SCREEN = "full_screen";
  LGlobal.traceDebug = false;
  LGlobal.displayState = NONE;
  LGlobal.aspectRatio = NONE;
  LGlobal.canvasObj = null;
  LGlobal.canvas = null;
  LGlobal.webAudio = true;
  LGlobal.objectIndex = 1;
  LGlobal.stage = null;
  LGlobal.width = 0;
  LGlobal.height = 0;
  LGlobal.box2d = null;
  LGlobal.speed = 50;
  LGlobal.IS_MOUSE_DOWN = false;
  LGlobal.stopPropagation = false;
  LGlobal.preventDefault = true;
  LGlobal.childList = new Array();
  LGlobal.dragList = new Array();
  LGlobal.excludingContainer = new Array();
  LGlobal.fpsStatus = null;
  LGlobal.stageScale = "noScale";
  LGlobal.align = "M";
  LGlobal.mobile = false;
  LGlobal.canTouch = false;
  LGlobal.wx = false;
  LGlobal.os = OS_PC;
  LGlobal.ios = false;
  LGlobal.android = false;
  LGlobal.android_new = false;
  LGlobal.backgroundColor = null;
  LGlobal.destroy = true;
  LGlobal.forceRefresh = false;
  LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
  LGlobal.startTimer = 0;
  LGlobal.keepClear = true;
  LGlobal.top = 0;
  LGlobal.left = 0;
  LGlobal.enableWebGL = function () {
    return typeof enableWebGLCanvas !== UNDEFINED;
  }();
  LGlobal.window = window;
  (function (n) {
    if (typeof wx !== 'undefined' && typeof GameGlobal !== 'undefined') {
      LGlobal.wx = true;
    }
    LGlobal.isOldFirefox = function (un) {
      var i = un.toLowerCase().indexOf('firefox');
      if (i < 0) {
        return false;
      }
      var v = un.substring(i + 8, un.length);
      return parseFloat(v) < 39.0;
    }(n);
    if (n.indexOf(OS_IPHONE) > 0) {
      LGlobal.os = OS_IPHONE;
      LGlobal.canTouch = true;
      LGlobal.ios = true;
    } else if (n.indexOf(OS_IPOD) > 0) {
      LGlobal.os = OS_IPOD;
      LGlobal.canTouch = true;
      LGlobal.ios = true;
    } else if (n.indexOf(OS_IPAD) > 0) {
      LGlobal.os = OS_IPAD;
      LGlobal.ios = true;
      LGlobal.canTouch = true;
    } else if (n.indexOf(OS_ANDROID) > 0) {
      LGlobal.os = OS_ANDROID;
      LGlobal.canTouch = true;
      LGlobal.android = true;
      var i = n.indexOf(OS_ANDROID);
      if (parseInt(n.substr(i + 8, 1)) > 3) {
        LGlobal.android_new = true;
      }
    } else if (n.indexOf(OS_WINDOWS_PHONE) > 0) {
      LGlobal.os = OS_WINDOWS_PHONE;
      LGlobal.canTouch = true;
    } else if (n.indexOf(OS_BLACK_BERRY) > 0) {
      LGlobal.os = OS_BLACK_BERRY;
      LGlobal.canTouch = true;
    }
    if (LGlobal.ios) {
      var v = n.match(/OS\s(\d+)_(\d+)_?(\d+)?/);
      LGlobal.iOSversion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
    LGlobal.mobile = LGlobal.canTouch;
  })(navigator.userAgent);
  LGlobal.setDebug = function (v) {
    LGlobal.traceDebug = v;
  };
  LGlobal.setCanvas = function (id, w, h) {
    LGlobal.ll_createCanvas(id, w, h);
    LGlobal.ll_createStage();
    if (LGlobal.displayState == LStage.FULL_SCREEN) {
      LGlobal.resize();
    } else if (typeof LGlobal.displayState == "number") {
      LGlobal.resize(LGlobal.canvasObj.width * LGlobal.displayState, LGlobal.canvasObj.height * LGlobal.displayState);
    }
    if (LGlobal.canTouch) {
      LGlobal.ll_clicks = 0;
      LGlobal.ll_prev_clickTime = 0;
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.TOUCH_START, LGlobal.ll_touchStart);
      LEvent.addEventListener(document, LMouseEvent.TOUCH_END, LGlobal.ll_touchEnd);
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.TOUCH_MOVE, LGlobal.ll_touchMove);
    } else {
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.DOUBLE_CLICK, LGlobal.ll_mouseDbclick);
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.MOUSE_DOWN, LGlobal.ll_mouseDown);
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.MOUSE_MOVE, LGlobal.ll_mouseMove);
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.MOUSE_UP, LGlobal.ll_mouseUp);
      LEvent.addEventListener(LGlobal.canvasObj, LMouseEvent.MOUSE_OUT, LGlobal.ll_mouseOut);
    }
  };
  LGlobal.ll_createCanvas = function (id, w, h) {
    LGlobal.id = id;
    if (LGlobal.wx) {
      LGlobal.canvasObj = document.getElementsByTagName('canvas')[0];
      LGlobal.object = {
        style: {
          left: 0,
          top: 0 } };


      LGlobal.canvasObj.style = {
        marginLeft: 0,
        marginTop: 0 };

    } else {
      LGlobal.object = document.getElementById(id);
      LGlobal.object.innerHTML = '<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">' +
      '<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:' + w + 'px;height:' + h + 'px;">' +
      '<div id="noCanvas">' +
      "<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>" +
      '</div>' +
      '</canvas></div>' +
      '<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">' +
      '<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>' +
      '<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />' +
      '<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
      LGlobal.canvasObj = document.getElementById(LGlobal.id + "_canvas");
      LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
      LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
      LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
      LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
    }
    LGlobal._canvas = document.createElement("canvas");
    LGlobal._context = LGlobal._canvas.getContext("2d");
    if (LGlobal._context) {
      LGlobal.canvasObj.innerHTML = "";
    }
    LGlobal.inputTextField = null;
    if (LGlobal.wx) {
      LGlobal._content_width = w;
      LGlobal._content_height = h;
      if (LGlobal.canvasObj.width / LGlobal.canvasObj.height > w / h) {
        w = LGlobal.canvasObj.width * h / LGlobal.canvasObj.height;
      } else {
        h = LGlobal.canvasObj.height * w / LGlobal.canvasObj.width;
      }
    }
    LGlobal.canvasObj.width = w;
    LGlobal.canvasObj.height = h;
    LGlobal.width = LGlobal._content_width || w;
    LGlobal.height = LGlobal._content_height || h;
    LGlobal.canvasStyleWidth = LGlobal.canvasObj.width;
    LGlobal.canvasStyleHeight = LGlobal.canvasObj.height;
    LGlobal.canvas = function () {
      if (LGlobal.enableWebGL && typeof enableWebGLCanvas === 'function') {
        return enableWebGLCanvas(LGlobal.canvasObj);
      }
      return LGlobal.canvasObj.getContext('2d');
    }();
    LGlobal.offsetX = mouseX = 0;
    LGlobal.offsetY = mouseY = 0;
  };
  LGlobal.ll_createStage = function () {
    LGlobal.stage = new LSprite();
    LGlobal.stage.parent = "root";
    LGlobal.childList.push(LGlobal.stage);
    if (LGlobal.wx) {
      LGlobal.stageMask = new LSprite();
      LGlobal.childList.push(LGlobal.stageMask);
    }
    LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
    LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
    LGlobal.stage.addEventListener = function (type, listener) {
      if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
        if (type == LEvent.WINDOW_RESIZE) {
          LGlobal.stage.onresizeListener = listener;
        } else {
          LGlobal.stage.onorientationchangeListener = listener;
        }
        if (!LGlobal.stage.onresize) {
          LGlobal.stage.onresize = function (e) {
            LGlobal.stage.onresizeEvent = e;
          };
          LEvent.addEventListener(LGlobal.window, type, LGlobal.stage.onresize);
        }
      } else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
        LEvent.addEventListener(LGlobal.window, type, listener);
      } else {
        LGlobal.stage.baseAddEvent(type, listener);
      }
    };
    LGlobal.stage.removeEventListener = function (type, listener) {
      if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
        if (type == LEvent.WINDOW_RESIZE) {
          delete LGlobal.stage.onresizeListener;
          if (LGlobal.stage.onorientationchangeListener) {
            return;
          }
        } else {
          delete LGlobal.stage.onorientationchangeListener;
          if (LGlobal.stage.onresizeListener) {
            return;
          }
        }
        LEvent.removeEventListener(LGlobal.window, LEvent.WINDOW_RESIZE, LGlobal.stage.onresize);
        delete LGlobal.stage.onresize;
      } else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
        LEvent.removeEventListener(LGlobal.window, type, listener);
      } else {
        LGlobal.stage.baseRemoveEvent(type, listener);
      }
    };
    LGlobal.innerWidth = window.innerWidth;
    LGlobal.innerHeight = window.innerHeight;
    LEvent.addEventListener(LGlobal.window, "blur", function () {
      LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
    });
  };
  LGlobal.ll_touchStart = function (event) {
    LGlobal._outStageCheckCount = 1;
    LGlobal.IS_MOUSE_DOWN = true;
    LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
    if (LGlobal.inputTextField) {
      LGlobal.inputTextField._ll_getValue();
    }
    var canvasX, canvasY, eve, k, i;
    canvasX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
    canvasY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
    if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
      eve = LGlobal.ll_touchStartEvent(event, 0, canvasX, canvasY);
    } else if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
      for (var i = 0, l = event.touches.length; i < l; i++) {
        if (!LMultitouch.touchs["touch" + event.touches[i].identifier]) {
          eve = LGlobal.ll_touchStartEvent(event, i, canvasX, canvasY);
        }
      }
    }
    var date = new Date();
    var clickTime = date.getTime();
    LGlobal.ll_clicks = clickTime <= LGlobal.ll_prev_clickTime + 500 ? LGlobal.ll_clicks + 1 : 1;
    LGlobal.ll_prev_clickTime = clickTime;
    if (LGlobal.ll_clicks === 2) {
      LGlobal.mouseEvent(eve, LMouseEvent.DOUBLE_CLICK);
      LGlobal.ll_clicks = 0;
    }
    if (LGlobal.mouseJoint_start) {
      LGlobal.mouseJoint_start(eve);
    }
    LGlobal.touchHandler(event);
    LSound.startLoad();
  };
  LGlobal.ll_touchStartEvent = function (event, eveIndex, canvasX, canvasY) {
    var eve = {
      offsetX: event.touches[eveIndex].pageX - canvasX,
      offsetY: event.touches[eveIndex].pageY - canvasY,
      touchPointID: event.touches[eveIndex].identifier,
      force: event.touches[eveIndex].force,
      rotationAngle: event.touches[eveIndex].rotationAngle,
      radiusX: event.touches[eveIndex].radiusX,
      radiusY: event.touches[eveIndex].radiusY };

    eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
    eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
    mouseX = LGlobal.offsetX = eve.offsetX;
    mouseY = LGlobal.offsetY = eve.offsetY;
    LMultitouch.touchs["touch" + eve.touchPointID] = eve;
    LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_DOWN);
    LGlobal.buttonStatusEvent = eve;
    return eve;
  };
  LGlobal.ll_touchEnd = function (event) {
    var e, eve, k, i, l, h;
    LGlobal.IS_MOUSE_DOWN = false;
    if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
      for (k in LMultitouch.touchs) {
        e = LMultitouch.touchs[k];
        h = false;
        for (i = 0, l = event.touches.length; i < l; i++) {
          if (event.touches[i].identifier == e.touchPointID) {
            h = true;
            break;
          }
        }
        if (!h) {
          eve = e;
          delete LMultitouch.touchs[k];
          LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
        }
      }
    }
    if (!eve) {
      eve = { offsetX: LGlobal.offsetX, offsetY: LGlobal.offsetY };
      LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
    }
    LGlobal.touchHandler(event);
    LGlobal.buttonStatusEvent = null;
    if (LGlobal.mouseJoint_end) {
      LGlobal.mouseJoint_end();
    }
    LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
  };
  LGlobal.ll_touchMove = function (e) {
    var cX,cY,eve,l,ll = e.touches.length;
    cX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
    cY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
    if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
      ll = 1;
    }
    for (var i = 0, l = e.touches.length; i < l && i < ll; i++) {
      eve = { offsetX: e.touches[i].pageX - cX, offsetY: e.touches[i].pageY - cY, touchPointID: e.touches[i].identifier };
      eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
      eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
      mouseX = LGlobal.offsetX = eve.offsetX;
      mouseY = LGlobal.offsetY = eve.offsetY;
      if (LMultitouch.touchs["touch" + eve.touchPointID] &&
      LMultitouch.touchs["touch" + eve.touchPointID].offsetX == eve.offsetX &&
      LMultitouch.touchs["touch" + eve.touchPointID].offsetY == eve.offsetY) {
        continue;
      }
      LGlobal.buttonStatusEvent = eve;
      LMultitouch.touchs["touch" + eve.touchPointID] = eve;
      if (eve.offsetX <= 0 || eve.offsetX >= LGlobal.innerWidth || eve.offsetX >= LGlobal.canvasObj.width || eve.offsetY <= 0 || eve.offsetY >= LGlobal.innerHeight || eve.offsetY >= LGlobal.canvasObj.height) {
        LGlobal._outStageCheckCount = 0;
      } else {
        LGlobal._outStageCheckCount = 1;
      }
      LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_MOVE);
    }
    LGlobal.touchHandler(e);
    if (LGlobal.mouseJoint_move) {
      LGlobal.mouseJoint_move(eve);
    }
  };
  LGlobal.ll_mouseDbclick = function (e) {
    if (e.offsetX == null && e.layerX != null) {
      e.offsetX = e.layerX;
      e.offsetY = e.layerY;
    }
    var event = { button: e.button };
    event.offsetX = LGlobal.ll_scaleX(e.offsetX);
    event.offsetY = LGlobal.ll_scaleY(e.offsetY);
    LGlobal.mouseEvent(event, LMouseEvent.DOUBLE_CLICK);
  };
  LGlobal.ll_mouseDown = function (e) {
    if (e.offsetX == null && e.layerX != null) {
      e.offsetX = e.layerX;
      e.offsetY = e.layerY;
    }
    if (LGlobal.inputTextField) {
      LGlobal.inputTextField._ll_getValue();
    }
    var event = { button: e.button };
    event.offsetX = LGlobal.ll_scaleX(e.offsetX);
    event.offsetY = LGlobal.ll_scaleY(e.offsetY);
    LGlobal.mouseEvent(event, LMouseEvent.MOUSE_DOWN);
    LGlobal.IS_MOUSE_DOWN = true;
    if (LGlobal.mouseJoint_start) {
      LGlobal.mouseJoint_start(event);
    }
    LSound.startLoad();
  };
  LGlobal.ll_mouseMove = function (e) {
    if (e.offsetX == null && e.layerX != null) {
      e.offsetX = e.layerX;
      e.offsetY = e.layerY;
    }
    var event = {};
    event.offsetX = LGlobal.ll_scaleX(e.offsetX);
    event.offsetY = LGlobal.ll_scaleY(e.offsetY);
    LGlobal.buttonStatusEvent = event;
    mouseX = LGlobal.offsetX = event.offsetX;
    mouseY = LGlobal.offsetY = event.offsetY;
    LGlobal.cursor = "default";
    if (mouseX <= 0 || mouseX >= LGlobal.innerWidth || mouseX >= LGlobal.canvasObj.width || mouseY <= 0 || mouseY >= LGlobal.innerHeight || mouseY >= LGlobal.canvasObj.height) {
      if (LGlobal._outStageCheckCount) {
        LGlobal._outStageCheckCount = 0;
        LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
      }
    } else {
      if (!LGlobal._outStageCheckCount) {
        LGlobal._outStageCheckCount = 1;
        LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
      }
    }
    LGlobal.mouseEvent(event, LMouseEvent.MOUSE_MOVE);
    document.body.style.cursor = LGlobal.cursor;
    if (LGlobal.mouseJoint_move) {
      LGlobal.mouseJoint_move(event);
    }
  };
  LGlobal.ll_mouseUp = function (e) {
    if (e.offsetX == null && e.layerX != null) {
      e.offsetX = e.layerX;
      e.offsetY = e.layerY;
    }
    var event = { button: e.button };
    event.offsetX = LGlobal.ll_scaleX(e.offsetX);
    event.offsetY = LGlobal.ll_scaleY(e.offsetY);
    LGlobal.mouseEvent(event, LMouseEvent.MOUSE_UP);
    LGlobal.IS_MOUSE_DOWN = false;
    if (LGlobal.mouseJoint_end) {
      LGlobal.mouseJoint_end();
    }
  };
  LGlobal.ll_mouseOut = function (e) {
    if (e.offsetX == null && e.layerX != null) {
      e.offsetX = e.layerX;
      e.offsetY = e.layerY;
    }
    var event = {};
    event.offsetX = LGlobal.ll_scaleX(e.offsetX);
    event.offsetY = LGlobal.ll_scaleY(e.offsetY);
    LGlobal.mouseEvent(event, LMouseEvent.MOUSE_OUT);
    LGlobal.IS_MOUSE_DOWN = false;
  };
  LGlobal.touchHandler = function (e) {
    if (LGlobal.stopPropagation) {
      e.stopPropagation();
      if (e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
    }
    if (LGlobal.preventDefault) {
      e.preventDefault();
    }
    return e;
  };
  LGlobal.mouseEvent = function (e, t) {
    if (t == LMouseEvent.MOUSE_MOVE) {
      LGlobal.dragHandler(e);
    }
    if (LMouseEventContainer.container[t]) {
      LMouseEventContainer.dispatchMouseEvent(e, t);
      return;
    }
    for (var k = LGlobal.childList.length - 1; k >= 0; k--) {
      if (LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e, t)) {
        break;
      }
    }
  };
  LGlobal.dragHandler = function (e) {
    var i,s,c,d = LGlobal.dragList;
    for (i = d.length - 1; i >= 0; i--) {
      s = d[i];
      if (LGlobal.canTouch && s.ll_touchPointID != e.touchPointID) {
        continue;
      }
      c = s.parent.globalToLocal(new LPoint(e.offsetX - s.ll_dragMX + s.ll_dragGlobalPoint.x, e.offsetY - s.ll_dragMY + s.ll_dragGlobalPoint.y));
      s.x = c.x;
      s.y = c.y;
      if (s.dragRange) {
        if (s.x < s.dragRange.left) {
          s.x = s.dragRange.left;
        } else if (s.x > s.dragRange.right) {
          s.x = s.dragRange.right;
        }
        if (s.y < s.dragRange.top) {
          s.y = s.dragRange.top;
        } else if (s.y > s.dragRange.bottom) {
          s.y = s.dragRange.bottom;
        }
      }
      break;
    }
  };
  LGlobal._ll_mobile = function () {
    var w1 = LGlobal.canvasObj.width * 0.3,
    h1 = w1 * 1.5,
    s = LGlobal.canvasObj.width * 0.05,
    ss = w1 * 0.05,
    sm = w1 * 0.15,
    sx = w1 * 0.3,
    sh = h1 * 0.20,
    c = '#cccccc',
    d = '#000000',
    f = '#ffffff',
    h = '#ff0000',
    b,w1,h1,m,m1,n,v;
    b = new LSprite();
    addChild(b);
    w1 = LGlobal.canvasObj.width * 0.3, h1 = w1 * 1.5;
    b.graphics.drawRoundRect(1, d, [s, s, w1, h1, s], true, c);
    b.graphics.drawRoundRect(1, d, [s + ss, s + ss, w1 - ss * 2, h1 - ss * 2, s], true, d);
    b.graphics.drawRect(1, f, [s + sm, s + sh, w1 - sm * 2, h1 - sh * 2], true, f);
    b.graphics.drawArc(1, f, [s + w1 * 0.5, s + h1 - ss * 3.5, ss * 1.5, 0, 2 * Math.PI]);
    b.graphics.drawRoundRect(1, f, [s + sx, s + sm, w1 - sx * 2, ss, ss * 0.5]);
    m = new LSprite();
    m.x = -(w1 - sm * 2) * 0.5;
    m.y = -ss * 0.5;
    m.graphics.drawRect(1, h, [0, 0, w1 - sm * 2, ss], true, h);
    m1 = new LSprite();
    m1.y = -(w1 - sm * 2) * 0.5;
    m1.x = -ss * 0.5;
    m1.graphics.drawRect(1, h, [0, 0, ss, w1 - sm * 2], true, h);
    n = new LSprite();
    n.x = s + sx + (w1 - sx * 2) * 0.5;
    n.y = s + sh + (h1 - sh * 2) * 0.5;
    n.rotate = 45;
    n.addChild(m);
    n.addChild(m1);
    b.addChild(n);
    v = new LSprite();
    v.graphics.drawVertices(2, d, [
    [0, 0],
    [sm, sm],
    [0, sm * 2]],
    true, c);
    v.x = s * 1.5 + h1;
    v.y = s * 1.5 + h1 * 0.5;
    addChild(v);
    b.arrow = v;
    var fn = function fn() {
      setTimeout(function () {
        location.href = location.href;
      }, 100);
    };
    window.onorientationchange = fn;
    return b;
  };
  LGlobal.verticalError = function () {
    var w1 = LGlobal.canvasObj.width * 0.3,
    s = LGlobal.canvasObj.width * 0.05;
    var b = LGlobal._ll_mobile();
    var d = b.clone();
    d.getChildAt(0).visible = false;
    d.x = LGlobal.canvasObj.width * 0.5 + s;
    addChild(d);
    b.rotate = 90;
    b.x = LGlobal.canvasObj.width * 0.5 + s;
    b.y = w1 * 0.5;
  };
  LGlobal.horizontalError = function () {
    var w1 = LGlobal.canvasObj.width * 0.3,
    s = LGlobal.canvasObj.width * 0.05;
    var b = LGlobal._ll_mobile();
    var d = b.clone();
    d.getChildAt(0).visible = false;
    d.rotate = 90;
    d.x = LGlobal.canvasObj.width - s;
    d.y = w1 * 0.5;
    addChild(d);
    b.arrow.x = s * 1.5 + w1;
  };
  LGlobal.onShow = function () {
    if (LGlobal.canvas == null) {
      return;
    }
    if (LGlobal.enableWebGL) {
      LGlobal.canvas.start2D();
      LGlobal.canvas.globalAlpha = 1;
    }
    if (LGlobal._outStageCheckCount <= 0) {
      LGlobal._outStageCheckCount--;
      if (LGlobal._outStageCheckCount < -2) {
        LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
        LGlobal._outStageCheckCount = 1;
      }
    }
    if (LGlobal.fpsStatus) {
      LGlobal.fpsStatus.reset();
    }
    if (LGlobal.stage.onresizeEvent) {
      if (LGlobal.stage.onresizeListener) {
        LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
      }
      if (LGlobal.stage.onorientationchangeListener) {
        LGlobal.stage.onorientationchangeListener({ orientation: window.innerWidth > window.innerHeight ? LANDSCAPE : PORTRAIT });
      }
      delete LGlobal.stage.onresizeEvent;
    }
    if (LGlobal.forceRefresh) {
      LGlobal.canvasObj.width = LGlobal.canvasObj.width;
      LGlobal.forceRefresh = false;
    }
    LGlobal.canvas.beginPath();
    if (LGlobal.box2d != null) {
      LGlobal.box2d.ll_show();
      if (!LGlobal.traceDebug && LGlobal.keepClear) {
        LGlobal.canvas.clearRect(0, 0, LGlobal.canvasObj.width + 1, LGlobal.canvasObj.height + 1);
      }
    } else {
      if (LGlobal.keepClear) {
        LGlobal.canvas.clearRect(0, 0, LGlobal.canvasObj.width + 1, LGlobal.canvasObj.height + 1);
      }
      if (LGlobal.backgroundColor !== null) {
        LGlobal.canvas.fillStyle = LGlobal.backgroundColor;
        LGlobal.canvas.fillRect(0, 0, LGlobal.canvasObj.width, LGlobal.canvasObj.height);
      }
    }
    LGlobal.show(LGlobal.childList, LGlobal.canvas);
    if (LGlobal.enableWebGL) {
      LGlobal.canvas.finish2D();
    }
  };
  LGlobal.show = function (s, ctx) {
    ctx = ctx || LGlobal.canvas;
    for (var i = 0, l = s.length, c; i < l; i++) {
      c = s[i];
      if (c && c.ll_show) {
        c.ll_show(ctx);
        if (c._ll_removeFromSelf) {
          i--;
          l--;
        }
      }
    }
  };
  LGlobal.divideCoordinate = function (w, h, row, col) {
    var i,j,cw = w / col,
    ch = h / row,
    r = [],
    c;
    for (i = 0; i < row; i++) {
      c = [];
      for (j = 0; j < col; j++) {
        c.push({ x: cw * j, y: ch * i, width: cw, height: ch });
      }
      r.push(c);
    }
    return r;
  };
  LGlobal._create_loading_color = function () {
    var co = LGlobal.canvas.createRadialGradient(LGlobal.canvasObj.width / 2, LGlobal.canvasObj.height, 0, LGlobal.canvasObj.width / 2, 0, LGlobal.canvasObj.height);
    co.addColorStop(0, "red");
    co.addColorStop(0.3, "orange");
    co.addColorStop(0.4, "yellow");
    co.addColorStop(0.5, "green");
    co.addColorStop(0.8, "blue");
    co.addColorStop(1, "violet");
    return co;
  };
  LGlobal.hitPolygon = function (list, x, y) {
    var c = 0,
    p0 = list[0],
    b0x = x <= p0[0],
    b0y = y <= p0[1],
    i,l,p1,b1x,b1y;
    for (i = 1, l = list.length; i < l + 1; i++) {
      p1 = list[i % l];
      b1x = x <= p1[0];
      b1y = y <= p1[1];
      if (b0y != b1y) {
        if (b0x == b1x) {
          if (b0x) {
            c += b0y ? -1 : 1;
          }
        } else {
          if (x <= p0[0] + (p1[0] - p0[0]) * (y - p0[1]) / (p1[1] - p0[1])) {
            c += b0y ? -1 : 1;
          }
        }
      }
      p0 = p1;
      b0x = b1x;
      b0y = b1y;
    }
    return 0 != c;
  };
  LGlobal.hitTestPolygon = function (p1, p2) {
    var i,j,l,listA,normals,vecs,list = [
    [p1, [],
    []],

    [p2, [],
    []]];


    for (j = 0; j < list.length; j++) {
      listA = list[j][0], normals = list[j][1];
      for (i = 0, l = listA.length; i < l; i++) {
        list[j][2].push(new LVec2(listA[i][0], listA[i][1]));
        if (i < l - 1) {
          normals.push(new LVec2(listA[i + 1][0] - listA[i][0], listA[i + 1][1] - listA[i][1]).normL());
        }
      }
      normals.push(new LVec2(listA[0][0] - listA[l - 1][0], listA[0][1] - listA[l - 1][1]).normL());
    }
    for (j = 0; j < list.length; j++) {
      normals = list[j][1];
      for (i = 0, l = normals.length; i < l; i++) {
        var r1 = LVec2.getMinMax(list[0][2], normals[i]);
        var r2 = LVec2.getMinMax(list[1][2], normals[i]);
        if (r1.max_o < r2.min_o || r1.min_o > r2.max_o) {
          return false;
        }
      }
    }
    return true;
  };
  LGlobal.hitTestPolygonArc = function (vs, arc) {
    if (LGlobal.hitPolygon(vs, arc[0], arc[1])) {
      return true;
    }
    var i, j, l, p1, p2, v1, v2, ext, inn, l2;
    for (i = 0, l = vs.length; i < l; i++) {
      j = i < l - 1 ? i + 1 : 0;
      p1 = vs[i], p2 = vs[j];
      v1 = new LVec2(arc[0] - p1[0], arc[1] - p1[1]), v2 = new LVec2(p2[0] - p1[0], p2[1] - p1[1]);
      l2 = v2.normalize();
      inn = LVec2.dot(v1, l2);
      if (inn <= 0) {
        if (v1.x * v1.x + v1.y * v1.y < arc[3]) {
          return true;
        }
      } else if (inn * inn < v2.x * v2.x + v2.y * v2.y) {
        ext = LVec2.cross(v1, l2);
        if (ext * ext < arc[3]) {
          return true;
        }
      }
    }
    return false;
  };
  LGlobal.hitTestArc = function (objA, objB, objAR, objBR) {
    var rA = objA.getWidth() * 0.5,
    rB = objB.getWidth() * 0.5,
    xA = objA._startX ? objA._startX() : objA.startX(),
    xB = objB._startX ? objB._startX() : objB.startX(),
    yA = objA._startY ? objA._startY() : objA.startY(),
    yB = objB._startY ? objB._startY() : objB.startY();
    if (typeof objAR != UNDEFINED) {
      xA += rA - objAR;
      yA += rA - objAR;
      rA = objAR;
    }
    if (typeof objBR != UNDEFINED) {
      xB += rB - objBR;
      yB += rB - objBR;
      rB = objBR;
    }
    var disx = xA + rA - xB - rB,
    disy = yA + rA - yB - rB;
    return disx * disx + disy * disy < (rA + rB) * (rA + rB);
  };
  LGlobal.hitTestRect = function (objA, objB, vecA, vecB) {
    var wA = objA.getWidth(),
    wB = objB.getWidth(),
    hA = objA.getHeight(),
    hB = objB.getHeight(),
    xA = objA._startX ? objA._startX() : objA.startX(),
    xB = objB._startX ? objB._startX() : objB.startX(),
    yA = objA._startY ? objA._startY() : objA.startY(),
    yB = objB._startY ? objB._startY() : objB.startY();
    if (typeof vecA != UNDEFINED) {
      xA += (wA - vecA[0]) * 0.5;
      yA += (hA - vecA[1]) * 0.5;
      wA = vecA[0];
      hA = vecA[1];
    }
    if (typeof vecB != UNDEFINED) {
      xB += (wB - vecB[0]) * 0.5;
      yB += (hB - vecB[1]) * 0.5;
      wB = vecB[0];
      hB = vecB[1];
    }
    var minx = xA > xB ? xA : xB,
    miny = yA > yB ? yA : yB,
    maxx = xA + wA > xB + wB ? xB + wB : xA + wA,
    maxy = yA + hA > yB + hB ? yB + hB : yA + hA;
    return minx <= maxx && miny <= maxy;
  };
  LGlobal.hitTest = LGlobal.hitTestRect;
  LGlobal.setFrameRate = function (s) {
    if (LGlobal.frameRate) {
      clearInterval(LGlobal.frameRate);
    }
    LGlobal.speed = s;
    LGlobal.frameRate = setInterval(function () {
      LGlobal.onShow();
    }, s);
  };
  LGlobal.ll_scaleX = function (v) {
    return (v - LGlobal.left) * LGlobal.canvasObj.width / LGlobal.canvasStyleWidth;
  };
  LGlobal.ll_scaleY = function (v) {
    return (v - LGlobal.top) * LGlobal.canvasObj.height / LGlobal.canvasStyleHeight;
  };
  LGlobal.ll_setStageSize = function (w, h) {
    w = Math.ceil(w);
    h = Math.ceil(h);
    LGlobal.canvasObj.style.width = w + "px";
    LGlobal.canvasObj.style.height = h + "px";
    LGlobal.canvasStyleWidth = w;
    LGlobal.canvasStyleHeight = h;
  };
  LGlobal.resize = function (canvasW, canvasH) {
    LGlobal.resizeWx(canvasW, canvasH);
    var w,h,t = 0,
    l = 0,
    ww = window.innerWidth,
    wh = window.innerHeight;
    LGlobal.innerWidth = ww;
    LGlobal.innerHeight = wh;
    if (canvasW) {
      w = canvasW;
    }
    if (canvasH) {
      h = canvasH;
    }
    if (LGlobal.stageScale == "noScale") {
      w = canvasW || LGlobal.canvasObj.width;
      h = canvasH || LGlobal.canvasObj.height;
    }
    switch (LGlobal.stageScale) {
      case "exactFit":
        w = canvasW || ww;
        h = canvasH || wh;
        break;
      case "noBorder":
        w = canvasW || ww;
        h = canvasH || LGlobal.canvasObj.height * ww / LGlobal.canvasObj.width;
        switch (LGlobal.align) {
          case LStageAlign.BOTTOM:
          case LStageAlign.BOTTOM_LEFT:
          case LStageAlign.BOTTOM_RIGHT:
          case LStageAlign.BOTTOM_MIDDLE:
            t = wh - h;
            break;}

        break;
      case "showAll":
        if (ww / wh > LGlobal.canvasObj.width / LGlobal.canvasObj.height) {
          h = canvasH || wh;
          w = canvasW || LGlobal.canvasObj.width * wh / LGlobal.canvasObj.height;
        } else {
          w = canvasW || ww;
          h = canvasH || LGlobal.canvasObj.height * ww / LGlobal.canvasObj.width;
        }
      case "noScale":
      default:
        switch (LGlobal.align) {
          case LStageAlign.BOTTOM:
          case LStageAlign.BOTTOM_LEFT:
            t = wh - h;
            break;
          case LStageAlign.RIGHT:
          case LStageAlign.TOP_RIGHT:
            l = ww - w;
            break;
          case LStageAlign.TOP_MIDDLE:
            l = (ww - w) * 0.5;
            break;
          case LStageAlign.BOTTOM_RIGHT:
            t = wh - h;
            l = ww - w;
            break;
          case LStageAlign.BOTTOM_MIDDLE:
            t = wh - h;
            l = (ww - w) * 0.5;
            break;
          case LStageAlign.MIDDLE:
            t = (wh - h) * 0.5;
            l = (ww - w) * 0.5;
            break;
          case LStageAlign.TOP:
          case LStageAlign.LEFT:
          case LStageAlign.TOP_LEFT:
          default:}}


    LGlobal.canvasObj.style.marginTop = t + "px";
    LGlobal.canvasObj.style.marginLeft = l + "px";
    if (LGlobal.isOldFirefox) {
      LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
      LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
    }
    LGlobal.ll_setStageSize(w, h);
  };
  LGlobal.resizeWx = function (canvasW, canvasH) {
    if (!LGlobal.wx) {
      return;
    }
    LGlobal.stageMask.removeAllChild();
    canvasW = canvasW || LGlobal._content_width;
    canvasH = canvasH || LGlobal._content_height;
    if (LGlobal.stageScale === "exactFit") {
      LGlobal.canvasObj.width = LGlobal._content_width;
      LGlobal.canvasObj.height = LGlobal._content_height;
    } else if (LGlobal.stageScale === "showAll") {
      LGlobal.stage.x = (LGlobal.canvasObj.width - LGlobal._content_width) * 0.5;
      LGlobal.stage.y = (LGlobal.canvasObj.height - LGlobal._content_height) * 0.5;
    }
    var shape;
    if (LGlobal.stage.x > 0) {
      shape = new LShape();
      shape.graphics.drawRect(1, "#000000", [0, 0, LGlobal.stage.x, LGlobal.canvasObj.height], true, "#000000");
      LGlobal.stageMask.addChild(shape);
      shape = new LShape();
      shape.x = LGlobal.canvasObj.width - LGlobal.stage.x;
      shape.graphics.drawRect(1, "#000000", [0, 0, LGlobal.stage.x, LGlobal.canvasObj.height], true, "#000000");
      LGlobal.stageMask.addChild(shape);
    } else if (LGlobal.stage.y > 0) {
      shape = new LShape();
      shape.graphics.drawRect(1, "#000000", [0, 0, LGlobal.canvasObj.width, LGlobal.stage.y], true, "#000000");
      LGlobal.stageMask.addChild(shape);
      shape = new LShape();
      shape.x = LGlobal.canvasObj.height - LGlobal.stage.y;
      shape.graphics.drawRect(1, "#000000", [0, 0, LGlobal.canvasObj.width, LGlobal.stage.y], true, "#000000");
      LGlobal.stageMask.addChild(shape);
    }
  };
  LGlobal.sleep = function (s) {
    var d = new Date();
    while (new Date().getTime() - d.getTime() < s) {}
  };
  LGlobal.screen = function (a) {
    LGlobal.displayState = a;
    if (LGlobal.stage) {
      if (typeof LGlobal.displayState == "number") {
        LGlobal.resize(LGlobal.canvasObj.width * LGlobal.displayState, LGlobal.canvasObj.height * LGlobal.displayState);
      } else {
        LGlobal.resize();
      }
    }
  };
  return LGlobal;
}();
var LSystem = LGlobal;
var LStage = LGlobal;
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (elt) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = from < 0 ? Math.ceil(from) : Math.floor(from);
    if (from < 0) {
      from += len;
    }
    for (; from < len; from++) {
      if (from in this && this[from] === elt) {
        return from;
      }
    }
    return -1;
  };
}
if (!Array.isArray) {
  Array.isArray = function (value) {
    return Object.prototype.toString.apply(value) == '[object Array]';
  };
}
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function fNOP() {},
    fBound = function fBound() {
      return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
if (!Array.prototype.every) {
  Array.prototype.every = function (callbackfn, thisArg) {
    'use strict';
    var T, k;
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        var testResult = callbackfn.call(T, kValue, k, O);
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
if (!Array.prototype.some) {
  Array.prototype.some = function (fun) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    var thisArg = arguments.length >= 2 ? arguments[1] :
    void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}
if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun) {
    "use strict";
    if (this == null) {
      throw new TypeError();
    }
    var t = Object(this),
    len = t.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }
    var res = [],
    thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisp, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}
if (!String.format) {
  String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ?
      args[number] :
      match;
    });
  };
}
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function get() {
      var funcNameRegex = /function\s([^(]{1,})\(/;
      var results = funcNameRegex.exec(this.toString());
      return results && results.length > 1 ? results[1].trim() : "";
    },
    set: function set(value) {} });

}

function trace() {
  if (!LGlobal.traceDebug) return;
  var t = document.getElementById("traceObject"),
  i;
  if (trace.arguments.length > 0 && t == null) {
    var d = document.createElement("DIV");
    d.position = 0;
    d.style.position = "absolute";
    document.body.appendChild(d);
    t = document.createElement("TEXTAREA");
    t.id = "traceObject";
    t.style.width = window.innerWidth * 0.5 + "px";
    t.style.height = "200px";
    var b = document.createElement("BUTTON");
    b.style.width = window.innerWidth * 0.25 + "px";
    b.innerHTML = "Hide";
    d.appendChild(b);
    LEvent.addEventListener(b, LGlobal.mobile ? "touchstart" : "click", function (e) {
      t.style.display = t.style.display == "none" ? "" : "none";
    });
    b = document.createElement("BUTTON");
    b.style.width = window.innerWidth * 0.25 + "px";
    b.innerHTML = "position";
    d.appendChild(b);
    var f = function f(e) {
      d.position++;
      if (d.position == 0) {
        d.style.top = "5px";
        d.style.left = "5px";
      } else if (d.position == 1) {
        d.style.top = window.innerHeight - 20 - parseInt(t.style.height) + "px";
        d.style.left = "5px";
      } else if (d.position == 2) {
        d.style.top = "5px";
        d.style.left = window.innerWidth - parseInt(t.style.width) + "px";
      } else {
        d.style.top = window.innerHeight - 20 - parseInt(t.style.height) + "px";
        d.style.left = window.innerWidth - parseInt(t.style.width) + "px";
        d.position = -1;
      }
    };
    f();
    LEvent.addEventListener(b, LGlobal.mobile ? "touchstart" : "click", f);
    d.appendChild(document.createElement("BR"));
    d.appendChild(t);
  }
  for (i = 0; i < trace.arguments.length; i++) {
    t.value = t.value + trace.arguments[i] + "\r\n";
    t.scrollTop = t.scrollHeight;
  }
}
if (!window.console) {
  window.console = {
    log: trace,
    warn: trace };

}

function addChild(o) {
  LGlobal.stage.addChild(o);
}

function removeChild(o) {
  LGlobal.stage.removeChild(o);
}

function init(s, c, w, h, f, t) {
  LGlobal.childList = [];
  if (LGlobal.requestId) {
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.clearTimeout;
    cancelAnimationFrame(LGlobal.requestId);

  }
  LGlobal.speed = s;
  var _f = function _f() {
    if (LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight) {
      LGlobal.horizontalError();
    } else if (LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight) {
      LGlobal.verticalError();
    } else {
      setTimeout(f, 100);
    }
    LGlobal.startTimer = new Date().getTime();
  };
  var _loop2;
  if (typeof s == "function") {
    _loop2 = function loop() {
      LGlobal.requestId = s(_loop2);
      LGlobal.onShow();
    };
    LGlobal.speed = 1000 / 60;
  } else {
    var _requestAF = function () {
      return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
    }();
    LGlobal._requestAFBaseTime = new Date().getTime();
    _loop2 = function _loop() {
      var now = new Date().getTime();
      if (now - LGlobal._now > s * 2) {
        LGlobal._requestAFBaseTime = now - s;
      }
      LGlobal._now = now;
      var check = now - LGlobal._requestAFBaseTime;
      if (check / s >= 0.99) {
        LGlobal._requestAFBaseTime += s;
        LGlobal.onShow();
      }
      LGlobal.requestId = _requestAF(_loop2, s);
    };
  }
  if (document.readyState === "complete") {
    LGlobal.setCanvas(c, w, h);
    _f();
    _loop2();
  } else {
    LEvent.addEventListener(window, "load", function () {
      LGlobal._requestAFBaseTime = new Date().getTime();
      LGlobal.setCanvas(c, w, h);
      _f();
      _loop2();
    });
  }
}

var LInit = init;

function base(d, b, a) {
  var p = null,
  o = d.constructor.prototype,
  h = {};
  if (d.constructor.name == "Object") {
    console.warn("When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
  }
  if (typeof d.__ll__parent__ == UNDEFINED) {
    d.__ll__parent__ = [];
    d.__ll__parent__ = [];
  }
  d.__ll__parent__.push(b.prototype);
  for (p in o) {
    h[p] = 1;
  }
  for (p in b.prototype) {
    if (!h[p]) {
      if (p != "callParent" && b.prototype[p].toString().indexOf("callParent") > 0) {
        if (LGlobal.wx) {
          o[p] = b.prototype[p];
        } else {
          o[p] = new Function('return this.callParent("' + p + '", arguments);');
        }
      } else {
        o[p] = b.prototype[p];
      }
    }
  }
  if (o.toString == Object.prototype.toString) {
    o.toString = LObject.prototype.toString;
  }
  b.apply(d, a);
}
var LExtends = base;

function getTimer() {
  return new Date().getTime() - LGlobal.startTimer;
}

function getExtension(path) {
  var r,pattern = /([^#?]+\.)([^.#?]+)/;
  r = path.match(pattern);
  if (r.length >= 3) {
    return r[2].toLowerCase();
  }
  return null;
}
var LObject = function () {
  function LObject() {
    this.type = "LObject";
    this.objectIndex = ++LGlobal.objectIndex;
    this.objectindex = this.objectIndex;
  }
  LObject.prototype = {
    callParent: function callParent(f_n, args) {
      if (!f_n || !args) {
        return;
      }
      var s = this,
      init = false,
      r,k = "__ll__parent_call" + f_n;
      if (typeof s[k] == "undefined") {
        init = true;
        s[k] = 0;
      } else {
        s[k]++;
      }
      if (s[k] >= s.__ll__parent__.length) {
        return false;
      }
      if (!s.__ll__parent__[s[k]][f_n]) {
        r = s.callParent(f_n, args);
      } else {
        r = s.__ll__parent__[s[k]][f_n].apply(s, args);
      }
      if (init) {
        delete s[k];
      }
      return r;
    },
    copyProperty: function copyProperty(a) {
      var s = this,
      k;
      for (k in a) {
        if (typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean") {
          if (k == "objectindex" || k == "objectIndex") {
            continue;
          }
          s[k] = a[k];
        } else if (Array.isArray(a[k])) {
          s[k] = a[k].slice();
        }
      }
      if (a.mask) {
        s.mask = a.mask.clone();
      }
    },
    toString: function toString() {
      return "[object " + this.constructor.name + "]";
    } };

  return LObject;
}();
var LTimer = function () {
  function LTimer(delay, repeat) {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.type = "LTimer";
    s.delay = delay;
    s.repeatCount = repeat ? repeat : Number.MAX_VALUE;
    s.running = false;
    s.currentCount = 0;
    s.reset();
    LTimer.TimerManager.add(s);
  }
  LTimer.TimerManager = function () {
    function TimerManager() {
      this.childList = [];
    }
    TimerManager.prototype = {
      ll_show: function ll_show() {
        var s = this,
        d;
        for (var i = 0; i < s.childList.length; i++) {
          d = s.childList[i];
          if (d) {
            d.ll_show();
          }
        }
      },
      add: function add(child) {
        this.childList.push(child);
      },
      remove: function remove(d) {
        var s = this,
        c = s.childList,
        i,l;
        for (i = 0, l = c.length; i < l; i++) {
          if (d.objectIndex == c[i].objectIndex) {
            s.childList.splice(i, 1);
            break;
          }
        }
      } };

    return new TimerManager();
  }();
  var p = {
    start: function start() {
      this.running = true;
    },
    stop: function stop() {
      this.running = false;
    },
    reset: function reset() {
      var s = this;
      s.currentTime = 0;
      s.currentCount = 0;
      s.stop();
    },
    destroy: function destroy() {
      LTimer.TimerManager.remove(this);
    },
    ll_show: function ll_show() {
      var s = this;
      if (!s.running || s.currentCount >= s.repeatCount) {
        return;
      }
      s.currentTime += LGlobal.speed;
      if (s.currentTime < s.delay) {
        return;
      }
      s.currentTime = 0;
      s.currentCount++;
      s.dispatchEvent(LTimerEvent.TIMER);
      if (s.currentCount >= s.repeatCount) {
        s.dispatchEvent(LTimerEvent.TIMER_COMPLETE);
      }
    } };

  for (var k in p) {
    LTimer.prototype[k] = p[k];
  }
  LGlobal.childList.push(LTimer.TimerManager);
  return LTimer;
}();
var LColorTransform = function () {
  function LColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
    var s = this;
    LExtends(s, LObject, []);
    s.redMultiplier = redMultiplier;
    s.greenMultiplier = greenMultiplier;
    s.blueMultiplier = blueMultiplier;
    s.alphaMultiplier = alphaMultiplier;
    s.redOffset = redOffset;
    s.greenOffset = greenOffset;
    s.blueOffset = blueOffset;
    s.alphaOffset = alphaOffset;
  }
  return LColorTransform;
}();
var LTransform = function () {
  function LTransform() {
    var s = this;
    LExtends(s, LObject, []);
    s.matrix = null;
  }
  return LTransform;
}();
var LMatrix = function () {
  function LMatrix(a, b, c, d, tx, ty, u, v, w) {
    var s = this;
    LExtends(s, LObject, []);
    s.a = 1;
    s.b = 0;
    s.u = 0;
    s.c = 0;
    s.d = 1;
    s.v = 0;
    s.tx = 0;
    s.ty = 0;
    s.w = 1;
    if (typeof a != UNDEFINED) {
      s.a = a;
    }
    if (typeof b != UNDEFINED) {
      s.b = b;
    }
    if (typeof c != UNDEFINED) {
      s.c = c;
    }
    if (typeof d != UNDEFINED) {
      s.d = d;
    }
    if (typeof tx != UNDEFINED) {
      s.tx = tx;
    }
    if (typeof ty != UNDEFINED) {
      s.ty = ty;
    }
    if (typeof u != UNDEFINED) {
      s.u = u;
    }
    if (typeof v != UNDEFINED) {
      s.v = v;
    }
    if (typeof w != UNDEFINED) {
      s.w = w;
    }
  }
  var p = {
    setTo: function setTo(a, b, c, d, tx, ty, u, v, w) {
      var s = this;
      if (typeof a != UNDEFINED) {
        s.a = a;
      }
      if (typeof b != UNDEFINED) {
        s.b = b;
      }
      if (typeof c != UNDEFINED) {
        s.c = c;
      }
      if (typeof d != UNDEFINED) {
        s.d = d;
      }
      if (typeof tx != UNDEFINED) {
        s.tx = tx;
      }
      if (typeof ty != UNDEFINED) {
        s.ty = ty;
      }
      if (typeof u != UNDEFINED) {
        s.u = u;
      }
      if (typeof v != UNDEFINED) {
        s.v = v;
      }
      if (typeof w != UNDEFINED) {
        s.w = w;
      }
      return s;
    },
    isIdentity: function isIdentity() {
      var s = this;
      return s.a === 1 && s.b === 0 && s.c === 0 && s.d === 1 && s.tx === 0 && s.ty === 0 && s.u === 0 && s.v === 0 && s.w === 1;
    },
    transform: function transform(c) {
      var s = this;
      c.transform(s.a, s.b, s.c, s.d, s.tx, s.ty);
      return s;
    },
    identity: function identity() {
      this.setTo(1, 0, 0, 1, 0, 0, 0, 0, 1);
    },
    rotate: function rotate(q) {
      var s = this,
      radian = q * Math.PI / 180,
      cos = Math.cos(radian),
      sin = Math.sin(radian),
      mtx = new LMatrix(cos, sin, -sin, cos, 0, 0, 0, 0, 1);
      s.add(mtx);
      return s;
    },
    scale: function scale(sx, sy) {
      var s = this,
      mtx = new LMatrix(sx, 0, 0, sy, 0, 0, 0, 0, 1);
      s.add(mtx);
      return s;
    },
    translate: function translate(tx, ty) {
      var s = this,
      mtx = new LMatrix(1, 0, 0, 1, tx, ty, 0, 0, 1);
      s.add(mtx);
      return s;
    },
    skew: function skew(kx, ky) {
      var s = this,
      mtx = new LMatrix(1, ky, kx, 1, 0, 0, 0, 0, 1);
      s.add(mtx);
      return s;
    },
    add: function add(mtx) {
      var s = this,
      a,b,c,d,tx,ty,u,v,w;
      a = s.a * mtx.a + s.b * mtx.c + s.u * mtx.tx;
      b = s.a * mtx.b + s.b * mtx.d + s.u * mtx.ty;
      u = s.a * mtx.u + s.b * mtx.v + s.u * mtx.w;
      c = s.c * mtx.a + s.d * mtx.c + s.v * mtx.tx;
      d = s.c * mtx.b + s.d * mtx.d + s.v * mtx.ty;
      v = s.c * mtx.u + s.d * mtx.v + s.v * mtx.w;
      tx = s.tx * mtx.a + s.ty * mtx.c + s.w * mtx.tx;
      ty = s.tx * mtx.b + s.ty * mtx.d + s.w * mtx.ty;
      w = s.tx * mtx.u + s.ty * mtx.v + s.w * mtx.w;
      s.setTo(a, b, c, d, tx, ty, u, v, w);
    },
    toArray: function toArray(mtx) {
      var s = this;
      if (Array.isArray(mtx) && mtx.length == 3) {
        var m = mtx[0] * s.a + mtx[1] * s.c + mtx[2] * s.tx,
        n = mtx[0] * s.b + mtx[1] * s.d + mtx[2] * s.ty,
        k = mtx[0] * s.u + mtx[1] * s.v + mtx[2] * s.w;
        return [m, n, k];
      } else {
        var a = s.a * mtx.a + s.b * mtx.c + s.u * mtx.tx,
        b = s.a * mtx.b + s.b * mtx.d + s.u * mtx.ty,
        u = s.a * mtx.u + s.b * mtx.v + s.u * mtx.w,
        c = s.c * mtx.a + s.d * mtx.c + s.v * mtx.tx,
        d = s.c * mtx.b + s.d * mtx.d + s.v * mtx.ty,
        v = s.c * mtx.u + s.d * mtx.v + s.v * mtx.w,
        tx = s.tx * mtx.a + s.ty * mtx.c + s.w * mtx.tx,
        ty = s.tx * mtx.b + s.ty * mtx.d + s.w * mtx.ty,
        w = s.tx * mtx.u + s.ty * mtx.v + s.w * mtx.w;
        return [a, b, c, d, tx, ty, u, v, w];
      }
    },
    clone: function clone() {
      var s = this;
      return new LMatrix(s.a, s.b, s.c, s.d, s.tx, s.ty, s.u, s.v, s.w);
    } };

  for (var k in p) {
    LMatrix.prototype[k] = p[k];
  }
  return LMatrix;
}();
var LVec2 = function () {
  function LVec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  LVec2.dot = function (a, b) {
    return a.x * b.x + a.y * b.y;
  };
  LVec2.cross = function (a, b) {
    return a.x * b.y - a.y * b.x;
  };
  LVec2.distance = function (a, b) {
    var x = a.x - b.x;
    var y = a.y - b.y;
    return Math.sqrt(x * x + y * y);
  };
  LVec2.getMinMax = function (vecs, axis) {
    var min_o = LVec2.dot(vecs[0], axis);
    var max_o = LVec2.dot(vecs[0], axis);
    var min_i = 0;
    var max_i = 0;
    for (var i = 1; i < vecs.length; i++) {
      var this_o = LVec2.dot(vecs[i], axis);
      if (min_o > this_o) {
        min_o = this_o;
        min_i = i;
      }
      if (max_o < this_o) {
        max_o = this_o;
        max_i = i;
      }
    }
    var r = { "min_o": min_o, "min_i": min_i, "max_o": max_o, "max_i": max_i };
    return r;
  };
  LVec2.prototype = {
    length: function length() {
      var s = this;
      return Math.sqrt(s.x * s.x + s.y * s.y);
    },
    normalize: function normalize() {
      var s = this,
      l = s.length();
      return new LVec2(s.x / l, s.y / l);
    },
    normR: function normR() {
      return new LVec2(-this.y, this.x);
    },
    normL: function normL() {
      return new LVec2(this.y, -this.x);
    } };

  return LVec2;
}();
var LEventDispatcher = function () {
  function LEventDispatcher() {
    var s = this;
    LExtends(s, LObject, []);
    s._eventList = new Array();
  }
  var p = {
    addEventListener: function addEventListener(type, listener, _this) {
      this._eventList.push({ listener: listener, type: type, _this: _this });
    },
    removeEventListener: function removeEventListener(type, listener, _this) {
      var s = this,
      i,length;
      length = s._eventList.length;
      for (i = 0; i < length; i++) {
        if (!s._eventList[i]) {
          continue;
        }
        if (type == s._eventList[i].type && (
        !listener || s._eventList[i].listener == listener) && (
        !_this || !s._eventList[i]._this || s._eventList[i]._this.objectIndex == _this.objectIndex)) {
          s._eventList.splice(i, 1);
          return;
        }
      }
    },
    removeAllEventListener: function removeAllEventListener() {
      this._eventList = [];
    },
    dispatchEvent: function dispatchEvent(event) {
      var s = this;
      var length = this._eventList.length;
      var ctype = typeof event === 'string' ? event : event.eventType;
      for (var i = 0; i < length; i++) {
        var child = this._eventList[i];
        if (!child) {
          continue;
        }
        if (ctype === this._eventList[i].type) {
          if (typeof event === 'string') {
            s.currentTarget = s.target = s;
            s.eventType = s.event_type = ctype;
            child.listener.call(child._this ? child._this : s, s);
            delete s.currentTarget;
            delete s.target;
            delete s.eventType;
          } else {
            if (!event.target) {
              event.target = this;
            }
            if (!event.currentTarget) {
              event.currentTarget = event.target;
            }
            event._ll_preventDefault = false;
            child.listener.call(child._this ? child._this : this, event);
          }
        }
      }
    },
    hasEventListener: function hasEventListener(type, listener) {
      var s = this,
      i,length = s._eventList.length;
      for (i = 0; i < length; i++) {
        if (!s._eventList[i]) {
          continue;
        }
        if (type == s._eventList[i].type) {
          if (typeof listener == UNDEFINED || listener == s._eventList[i].listener) {
            return true;
          }
        }
      }
      return false;
    } };

  for (var k in p) {
    LEventDispatcher.prototype[k] = p[k];
  }
  return LEventDispatcher;
}();
var LDisplayObject = function () {
  function LDisplayObject() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.name = "instance" + s.objectIndex;
    s.x = 0;
    s.y = 0;
    s.width = 0;
    s.height = 0;
    s.scaleX = 1;
    s.scaleY = 1;
    s.alpha = 1;
    s.visible = true;
    s.rotate = 0;
    s.mask = null;
    s.blendMode = null;
    s.filters = null;
    s.transform = new LTransform();
    s.parent = null;
  }
  var p = {
    _createCanvas: function _createCanvas() {
      var s = this;
      if (!s._canvas) {
        s._canvas = document.createElement("canvas");
        s._context = s._canvas.getContext("2d");
      }
    },
    ll_show: function ll_show(c) {
      var s = this;
      c = c || LGlobal.canvas;
      if (!s._canShow()) {
        return;
      }
      s._ll_trans = false;
      if (!LGlobal.box2d && typeof s._ll_loopframe == "function") {
        s._ll_loopframe();
      }
      c.save();
      s._showReady(c);
      if (s.blendMode) {
        c.globalCompositeOperation = s.blendMode;
      }
      if (s.filters) {
        s._ll_setFilters(c);
      }
      s._rotateReady();
      if (s.mask != null && s.mask.ll_show && !s._ll_cacheAsBitmap) {
        s.mask.ll_show(c);
        c.clip();
      }
      s._transformRotate(c);
      s._transformScale(c);
      s._coordinate(c);
      if (s.transform.matrix) {
        s.transform.matrix.transform(c);
      }
      if (s.alpha < 1) {
        s._ll_trans = true;
        c.globalAlpha *= s.alpha;
      }
      if (LGlobal.fpsStatus) {
        LGlobal.fpsStatus.display++;
        if (s._ll_trans) {
          LGlobal.fpsStatus.transform++;
        }
      }
      if (s._ll_cacheAsBitmap) {
        s._ll_cacheAsBitmap._ll_show(c);
      } else {
        s._ll_show(c);
      }
      c.restore();
      if (LGlobal.box2d != null && typeof s._ll_loopframe == "function") {
        s._ll_loopframe();
      }
    },
    _canShow: function _canShow() {
      return this.visible;
    },
    _coordinate: function _coordinate(c) {
      var s = this;
      if (s.x != 0 || s.y != 0) {
        s._ll_trans = true;
        c.transform(1, 0, 0, 1, s.x, s.y);
      }
    },
    _rotateReady: function _rotateReady() {},
    _showReady: function _showReady(c) {},
    _ll_show: function _ll_show(c) {},
    _ll_setFilters: function _ll_setFilters(c) {
      var s = this,
      f = s.filters,
      i,l;
      if (!f) {
        return;
      }
      for (i = 0, l = f.length; i < l; i++) {
        f[i].ll_show(s, c);
      }
    },
    startX: function startX() {return 0;},
    startY: function startY() {return 0;},
    getWidth: function getWidth(maskSize) {return 1;},
    getHeight: function getHeight(maskSize) {return 1;},
    _transformRotate: function _transformRotate(c) {
      var s = this;
      c = c || LGlobal.canvas;
      if (s.rotate == 0) {
        return;
      }
      s._ll_trans = true;
      var rotateFlag = Math.PI / 180,
      rotateObj = new LMatrix();
      if (typeof s.rotatex == UNDEFINED) {
        s.rotatex = 0;
        s.rotatey = 0;
      }
      if (s.box2dBody) {
        rotateFlag = 1;
      }
      rotateObj.a = Math.cos(s.rotate * rotateFlag);
      rotateObj.b = Math.sin(s.rotate * rotateFlag);
      rotateObj.c = -rotateObj.b;
      rotateObj.d = rotateObj.a;
      rotateObj.tx = s.x + s.rotatex;
      rotateObj.ty = s.y + s.rotatey;
      rotateObj.transform(c).setTo(1, 0, 0, 1, -rotateObj.tx, -rotateObj.ty).transform(c);
    },
    _transformScale: function _transformScale(c) {
      var s = this,
      scaleObj;
      c = c || LGlobal.canvas;
      if (s.scaleX == 1 && s.scaleY == 1) {
        return;
      }
      s._ll_trans = true;
      scaleObj = new LMatrix();
      if (s.scaleX != 1) {
        scaleObj.tx = s.x;
      }
      if (s.scaleY != 1) {
        scaleObj.ty = s.y;
      }
      scaleObj.a = s.scaleX;
      scaleObj.d = s.scaleY;
      scaleObj.transform(c).setTo(1, 0, 0, 1, -scaleObj.tx, -scaleObj.ty).transform(c);
    },
    getAbsoluteScale: function getAbsoluteScale() {
      var s = this,
      sX,sY,p;
      sX = s.scaleX;
      sY = s.scaleY;
      p = s.parent;
      while (p && p != "root") {
        sX *= p.scaleX;
        sY *= p.scaleY;
        p = p.parent;
      }
      return { scaleX: sX, scaleY: sY };
    },
    getRootCoordinate: function getRootCoordinate() {
      return this.localToGlobal(new LPoint(0, 0));
    },
    localToGlobal: function localToGlobal(point) {
      var s = this,
      x,y,p,m;
      m = s.getRootMatrix();
      p = m.toArray([point.x, point.y, 1]);
      return new LPoint(p[0], p[1]);
    },
    globalToLocal: function globalToLocal(point) {
      var s = this,
      x,y,p;
      m = s.getLocalMatrix();
      p = m.toArray([point.x, point.y, 1]);
      return new LPoint(p[0], p[1]);
    },
    getBounds: function getBounds(d) {
      if (typeof d == UNDEFINED) {
        return new LRectangle(0, 0, 0, 0);
      }
      var s = this,
      x = 0,
      y = 0,
      w = 0,
      h = 0,
      sp,dp;
      if (s.objectIndex != d.objectIndex) {
        sp = s.getRootCoordinate();
        dp = d.getRootCoordinate();
        x = sp.x - dp.x;
        y = sp.y - dp.y;
      }
      w = s.getWidth(true);
      h = s.getHeight(true);
      return new LRectangle(x, y, w, h);
    },
    cacheAsBitmap: function cacheAsBitmap(value) {
      var s = this;
      if (!value) {
        s._ll_cacheAsBitmap = null;
        return;
      }
      var sx = s.x - s.startX(true),
      sy = s.y - s.startY(true);
      var data = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
      var b = new LBitmapData(data, 0, 0, null, null, LBitmapData.DATA_CANVAS);
      var cache = new LBitmap(b);
      cache.x = -sx;
      cache.y = -sy;
      s._ll_cacheAsBitmap = cache;
    },
    getDataCanvas: function getDataCanvas(x, y, w, h) {
      var s = this,
      _o,o,_c,c,_x,_y;
      s._createCanvas();
      _x = s.x;
      _y = s.y;
      s.x = x || 0;
      s.y = y || 0;
      s.width = w || s.getWidth();
      s.height = h || s.getHeight();
      s._canvas.width = s.width;
      s._canvas.height = s.height;
      var mx, my;
      if (s.mask) {
        mx = s.mask.x;
        my = s.mask.y;
        s.mask.x += s.x - _x;
        s.mask.y += s.y - _y;
      }
      s.ll_show(s._context);
      s.x = _x;
      s.y = _y;
      if (s.mask) {
        s.mask.x = mx;
        s.mask.y = my;
      }
      return s._canvas;
    },
    getDataURL: function getDataURL() {
      var s = this;
      var sx = s.x - s.startX(true),
      sy = s.y - s.startY(true);
      var r = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
      return r.toDataURL.apply(r, arguments);
    },
    getParentByConstructor: function getParentByConstructor(value) {
      var parent = this.parent;
      while (typeof parent == "object") {
        if (parent instanceof value) {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    },
    ismouseonShapes: function ismouseonShapes(shapes, mx, my) {
      var s = this,
      parent = s,
      m,child,j,v,arg;
      if (typeof shapes == UNDEFINED) {
        shapes = s.shapes;
      }
      m = s.getRootMatrix();
      for (j = shapes.length - 1; j >= 0; j--) {
        child = shapes[j];
        arg = child.arg;
        v = s._changeShape(child.type, arg, m);
        if (child.type == LShape.VERTICES) {
          if (LGlobal.hitPolygon(v, mx, my)) {
            return true;
          }
        } else if (child.type == LShape.RECT) {
          if (LGlobal.hitPolygon(v, mx, my)) {
            return true;
          }
        } else if (child.type == LShape.ARC) {
          if ((v[0] - mx) * (v[0] - mx) + (v[1] - my) * (v[1] - my) < v[3]) {
            return true;
          }
        }
      }
      return false;
    },
    _changeShape: function _changeShape(type, arg, m) {
      var v,arg = arg,
      r2,i,l,v1,v2;
      if (type == LShape.VERTICES) {
        v = [];
        for (i = 0, l = arg.length; i < l; i++) {
          v[i] = m.toArray([arg[i][0], arg[i][1], 1]);
        }
      } else if (type == LShape.RECT) {
        v = [
        [arg[0], arg[1]],
        [arg[0] + arg[2], arg[1]],
        [arg[0] + arg[2], arg[1] + arg[3]],
        [arg[0], arg[1] + arg[3]]];

        for (i = 0, l = v.length; i < l; i++) {
          v[i] = m.toArray([v[i][0], v[i][1], 1]);
        }
      } else if (type == LShape.ARC) {
        v1 = m.toArray([arg[0], arg[1], 1]);
        v2 = m.toArray([arg[0] + arg[2], arg[1], 1]);
        r2 = (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
        v = [v1[0], v1[1], Math.sqrt(r2), r2];
      }
      return v;
    },
    getRootMatrix: function getRootMatrix() {
      var parent = this,
      m = new LMatrix();
      while (parent && parent != "root") {
        if (parent.scaleX != 1 || parent.scaleY != 1) {
          m.scale(parent.scaleX, parent.scaleY);
        }
        if (parent.rotate != 0) {
          m.rotate(parent.rotate);
        }
        if (parent.x != 0 || parent.y != 0) {
          m.translate(parent.x, parent.y);
        }
        parent = parent.parent;
      }
      return m;
    },
    getLocalMatrix: function getLocalMatrix() {
      var parent = this,
      m = new LMatrix(),
      list = [];
      while (parent && parent != "root") {
        list.push(parent);
        parent = parent.parent;
      }
      for (var i = list.length - 1; i >= 0; i--) {
        parent = list[i];
        if (parent.x != 0 || parent.y != 0) {
          m.translate(-parent.x, -parent.y);
        }
        if (parent.rotate != 0) {
          m.rotate(-parent.rotate);
        }
        if (parent.scaleX != 1 || parent.scaleY != 1) {
          m.scale(1 / parent.scaleX, 1 / parent.scaleY);
        }
      }
      return m;
    },
    remove: function remove() {
      var s = this,
      p = s.parent;
      if (!p || p == "root") {
        return;
      }
      p.removeChild(s);
      s._ll_removeFromSelf = true;
    } };

  for (var k in p) {
    LDisplayObject.prototype[k] = p[k];
  }
  return LDisplayObject;
}();
var LInteractiveObject = function () {
  function LInteractiveObject() {
    var s = this;
    LExtends(s, LDisplayObject, []);
    s.type = "LInteractiveObject";
    s.mouseEnabled = true;
    s.mouseList = new Array();
  }
  var p = {
    addEventListener: function addEventListener(type, listener, _this) {
      var s = this;
      if (type.indexOf('mouse') >= 0 || type.indexOf('touch') >= 0 || type === LMouseEvent.DOUBLE_CLICK) {
        if (LMouseEventContainer.container[type] || (type === LMouseEvent.MOUSE_OVER || type === LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
          LMouseEventContainer.addMouseEvent(s, type, listener, _this);
          return;
        }
        s.mouseList.push({
          listener: listener,
          type: type,
          _this: _this });

      } else {
        s._eventList.push({
          listener: listener,
          type: type,
          _this: _this });

      }
    },
    removeEventListener: function removeEventListener(type, listener, _this) {
      var s = this,
      i,length;
      if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
        if (LMouseEventContainer.container[type] || (type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
          LMouseEventContainer.removeMouseEvent(s, type, listener, _this);
          return;
        }
        length = s.mouseList.length;
        for (i = 0; i < length; i++) {
          if (!s.mouseList[i]) {
            continue;
          }
          if (type == s.mouseList[i].type && (
          !listener || s.mouseList[i].listener == listener) && (
          !_this || !s.mouseList[i]._this || s.mouseList[i]._this.objectIndex == _this.objectIndex)) {
            s.mouseList.splice(i, 1);
            return;
          }
        }
      } else {
        return s.callParent("removeEventListener", arguments);
      }
    },
    removeAllEventListener: function removeAllEventListener() {
      var s = this;
      s.mouseList.length = 0;
      s._eventList.length = 0;
      if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
        LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_DOWN);
      }
      if (LMouseEventContainer.container[LMouseEvent.MOUSE_UP]) {
        LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_UP);
      }
      if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
        LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_MOVE);
        LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OVER);
        LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OUT);
      }
    },
    hasEventListener: function hasEventListener(type, listener) {
      var s = this,
      i,length;
      if (LMouseEventContainer.container[type]) {
        return LMouseEventContainer.hasEventListener(s, type, listener);
      }
      if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
        length = s.mouseList.length;
        for (i = 0; i < length; i++) {
          if (!s.mouseList[i]) {
            continue;
          }
          if (type == s.mouseList[i].type && (!listener || s.mouseList[i].listener == listener)) {
            return true;
          }
        }
      } else {
        return s.callParent("hasEventListener", arguments);
      }
      return false;
    } };

  for (var k in p) {
    LInteractiveObject.prototype[k] = p[k];
  }
  return LInteractiveObject;
}();
var LDisplayObjectContainer = function () {
  function LDisplayObjectContainer() {
    var s = this;
    LExtends(s, LInteractiveObject, []);
    s.childList = new Array();
    s.numChildren = 0;
    s.mouseChildren = true;
  }
  LDisplayObjectContainer.destroy = function (d) {
    if (!LGlobal.destroy) {
      return;
    }
    if (d.die) {
      d.die();
    }
    if (d.removeAllChild) {
      d.removeAllChild();
    }
  };
  var p = {
    addChild: function addChild(d) {
      var s = this,
      t;
      if (d.parent) {
        t = LGlobal.destroy;
        LGlobal.destroy = false;
        d.parent.removeChild(d);
        LGlobal.destroy = t;
      }
      d.parent = s;
      s.childList.push(d);
      s.numChildren = s.childList.length;
      d._ll_removeFromSelf = false;
      return d;
    },
    addChildAt: function addChildAt(d, i) {
      var s = this,
      t;
      if (i < 0 || i > s.childList.length) {
        return;
      }
      if (typeof d.remove == "function") {
        t = LGlobal.destroy;
        LGlobal.destroy = false;
        d.remove();
        LGlobal.destroy = t;
      }
      d.parent = s;
      s.childList.splice(i, 0, d);
      s.numChildren = s.childList.length;
      d._ll_removeFromSelf = false;
      return d;
    },
    removeChild: function removeChild(d) {
      var s = this,
      c = s.childList,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (d.objectIndex == c[i].objectIndex) {
          LDisplayObjectContainer.destroy(d);
          s.childList.splice(i, 1);
          break;
        }
      }
      s.numChildren = s.childList.length;
      delete d.parent;
      LTweenLite.removeTarget(d);
    },
    getChildAt: function getChildAt(i) {
      var s = this,
      c = s.childList;
      if (c.length == 0 || c.length <= i) {
        return null;
      }
      return c[i];
    },
    getChildByName: function getChildByName(n) {
      var s = this,
      c = s.childList,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        if (!c[i]) {
          continue;
        }
        if (c[i].name == n) {
          return c[i];
        }
      }
      return null;
    },
    removeChildAt: function removeChildAt(i) {
      var s = this,
      c = s.childList,
      d;
      if (c.length <= i || i < 0) {
        return;
      }
      d = c[i];
      LDisplayObjectContainer.destroy(d);
      s.childList.splice(i, 1);
      delete d.parent;
      LTweenLite.removeTarget(d);
      s.numChildren = s.childList.length;
      return d;
    },
    getChildIndex: function getChildIndex(child) {
      if (!child) {
        return -1;
      }
      var s = this,
      c = s.childList,
      i,l = c.length;
      for (i = 0; i < l; i++) {
        if (c[i].objectIndex == child.objectIndex) {
          return i;
        }
      }
      return -1;
    },
    setChildIndex: function setChildIndex(child, index) {
      var s = this,
      c = s.childList,
      i,l = c.length;
      if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
        return -1;
      }
      for (i = 0; i < l; i++) {
        if (c[i].objectIndex == child.objectIndex) {
          break;
        }
      }
      s.childList.splice(i, 1);
      s.childList.splice(index, 0, child);
      return index;
    },
    resize: function resize() {
      var s = this;
      s.width = s.getWidth();
      s.height = s.getHeight();
    },
    removeAllChild: function removeAllChild() {
      var s = this,
      c = s.childList,
      i,l;
      for (i = 0, l = c.length; i < l; i++) {
        var d = c[i];
        LDisplayObjectContainer.destroy(d);
        delete d.parent;
        LTweenLite.removeTarget(d);
      }
      s.childList.length = 0;
      s.width = 0;
      s.height = 0;
      s.numChildren = 0;
    } };

  for (var k in p) {
    LDisplayObjectContainer.prototype[k] = p[k];
  }
  return LDisplayObjectContainer;
}();
var LLoader = function () {
  function LLoader() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.type = "LLoader";
  }
  LLoader.TYPE_BITMAPDATE = "bitmapData";
  LLoader.prototype.load = function (u, t, xhr) {
    var s = this;
    if (!t) {
      t = LLoader.TYPE_BITMAPDATE;
    }
    s.loadtype = t;
    s.useXHR = xhr && !LAjax.local && LAjax.canUseBlob;
    if (t == LLoader.TYPE_BITMAPDATE) {
      if (s.useXHR) {
        LAjax.responseType = LAjax.ARRAY_BUFFER;
        LAjax.progress = function (e) {
          var event = new LEvent(LEvent.PROGRESS);
          event.currentTarget = s;
          event.target = e.currentTarget;
          event.loaded = e.loaded;
          event.total = e.total;
          event.responseURL = e.responseURL;
          s.dispatchEvent(event);
        };
        LAjax.post(u, {}, function (response) {
          var blob;
          try {
            blob = new Blob([response], { type: 'image/png' });
          } catch (e) {
            if (e.name === 'TypeError' && window.BlobBuilder) {
              var builder = new BlobBuilder();
              builder.append(response);
              blob = builder.getBlob();
            } else {
              blob = null;
              s.useXHR = false;
            }
          }
          if (s.useXHR) {
            u = s.createObjectURL(blob);
          }
          s.loadStart(u);
        }, function (request) {
          var event = new LEvent(LEvent.ERROR);
          event.currentTarget = s;
          event.target = request;
          event.responseURL = request.responseURL;
          s.dispatchEvent(event);
        });
      } else {
        s.loadStart(u);
      }
    }
  };
  LLoader.prototype.loadStart = function (u) {
    var s = this;
    s.content = new Image();
    s.content.onload = function () {
      s.content.onload = null;
      var event = new LEvent(LEvent.COMPLETE);
      event.currentTarget = s;
      event.target = s.content;
      if (s.useXHR) {
        s.revokeObjectURL(s.content.src);
      }
      s.dispatchEvent(event);
      delete s.content;
    };
    if (!s.useXHR) {
      s.content.onerror = function (e) {
        var event = new LEvent(LEvent.ERROR);
        event.currentTarget = s;
        event.target = e.target;
        event.responseURL = e.target.src;
        s.dispatchEvent(event);
      };
    }
    s.content.src = u;
  };
  LLoader.prototype.createObjectURL = function (obj) {
    var URL = window.URL || window.webkitURL;
    return URL.createObjectURL(obj);
  };
  LLoader.prototype.revokeObjectURL = function (src) {
    var URL = window.URL || window.webkitURL;
    URL.revokeObjectURL(src);
  };
  return LLoader;
}();
var LURLLoader = function () {
  function LURLLoader() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.type = "LURLLoader";
    s.loadtype = "";
    s.content = null;
    s.event = {};
  }
  LURLLoader.TYPE_TEXT = "text";
  LURLLoader.TYPE_JS = "js";
  LURLLoader.prototype.load = function (u, t) {
    var s = this,
    event,ext;
    if (!t) {
      ext = getExtension(u);
      if (ext == "txt") {
        t = LURLLoader.TYPE_TEXT;
      } else if (ext == "js") {
        t = LURLLoader.TYPE_JS;
      }
    }
    s.loadtype = t;
    if (t == LURLLoader.TYPE_TEXT) {
      LAjax.progress = function (e) {
        var event = new LEvent(LEvent.PROGRESS);
        event.currentTarget = s;
        event.target = e.currentTarget;
        event.loaded = e.loaded;
        event.total = e.total;
        event.responseURL = e.responseURL;
        s.dispatchEvent(event);
      };
      LAjax.get(u, {}, function (data) {
        event = new LEvent(LEvent.COMPLETE);
        s.data = data;
        event.currentTarget = s;
        event.target = data;
        s.dispatchEvent(event);
        delete s.content;
        delete s.data;
      }, function (request) {
        var event = new LEvent(LEvent.ERROR);
        event.currentTarget = s;
        event.target = request;
        event.responseURL = request.responseURL;
        s.dispatchEvent(event);
      });
    } else if (t == LURLLoader.TYPE_JS) {
      if (LGlobal.wx) {
        setTimeout(function () {
          event = new LEvent(LEvent.COMPLETE);
          event.currentTarget = s;
          event.target = s;
          s.dispatchEvent(event);
          delete s.content;
        });
      } else {
        var script = document.createElement("script");
        script.onerror = function (e) {
          var event = new LEvent(LEvent.ERROR);
          event.currentTarget = s;
          event.target = e.target;
          event.responseURL = u;
          s.dispatchEvent(event);
        };
        script.onload = function () {
          event = new LEvent(LEvent.COMPLETE);
          event.currentTarget = s;
          event.target = s;
          s.dispatchEvent(event);
          delete s.content;
        };
        script.src = u;
        script.type = "text/javascript";
        document.querySelector('head').appendChild(script);
      }
    }
  };
  return LURLLoader;
}();
var LFontLoader = function () {
  function LFontLoader() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.type = "LFontLoader";
  }
  LFontLoader.TYPE_FONT = "font";
  LFontLoader.prototype.load = function (u, name) {
    var s = this,
    font,tff,eot,a,b,d,t = "";
    font = document.createElement("style");
    font.onerror = function (e) {
      var event = new LEvent(LEvent.ERROR);
      event.currentTarget = s;
      event.target = e.target;
      event.responseURL = u;
      s.dispatchEvent(event);
    };
    a = u.split(',');
    for (var i = 0; i < a.length; i++) {
      b = a[i].split('.');
      d = b[b.length - 1];
      if (d == "ttf") {
        tff = a[i];
      } else if (d == "eot") {
        eot = a[i];
      }
    }
    t = "@font-face { font-family:'" + name + "';";
    if (eot) {
      t += "src: url(" + eot + ");";
    }
    if (tff) {
      t += "src: local('lufy'),url(" + tff + ") format('opentype');";
    }
    font.innerHTML = t;
    document.querySelector('head').appendChild(font);
    var callback = function callback() {
      var event = new LEvent(LEvent.COMPLETE);
      event.currentTarget = s;
      event.target = s;
      s.dispatchEvent(event);
    };
    if (document.fonts) {
      try {
        new FontFace(name, "url(" + (tff || eot) + ")", {}).load().then(callback);
      } catch (error) {
        setTimeout(callback, 1);
      }
    } else {
      setTimeout(callback, 1);
    }
  };
  return LFontLoader;
}();
var LWebAudio = function () {
  function LWebAudio() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.currentTime = 0;
    s.currentStart = 0;
    s.currentSave = 0;
    s.length = 0;
    s.loopStart = 0;
    s.loopEnd = 0;
    s.loopIndex = 0;
    s.loopLength = 1;
    s.playing = false;
    s.volume = 1;
    LSound.Container.add(s);
  }
  LWebAudio.container = [];
  LWebAudio.containerCount = 0;
  try {
    LWebAudio.audioTag = new Audio();
  } catch (e) {
    console.warn("ReferenceError: Can't find variable: Audio");
    LWebAudio.audioTag = { canPlayType: function canPlayType() {return false;} };
  }
  LWebAudio._context = null;
  var p = {
    getWebAudio: function getWebAudio() {
      var data;
      if (LWebAudio.container.length > 0) {
        data = LWebAudio.container.shift();
      } else {
        if (typeof AudioContext !== UNDEFINED) {
          try {
            data = new AudioContext();
          } catch (e) {
            LWebAudio.containerCount = LWebAudio.container.length;
            data = LWebAudio.container.shift();
          }
        } else if (typeof webkitAudioContext !== UNDEFINED) {
          try {
            data = new webkitAudioContext();
          } catch (e) {
            LWebAudio.containerCount = LWebAudio.container.length;
            data = LWebAudio.container.shift();
          }
        } else {
          throw "AudioContext not supported. :(";
        }
      }
      if (!data.createGainNode) {
        data.createGainNode = data.createGain;
      }
      LWebAudio.container.push(data);
      return data;
    },
    onload: function onload(data) {
      var s = this;
      if (Object.prototype.toString.apply(data) !== '[object AudioBuffer]') {
        s.load(data);
        return;
      };
      if (!s.data) {
        s.data = s.getWebAudio();
      }
      s.buffer = data;
      s.length = s.buffer.duration;
      var e = new LEvent(LEvent.COMPLETE);
      e.currentTarget = s;
      e.target = s.buffer;
      s.dispatchEvent(e);
    },
    _onended: function _onended() {
      var s = this;
      s.dispatchEvent(LEvent.SOUND_COMPLETE);
      s.close();
      if (++s.loopIndex < s.loopLength) {
        s.play(s.currentStart, undefined, s.currentTimeTo);
      }
    },
    load: function load(u) {
      var s = this;
      if (typeof u !== "string") {
        if (Object.prototype.toString.apply(u) == '[object AudioBuffer]') {
          s.onload(u);
        } else if (Object.prototype.toString.apply(u) == '[object ArrayBuffer]') {
          if (!s.data) {
            s.data = s.getWebAudio();
          }
          s.data.decodeAudioData(u, s.onload.bind(s), function (error) {
            throw "AudioContext decodeAudioData error : " + error.toString();
          });
        }
        return;
      }
      var a,b,c,k,d,q = { "mov": ["quicktime"], "3gp": ["3gpp"], "midi": ["midi"], "mid": ["midi"], "ogv": ["ogg"], "m4a": ["acc"], "mp3": ["mpeg"], "wav": ["wav", "x-wav", "wave"], "wave": ["wav", "x-wav", "wave"], "aac": ["mp4", "aac"] };
      a = u.split(',');
      for (k = 0; k < a.length; k++) {
        b = a[k].split('.');
        d = b[b.length - 1];
        if (q[d]) {
          d = q[d];
        } else {
          d = [d];
        }
        c = d.some(function (element, index, array) {
          return LWebAudio.audioTag.canPlayType(s._type + "/" + element);
        });
        if (c) {
          LAjax.responseType = LAjax.ARRAY_BUFFER;
          LAjax.progress = function (e) {
            var event = new LEvent(LEvent.PROGRESS);
            event.currentTarget = s;
            event.target = e.currentTarget;
            event.loaded = e.loaded * 0.5;
            event.total = e.total;
            event.responseURL = e.responseURL;
            s.dispatchEvent(event);
          };
          LAjax.get(a[k], {}, s.onload.bind(s), function (request) {
            var event = new LEvent(LEvent.ERROR);
            event.currentTarget = s;
            event.target = request;
            event.responseURL = request.responseURL;
            s.dispatchEvent(event);
          });
          return;
        } else {
          console.warn("Not support " + b[b.length - 1] + " : " + a[k]);
          var e = new LEvent(LEvent.COMPLETE);
          e.currentTarget = e.target = s;
          s.dispatchEvent(e);
        }
      }
    },
    getCurrentTime: function getCurrentTime() {
      var s = this;
      if (s.playing) {
        return s.data.currentTime - s.currentSave + s.currentTime;
      } else {
        return s.currentSave;
      }
    },
    setVolume: function setVolume(v) {
      var s = this;
      s.volume = v;
      if (s.playing) {
        s.volumeNode.gain.value = v;
      }
    },
    getVolume: function getVolume() {
      return this.volume;
    },
    play: function play(c, l, to) {
      var s = this;
      if (s.length == 0) {
        return;
      }
      if (typeof l !== UNDEFINED) {
        s.loopIndex = 0;
        s.loopLength = l;
      }
      if (typeof c !== UNDEFINED) {
        s.currentTime = c;
        s.currentStart = c;
      }
      if (typeof to !== UNDEFINED) {
        s.currentTimeTo = to > s.length ? s.length : to;
      } else {
        s.currentTimeTo = s.length;
      }
      if (s.data.resume) {
        s.data.resume();
      }
      s.data.loop = false;
      s.playing = true;
      if (s.timeout) {
        clearTimeout(s.timeout);
        delete s.timeout;
      }
      s.timeout = setTimeout(s._onended.bind(s), (s.currentTimeTo - s.currentTime) * 1000);
      s.bufferSource = s.data.createBufferSource();
      s.bufferSource.buffer = s.buffer;
      s.volumeNode = s.data.createGainNode();
      s.volumeNode.gain.setTargetAtTime = s.volumeNode.gain.setTargetAtTime || s.volumeNode.gain.setTargetValueAtTime || s._setTargetAtTime;
      s.volumeNode.gain.setValueAtTime(s.volume, s.currentTime, 0.5);
      s.volumeNode.connect(s.data.destination);
      s.bufferSource.connect(s.volumeNode);
      s.currentSave = s.data.currentTime;
      if (s.bufferSource.start) {
        s.bufferSource.start(0, s.currentTime, s.length - s.currentTime);
      } else {
        s.bufferSource.noteGrainOn(0, s.currentTime, s.length - s.currentTime);
      }
    },
    _setTargetAtTime: function _setTargetAtTime(target, startTime, timeConstant) {
      this.volumeNode.gain.value = target;
    },
    playSegment: function playSegment(c, seg, l) {
      this.playTo(c, c + seg, l);
    },
    playTo: function playTo(c, to, l) {
      this.play(c, l, to);
    },
    stop: function stop() {
      var s = this;
      if (!s.playing) {
        return;
      }
      if (s.timeout) {
        clearTimeout(s.timeout);
        delete s.timeout;
      }
      if (s.bufferSource.stop) {
        s.bufferSource.stop(0);
      } else {
        s.bufferSource.noteOff(0);
      }
      s.currentSave = s.getCurrentTime();
      s.currentTime = s.currentSave;
      s.playing = false;
    },
    close: function close() {
      var s = this;
      if (!s.playing) {
        return;
      }
      if (s.timeout) {
        clearTimeout(s.timeout);
        delete s.timeout;
      }
      if (s.bufferSource.stop) {
        s.bufferSource.stop(0);
      } else {
        s.bufferSource.noteOff(0);
      }
      s.playing = false;
      s.currentTime = 0;
      s.currentSave = 0;
    },
    ll_check: function ll_check() {
      var s = this;
      if (!s.playing) {
        return;
      }
      if (s.currentTimeTo < s.data.currentTime - s.currentSave + LSound.Container.time * 0.001) {
        s._onended();
      }
    },
    die: function die() {
      LSound.Container.remove(this);
    } };

  for (var k in p) {
    LWebAudio.prototype[k] = p[k];
  }
  return LWebAudio;
}();
var LMedia = function () {
  function LMedia() {
    var s = this;
    LExtends(s, LDisplayObject, []);
    s.length = 0;
    s.loopIndex = 0;
    s.loopLength = 1;
    s.playing = false;
    s.oncomplete = null;
    s.onsoundcomplete = null;
    s.currentStart = 0;
    LSound.Container.add(this);
  }
  var p = {
    onload: function onload() {
      var s = this;
      s.canplaythrough = s.canplaythrough || function () {
        s.onload();
      };
      s.error = s.error || function (e) {
        var event = new LEvent(LEvent.ERROR);
        event.currentTarget = s;
        event.target = e.target;
        event.responseURL = e.target.src;
        s.dispatchEvent(event);
      };
      if (!s._addEvent) {
        if (LGlobal.wx) {
          s.data.addEventListener('ended', function () {
            s._onended(false);
          }, false);
        }
        s.data.addEventListener('error', s.error, false);
        s.data.addEventListener('canplaythrough', s.canplaythrough, false);
      }
      s._addEvent = true;
      if (s.data.readyState) {
        s.data.removeEventListener('error', s.error);
        s.data.removeEventListener('canplaythrough', s.canplaythrough);
        s.length = s.data.duration - (LGlobal.android && !LGlobal.wx ? 0.1 : 0);
        var e = new LEvent(LEvent.COMPLETE);
        e.currentTarget = s;
        e.target = s.data;
        s.dispatchEvent(e);
        return;
      }
    },
    _onended: function _onended() {
      var s = this,
      i,l;
      s.dispatchEvent(LEvent.SOUND_COMPLETE);
      if (++s.loopIndex < s.loopLength) {
        i = s.loopIndex;
        l = s.loopLength;
        s.close();
        s.play(s.currentStart, s.loopLength, s.currentTimeTo);
        s.loopIndex = i;
      } else if (!LGlobal.wx) {
        s.close();
      }
    },
    load: function load(u) {
      var s = this;
      if (Object.prototype.toString.apply(u) == "[object HTMLAudioElement]" || typeof u === 'object' && u.tagName === 'AUDIO') {
        s.data = u;
        s.onload();
        return;
      }
      var a,b,c,k,d,q = { "mov": ["quicktime"], "3gp": ["3gpp"], "midi": ["midi"], "mid": ["midi"], "ogv": ["ogg"], "m4a": ["acc"], "mp3": ["mpeg"], "wav": ["wav", "x-wav", "wave"], "wave": ["wav", "x-wav", "wave"], "aac": ["mp4", "aac"] };
      a = u.split(',');
      for (k = 0; k < a.length; k++) {
        b = a[k].split('.');
        d = b[b.length - 1];
        if (q[d]) {
          d = q[d];
        } else {
          d = [d];
        }
        c = d.some(function (element, index, array) {
          return s.data.canPlayType(s._type + "/" + element);
        });
        if (c) {
          if (LGlobal.wx) {
            s.onload();
            s.data.src = a[k];
          } else {
            s.data.src = a[k];
            s.onload();
            s.data.load();
          }
          return;
        } else {
          console.warn("Not support " + b[b.length - 1] + " : " + a[k]);
          var e = new LEvent(LEvent.COMPLETE);
          e.currentTarget = e.target = s;
          s.dispatchEvent(e);
        }
      }
      if (s.oncomplete) {
        s.oncomplete({});
      }
    },
    getCurrentTime: function getCurrentTime() {
      return this.data.currentTime;
    },
    setVolume: function setVolume(v) {
      this.data.volume = v;
    },
    getVolume: function getVolume() {
      return this.data.volume;
    },
    play: function play(c, l, to) {
      var s = this;
      if (s.length == 0 && !LGlobal.wx) {
        return;
      }
      if (LGlobal.android && !LGlobal.wx) {
        LSound.Container.stopOther(this);
      }
      if (typeof c == UNDEFINED) {
        c = 0;
      }
      if (typeof l != UNDEFINED) {
        s.loopLength = l;
      }
      if (typeof to !== UNDEFINED) {
        s.currentTimeTo = to > s.length ? s.length : to;
      } else {
        s.currentTimeTo = s.length;
      }
      if (s.timeout) {
        clearTimeout(s.timeout);
        delete s.timeout;
      }
      if (!LGlobal.wx) {
        s.timeout = setTimeout(function () {
          s._onended();
        }, (s.currentTimeTo - s.data.currentTime) * 1000);
      }
      if (LGlobal.wx) {
        s._wxDataList = s._wxDataList || [];
        if (s._wxDataList.length > 0) {
          s.data = s._wxDataList.shift();
        }
        if (s._wxDataList.length == 0) {
          var audio = new Audio();
          audio.addEventListener('ended', function () {
            s._onended(false);
          }, false);
          audio.src = s.data.src;
          s._wxDataList.push(audio);
        }
        s._wxDataList.push(s.data);
      }
      s.data.loop = false;
      s.loopIndex = 0;
      s.playing = true;
      s.data.currentTime = c;
      s.currentStart = c;
      s.data.play();
    },
    playSegment: function playSegment(c, seg, l) {
      this.playTo(c, c + seg, l);
    },
    playTo: function playTo(c, to, l) {
      this.play(c, l, to);
    },
    stop: function stop() {
      var s = this;
      if (!s.playing) {
        return;
      }
      if (s.timeout) {
        clearTimeout(s.timeout);
        delete s.timeout;
      }
      s.playing = false;
      s.data.pause();
    },
    close: function close() {
      var s = this;
      if (!s.playing) {
        return;
      }
      if (s.timeout) {
        clearTimeout(s.timeout);
        delete s.timeout;
      }
      s.playing = false;
      s.data.pause();
      s.data.currentTime = 0;
      s.currentSave = 0;
    },
    ll_check: function ll_check() {
      var s = this;
      if (!s.playing || LGlobal.wx) {
        return;
      }
      if (s.data.duration != s._ll_duration) {
        s._ll_duration = s.data.duration;
        s.length = s.data.duration - (LGlobal.android ? 0.1 : 0);
      }
      if (s.currentTimeTo < s.data.currentTime + LSound.Container.time * 0.005) {
        s._onended();
      }
    },
    die: function die() {
      LSound.Container.remove(this);
    } };

  for (var k in p) {
    LMedia.prototype[k] = p[k];
  }
  return LMedia;
}();
var LSound = function () {
  function LSound(u) {
    var s = this;
    s.type = "LSound";
    s._type = "audio";
    if (LSound.webAudioEnabled && LGlobal.webAudio) {
      LExtends(s, LWebAudio, []);
    } else {
      LExtends(s, LMedia, []);
      try {
        s.data = new Audio();
      } catch (e) {
        console.warn("ReferenceError: Can't find variable: Audio");
        s.data = {};
      }
      s.data.loop = false;
      s.data.autoplay = false;
    }
    if (u) {
      s.load(u);
    }
  }
  LSound.TYPE_SOUND = "sound";
  LSound.webAudioEnabled = false;
  LSound._waitSounds = [];
  LSound.addWait = function (sound, path) {
    LSound._waitSounds.push({ sound: sound, path: path });
  };
  LSound.startLoad = function (sound) {
    if (LSound._waitSounds.length === 0) {
      return;
    }
    LSound._waitSounds.forEach(function (child) {
      child.sound.load(child.path);
    });
    LSound._waitSounds.length = 0;
  };
  var protocol = location.protocol;
  if (protocol == "http:" || protocol == "https:") {
    if (typeof AudioContext !== UNDEFINED) {
      try {
        LWebAudio._context = new AudioContext();
      } catch (e) {}
    } else if (typeof webkitAudioContext !== UNDEFINED) {
      try {
        LWebAudio._context = new webkitAudioContext();
      } catch (e) {}
    }
    if (LWebAudio._context) {
      LWebAudio.container.push(LWebAudio._context);
      LSound.webAudioEnabled = true;
    }
  }
  LSound.Container = {
    ll_save: 0,
    time: 0,
    list: [],
    ll_show: function ll_show() {
      var c = LSound.Container;
      var t = new Date().getTime();
      c.time = t - (c.ll_save ? c.ll_save : t);
      c.ll_save = t;
      var l = c.list;
      for (var i = l.length - 1; i >= 0; i--) {
        if (l[i]) {
          l[i].ll_check();
        }
      }
    },
    add: function add(obj) {
      if (LSound.Container.list.indexOf(obj) >= 0) {
        return;
      }
      LSound.Container.list.push(obj);
    },
    remove: function remove(obj) {
      var l = LSound.Container.list;
      for (var i = l.length - 1; i >= 0; i--) {
        if (l[i].objectIndex == obj.objectIndex) {
          l.splice(i, 1);
          break;
        }
      }
    },
    stopOther: function stopOther(obj) {
      var l = LSound.Container.list;
      for (var i = l.length - 1; i >= 0; i--) {
        if (l[i].objectIndex != obj.objectIndex) {
          l[i].stop();
        }
      }
    } };

  LGlobal.childList.push(LSound.Container);
  return LSound;
}();
var LVideo = function () {
  function LVideo(u) {
    var s = this;
    LExtends(s, LMedia, []);
    s.type = "LVideo";
    s._type = "video";
    s.rotatex = 0;
    s.rotatey = 0;
    var strTag = "";
    if (LGlobal.os == OS_IPHONE && LGlobal.iOSversion[0] >= 10) {
      s.sound = new LSound();
      strTag = " muted playsinline ";
    }
    var div = document.createElement("div");
    div.id = "div_video_" + s.objectIndex;
    div.innerHTML = '<video id="video_' + s.objectIndex + '" ' + strTag + ' style="opacity: 1;width:0px;height:0px;position:absolute;index-z:-999;">';
    document.body.appendChild(div);
    s.data = document.getElementById("video_" + s.objectIndex);
    s.data.loop = false;
    s.data.autoplay = false;
    if (u) {
      s.load(u);
    }
  }
  var p = {
    _ll_show: function _ll_show(c) {
      var s = this;
      c.drawImage(s.data, s.x, s.y);
    },
    load: function load(u) {
      var s = this;
      s.callParent("load", arguments);
      if (s.sound) {
        s.sound.load(u);
      }
    },
    play: function play(c, l, to) {
      var s = this;
      s.callParent("play", arguments);
      if (s.sound) {
        s.sound.play(c, l, to);
      }
    },
    stop: function stop() {
      var s = this;
      s.callParent("stop", arguments);
      if (s.sound) {
        s.sound.stop();
      }
    },
    setVolume: function setVolume(v) {
      var s = this;
      if (s.sound) {
        s.sound.setVolume(v);
      } else {
        s.callParent("setVolume", arguments);
      }
    },
    getVolume: function getVolume() {
      var s = this;
      if (s.sound) {
        return s.sound.getVolume();
      } else {
        return s.callParent("getVolume", arguments);
      }
    },
    close: function close() {
      var s = this;
      s.callParent("close", arguments);
      if (s.sound) {
        s.sound.close();
      }
    },
    die: function die() {
      var s = this;
      document.body.removeChild(document.getElementById("div_video_" + s.objectIndex));
      delete s.data;
      delete s.sound;
    },
    getWidth: function getWidth() {
      return this.data.width;
    },
    getHeight: function getHeight() {
      return this.data.height;
    } };

  for (var k in p) {
    LVideo.prototype[k] = p[k];
  }
  return LVideo;
}();
var LPoint = function () {
  function LPoint(x, y) {
    var s = this;
    s.x = x;
    s.y = y;
  }
  LPoint.distance = function (p1, p2) {
    return LPoint.distance2(p1.x, p1.y, p2.x, p2.y);
  };
  LPoint.distance2 = function (x1, y1, x2, y2) {
    var x = x1 - x2,
    y = y1 - y2;
    return Math.sqrt(x * x + y * y);
  };
  LPoint.interpolate = function (p1, p2, f) {
    return new LPoint(p1.x + (p2.x - p1.x) * (1 - f), p1.y + (p2.y - p1.y) * (1 - f));
  };
  LPoint.polar = function (l, a) {
    return new LPoint(l * Math.cos(a), l * Math.sin(a));
  };
  LPoint.prototype = {
    toString: function toString() {
      return '[object LPoint(' + this.x + ',' + this.y + ')]';
    },
    length: function length() {
      return LPoint.distance2(this.x, this.y, 0, 0);
    },
    add: function add(v) {
      return new LPoint(this.x + v.x, this.y + v.y);
    },
    clone: function clone() {
      return new LPoint(this.x, this.y);
    },
    setTo: function setTo(x, y) {
      this.x = x, this.y = y;
    },
    copyFrom: function copyFrom(s) {
      this.setTo(s.x, s.y);
    },
    equals: function equals(t) {
      return this.x == t.x && this.y == t.y;
    },
    normalize: function normalize(t) {
      var s = this,
      scale = t / s.length();
      s.x *= scale, s.y *= scale;
    },
    offset: function offset(dx, dy) {
      this.x += dx;
      this.y += dy;
    },
    subtract: function subtract(v) {
      return new LPoint(this.x - v.x, this.y - v.y);
    } };

  return LPoint;
}();
var LRectangle = function () {
  function LRectangle(x, y, w, h) {
    var s = this;
    s.x = x;
    s.y = y;
    s.width = w;
    s.height = h;
    s.setRectangle();
  }
  LRectangle.prototype = {
    setRectangle: function setRectangle() {
      var s = this;
      s.bottom = s.y + s.height;
      s.right = s.x + s.width;
      s.left = s.x;
      s.top = s.y;
    },
    clone: function clone() {
      var s = this;
      return new LRectangle(s.x, s.y, s.width, s.height);
    },
    contains: function contains(x, y) {
      var s = this;
      return x >= s.x && x <= s.right && y >= s.y && y <= s.bottom;
    },
    containsRect: function containsRect(rect) {
      var s = this;
      return rect.x >= s.x && rect.right <= s.right && rect.y >= s.y && rect.bottom <= s.bottom;
    },
    equals: function equals(v) {
      var s = this;
      return v.x == s.x && v.width == s.width && v.y == s.y && v.height == s.height;
    },
    inflate: function inflate(dx, dy) {
      var s = this;
      s.width += dx;
      s.height += dy;
      s.setRectangle();
    },
    intersection: function intersection(t) {
      var s = this;
      var ix = s.x > t.x ? s.x : t.x;
      var iy = s.y > t.y ? s.y : t.y;
      var ax = s.right > t.right ? t.right : s.right;
      var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
      if (ix <= ax && iy <= ay) {
        return new LRectangle(ix, iy, ax, ay);
      } else {
        return new LRectangle(0, 0, 0, 0);
      }
    },
    intersects: function intersects(t) {
      var s = this;
      var ix = s.x > t.x ? s.x : t.x;
      var iy = s.y > t.y ? s.y : t.y;
      var ax = s.right > t.right ? t.right : s.right;
      var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
      return ix <= ax && iy <= ay;
    },
    isEmpty: function isEmpty() {
      var s = this;
      return s.x == 0 && s.y == 0 && s.width == 0 && s.height == 0;
    },
    offset: function offset(dx, dy) {
      var s = this;
      s.x += dx;
      s.y += dy;
      s.setRectangle();
    },
    setEmpty: function setEmpty() {
      var s = this;
      s.x = 0;
      s.y = 0;
      s.width = 0;
      s.height = 0;
      s.setRectangle();
    },
    setTo: function setTo(xa, ya, w, h) {
      var s = this;
      s.x = xa;
      s.y = ya;
      s.width = w;
      s.height = h;
      s.setRectangle();
    },
    toString: function toString() {
      var s = this;
      return "[object LRectangle(" + s.x + "," + s.y + "," + s.width + "," + s.height + ")]";
    },
    union: function union(t) {
      var s = this;
      return new LRectangle(s.x > t.x ? t.x : s.x, s.y > t.y ? t.y : s.y, s.right > t.right ? s.right : t.right, s.bottom > t.bottom ? s.bottom : t.bottom);
    } };

  return LRectangle;
}();
var LGraphics = function () {
  function LGraphics() {
    var s = this;
    LExtends(s, LObject, []);
    s.type = "LGraphics";
    s.color = "#000000";
    s.alpha = 1;
    s.bitmap = null;
    s.setList = new Array();
    s.showList = new Array();
  }
  var p = {
    ll_show: function ll_show(ctx) {
      var s = this,
      k,l = s.setList.length;
      if (l == 0) {
        return;
      }
      for (k = 0; k < l; k++) {
        s.setList[k](ctx);
        if (LGlobal.fpsStatus) {
          LGlobal.fpsStatus.graphics++;
        }
      }
    },
    clone: function clone() {
      var s = this,
      a = new LGraphics(),
      i,l,c;
      a.color = s.color;
      a.alpha = s.alpha;
      a.bitmap = s.bitmap;
      for (i = 0, l = s.setList.length; i < l; i++) {
        c = s.setList[i];
        a.setList.push(c);
      }
      for (i = 0, l = s.showList.length; i < l; i++) {
        c = s.showList[i];
        a.showList.push(c);
      }
      return a;
    },
    lineCap: function lineCap(t) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.lineCap = t;
      });
    },
    lineJoin: function lineJoin(t) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.lineJoin = t;
      });
    },
    lineWidth: function lineWidth(t) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.lineWidth = t;
      });
    },
    strokeStyle: function strokeStyle(co) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.strokeStyle = co;
      });
    },
    stroke: function stroke() {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.stroke();
      });
    },
    beginPath: function beginPath() {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.beginPath();
      });
    },
    closePath: function closePath() {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.closePath();
      });
    },
    moveTo: function moveTo(x, y) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.moveTo(x, y);
      });
      s.showList.push({ type: LShape.POINT, arg: [x, y] });
    },
    lineTo: function lineTo(x, y) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.lineTo(x, y);
      });
      s.showList.push({ type: LShape.POINT, arg: [x, y] });
    },
    rect: function rect(x, y, w, h) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.rect(x, y, w, h);
      });
      s.showList.push({ type: LShape.RECT, arg: [x, y, w, h] });
    },
    fillStyle: function fillStyle(co) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.fillStyle = co;
      });
    },
    fill: function fill() {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.fill();
      });
    },
    arc: function arc(x, y, r, sa, ea, aw) {
      var s = this;
      s.setList.push(function (ctx) {
        ctx.arc(x, y, r, sa, ea, aw);
      });
      s.showList.push({ type: LShape.ARC, arg: sa });
    },
    lineStyle: function lineStyle(tn, co) {
      var s = this,
      c;
      if (co == null) {
        co = s.color;
      }
      s.color = co;
      s.setList.push(function (c) {
        c.lineWidth = tn;
        c.strokeStyle = co;
      });
    },
    clear: function clear() {
      var s = this;
      s.bitmap = null;
      s.setList.length = 0;
      s.showList.length = 0;
    },
    beginBitmapFill: function beginBitmapFill(b) {
      var s = this;
      s.setList.push(function () {
        s.bitmap = b;
      });
    },
    drawEllipse: function drawEllipse(tn, lco, pa, isf, co) {
      var s = this;
      s.setList.push(function (c) {
        var x, y, w, h, k, ox, oy, xe, ye, xm, ym;
        c.beginPath();
        k = 0.5522848;
        x = pa[0];
        y = pa[1];
        w = pa[2];
        h = pa[3];
        ox = w / 2 * k;
        oy = h / 2 * k;
        xe = x + w;
        ye = y + h;
        xm = x + w / 2;
        ym = y + h / 2;
        c.moveTo(x, ym);
        c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        if (s.bitmap) {
          c.save();
          c.clip();
          c.drawImage(s.bitmap.image,
          s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
          0, 0, s.bitmap.width, s.bitmap.height);
          c.restore();
          s.bitmap = null;
          return;
        }
        if (isf) {
          c.fillStyle = co;
          c.fill();
        }
        if (tn > 0) {
          c.lineWidth = tn;
          c.strokeStyle = lco;
          c.stroke();
        }
      });
      s.showList.push({ type: LShape.RECT, arg: pa });
    },
    drawArc: function drawArc(tn, lco, pa, isf, co) {
      var s = this;
      s.setList.push(function (c) {
        c.beginPath();
        if (pa.length > 6 && pa[6]) {
          c.moveTo(pa[0], pa[1]);
        }
        c.arc(pa[0], pa[1], pa[2], pa[3], pa[4], pa[5]);
        if (pa.length > 6 && pa[6]) {
          c.lineTo(pa[0], pa[1]);
        }
        if (s.bitmap) {
          c.save();
          c.clip();
          c.drawImage(s.bitmap.image,
          s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
          0, 0, s.bitmap.width, s.bitmap.height);
          c.restore();
          s.bitmap = null;
          return;
        }
        if (isf) {
          c.fillStyle = co;
          c.fill();
        }
        if (tn > 0) {
          c.lineWidth = tn;
          c.strokeStyle = lco;
          c.stroke();
        }
      });
      s.showList.push({ type: LShape.ARC, arg: pa });
    },
    drawRect: function drawRect(tn, lco, pa, isf, co) {
      var s = this;
      s.setList.push(function (c) {
        c.beginPath();
        c.rect(pa[0], pa[1], pa[2], pa[3]);
        c.closePath();
        if (s.bitmap) {
          c.save();
          c.clip();
          c.drawImage(s.bitmap.image,
          s.bitmap.x, s.bitmap.y,
          s.bitmap.width, s.bitmap.height,
          0, 0,
          s.bitmap.width, s.bitmap.height);
          c.restore();
          s.bitmap = null;
          return;
        }
        if (isf) {
          c.fillStyle = co;
          c.fill();
        }
        if (tn > 0) {
          c.lineWidth = tn;
          c.strokeStyle = lco;
          c.stroke();
        }
      });
      s.showList.push({ type: LShape.RECT, arg: pa });
    },
    drawRoundRect: function drawRoundRect(tn, lco, pa, isf, co) {
      var s = this;
      if (LGlobal.enableWebGL) {
        s.drawRect(tn, lco, pa, isf, co);
        return;
      }
      s.setList.push(function (c) {
        c.beginPath();
        c.moveTo(pa[0] + pa[4], pa[1]);
        c.lineTo(pa[0] + pa[2] - pa[4], pa[1]);
        c.arcTo(pa[0] + pa[2], pa[1], pa[0] + pa[2], pa[1] + pa[4], pa[4]);
        c.lineTo(pa[0] + pa[2], pa[1] + pa[3] - pa[4]);
        c.arcTo(pa[0] + pa[2], pa[1] + pa[3], pa[0] + pa[2] - pa[4], pa[1] + pa[3], pa[4]);
        c.lineTo(pa[0] + pa[4], pa[1] + pa[3]);
        c.arcTo(pa[0], pa[1] + pa[3], pa[0], pa[1] + pa[3] - pa[4], pa[4]);
        c.lineTo(pa[0], pa[1] + pa[4]);
        c.arcTo(pa[0], pa[1], pa[0] + pa[4], pa[1], pa[4]);
        c.closePath();
        if (s.bitmap) {
          c.save();
          c.clip();
          c.drawImage(s.bitmap.image,
          0, 0,
          s.bitmap.width, s.bitmap.height,
          0, 0,
          s.bitmap.width, s.bitmap.height);
          c.restore();
          s.bitmap = null;
          return;
        }
        if (isf) {
          c.fillStyle = co;
          c.fill();
        }
        if (tn > 0) {
          c.lineWidth = tn;
          c.strokeStyle = lco;
          c.stroke();
        }
      });
      s.showList.push({ type: LShape.RECT, arg: pa });
    },
    drawVertices: function drawVertices(tn, lco, v, isf, co) {
      var s = this;
      if (v.length < 3) {
        return;
      }
      s.setList.push(function (c) {
        c.beginPath();
        c.moveTo(v[0][0], v[0][1]);
        var i,l = v.length,
        pa;
        for (i = 1; i < l; i++) {
          pa = v[i];
          c.lineTo(pa[0], pa[1]);
        }
        c.lineTo(v[0][0], v[0][1]);
        c.closePath();
        if (s.bitmap) {
          c.save();
          c.clip();
          c.drawImage(s.bitmap.image,
          s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
          0, 0, s.bitmap.width, s.bitmap.height);
          c.restore();
          s.bitmap = null;
          return;
        }
        if (isf) {
          c.fillStyle = co;
          c.fill();
        }
        if (tn > 0) {
          c.lineWidth = tn;
          c.strokeStyle = lco;
          c.closePath();
          c.stroke();
        }
      });
      s.showList.push({ type: LShape.VERTICES, arg: v });
    },
    drawTriangles: function drawTriangles(ve, ind, u, tn, lco) {
      var s = this;
      var i,j,l = ind.length,
      c;
      s.setList.push(function (c) {
        var v = ve,
        a,k,sw;
        for (i = 0, j = 0; i < l; i += 3) {
          a = 0;
          c.save();
          c.beginPath();
          c.moveTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
          c.lineTo(v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
          c.lineTo(v[ind[i + 2] * 2], v[ind[i + 2] * 2 + 1]);
          c.lineTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
          c.closePath();
          if (tn) {
            c.lineWidth = tn;
            c.strokeStyle = lco;
            c.stroke();
          }
          c.clip();
          if (i % 6 == 0) {
            sw = -1;
            var w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
            var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
            if (j == 0 && w < 0) {
              for (k = i + 9; k < l; k += 3) {
                if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
                  j = k - i;
                  break;
                }
              }
              if (j == 0) {
                j = l - i;
              }
              w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
            }
            if (i + j >= l) {
              w = (u[ind[i + j - l] * 2] - u[ind[i + 1] * 2]) * s.bitmap.width;
              sw = u[ind[i] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i] * 2] + w;
              if (sw > s.bitmap.width) {
                sw -= s.bitmap.width;
              }
            } else {
              sw = s.bitmap.width * u[ind[i + j] * 2];
            }
            sh = s.bitmap.height * u[ind[i] * 2 + 1];
            if (h < 0) {
              h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
              sh = 0;
            }
            var t1 = (v[ind[i + 1] * 2] - v[ind[i] * 2]) / w;
            var t2 = (v[ind[i + 1] * 2 + 1] - v[ind[i] * 2 + 1]) / w;
            var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
            var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
            c.transform(t1, t2, t3, t4, v[ind[i] * 2], v[ind[i] * 2 + 1]);
            c.drawImage(s.bitmap.image,
            s.bitmap.x + sw,
            s.bitmap.y + sh,
            w, h,
            0, 0,
            w, h);
          } else {
            var w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
            var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
            if (j == 0 && w < 0) {
              for (k = i + 9; k < l; k += 3) {
                if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
                  j = k - i;
                  break;
                }
              }
              if (j == 0) {
                j = l - i;
              }
              w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
            }
            if (i + 1 + j >= l) {
              w = (u[ind[i + 1 + j - l] * 2] - u[ind[i + 2] * 2]) * s.bitmap.width;
              sw = u[ind[i + 1] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i + 1] * 2] + w;
              if (sw > s.bitmap.width) {
                sw -= s.bitmap.width;
              }
            } else {
              sw = s.bitmap.width * u[ind[i + 1 + j] * 2];
            }
            sh = s.bitmap.height * u[ind[i] * 2 + 1];
            if (h < 0) {
              h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
              sh = 0;
            }
            var t1 = (v[ind[i + 2] * 2] - v[ind[i + 1] * 2]) / w;
            var t2 = (v[ind[i + 2] * 2 + 1] - v[ind[i + 1] * 2 + 1]) / w;
            var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
            var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
            c.transform(t1, t2, t3, t4, v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
            c.drawImage(s.bitmap.image,
            s.bitmap.x + sw,
            s.bitmap.y + sh,
            w, h,
            0, -h,
            w, h);
          }
          c.restore();
        }
      });
    },
    drawLine: function drawLine(tn, lco, pa) {
      var s = this;
      s.setList.push(function (c) {
        c.beginPath();
        c.moveTo(pa[0], pa[1]);
        c.lineTo(pa[2], pa[3]);
        c.lineWidth = tn;
        c.strokeStyle = lco;
        c.closePath();
        c.stroke();
      });
      s.showList.push({ type: LShape.LINE, arg: pa });
    },
    add: function add(f) {
      this.setList.push(f);
    },
    ismouseon: function ismouseon(e, co) {
      var s = this;
      if (e == null || e == UNDEFINED || s.showList.length == 0 || !s.parent) {
        return false;
      }
      return s.parent.ismouseonShapes(s.showList, e.offsetX, e.offsetY);
    },
    getWidth: function getWidth() {
      var s = this,
      k,k1,min,max,v,l,l1;
      for (k = 0, l = s.showList.length; k < l; k++) {
        if (s.showList[k].type == LShape.RECT) {
          if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[0];
          }
          if (max < s.showList[k].arg[0] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[0] + s.showList[k].arg[2];
          }
        } else if (s.showList[k].type == LShape.ARC) {
          if (min > s.showList[k].arg[0] - s.showList[k].arg[2] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[0] - s.showList[k].arg[2];
          }
          if (max < s.showList[k].arg[0] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[0] + s.showList[k].arg[2];
          }
        } else if (s.showList[k].type == LShape.VERTICES) {
          for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
            v = s.showList[k].arg[k1];
            if (min > v[0] || typeof min == UNDEFINED) {
              min = v[0];
            }
            if (max < v[0] || typeof max == UNDEFINED) {
              max = v[0];
            }
          }
        } else if (s.showList[k].type == LShape.LINE) {
          if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[0];
          }
          if (min > s.showList[k].arg[2] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[2];
          }
          if (max < s.showList[k].arg[0] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[0];
          }
          if (max < s.showList[k].arg[2] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[2];
          }
        } else if (s.showList[k].type == LShape.POINT) {
          if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[0];
          }
          if (max < s.showList[k].arg[0] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[0];
          }
        }
      }
      if (typeof min == UNDEFINED) {
        min = max = 0;
      }
      s.left = min;
      if (l > 0 && max == min) {
        max = min + 1;
      }
      return max - min;
    },
    getHeight: function getHeight() {
      var s = this,
      k = null,
      k1 = null,
      l,l1,min,max,v;
      for (k = 0, l = s.showList.length; k < l; k++) {
        if (s.showList[k].type == LShape.RECT) {
          if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[1];
          }
          if (max < s.showList[k].arg[1] + s.showList[k].arg[3] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[1] + s.showList[k].arg[3];
          }
        } else if (s.showList[k].type == LShape.ARC) {
          if (min > s.showList[k].arg[1] - s.showList[k].arg[2] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[1] - s.showList[k].arg[2];
          }
          if (max < s.showList[k].arg[1] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[1] + s.showList[k].arg[2];
          }
        } else if (s.showList[k].type == LShape.VERTICES) {
          for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
            v = s.showList[k].arg[k1];
            if (min > v[1] || typeof min == UNDEFINED) {
              min = v[1];
            }
            if (max < v[1] || typeof max == UNDEFINED) {
              max = v[1];
            }
          }
        } else if (s.showList[k].type == LShape.LINE) {
          if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[1];
          }
          if (min > s.showList[k].arg[3] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[3];
          }
          if (max < s.showList[k].arg[1] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[1];
          }
          if (max < s.showList[k].arg[3] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[3];
          }
        } else if (s.showList[k].type == LShape.POINT) {
          if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
            min = s.showList[k].arg[1];
          }
          if (max < s.showList[k].arg[1] || typeof max == UNDEFINED) {
            max = s.showList[k].arg[1];
          }
        }
      }
      if (typeof min == UNDEFINED) {
        min = max = 0;
      }
      s.top = min;
      if (l > 0 && max == min) {
        max = min + 1;
      }
      return max - min;
    },
    startX: function startX() {
      var s = this;
      s.getWidth();
      return s.left;
    },
    startY: function startY() {
      var s = this;
      s.getHeight();
      return s.top;
    } };

  for (var k in p) {
    LGraphics.prototype[k] = p[k];
  }
  return LGraphics;
}();
var LShape = function () {
  function LShape() {
    var s = this;
    LExtends(s, LInteractiveObject, []);
    s.type = "LShape";
    s.graphics = new LGraphics();
    s.graphics.parent = s;
  }
  LShape.POINT = "point";
  LShape.LINE = "line";
  LShape.ARC = "arc";
  LShape.RECT = "rect";
  LShape.VERTICES = "vertices";
  var p = {
    _ll_show: function _ll_show(c) {
      var s = this;
      s.graphics.ll_show(c);
    },
    getWidth: function getWidth(maskSize) {
      var s = this,
      mx,mw,
      left = s.graphics.startX(),
      right = left + s.graphics.getWidth();
      if (maskSize && s.mask) {
        mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
        mw = s.mask.getWidth();
        if (left < mx) {
          left = mx;
        }
        if (right > mx + mw) {
          right = mx + mw;
        }
      }
      s.ll_left = s.x + left;
      s.ll_right = s.x + right;
      return (right - left) * s.scaleX;
    },
    getHeight: function getHeight(maskSize) {
      var s = this,
      my,mh,
      top = s.graphics.startY(),
      bottom = top + s.graphics.getHeight();
      if (maskSize && s.mask) {
        my = s.mask._startY ? s.mask._startY() : s.mask.startY();
        mh = s.mask.getHeight();
        if (top < my) {
          top = my;
        }
        if (bottom > my + mh) {
          bottom = my + mh;
        }
      }
      s.ll_top = s.y + top;
      s.ll_bottom = s.y + bottom;
      return (bottom - top) * s.scaleY;
    },
    _startX: function _startX() {
      var s = this;
      s.getWidth();
      return s.ll_left;
    },
    startX: function startX() {
      var s = this;
      return s._startX() * s.scaleX;
    },
    _startY: function _startY() {
      var s = this;
      s.getHeight();
      return s.ll_top;
    },
    startY: function startY() {
      var s = this;
      return s._startY() * s.scaleY;
    },
    clone: function clone() {
      var s = this,
      a = new LShape(),
      c,o;
      a.copyProperty(s);
      a.graphics = s.graphics.clone();
      a.graphics.parent = a;
      return a;
    },
    ismouseon: function ismouseon(e, cd) {
      var s = this,
      i = false,
      sc;
      if (!s.visible || e == null) {
        return false;
      }
      if (s.mask) {
        if (!s.mask.parent) {
          s.mask.parent = s.parent;
        }
        if (!s.mask.ismouseon(e, cd)) {
          return false;
        }
      }
      sc = { x: s.x * cd.scaleX + cd.x, y: s.y * cd.scaleY + cd.y, scaleX: cd.scaleX * s.scaleX, scaleY: cd.scaleY * s.scaleY };
      if (s.graphics) {
        i = s.graphics.ismouseon(e, sc);
      }
      return i;
    },
    die: function die() {
      var s = this;
      s.graphics.clear();
      s.callParent("die", arguments);
    } };

  for (var k in p) {
    LShape.prototype[k] = p[k];
  }
  return LShape;
}();
var LSprite = function () {
  function LSprite() {
    var s = this;
    LExtends(s, LDisplayObjectContainer, []);
    s.type = "LSprite";
    s.rotatex;
    s.rotatey;
    s.graphics = new LGraphics();
    s.graphics.parent = s;
    s.box2dBody = null;
    s.shapes = new Array();
    s.dragRange = null;
    s.useCursor = null;
  }
  var p = {
    setRotate: function setRotate(angle) {
      var s = this;
      if (s.box2dBody) {
        s.box2dBody.SetAngle(angle);
      } else {
        s.rotate = angle;
      }
    },
    _rotateReady: function _rotateReady() {
      var s = this;
      if (s.box2dBody) {
        if (typeof s.rotatex == UNDEFINED) {
          s.getRotateXY();
        }
        s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
        s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
        s.rotate = s.box2dBody.GetAngle();
      }
    },
    _ll_show: function _ll_show(c) {
      var s = this;
      s.graphics.ll_show(c);
      LGlobal.show(s.childList, c);
      s._ll_debugShape(c);
    },
    startDrag: function startDrag(touchPointID) {
      var s = this;
      if (s.ll_dragStart) {
        return;
      }
      s.ll_touchPointID = touchPointID;
      s.ll_dragGlobalPoint = s.parent.localToGlobal(new LPoint(s.x, s.y));
      s.ll_dragMX = mouseX;
      s.ll_dragMY = mouseY;
      s.ll_dragStart = true;
      LGlobal.dragList.push(s);
    },
    stopDrag: function stopDrag() {
      var s = this,
      i,l;
      for (i = 0, l = LGlobal.dragList.length; i < l; i++) {
        if (s.objectIndex == LGlobal.dragList[i].objectIndex) {
          s.ll_dragStart = false;
          LGlobal.dragList.splice(i, 1);
          break;
        }
      }
    },
    getRotateXY: function getRotateXY(w, h) {
      var s = this;
      if (!w || !h) {
        w = s.getWidth();
        h = s.getHeight();
      }
      s.rotatex = w / 2;
      s.rotatey = h / 2;
    },
    getWidth: function getWidth(maskSize) {
      var s = this,
      i,l,o,a,b,mx,mw,
      left = s.graphics.startX(),
      right = left + s.graphics.getWidth();
      for (i = 0, l = s.childList.length; i < l; i++) {
        o = s.childList[i];
        if (typeof o.visible == UNDEFINED || !o.visible) {
          continue;
        }
        a = o.x;
        if (typeof o._startX == "function") {
          a = o._startX(maskSize);
        }
        b = a + o.getWidth(maskSize);
        if (a < left) {
          left = a;
        }
        if (b > right) {
          right = b;
        }
      }
      if (maskSize && s.mask) {
        mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
        mw = s.mask.getWidth();
        if (left < mx) {
          left = mx;
        }
        if (right > mx + mw) {
          right = mx + mw;
        }
        s.ll_left = left;
        s.ll_right = right;
      } else {
        s.ll_left = s.x + left;
        s.ll_right = s.x + right;
      }
      return (right - left) * s.scaleX;
    },
    getHeight: function getHeight(maskSize) {
      var s = this,
      i,l,o,a,b,my,mh,
      top = s.graphics.startY(),
      bottom = top + s.graphics.getHeight();
      for (i = 0, l = s.childList.length; i < l; i++) {
        o = s.childList[i];
        if (typeof o.visible == UNDEFINED || !o.visible) {
          continue;
        }
        a = o.y;
        if (typeof o._startY == "function") {
          a = o._startY(maskSize);
        }
        b = a + o.getHeight(maskSize);
        if (a < top) {
          top = a;
        }
        if (b > bottom) {
          bottom = b;
        }
      }
      if (maskSize && s.mask) {
        my = s.mask._startY ? s.mask._startY() : s.mask.startY();
        mh = s.mask.getHeight();
        if (top < my) {
          top = my;
        }
        if (bottom > my + mh) {
          bottom = my + mh;
        }
        s.ll_top = top;
        s.ll_bottom = bottom;
      } else {
        s.ll_top = s.y + top;
        s.ll_bottom = s.y + bottom;
      }
      return (bottom - top) * s.scaleY;
    },
    _startX: function _startX(maskSize) {
      var s = this;
      s.getWidth(maskSize);
      return s.ll_left;
    },
    startX: function startX(maskSize) {
      var s = this;
      return s._startX(maskSize) * s.scaleX;
    },
    _startY: function _startY(maskSize) {
      var s = this;
      s.getHeight(maskSize);
      return s.ll_top;
    },
    startY: function startY(maskSize) {
      var s = this;
      return s._startY(maskSize) * s.scaleY;
    },
    _ll_loopframe: function _ll_loopframe() {
      this.dispatchEvent(LEvent.ENTER_FRAME);
    },
    clone: function clone() {
      var s = this,
      a = new LSprite(),
      c,o,i,l;
      a.copyProperty(s);
      a.graphics = s.graphics.clone();
      a.graphics.parent = a;
      a.childList.length = 0;
      for (i = 0, l = s.childList.length; i < l; i++) {
        c = s.childList[i];
        if (c.clone) {
          o = c.clone();
          o.parent = a;
          a.childList.push(o);
        }
      }
      return a;
    },
    _mevent: function _mevent(type) {
      var s = this,
      k;
      for (k = 0; k < s.mouseList.length; k++) {
        var o = s.mouseList[k];
        if (o.type == type) {
          return true;
        }
      }
      return false;
    },
    ll_dispatchMouseEvent: function ll_dispatchMouseEvent(type, e, cd, ox, oy) {
      var s = this;
      if (!s.mouseEnabled) {
        return;
      }
      for (k = 0; k < s.mouseList.length; k++) {
        var o = s.mouseList[k];
        if (o.type == type) {
          e.selfX = (ox - (s.x * cd.scaleX + cd.x)) / (cd.scaleX * s.scaleX);
          e.selfY = (oy - (s.y * cd.scaleY + cd.y)) / (cd.scaleY * s.scaleY);
          e.currentTarget = e.clickTarget = s;
          if (!e.target) {
            e.target = s;
          }
          o.listener(e, s);
        }
      }
    },
    ll_mouseout: function ll_mouseout(e, type, cd, ox, oy) {
      var s = this;
      if (type == LMouseEvent.MOUSE_MOVE && s.ll_mousein) {
        s.ll_mousein = false;
        if (s._mevent(LMouseEvent.MOUSE_OUT)) {
          s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OUT, e, cd, ox, oy);
        }
        if (s.mouseChildren) {
          for (var k = s.childList.length - 1; k >= 0; k--) {
            if (s.childList[k].mouseEvent && s.childList[k].ll_mouseout) {
              s.childList[k].ll_mouseout(e, type, cd, ox, oy);
            }
          }
        }
      }
    },
    mouseEvent: function mouseEvent(e, type, cd) {
      if (!e) {
        return false;
      }
      var s = this,
      i,k,ox = e.offsetX,
      oy = e.offsetY,
      on,mc;
      if (!s.visible) {
        return false;
      }
      if (cd == null) {
        cd = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
      }
      on = s.ismouseon(e, cd);
      if (on) {
        if (LGlobal.os == OS_PC && s.useCursor && type == LMouseEvent.MOUSE_MOVE) {
          LGlobal.cursor = s.useCursor;
        }
        if (type == LMouseEvent.MOUSE_MOVE && !s.ll_mousein) {
          s.ll_mousein = true;
          if (s._mevent(LMouseEvent.MOUSE_OVER)) {
            s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OVER, e, cd, ox, oy);
          }
        }
        if (s.mouseChildren) {
          mc = { x: s.x * cd.scaleX + cd.x, y: s.y * cd.scaleY + cd.y, scaleX: cd.scaleX * s.scaleX, scaleY: cd.scaleY * s.scaleY };
          for (k = s.childList.length - 1; k >= 0; k--) {
            if (s.childList[k].mouseEvent) {
              i = s.childList[k].mouseEvent(e, type, mc);
              if (i) {
                e.target = s.childList[k];
                if (type != LMouseEvent.MOUSE_MOVE) {
                  break;
                }
              }
            }
          }
          if (s._mevent(type)) {
            s.ll_dispatchMouseEvent(type, e, cd, ox, oy);
          }
        }
        return true;
      } else {
        s.ll_mouseout(e, type, cd, ox, oy);
      }
      return false;
    },
    hitTestPoint: function hitTestPoint(x, y) {
      var s = this,
      shapes = s.shapes;
      if (!shapes || shapes.length == 0) {
        s.getWidth();
        s.getHeight();
        shapes = [{ "type": LShape.RECT, "arg": [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top] }];
      }
      return s.ismouseonShapes(shapes, x, y);
    },
    hitTestObject: function hitTestObject(obj) {
      var s = this,
      shapes = s.shapes,
      shapes1 = obj.shapes,
      m,m1,j,child,j1,child1,vo1,v1;
      if (!shapes || shapes.length == 0) {
        s.getWidth();
        s.getHeight();
        shapes = [{ "type": LShape.RECT, "arg": [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top] }];
      }
      if (!shapes1 || shapes1.length == 0) {
        obj.getWidth();
        obj.getHeight();
        shapes1 = [{ "type": LShape.RECT, "arg": [obj.ll_left - obj.x, obj.ll_top - obj.y, obj.ll_right - obj.ll_left, obj.ll_bottom - obj.ll_top] }];
      }
      m = s.getRootMatrix();
      m1 = obj.getRootMatrix();
      for (j = shapes.length - 1; j >= 0; j--) {
        child = shapes[j];
        v1 = s._changeShape(child.type, child.arg, m);
        for (j1 = shapes1.length - 1; j1 >= 0; j1--) {
          child1 = shapes1[j1];
          vo1 = obj._changeShape(child1.type, child1.arg, m1);
          if (child.type == LShape.VERTICES || child.type == LShape.RECT) {
            if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
              if (LGlobal.hitTestPolygon(v1, vo1)) {
                return true;
              }
            } else if (child1.type == LShape.ARC) {
              if (LGlobal.hitTestPolygonArc(v1, vo1)) {
                return true;
              }
            }
          } else {
            if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
              if (LGlobal.hitTestPolygonArc(vo1, v1)) {
                return true;
              }
            } else if (child1.type == LShape.ARC) {
              if (Math.sqrt((v1[0] - vo1[0]) * (v1[0] - vo1[0]) + (v1[1] - vo1[1]) * (v1[1] - vo1[1])) < v1[2] + vo1[2]) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    addShape: function addShape(type, arg) {
      var s = this;
      if (type == LShape.VERTICES && arg.length < 3) {
        return;
      }
      s.shapes.push({ "type": type, "arg": arg });
      return s.shapes;
    },
    addShapes: function addShapes(shapes) {
      var s = this;
      if (s.shapes.length == 0) {
        s.shapes = shapes;
      } else {
        s.shapes = s.shapes.concat(shapes);
      }
    },
    clearShape: function clearShape() {
      this.shapes = [];
    },
    _ll_debugShape: function _ll_debugShape(c) {
      var s = this,
      i,l,child,arg,j,ll;
      if (!LGlobal.traceDebug || !s.shapes || s.shapes.length == 0) {
        return;
      }
      for (i = 0, l = s.shapes.length; i < l; i++) {
        child = s.shapes[i];
        c = c || LGlobal.canvas;
        arg = child.arg;
        c.beginPath();
        if (child.type == LShape.RECT) {
          c.rect(arg[0], arg[1], arg[2], arg[3]);
        } else if (child.type == LShape.ARC) {
          c.arc(arg[0], arg[1], arg[2], 0, 2 * Math.PI);
        } else if (child.type == LShape.VERTICES) {
          c.moveTo(arg[0][0], arg[0][1]);
          for (j = 1, ll = arg.length; j < ll; j++) {
            c.lineTo(arg[j][0], arg[j][1]);
          };
          c.lineTo(arg[0][0], arg[0][1]);
        }
        c.closePath();
        c.strokeStyle = "#00FF00";
        c.stroke();
      }
    },
    ismouseon: function ismouseon(e, cd) {
      var s = this;
      if (!s.visible || e == null) {
        return false;
      }
      if (s.mask) {
        if (!s.mask.parent) {
          s.mask.parent = s.parent;
        }
        if (!s.mask.ismouseon(e, cd)) {
          return false;
        }
      }
      if (s.shapes && s.shapes.length > 0) {
        return s.ismouseonShapes(s.shapes, e.offsetX, e.offsetY);
      }
      var k,i = false,
      l = s.childList,
      sc = { x: s.x * cd.scaleX + cd.x, y: s.y * cd.scaleY + cd.y, scaleX: cd.scaleX * s.scaleX, scaleY: cd.scaleY * s.scaleY };
      for (k = l.length - 1; k >= 0; k--) {
        if (l[k].ismouseon) {
          i = l[k].ismouseon(e, sc);
        }
        if (i) {
          e.target = s.childList[k];
          break;
        }
      }
      if (!i) {
        i = s.graphics.ismouseon(e, sc);
      }
      return i;
    },
    die: function die() {
      var s = this,
      i,c,l;
      s.graphics.clear();
      s.removeAllEventListener();
      s.stopDrag();
      if (s.box2dBody) {
        s.clearBody();
      }
      for (i = 0, c = s.childList, l = c.length; i < l; i++) {
        if (c[i].die) {
          c[i].die();
        }
      }
    } };

  for (var k in p) {
    LSprite.prototype[k] = p[k];
  }
  return LSprite;
}();
var LAtlasSprite = function () {
  function LAtlasSprite(texture, setting, data, atlasType) {
    var s = this;
    LExtends(s, LSprite, []);
    s.atlasType = atlasType;
    s._rotated = data.rotated;
    if (atlasType === LSpriteAtlasType.SIMPLE || !setting) {
      s.atlasType = LSpriteAtlasType.SIMPLE;
      var bitmap = s._getBitmap(texture, data);
      s.addChild(bitmap);
    } else if (atlasType === LSpriteAtlasType.SLICED) {
      var panel = s._getPanel(texture, setting, data);
      s.addChild(panel);
    }
  }
  var p = {
    resize: function resize(width, height) {
      var s = this;
      if (s.atlasType === LSpriteAtlasType.SIMPLE) {
        var sprite = s.getChildAt(0);
        var bitmap = sprite.getChildAt(0);
        var bitmapWidth = s._rotated ? bitmap.bitmapData.getHeight() : bitmap.bitmapData.getWidth();
        var bitmapHeight = s._rotated ? bitmap.bitmapData.getWidth() : bitmap.bitmapData.getHeight();
        sprite.scaleX = width / bitmapWidth;
        sprite.scaleY = height / bitmapHeight;
      } else if (s.atlasType === LSpriteAtlasType.SLICED) {
        var panel = s.getChildAt(0);
        if (s._rotated) {
          panel.resize(height, width);
          panel.y = height;
        } else {
          panel.resize(width, height);
        }
      }
    },
    _getBitmapData: function _getBitmapData(texture, data) {
      var s = this;
      var x = data.frame[0][0];
      var y = data.frame[0][1];
      var width = data.frame[1][data.rotated ? 1 : 0];
      var height = data.frame[1][data.rotated ? 0 : 1];
      var bitmapData = new LBitmapData(texture, x, y, width, height);
      return bitmapData;
    },
    _getBitmap: function _getBitmap(texture, data) {
      var s = this;
      var bitmapData = s._getBitmapData(texture, data);
      var bitmap = new LBitmap(bitmapData);
      bitmap.rotateCenter = false;
      if (data.rotated) {
        bitmap.y = bitmapData.getWidth();
        bitmap.rotate = -90;
      }
      var sprite = new LSprite();
      sprite.addChild(bitmap);
      return sprite;
    },
    _getPanel: function _getPanel(texture, setting, data) {
      var s = this;
      var bitmapData = s._getBitmapData(texture, data);
      var width = bitmapData.getWidth();
      var height = bitmapData.getHeight();
      var left = data.rotated ? setting.bottom : setting.left;
      var right = data.rotated ? setting.top : setting.right;
      var top = data.rotated ? setting.left : setting.top;
      var bottom = data.rotated ? setting.right : setting.bottom;
      var x1 = left;
      var x2 = width - right;
      var y1 = top;
      var y2 = height - bottom;
      var panel = new LPanel(bitmapData, width, height, x1, x2, y1, y2);
      if (data.rotated) {
        panel.y = width;
        panel.rotate = -90;
      }
      return panel;
    } };

  for (var k in p) {
    LAtlasSprite.prototype[k] = p[k];
  }
  return LAtlasSprite;
}();
var LButton = function () {
  function LButton(upState, overState, downState, disableState) {
    var s = this;
    LExtends(s, LSprite, []);
    s.type = "LButton";
    s.addChild(upState);
    if (!overState) {
      overState = upState;
    } else {
      s.addChild(overState);
    }
    if (!downState) {
      downState = overState;
    } else {
      s.addChild(downState);
    }
    if (!disableState) {
      disableState = upState;
    } else {
      s.addChild(disableState);
    }
    s.upState = s.bitmap_up = upState;
    s.overState = s.bitmap_over = overState;
    s.downState = downState;
    s.disableState = disableState;
    s._ll_down_sx = s.downState.scaleX;
    s._ll_down_sy = s.downState.scaleY;
    s.overState.visible = false;
    s.downState.visible = false;
    s.upState.visible = true;
    s.buttonMode = true;
    s.staticMode = false;
    s.setState(LButton.STATE_ENABLE);
    if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
      LMouseEventContainer.pushButton(s);
    }
    s.addEventListener(LMouseEvent.MOUSE_DOWN, s.ll_modeDown);
    s.setCursorEnabled(true);
  }
  LButton.STATE_DISABLE = "disable";
  LButton.STATE_ENABLE = "enable";
  var p = {
    setState: function setState(state) {
      var s = this;
      if (state == LButton.STATE_DISABLE) {
        s.upState.visible = false;
        s.overState.visible = false;
        s.downState.visible = false;
        s.disableState.visible = true;
        s.mouseEnabled = false;
      } else if (state == LButton.STATE_ENABLE) {
        s.overState.visible = false;
        s.downState.visible = false;
        s.disableState.visible = false;
        s.upState.visible = true;
        s.mouseEnabled = true;
      } else {
        return;
      }
      s.state = state;
    },
    ll_mouseout: function ll_mouseout(e, type, cd, ox, oy) {
      var s = this;
      if (!s.ll_mousein) {
        return;
      }
      e.clickTarget = s;
      s.ll_modeOut(e);
      s.ll_mousein = false;
    },
    mouseEvent: function mouseEvent(e, type, cd) {
      if (!e) {
        return false;
      }
      var s = this;
      if (LGlobal.os == OS_PC && type == LMouseEvent.MOUSE_MOVE && s.ll_button_mode) {
        s.ll_button_mode(e);
      }
      return this.callParent("mouseEvent", arguments);
    },
    ll_button_mode: function ll_button_mode(e) {
      var s = this;
      if (!s.visible) {
        return;
      }
      e.clickTarget = s;
      if (s.hitTestPoint(e.offsetX, e.offsetY)) {
        s.ll_modeOver(e);
      } else {
        s.ll_modeOut(e);
      }
    },
    ll_modeDown: function ll_modeDown(e) {
      var s = e.clickTarget,
      w,h,tw,th,x,y,tx,ty,onComplete;
      if (!s.buttonMode || s.tween) {
        return;
      }
      if (s.state == LButton.STATE_DISABLE) {
        s.upState.visible = false;
        s.overState.visible = false;
        s.downState.visible = false;
        s.disableState.visible = true;
        return;
      }
      s.upState.visible = false;
      s.overState.visible = false;
      s.downState.visible = true;
      s._tweenOver = s.ll_modeOver;
      onComplete = function onComplete(obj) {
        var s = obj.parent;
        if (!s || !s.tween) {
          return;
        }
        delete s.tween;
        s._tweenOver({ clickTarget: s });
        delete s._tweenOver;
      };
      if (s.staticMode) {
        s.tween = LTweenLiteTimeline.to(s.downState, 0.3, {}).to(s.downState, 0.1, { onComplete: onComplete });
      } else {
        w = s.downState.getWidth();
        h = s.downState.getHeight();
        tw = w * 1.1;
        th = h * 1.1;
        x = s.downState.x;
        y = s.downState.y;
        tx = x + (w - tw) * 0.5;
        ty = y + (h - th) * 0.5;
        s.tween = LTweenLiteTimeline.to(s.downState, 0.3, { x: tx, y: ty, scaleX: s._ll_down_sx * 1.1, scaleY: s._ll_down_sy * 1.1, ease: Quart.easeOut }).
        to(s.downState, 0.1, { x: x, y: y, scaleX: s._ll_down_sx, scaleY: s._ll_down_sy, ease: Quart.easeOut, onComplete: onComplete });
      }
    },
    ll_modeOver: function ll_modeOver(e) {
      var s = e.clickTarget;
      if (!s.buttonMode) {
        return;
      }
      if (s.tween) {
        s._tweenOver = s.ll_modeOver;
        return;
      }
      if (s.state == LButton.STATE_DISABLE) {
        s.upState.visible = false;
        s.overState.visible = false;
        s.downState.visible = false;
        s.disableState.visible = true;
        return;
      }
      s.upState.visible = false;
      s.downState.visible = false;
      s.overState.visible = true;
    },
    ll_modeOut: function ll_modeOut(e) {
      var s = e.clickTarget;
      if (!s.buttonMode) {
        return;
      }
      if (s.tween) {
        s._tweenOver = s.ll_modeOut;
        return;
      }
      if (s.state == LButton.STATE_DISABLE) {
        s.upState.visible = false;
        s.overState.visible = false;
        s.downState.visible = false;
        s.disableState.visible = true;
        return;
      }
      s.overState.visible = false;
      s.downState.visible = false;
      s.upState.visible = true;
    },
    setCursorEnabled: function setCursorEnabled(value) {
      this.useCursor = value ? "pointer" : null;
    },
    clone: function clone() {
      var s = this;
      return new LButton(s.upState.clone(), s.overState.clone(), s.downState.clone(), s.disableState.clone());
    },
    die: function die() {
      var s = this;
      if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
        LMouseEventContainer.removeButton(s);
      }
      s.callParent("die", arguments);
    } };

  for (var k in p) {
    LButton.prototype[k] = p[k];
  }
  return LButton;
}();

function LBlendMode() {throw "LBlendMode cannot be instantiated";}
LBlendMode.SOURCE_OVER = "source-over";
LBlendMode.SOURCE_ATOP = "source-atop";
LBlendMode.SOURCE_IN = "source-in";
LBlendMode.SOURCE_OUT = "source-out";
LBlendMode.DESTINATION_OVER = "destination-over";
LBlendMode.DESTINATION_ATOP = "destination-atop";
LBlendMode.DESTINATION_IN = "destination-in";
LBlendMode.DESTINATION_OUT = "destination-out";
LBlendMode.LIGHTER = "lighter";
LBlendMode.COPY = "copy";
LBlendMode.XOR = "xor";
LBlendMode.NONE = null;
LBlendMode.NORMAL = null;
var LTextFieldType = function LTextFieldType() {throw "LTextFieldType cannot be instantiated";};
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;
var LStyleSheet = function () {
  function LStyleSheet() {
    var s = this;
    LExtends(s, LObject, []);
    s.styleIndex = 0;
    s.styleNames = {};
  }
  LStyleSheet.prototype.clone = function () {
    var s = this,
    a = new s.constructor();
    a.copyProperty(s);
    return a;
  };
  LStyleSheet.prototype.setStyle = function (styleName, styleObject) {
    this.styleIndex++;
    if (styleObject === null) {
      if (this.styleNames[styleName]) {
        delete this.styleNames[styleName];
      }
      return;
    }
    var arr = styleObject.replace(/(^\{)|(\}$)/g, "").split(";"),
    i,styleObjects;
    styleObject = {};
    for (i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        continue;
      }
      var styleObjects = arr[i].split(":");
      if (!styleObjects[0]) {
        continue;
      }
      styleObject[styleObjects[0]] = styleObjects[1];
    }
    this.styleNames[styleName] = styleObject;
  };
  LStyleSheet.prototype.getStyle = function (styleName) {
    return this.styleNames[styleName];
  };
  return LStyleSheet;
}();
var LTextFormat = function () {
  function LTextFormat(font, size, color, bold, italic, underline) {
    var s = this;
    LExtends(s, LObject, []);
    s.font = font ? font : "Arial";
    s.size = size ? size : 15;
    s.color = color ? color : "#000000";
    s.bold = bold ? bold : false;
    s.italic = italic ? italic : false;
    s.underline = underline ? underline : false;
  }
  LTextFormat.prototype.clone = function () {
    var s = this,
    a = new s.constructor();
    a.copyProperty(s);
    return a;
  };
  LTextFormat.prototype.getFontText = function () {
    var s = this;
    return (s.italic ? "italic " : "") + (s.bold ? "bold " : "") + s.size + "px " + s.font;
  };
  LTextFormat.prototype.setCss = function (css) {
    var s = this,
    k;
    for (k in css) {
      switch (k) {
        case "color":
          s.color = css[k];
          break;
        case "font-family":
          s.font = css[k];
          break;
        case "font-size":
          s.size = css[k];
          break;
        case "font-style":
          s.italic = css[k] == "italic";
          break;
        case "font-weight":
          s.bold = css[k] == "bold";
          break;
        case "text-decoration":
          s.color = css[k] == "underline";
          break;}

    }
  };
  return LTextFormat;
}();
var LTextField = function () {
  function LTextField() {
    var s = this;
    LExtends(s, LInteractiveObject, []);
    s.type = "LTextField";
    s.texttype = null;
    s.text = "";
    s.htmlText = "";
    s.styleSheet = "";
    s.font = "Arial";
    s.size = 15;
    s.color = "#000000";
    s.weight = "normal";
    s.textAlign = "left";
    s.textBaseline = "top";
    s.heightMode = LTextField.HEIGHT_MODE_BOTTOM;
    s.stroke = false;
    s.lineWidth = 1;
    s.lineColor = "#000000";
    s.width = 150;
    s.height = s.size;
    s.displayAsPassword = false;
    s.wordWrap = false;
    s.multiline = false;
    s.numLines = 1;
    s.speed = 0;
    s._speedIndex = 100;
  }
  LTextField.HEIGHT_MODE_BOTTOM = "bottom";
  LTextField.HEIGHT_MODE_BASELINE = "baseline";
  var p = {
    _showReady: function _showReady(c) {
      var s = this;
      c.font = s.weight + " " + s.size + "px " + s.font;
      c.textAlign = s.textAlign;
      c.textBaseline = s.textBaseline;
      c.fillStyle = s.color;
      if (s.stroke) {
        c.strokeStyle = s.lineColor;
        c.lineWidth = s.lineWidth + 1;
      }
    },
    ll_getStyleSheet: function ll_getStyleSheet(textFormat, tabName, attribute, text) {
      var s = this,
      pattern,tf = textFormat.clone();
      if (tabName == "font") {
        var i = 0;
        while (attribute) {
          if (i++ > 4)
          break;
          pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
          var arr = pattern.exec(attribute);
          if (!arr || !arr[0]) {
            break;
          }
          switch (arr[2]) {
            case "face":
              tf.font = arr[6];
              break;
            case "color":
              tf.color = arr[6];
              break;
            case "size":
              tf.size = arr[6];
              break;}

          attribute = attribute.replace(arr[0], "").replace(/(^\s*)|(\s*$)|(\n)/g, "");
        }
      } else if (tabName == "b") {
        tf.bold = true;
      } else if (tabName == "u") {
        tf.underline = true;
      } else if (tabName == "i") {
        tf.italic = true;
      } else if (tabName == "p" && s.wordWrap) {
        text = "\n" + text + "\n";
      } else if (s.styleSheet) {
        var sheetObj;
        if (tabName == "span") {
          pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
          var arr = pattern.exec(attribute);
          if (arr && arr[0]) {
            switch (arr[2]) {
              case "class":
                sheetObj = s.styleSheet.getStyle("." + arr[6]);
                break;}

          }
        } else if (s.styleSheet.getStyle(tabName)) {
          sheetObj = s.styleSheet.getStyle(tabName);
        }
        if (sheetObj) {
          tf.setCss(sheetObj);
        }
      }
      s.ll_getHtmlText(tf, text);
    },
    ll_getHtmlText: function ll_getHtmlText(tf, text) {
      if (!text) {
        return;
      }
      var s = this,
      tabName,content,start,end,pattern = /<(.*?)(\s*)(.*?)>(.*?)<\/\1>/g,
      arr = pattern.exec(text);
      if (!arr || !arr[0]) {
        s.ll_htmlTexts.push({
          textFormat: tf.clone(),
          text: text });

        return;
      }
      if (arr.index > 0) {
        s.ll_htmlTexts.push({
          textFormat: tf.clone(),
          text: text.substring(0, arr.index) });

      }
      tabName = arr[1];
      start = arr.index;
      end = start;
      do {
        end = text.indexOf("</" + tabName, end + 1);
        start = text.indexOf("<" + tabName, start + 1);
      } while (start > 0 && start < end);
      content = text.substring(text.indexOf(">", arr.index) + 1, end);
      s.ll_getStyleSheet(tf, tabName, arr[3], content);
      s.ll_getHtmlText(tf, text.substring(end + tabName.length + 3));
    },
    _createAlignCanvas: function _createAlignCanvas(c) {
      var s = this;
      if (!s._alignCanvas) {
        s._alignCanvas = document.createElement("canvas");
        s._alignContext = s._alignCanvas.getContext("2d");
      }
      s._alignCanvas.width = s.width;
      s._alignContext.font = c.font;
      s._alignContext.fillStyle = c.fillStyle;
      s._alignContext.textBaseline = c.textBaseline;
      s._alignContext.textAlign = "left";
      if (s.stroke) {
        s._alignContext.strokeStyle = c.strokeStyle;
        s._alignContext.lineWidth = c.lineWidth;
      }
    },
    _ll_show: function _ll_show(ctx) {
      var s = this,
      c,d,lbl,i,rc,j,l,k,m,b,h,enter,tf,underlineY;
      if (LGlobal.enableWebGL) {
        s._createCanvas();
        s._canvas.width = LGlobal.width;
        s._canvas.height = LGlobal.height;
        s._showReady(s._context);
        c = s._context;
      } else {
        c = ctx;
      }
      if (s.texttype == LTextFieldType.INPUT) {
        s.inputBackLayer.ll_show(c);
        rc = s.getRootCoordinate();
        if (!LGlobal.wx && LGlobal.inputBox.name == "input" + s.objectIndex) {
          LGlobal.inputBox.style.marginTop = parseInt(LGlobal.canvasObj.style.marginTop) + ((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height >>> 0) + "px";
          LGlobal.inputBox.style.marginLeft = parseInt(LGlobal.canvasObj.style.marginLeft) + ((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width >>> 0) + "px";
        }
        if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex == s.objectIndex) {
          return;
        } else {
          if (s.inputBackLayer.graphics.setList.length === 0) {
            c.rect(0, 0, s.inputBackLayer.getWidth(), s.inputBackLayer.getHeight());
          }
          c.clip();
        }
      }
      if (LGlobal.fpsStatus) {
        LGlobal.fpsStatus.text++;
      }
      if (s.htmlText) {
        if (s.ll_htmlText != s.htmlText || s.styleSheet && (s.ll_style_objectIndex != s.styleSheet.objectIndex || s.ll_styleIndex == s.styleSheet.styleIndex)) {
          tf = new LTextFormat();
          s.ll_htmlTexts = [];
          s.ll_htmlText = s.htmlText;
          if (s.styleSheet) {
            s.ll_style_objectIndex = s.styleSheet.objectIndex;
            s.ll_styleIndex = s.styleSheet.styleIndex;
          }
          s.ll_getHtmlText(tf, s.htmlText);
        }
        j = 0, k = 0, m = 0, b = 0, cx = 0;
        s._ll_height = s.wordHeight || 30;
        if (!LTextField.underlineY) {
          LTextField.underlineY = { "alphabetic": 0, "top": 1, "bottom": -0.2, "middle": 0.4, "hanging": 0.8 };
        }
        s._createAlignCanvas(c);
        var context = c;
        c = s._alignContext;
        s.ll_htmlTexts.forEach(function (element) {
          var textFormat = element.textFormat,
          text = element.text;
          c.font = textFormat.getFontText();
          c.fillStyle = textFormat.color;
          for (i = 0, l = text.length; i < l; i++) {
            enter = /(?:\r\n|\r|\n|¥n)/.exec(text.substr(i, 1));
            if (enter) {
              currentWidth -= i > 0 ? c.measureText(text.substr(i, 1)).width : 0;
              j = 0;
              k = i + 1;
              cx = 0;
              if (s.textAlign == "center") {
                cx = -currentWidth * 0.5;
              } else if (s.textAlign == "right") {
                cx = -currentWidth;
              }
              context.drawImage(s._alignCanvas, cx, m * s._ll_height - s._ll_height);
              s._createAlignCanvas(context);
              c.font = textFormat.getFontText();
              c.fillStyle = textFormat.color;
              currentWidth = 0;
              m++;
              continue;
            } else {
              h = c.measureText("O").width * 1.2;
              if (s.stroke) {
                c.strokeText(text.substr(i, 1), j, s._ll_height);
              }
              c.fillText(text.substr(i, 1), j, s._ll_height);
              if (textFormat.underline) {
                c.beginPath();
                underlineY = s._ll_height + h * LTextField.underlineY[s.textBaseline];
                c.moveTo(j, underlineY);
                c.lineTo(j + c.measureText(text.substr(i, 1)).width, underlineY);
                c.stroke();
              }
            }
            j += c.measureText(text.substr(i, 1)).width;
            currentWidth = j + c.measureText(text.substr(i + 1, 1)).width;
            enter = /(?:\r\n|\r|\n|¥n)/.exec(text.substr(i + 2, 1));
            if (s.wordWrap && currentWidth > s.width && !enter) {
              j = 0;
              k = i + 1;
              cx = 0;
              if (s.textAlign == "center") {
                cx = -currentWidth * 0.5;
              } else if (s.textAlign == "right") {
                cx = -currentWidth;
              }
              context.drawImage(s._alignCanvas, cx, m * s._ll_height - s._ll_height);
              s._createAlignCanvas(context);
              c.font = textFormat.getFontText();
              c.fillStyle = textFormat.color;
              currentWidth = 0;
              m++;
            }
          }
          s.height = (m + 1) * s._ll_height;
        });
        if (currentWidth > 0) {
          cx = 0;
          if (s.textAlign == "center") {
            cx = -currentWidth * 0.5;
          } else if (s.textAlign == "right") {
            cx = -currentWidth;
          }
          context.drawImage(s._alignCanvas, cx, m * s._ll_height - s._ll_height);
        }
        if (LGlobal.enableWebGL) {
          ctx.drawImage(s._canvas, 0, 0);
        }
        return;
      }
      lbl = s.text;
      if (s.displayAsPassword) {
        lbl = '';
        for (i = 0, l = s.text.length; i < l; i++) {
          lbl += '*';
        }
      }
      if (s.wordWrap || s.multiline) {
        j = 0, k = 0, m = 0, b = 0, cx = 0;
        var context = c;
        var isAlignCanvas = s.textAlign != "left";
        if (isAlignCanvas) {
          s._createAlignCanvas(c);
          context = s._alignContext;
        }
        var currentWidth = 0;
        for (i = 0, l = s.text.length; i < l; i++) {
          enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i, 1));
          if (enter) {
            currentWidth = i > 0 ? context.measureText(s.text.substr(k, i - k)).width : 0;
            j = 0;
            k = i + 1;
            if (isAlignCanvas) {
              cx = 0;
              if (s.textAlign == "center") {
                cx = -currentWidth * 0.5;
              } else if (s.textAlign == "right") {
                cx = -currentWidth;
              }
              c.drawImage(s._alignCanvas, cx, m * s.wordHeight);
              s._createAlignCanvas(c);
              currentWidth = 0;
            }
            m++;
          } else {
            if (s.stroke) {
              context.strokeText(lbl.substr(i, 1), j, isAlignCanvas ? 0 : m * s.wordHeight);
            }
            context.fillText(lbl.substr(i, 1), j, isAlignCanvas ? 0 : m * s.wordHeight);
          }
          s.numLines = m;
          j = context.measureText(s.text.substr(k, i + 1 - k)).width;
          currentWidth = j + (i + 1 < l ? c.measureText(lbl.substr(i + 1, 1)).width : 0);
          enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i + 1, 1));
          if (s.wordWrap && currentWidth > s.width && !enter) {
            j = 0;
            k = i + 1;
            if (isAlignCanvas) {
              cx = 0;
              if (s.textAlign == "center") {
                cx = -currentWidth * 0.5;
              } else if (s.textAlign == "right") {
                cx = -currentWidth;
              }
              c.drawImage(s._alignCanvas, cx, m * s.wordHeight);
              s._createAlignCanvas(c);
              currentWidth = 0;
            }
            m++;
          }
        }
        if (isAlignCanvas && currentWidth > 0) {
          cx = 0;
          if (s.textAlign == "center") {
            cx = -currentWidth * 0.5;
          } else if (s.textAlign == "right") {
            cx = -currentWidth;
          }
          c.drawImage(s._alignCanvas, cx, m * s.wordHeight);
        }
        s.height = (m + 1) * s.wordHeight;
      } else {
        s.numLines = 1;
        if (s.stroke) {
          c.strokeText(lbl, 0, 0, c.measureText(lbl).width);
        }
        c.fillText(lbl, 0, 0, c.measureText(lbl).width);
      }
      if (LGlobal.enableWebGL) {
        ctx.drawImage(s._canvas, 0, 0);
      }
      if (s.windRunning) {
        s._ll_windRun();
      }
    },
    _wordHeight: function _wordHeight(h) {
      var s = this;
      if (h > 0) {
        s.wordHeight = h;
      } else {
        s.wordWrap = false;
        s.wordHeight = s.getHeight();
      }
      s.height = 0;
    },
    setMultiline: function setMultiline(v, h) {
      var s = this;
      if (v) {
        s._wordHeight(h);
      }
      s.multiline = v;
    },
    setWordWrap: function setWordWrap(v, h) {
      var s = this;
      if (v) {
        s._wordHeight(h);
      }
      s.wordWrap = v;
    },
    setType: function setType(type, inputBackLayer) {
      var s = this;
      if (s.texttype != type && type == LTextFieldType.INPUT) {
        if (inputBackLayer == null || inputBackLayer.type != "LSprite") {
          s.inputBackLayer = new LSprite();
          s.inputBackLayer.graphics.drawRect(1, "#000000", [0, -s.getHeight() * 0.4, s.width, s.getHeight() * 1.5]);
        } else {
          s.inputBackLayer = inputBackLayer;
        }
        s.inputBackLayer.parent = s;
        if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
          LMouseEventContainer.pushInputBox(s);
        }
      } else {
        s.inputBackLayer = null;
        LMouseEventContainer.removeInputBox(s);
      }
      s.texttype = type;
    },
    ismouseon: function ismouseon(e, cood) {
      var s = this;
      if (!e) {
        return false;
      }
      if (!s.visible) {
        return false;
      }
      if (!cood) {
        cood = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
      }
      if (s.mask) {
        if (!s.mask.parent) {
          s.mask.parent = s.parent;
        }
        if (!s.mask.ismouseon(e, cood)) {
          return false;
        }
      }
      if (s.inputBackLayer) {
        return s.inputBackLayer.ismouseon(e, { x: s.x * cood.scaleX + cood.x, y: s.y * cood.scaleY + cood.y, scaleX: cood.scaleX * s.scaleX, scaleY: cood.scaleY * s.scaleY });
      }
      return s.ismouseonShapes([{ type: LShape.RECT, arg: [0, 0, s._getWidth(), s._getHeight()] }], e.offsetX, e.offsetY);
    },
    clone: function clone() {
      var s = this,
      a = new s.constructor();
      a.copyProperty(s);
      a.texttype = null;
      if (s.texttype == LTextFieldType.INPUT) {
        a.setType(LTextFieldType.INPUT);
      }
      return a;
    },
    mouseEvent: function mouseEvent(event, type, cood) {
      var s = this,
      on;
      if (s.inputBackLayer == null || type != LMouseEvent.MOUSE_DOWN) {
        return;
      }
      on = s.ismouseon(event, cood);
      if (!on) {
        return;
      }
      s.focus();
    },
    _wx_ll_getValue: function _wx_ll_getValue(value) {
      LGlobal.inputTextField.text = value;
      wx.offKeyboardInput(LGlobal.inputTextField._ll_input);
      wx.offKeyboardComplete(this._ll_getValue);
      LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
      LGlobal.inputTextField = null;
    },
    _ll_getValue: function _ll_getValue(event) {
      if (!LGlobal.inputTextField) {
        return;
      }
      if (LGlobal.wx) {
        LGlobal.inputTextField._wx_ll_getValue(event.value);
        return;
      }
      LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
      LEvent.removeEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
      LGlobal.inputBox.style.display = NONE;
      if (typeof LGlobal.inputTextField.preventDefault != UNDEFINED) {
        LGlobal.preventDefault = LGlobal.inputTextField.preventDefault;
      }
      LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
      if (typeof LGlobal.inputTextBox.blur === 'function') {
        LGlobal.inputTextBox.blur();
      }
      LGlobal.inputTextField = null;
    },
    updateInput: function updateInput() {
      var s = this;
      if (LGlobal.wx) {
        s._wxUpdateInput();
        return;
      }
      if (s.texttype == LTextFieldType.INPUT && LGlobal.inputTextField.objectIndex == s.objectIndex) {
        LGlobal.inputTextBox.value = LGlobal.inputTextField.text;
      }
    },
    _wxUpdateInput: function _wxUpdateInput() {
      var s = this;
      wx.hideKeyboard({
        complete: function complete() {
          s.focus();
        } });

    },
    _wx_ll_input: function _wx_ll_input(value) {
      if (LGlobal.inputTextField.hasEventListener(LTextEvent.TEXT_INPUT)) {
        var event = new LEvent(LTextEvent.TEXT_INPUT);
        event.keyCode = value;
        LGlobal.inputTextField.dispatchEvent(event);
      }
    },
    _ll_input: function _ll_input(e) {
      if (LGlobal.wx) {
        LGlobal.inputTextField._wx_ll_input(e);
        return;
      }
      var event = new LEvent(LTextEvent.TEXT_INPUT);
      event.keyCode = e.keyCode;
      LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
      if (LGlobal.inputTextField.hasEventListener(LTextEvent.TEXT_INPUT)) {
        e.returnValue = LGlobal.inputTextField.dispatchEvent(event);
      } else {
        e.returnValue = true;
      }
    },
    focus: function focus() {
      var s = this,
      sc,sx;
      if (!s.parent) {
        return;
      }
      if (s.texttype != LTextFieldType.INPUT) {
        return;
      }
      if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex != s.objectIndex) {
        s._ll_getValue();
      }
      s.dispatchEvent(LFocusEvent.FOCUS_IN);
      if (LGlobal.wx) {
        s._wxFocus();
        return;
      }
      sc = s.getAbsoluteScale();
      LGlobal.inputBox.style.display = "";
      LGlobal.inputBox.name = "input" + s.objectIndex;
      LGlobal.inputTextField = s;
      LGlobal.inputTextareaBoxObj.style.display = NONE;
      LGlobal.inputTextBoxObj.style.display = NONE;
      LGlobal.passwordBoxObj.style.display = NONE;
      if (s.displayAsPassword) {
        LGlobal.inputTextBox = LGlobal.passwordBoxObj;
      } else if (s.multiline) {
        LGlobal.inputTextBox = LGlobal.inputTextareaBoxObj;
      } else {
        LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
      }
      sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width;
      sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
      LGlobal.inputTextBox.style.display = "";
      LGlobal.inputTextBox.value = s.text;
      LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight() * sc.scaleY * s.scaleY * sy + "px";
      LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth() * sc.scaleX * s.scaleX * sx + "px";
      LGlobal.inputTextBox.style.color = s.color;
      LGlobal.inputTextBox.style.fontSize = (s.size * parseFloat(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height >> 0) + "px";
      LGlobal.inputTextBox.style.fontFamily = s.font;
      LEvent.addEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
      if (s.texttype == LTextFieldType.INPUT) {
        rc = s.getRootCoordinate();
        if (LGlobal.inputBox.name == "input" + s.objectIndex) {
          LGlobal.inputBox.style.marginTop = parseInt(LGlobal.canvasObj.style.marginTop) + ((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height >>> 0) + "px";
          LGlobal.inputBox.style.marginLeft = parseInt(LGlobal.canvasObj.style.marginLeft) + ((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width >>> 0) + "px";
        }
      }
      s.preventDefault = LGlobal.preventDefault;
      LGlobal.preventDefault = false;
      LGlobal.inputTextBox.focus();
    },
    _wxFocus: function _wxFocus() {
      LGlobal.inputTextField = this;
      wx.showKeyboard({
        defaultValue: this.text,
        maxLength: 20,
        multiple: false,
        confirmHold: false,
        confirmType: 'done' });

      wx.onKeyboardInput(this._ll_input);
      wx.onKeyboardComplete(this._ll_getValue);
    },
    _getWidth: function _getWidth() {
      var s = this;
      if (s.wordWrap) {
        return s.width;
      }
      if (LGlobal.enableWebGL) {
        this._createCanvas();
      }
      var c = LGlobal.enableWebGL ? s._context : LGlobal.canvas;
      c.font = s.size + "px " + s.font;
      return c.measureText(s.text).width;
    },
    getWidth: function getWidth(maskSize) {
      var s = this,
      w,mx,mw;
      w = s._getWidth() * s.scaleX;
      if (maskSize && s.mask) {
        mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
        if (mx > w) {
          return 0;
        }
        mw = s.mask.getWidth();
        if (mx + mw > w) {
          return w - mx;
        } else {
          return mw;
        }
      }
      return w;
    },
    _startX: function _startX(maskSize) {
      var s = this;
      if (s.textAlign == "left") {
        return s.x;
      }
      var w = s.getWidth(maskSize);
      return s.x + (s.textAlign == "right" ? -w : -w * 0.5);
    },
    _getHeight: function _getHeight() {
      var s = this;
      if (LGlobal.enableWebGL) {
        this._createCanvas();
      }
      var c = LGlobal.enableWebGL ? s._context : LGlobal.canvas,
      i,l,j,k,m,enter;
      if (s.wordWrap) {
        c.font = s.weight + " " + s.size + "px " + s.font;
        if (s.height == 0) {
          s._createCanvas();
          s._context.font = s.weight + " " + s.size + "px " + s.font;
          s._ll_show(s._context);
        }
        return s.height;
      }
      c.font = s.weight + " " + s.size + "px " + s.font;
      l = c.measureText("O").width * 1.2;
      if (s.heightMode == LTextField.HEIGHT_MODE_BASELINE) {
        l = l * 1.2;
      }
      return l;
    },
    getHeight: function getHeight(maskSize) {
      var s = this,
      h,my,mh;
      h = s._getHeight() * s.scaleY;
      if (maskSize && s.mask) {
        my = s.mask._startY ? s.mask._startY() : s.mask.startY();
        if (my > h) {
          return 0;
        }
        mh = s.mask.getHeight();
        if (my + mh > h) {
          return h - my;
        } else {
          return mh;
        }
      }
      return h;
    },
    wind: function wind(listener) {
      var s = this;
      s.wind_over_function = listener;
      s.windRunning = true;
      s._ll_wind_text = s.text;
      s.text = "";
      s._ll_wind_length = 0;
    },
    _ll_windRun: function _ll_windRun() {
      var s = this;
      if (s._speedIndex++ < s.speed) {
        return;
      }
      s._speedIndex = 0;
      if (s._ll_wind_length > s._ll_wind_text.length) {
        s.windRunning = false;
        if (s.wind_over_function) {
          s.wind_over_function();
        }
        s.dispatchEvent(new LEvent(LTextEvent.WIND_COMPLETE));
        return;
      }
      s.text = s._ll_wind_text.substring(0, s._ll_wind_length);
      s._ll_wind_length++;
    },
    windComplete: function windComplete() {
      var s = this;
      s._speedIndex = s.speed;
      s.text = s._ll_wind_text;
      s._ll_wind_length = s._ll_wind_text.length + 1;
      s._ll_windRun();
    },
    die: function die() {
      LMouseEventContainer.removeInputBox(this);
    } };

  for (var k in p) {
    LTextField.prototype[k] = p[k];
  }
  return LTextField;
}();
var LBitmap = function () {
  function LBitmap(bitmapdata) {
    var s = this;
    LExtends(s, LDisplayObject, []);
    s.type = "LBitmap";
    s.rotateCenter = true;
    s.bitmapData = bitmapdata;
    if (s.bitmapData) {
      s.width = s.bitmapData.width;
      s.height = s.bitmapData.height;
    }
  }
  var p = {
    _canShow: function _canShow() {
      return this.visible && this.bitmapData;
    },
    _rotateReady: function _rotateReady() {
      var s = this;
      if (s.rotate != 0 && s.rotateCenter) {
        s.rotatex = s.getWidth() * 0.5;
        s.rotatey = s.getHeight() * 0.5;
      } else {
        s.rotatex = s.rotatey = 0;
      }
    },
    _coordinate: function _coordinate(c) {},
    _ll_show: function _ll_show(c) {
      this.ll_draw(c);
    },
    ll_draw: function ll_draw(c) {
      var s = this;
      if (LGlobal.fpsStatus) {
        LGlobal.fpsStatus.bitmapData++;
      }
      c.drawImage(s.bitmapData.image,
      s.bitmapData.x,
      s.bitmapData.y,
      s.bitmapData.width,
      s.bitmapData.height,
      s.x,
      s.y,
      s.bitmapData.width,
      s.bitmapData.height);

    },
    clone: function clone() {
      var s = this,
      a = new LBitmap(s.bitmapData.clone());
      a.copyProperty(s);
      a.rotateCenter = s.rotateCenter;
      return a;
    },
    ismouseon: function ismouseon(e, cood) {
      var s = this;
      if (!e) {
        return false;
      }
      if (!s.visible || !s.bitmapData) {
        return false;
      }
      if (s.mask) {
        if (!s.mask.parent) {
          s.mask.parent = s.parent;
        }
        if (!s.mask.ismouseon(e, cood)) {
          return false;
        }
      }
      return s.ismouseonShapes([{ type: LShape.RECT, arg: [0, 0, s.bitmapData.width, s.bitmapData.height] }], e.offsetX, e.offsetY);
    },
    getWidth: function getWidth(maskSize) {
      var s = this,
      w,mx,mw;
      w = s.bitmapData != null ? s.bitmapData.width * (s.scaleX > 0 ? s.scaleX : -s.scaleX) : 0;
      if (maskSize && s.mask) {
        mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
        if (mx > w) {
          return 0;
        }
        mw = s.mask.getWidth();
        if (mx + mw > w) {
          return w - mx;
        } else {
          return mw;
        }
      }
      return w;
    },
    getHeight: function getHeight(maskSize) {
      var s = this,
      h,my,mh;
      h = s.bitmapData != null ? s.bitmapData.height * (s.scaleY > 0 ? s.scaleY : -s.scaleY) : 0;
      if (maskSize && s.mask) {
        my = s.mask._startY ? s.mask._startY() : s.mask.startY();
        if (my > h) {
          return 0;
        }
        mh = s.mask.getHeight();
        if (my + mh > h) {
          return h - my;
        } else {
          return mh;
        }
      }
      return h;
    },
    startX: function startX() {
      return this.x;
    },
    startY: function startY() {
      return this.y;
    },
    die: function die() {} };

  for (var k in p) {
    LBitmap.prototype[k] = p[k];
  }
  return LBitmap;
}();
var LBitmapData = function () {
  function LBitmapData(image, x, y, width, height, dataType) {
    var s = this;
    LExtends(s, LObject, []);
    s.type = "LBitmapData";
    if (typeof dataType == UNDEFINED) {
      dataType = LBitmapData.DATA_IMAGE;
    }
    s.oncomplete = null;
    s._locked = false;
    s._setPixel = false;
    s.x = x == null ? 0 : x;
    s.y = y == null ? 0 : y;
    s.width = 0;
    s.height = 0;
    s.dataType = null;
    if (image && typeof image == "object") {
      s.image = image;
      s.dataType = LBitmapData.DATA_IMAGE;
      s.width = width == null ? s.image.width : width;
      s.height = height == null ? s.image.height : height;
      s._setDataType(dataType);
    } else {
      s._createCanvas();
      s.dataType = LBitmapData.DATA_CANVAS;
      s._canvas.width = s.width = width ? width : 1;
      s._canvas.height = s.height = height ? height : 1;
      if (typeof image == "string") {
        s._context.fillStyle = image;
        s._context.fillRect(0, 0, s.width, s.height);
      } else if (typeof image == "number") {
        var d = s._context.createImageData(s.width, s.height);
        for (var i = 0; i < d.data.length; i += 4) {
          d.data[i + 0] = image >> 16 & 0xFF;
          d.data[i + 1] = image >> 8 & 0xFF;
          d.data[i + 2] = image & 0xFF;
          d.data[i + 3] = 255;
        }
        s._context.putImageData(d, 0, 0);
      }
      s.image = s._canvas;
      if (dataType == LBitmapData.DATA_IMAGE) {
        s._setDataType(dataType);
      }
    }
    s.resize();
  }
  LBitmapData.DATA_IMAGE = "data_image";
  LBitmapData.DATA_CANVAS = "data_canvas";
  var p = {
    _setDataType: function _setDataType(dataType) {
      var s = this;
      if (s.dataType == dataType) {
        return;
      }
      if (dataType == LBitmapData.DATA_CANVAS) {
        s._createCanvas();
        s._canvas.width = s.image.width;
        s._canvas.height = s.image.height;
        s._context.clearRect(0, 0, s._canvas.width, s._canvas.height);
        s._context.drawImage(s.image, 0, 0);
        s.image = s._canvas;
      } else if (dataType == LBitmapData.DATA_IMAGE) {
        s.image = new Image();
        s.image.width = s._canvas.width;
        s.image.height = s._canvas.height;
        s.image.src = s._canvas.toDataURL();
      }
      s.dataType = dataType;
    },
    _createCanvas: function _createCanvas() {
      var s = this;
      if (!s._canvas) {
        s._canvas = document.createElement("canvas");
        s._context = s._canvas.getContext("2d");
      }
    },
    clear: function clear(rectangle) {
      var s = this;
      s._createCanvas();
      if (rectangle) {
        s._context.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      } else {
        s._canvas.width = s.image.width;
      }
      if (s.dataType == LBitmapData.DATA_IMAGE) {
        s.image.src = s._canvas.toDataURL();
      }
    },
    setProperties: function setProperties(x, y, width, height) {
      var s = this;
      s.x = x;
      s.y = y;
      s.width = width;
      s.height = height;
      s.resize();
    },
    setCoordinate: function setCoordinate(x, y) {
      var s = this;
      s.x = x;
      s.y = y;
      s.resize();
    },
    clone: function clone() {
      var s = this;
      return new LBitmapData(s.image, s.x, s.y, s.width, s.height, s.dataType);
    },
    _ready: function _ready() {
      var s = this;
      s._dataType = s.dataType;
      s._setDataType(LBitmapData.DATA_CANVAS);
      s._data = s._context.getImageData(s.x, s.y, s.width, s.height);
    },
    _update: function _update() {
      var s = this;
      s._context.putImageData(s._data, s.x, s.y, 0, 0, s.width, s.height);
      s._setDataType(s._dataType);
      s._data = null;
    },
    applyFilter: function applyFilter(sourceBitmapData, sourceRect, destPoint, filter, c) {
      var s = this;
      var r = s._context.getImageData(s.x + sourceRect.x, s.y + sourceRect.y, sourceRect.width, sourceRect.height);
      var data = filter.filter(r, sourceRect.width, c);
      s.putPixels(new LRectangle(destPoint.x, destPoint.y, sourceRect.width, sourceRect.height), data);
    },
    getPixel: function getPixel(x, y, colorType) {
      var s = this,
      i,d;
      x = x >> 0;
      y = y >> 0;
      if (!s._locked) {
        s._ready();
      }
      i = s.width * 4 * y + x * 4;
      d = s._data.data;
      if (!s._locked) {
        s._update();
      }
      if (colorType == "number") {
        return d[i] << 16 | d[i + 1] << 8 | d[i + 2];
      } else {
        return [d[i], d[i + 1], d[i + 2], d[i + 3]];
      }
    },
    setPixel: function setPixel(x, y, data) {
      var s = this;
      x = x >> 0;
      y = y >> 0;
      if (!s._locked) {
        s._ready();
      }
      var d = s._data,
      i = s.width * 4 * y + x * 4;
      if (typeof data == "object") {
        d.data[i + 0] = data[0];
        d.data[i + 1] = data[1];
        d.data[i + 2] = data[2];
        d.data[i + 3] = data[3];
      } else {
        if (typeof data == "string") {
          data = parseInt(data.replace("#", "0x"));
        }
        d.data[i + 0] = data >> 16 & 0xFF;
        d.data[i + 1] = data >> 8 & 0xFF;
        d.data[i + 2] = data & 0xFF;
        d.data[i + 3] = 255;
      }
      if (!s._locked) {
        s._update();
      }
    },
    getPixels: function getPixels(rect) {
      var s = this,
      r;
      if (!s._locked) {
        s._ready();
      }
      r = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
      if (!s._locked) {
        s._update();
      }
      return r;
    },
    setPixels: function setPixels(rect, data) {
      var s = this,
      i,j,d,w,sd,x,y;
      if (!s._locked) {
        s._ready();
      }
      d = s._data;
      if (typeof data == "object") {
        w = s._canvas.width;
        for (x = rect.x; x < rect.right; x++) {
          for (y = rect.y; y < rect.bottom; y++) {
            i = w * 4 * (s.y + y) + (s.x + x) * 4;
            j = data.width * 4 * (y - rect.y) + (x - rect.x) * 4;
            d.data[i + 0] = data.data[j + 0];
            d.data[i + 1] = data.data[j + 1];
            d.data[i + 2] = data.data[j + 2];
            d.data[i + 3] = data.data[j + 3];
          }
        }
      } else {
        if (typeof data == "string") {
          data = parseInt(data.replace("#", "0x"));
        }
        data = [data >> 16 & 0xFF, data >> 8 & 0xFF, data & 0xFF];
        w = s._canvas.width;
        for (x = rect.x; x < rect.right; x++) {
          for (y = rect.y; y < rect.bottom; y++) {
            i = w * 4 * (s.y + y) + (s.x + x) * 4;
            d.data[i + 0] = data[0];
            d.data[i + 1] = data[1];
            d.data[i + 2] = data[2];
            d.data[i + 3] = 255;
          }
        }
      }
      if (!s._locked) {
        s._update();
      }
    },
    putPixels: function putPixels(rect, data) {
      var s = this;
      if (s.dataType != LBitmapData.DATA_CANVAS || typeof data != "object") {
        return;
      }
      s._context.putImageData(data, s.x + rect.x, s.y + rect.y, 0, 0, rect.width, rect.height);
    },
    lock: function lock() {
      var s = this;
      s._locked = true;
      s._ready();
    },
    unlock: function unlock() {
      var s = this;
      s._locked = false;
      s._update();
    },
    draw: function draw(source, matrix, colorTransform, blendMode, clipRect) {
      var s = this,
      c,bd = source,
      x,y,w,h,save = false;
      var _dataType = s.dataType;
      s._setDataType(LBitmapData.DATA_CANVAS);
      if (matrix || colorTransform || blendMode || clipRect) {
        s._context.save();
        save = true;
      }
      if (clipRect) {
        if (!(bd instanceof LBitmapData)) {
          x = y = 0;
        } else {
          x = bd.x;
          y = bd.y;
        }
        bd = new LBitmapData(bd.getDataCanvas(), x + clipRect.x, y + clipRect.y, clipRect.width, clipRect.height, LBitmapData.DATA_CANVAS);
      }
      w = bd.getWidth() >>> 0;
      h = bd.getHeight() >>> 0;
      if (w == 0 || h == 0) {
        s._setDataType(_dataType);
        return;
      }
      c = bd.getDataCanvas();
      if (colorTransform) {
        bd.colorTransform(new LRectangle(0, 0, w, h), colorTransform);
        c = bd.image;
      }
      if (matrix) {
        s._context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
      }
      if (blendMode) {
        s._context.globalCompositeOperation = blendMode;
      }
      s._context.drawImage(c, bd.x, bd.y, w, h, 0, 0, w, h);
      if (save) {
        s._context.restore();
      }
      s._setDataType(_dataType);
      s.resize();
    },
    getDataCanvas: function getDataCanvas() {
      var s = this;
      var _dataType = s.dataType;
      s._setDataType(LBitmapData.DATA_CANVAS);
      s._setDataType(_dataType);
      return s._canvas;
    },
    getWidth: function getWidth() {
      return this.width;
    },
    getHeight: function getHeight() {
      return this.height;
    },
    resize: function resize() {
      var s = this,
      w = s.image.width - s.x,
      h = s.image.height - s.y;
      s.width = s.width < w ? s.width : w;
      s.height = s.height < h ? s.height : h;
    },
    colorTransform: function colorTransform(rect, _colorTransform) {
      var s = this;
      if (s.dataType != LBitmapData.DATA_CANVAS) {
        return;
      }
      var x = rect.x >> 0,
      y = rect.y >> 0,
      w = rect.width >> 0,
      h = rect.height >> 0;
      var img = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
      var data = img.data;
      for (var i = 0, l = data.length; i < l; i += 4) {
        var r = i,
        g = i + 1,
        b = i + 2,
        a = i + 3;
        data[r] = data[r] * _colorTransform.redMultiplier + _colorTransform.redOffset;
        data[g] = data[g] * _colorTransform.greenMultiplier + _colorTransform.greenOffset;
        data[b] = data[b] * _colorTransform.blueMultiplier + _colorTransform.blueOffset;
        data[a] = data[a] * _colorTransform.alphaMultiplier + _colorTransform.alphaOffset;
      }
      s._context.putImageData(img, s.x + rect.x, s.y + rect.y, 0, 0, rect.width, rect.height);
    },
    copyPixels: function copyPixels(sourceBitmapData, sourceRect, destPoint) {
      var s = this,
      left,top,width,height,bd = sourceBitmapData;
      if (s.dataType != LBitmapData.DATA_CANVAS) {
        return;
      }
      left = bd.x;
      top = bd.y;
      width = bd.width;
      height = bd.height;
      bd.setProperties(sourceRect.x + bd.x, sourceRect.y + bd.y, sourceRect.width, sourceRect.height);
      s._context.drawImage(bd.image, bd.x, bd.y, bd.width, bd.height, destPoint.x, destPoint.y, bd.width, bd.height);
      bd.x = left;
      bd.y = top;
      bd.width = width;
      bd.height = height;
    } };

  for (var k in p) {
    LBitmapData.prototype[k] = p[k];
  }
  return LBitmapData;
}();
var LBitmapFilter = function () {
  function LBitmapFilter() {
    var s = this;
    LExtends(s, LObject, []);
    s.type = "LBitmapFilter";
  }
  LBitmapFilter.prototype.ll_show = function (displayObject, c) {
    var s = this;
    if (s.cacheMaking) {
      return;
    }
    c = c || LGlobal.canvas;
    var d = displayObject,
    bitmapData;
    if (d.constructor.name == "LBitmap") {
      bitmapData = d.bitmapData;
    } else {
      if (!d._ll_cacheAsBitmap) {
        s.cacheMaking = true;
        d.cacheAsBitmap(true);
        s.cacheMaking = false;
      }
      bitmapData = d._ll_cacheAsBitmap.bitmapData;
    }
    if (s.bitmapDataIndex === bitmapData.objectIndex) {
      return;
    }
    s.bitmapDataIndex = bitmapData.objectIndex;
    bitmapData.applyFilter(bitmapData, new LRectangle(0, 0, bitmapData.width, bitmapData.height), new LPoint(0, 0), s, c);
  };
  return LBitmapFilter;
}();
var LDropShadowFilter = function () {
  function LDropShadowFilter(distance, angle, color, blur) {
    var s = this;
    LExtends(s, LBitmapFilter, []);
    s.type = "LDropShadowFilter";
    s.distance = distance ? distance : 0;
    s.angle = angle ? angle : 0;
    s.shadowColor = color ? color : "#000000";
    s.shadowBlur = blur ? blur : 20;
    s.setShadowOffset();
  }
  var p = {
    setShadowOffset: function setShadowOffset() {
      var s = this;
      var a = s.angle * Math.PI / 180;
      s.shadowOffsetX = s.distance * Math.cos(a);
      s.shadowOffsetY = s.distance * Math.sin(a);
    },
    ll_show: function ll_show(o, c) {
      var s = this;
      c = c || LGlobal.canvas;
      c.shadowColor = s.shadowColor;
      c.shadowBlur = s.shadowBlur;
      c.shadowOffsetX = s.shadowOffsetX;
      c.shadowOffsetY = s.shadowOffsetY;
    },
    setDistance: function setDistance(distance) {
      this.distance = distance;
      this.setShadowOffset();
    },
    setAngle: function setAngle(angle) {
      this.angle = angle;
      this.setShadowOffset();
    },
    setColor: function setColor(color) {
      this.shadowColor = color;
    },
    setBlur: function setBlur(blur) {
      this.shadowBlur = blur;
    } };

  for (var k in p) {
    LDropShadowFilter.prototype[k] = p[k];
  }
  return LDropShadowFilter;
}();
var LColorMatrixFilter = function () {
  function LColorMatrixFilter(matrix) {
    var s = this;
    LExtends(s, LBitmapFilter, []);
    s.type = "LColorMatrixFilter";
    s.matrix = matrix;
  }
  var p = {
    filter: function filter(olddata, w, c) {
      var s = this;
      c = LGlobal.enableWebGL ? LGlobal._context : c || LGlobal.canvas;
      var oldpx = olddata.data;
      var newdata = c.createImageData(olddata);
      var newpx = newdata.data;
      var len = newpx.length;
      var a = s.matrix;
      for (var i = 0; i < len; i += 4) {
        newpx[i] = a[0] * oldpx[i] + a[1] * oldpx[i + 1] + a[2] * oldpx[i + 2] + a[3] * oldpx[i + 3] + a[4];
        newpx[i + 1] = a[5] * oldpx[i] + a[6] * oldpx[i + 1] + a[7] * oldpx[i + 2] + a[8] * oldpx[i + 3] + a[9];
        newpx[i + 2] = a[10] * oldpx[i] + a[11] * oldpx[i + 1] + a[12] * oldpx[i + 2] + a[13] * oldpx[i + 3] + a[14];
        newpx[i + 3] = a[15] * oldpx[i] + a[16] * oldpx[i + 1] + a[17] * oldpx[i + 2] + a[18] * oldpx[i + 3] + a[19];
      }
      return newdata;
    } };

  for (var k in p) {
    LColorMatrixFilter.prototype[k] = p[k];
  }
  return LColorMatrixFilter;
}();
var LConvolutionFilter = function () {
  function LConvolutionFilter(matrixX, matrixY, matrix, divisor, bias, preserveAlpha, clamp, color, alpha) {
    var s = this;
    LExtends(s, LBitmapFilter, []);
    s.type = "LConvolutionFilter";
    s.matrixX = matrixX ? matrixX : 0;
    s.matrixY = matrixY ? matrixY : 0;
    s.matrix = matrix;
    if (!divisor) {
      divisor = matrix.reduce(function (a, b) {return a + b;}) || 1;
    }
    s.divisor = divisor;
    s.bias = bias ? bias : 0;
  }
  var p = {
    filter: function filter(olddata, w, c) {
      var s = this;
      c = LGlobal.enableWebGL ? LGlobal._context : c || LGlobal.canvas;
      var oldpx = olddata.data;
      var newdata = c.createImageData(olddata);
      var newpx = newdata.data;
      var len = newpx.length;
      for (var i = 0; i < len; i++) {
        if ((i + 1) % 4 === 0) {
          newpx[i] = oldpx[i];
          continue;
        }
        res = 0;
        var these = [
        oldpx[i - w * 4 - 4] || oldpx[i],
        oldpx[i - w * 4] || oldpx[i],
        oldpx[i - w * 4 + 4] || oldpx[i],
        oldpx[i - 4] || oldpx[i],
        oldpx[i],
        oldpx[i + 4] || oldpx[i],
        oldpx[i + w * 4 - 4] || oldpx[i],
        oldpx[i + w * 4] || oldpx[i],
        oldpx[i + w * 4 + 4] || oldpx[i]];

        for (var j = 0; j < 9; j++) {
          res += these[j] * s.matrix[j];
        }
        res /= s.divisor;
        if (s.bias) {
          res += s.bias;
        }
        newpx[i] = res;
      }
      return newdata;
    } };

  for (var k in p) {
    LConvolutionFilter.prototype[k] = p[k];
  }
  return LConvolutionFilter;
}();
var LAnimation = function () {
  function LAnimation(layer, data, list) {
    var s = this;
    LExtends(s, LSprite, []);
    s.type = "LAnimation";
    s.rowIndex = 0;
    s.colIndex = 0;
    s._ll_stepIndex = 0;
    s._ll_stepArray = [];
    s.mode = 1;
    s.isMirror = false;
    if (Array.isArray(data)) {
      s.bitmapList = data;
    } else {
      s.bitmapList = [data];
    }
    s.bitmap = new LBitmap(s.bitmapList[0]);
    s.imageArray = list;
    s.addChild(s.bitmap);
    if (layer != null) {
      layer.addChild(s);
    }
    s.onframe();
    s.colIndex = 0;
  }
  var p = {
    setAction: function setAction(rowIndex, colIndex, mode, isMirror) {
      var s = this,
      changed = false;
      if (rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length) {
        s.rowIndex = rowIndex;
        changed = true;
      }
      if (colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length) {
        s.colIndex = colIndex;
        changed = true;
      }
      if (mode != null) {
        s.mode = mode;
        changed = true;
      }
      if (isMirror != null) {
        s.isMirror = isMirror;
        if (s.isMirror) {
          s.bitmap.x = s.bitmap.getWidth();
          s.bitmap.scaleX = -1 * Math.abs(s.bitmap.scaleX);
        } else {
          s.bitmap.x = 0;
          s.bitmap.scaleX = Math.abs(s.bitmap.scaleX);
        }
        changed = true;
      }
      if (changed) {
        s._ll_stepIndex = 0;
        s._send_complete = false;
      }
    },
    getAction: function getAction() {
      var s = this;
      return [s.rowIndex, s.colIndex, s.mode, s.isMirror];
    },
    onframe: function onframe() {
      var s = this,
      arr,sx = 0,
      stepFrame = null;
      if (s.colIndex >= s.imageArray[s.rowIndex].length) {
        s.colIndex = 0;
      }
      arr = s.imageArray[s.rowIndex][s.colIndex];
      if (s._ll_stepArray[s.rowIndex] && s._ll_stepArray[s.rowIndex][s.colIndex]) {
        stepFrame = s._ll_stepArray[s.rowIndex][s.colIndex];
      } else {
        stepFrame = 0;
      }
      if (s._ll_stepIndex == 0) {
        if (typeof arr.dataIndex == "number" && Array.isArray(s.bitmapList) && arr.dataIndex < s.bitmapList.length) {
          s.bitmap.bitmapData = s.bitmapList[arr.dataIndex];
        }
        if (arr.script) {
          for (i = 0; i < arr.script.length; i++) {
            obj = arr.script[i];
            l = s.ll_labelList[obj.name];
            if (l && l.rowIndex == s.rowIndex && l.colIndex == s.colIndex && l.mode == s.mode && l.isMirror == (s.bitmap.scaleX == -1)) {
              obj.func(s, obj.params);
            }
          }
        }
        if (typeof arr.width != UNDEFINED && typeof arr.height != UNDEFINED) {
          s.bitmap.bitmapData.setProperties(arr.x, arr.y, arr.width, arr.height);
        } else {
          s.bitmap.bitmapData.setCoordinate(arr.x, arr.y);
        }
        if (typeof arr.sx != UNDEFINED) {
          sx = arr.sx;
        }
        if (typeof arr.sy != UNDEFINED) {
          s.bitmap.y = arr.sy;
        }
        if (typeof arr.mirror != UNDEFINED) {
          s.bitmap.rotateCenter = false;
          s.bitmap.scaleX = arr.mirror ? -1 : 1;
        }
        s.bitmap.x = sx + (s.bitmap.scaleX == 1 ? 0 : s.bitmap.getWidth());
      }
      if (s._ll_stepIndex++ < stepFrame) {
        return;
      }
      s._ll_stepIndex = 0;
      s.colIndex += s.mode;
      if (s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0) {
        s.colIndex = s.mode > 0 ? 0 : s.imageArray[s.rowIndex].length - 1;
        if (s.constructor.name == "LAnimationTimeline") {
          s._send_complete = true;
        } else {
          s.dispatchEvent(LEvent.COMPLETE);
        }
      }
    },
    clone: function clone() {
      var s = this,
      a = new s.constructor(null, s.bitmapList, s.imageArray.slice(0));
      a.copyProperty(s);
      a.childList.length = 0;
      a.bitmap = s.bitmap.clone();
      a.addChild(a.bitmap);
      return a;
    } };

  for (var k in p) {
    LAnimation.prototype[k] = p[k];
  }
  return LAnimation;
}();
var LAnimationTimeline = function () {
  function LAnimationTimeline(data, list) {
    var s = this;
    LExtends(s, LAnimation, [null, data, list]);
    s.type = "LAnimationTimeline";
    s.speed = 0;
    s._speedIndex = 0;
    s.ll_labelList = {};
    for (var i = 0, sublist, j, child; i < list.length; i++) {
      sublist = list[i];
      for (j = 0; j < sublist.length; j++) {
        child = sublist[j];
        if (child.label) {
          s.setLabel(child.label, i, j, 1, child.isMirror ? true : false);
        }
      }
    }
    s.addEventListener(LEvent.ENTER_FRAME, s._ll_onframe);
  };
  var p = {
    clone: function clone() {
      var s = this,
      k,o,a = new s.constructor(s.bitmapList, s.imageArray.slice(0));
      a.copyProperty(s);
      a.childList.length = 0;
      a.bitmap = s.bitmap.clone();
      a.addChild(a.bitmap);
      for (k in s.ll_labelList) {
        o = s.ll_labelList[k];
        a.ll_labelList[k] = {
          rowIndex: o.rowIndex,
          colIndex: o.colIndex,
          mode: o.mode,
          isMirror: o.isMirror };

      }
      return a;
    },
    setFrameSpeedAt: function setFrameSpeedAt(rowIndex, colIndex, speed) {
      var s = this;
      if (!s._ll_stepArray[rowIndex]) {
        s._ll_stepArray[rowIndex] = [];
      }
      s._ll_stepArray[rowIndex][colIndex] = speed;
    },
    _ll_onframe: function _ll_onframe(event) {
      var self = event.target;
      if (self._ll_stop) {
        return;
      }
      if (self._speedIndex++ < self.speed) {
        return;
      }
      if (self._send_complete) {
        self.dispatchEvent(LEvent.COMPLETE);
        self._send_complete = false;
        if (self._ll_stop) {
          return;
        }
      }
      self._speedIndex = 0;
      self.onframe();
    },
    setLabel: function setLabel(name, _rowIndex, _colIndex, _mode, _isMirror) {
      this.ll_labelList[name] = {
        rowIndex: _rowIndex,
        colIndex: _colIndex,
        mode: typeof _mode == UNDEFINED ? 1 : _mode,
        isMirror: typeof _isMirror == UNDEFINED ? false : _isMirror };

    },
    play: function play() {
      this._ll_stop = false;
    },
    stop: function stop() {
      this._ll_stop = true;
    },
    gotoAndPlay: function gotoAndPlay(name) {
      var s = this,
      l = s.ll_labelList[name];
      s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
      s.play();
      s.onframe();
    },
    gotoAndStop: function gotoAndStop(name) {
      var s = this,
      l = s.ll_labelList[name];
      s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
      s.stop();
      s.onframe();
    },
    addFrameScript: function addFrameScript(name, func, params) {
      var l = this.ll_labelList[name];
      var arr = this.imageArray[l.rowIndex][l.colIndex];
      if (!arr.script) {
        arr.script = [];
      }
      arr.script.push({ func: func, params: params, name: name });
    },
    removeFrameScript: function removeFrameScript(name) {
      var l = this.ll_labelList[name],
      obj,script,i;
      script = this.imageArray[l.rowIndex][l.colIndex].script;
      if (!script) {
        return;
      }
      for (i = 0; i < script.length; i++) {
        obj = script[i];
        if (obj.name == name) {
          script.splice(i, 1);
          break;
        }
      }
    } };

  for (var k in p) {
    LAnimationTimeline.prototype[k] = p[k];
  }
  return LAnimationTimeline;
}();
var LSpriteAtlasType = {
  SIMPLE: 'simple',
  SLICED: 'sliced' };

var LAtlas = function () {
  function LAtlas() {
    LExtends(s, LEventDispatcher, []);
  }
  var p = {
    destroy: function destroy() {
      delete LAtlas._container[name];
    },
    load: function load(path, name) {
      var s = this;
      var loadData = [
      { name: path + "/" + name + ".png", path: this.url(path + "/" + name + ".png") },
      { name: path + "/" + name + ".plist", path: this.url(path + "/" + name + ".plist" + (LGlobal.wx ? '.meta' : '')), type: 'text' },
      { name: path + "/" + name + ".json", path: this.url(path + "/" + name + ".json"), type: 'text' }];

      LLoadManage.load(
      loadData, null,
      function (datalist) {
        s._loadComplete(datalist, path, name);
      });

    },
    url: function url(u) {
      if (!LGlobal.traceDebug) {
        return u;
      }
      return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + Date.now();
    },
    _loadComplete: function _loadComplete(datalist, path, name) {
      var resourcesPath = 'resources/';
      var resourcesIndex = path.indexOf(resourcesPath);
      this._atlasKey = path.substring(resourcesIndex + resourcesPath.length) + '/' + name;
      LAtlas._container[this._atlasKey] = this;
      var texture = datalist[path + "/" + name + ".png"];
      var xml = datalist[path + "/" + name + ".plist"];
      var json = JSON.parse(datalist[path + "/" + name + ".json"]);
      this.set(xml, texture, json);
      var event = new LEvent(LEvent.COMPLETE);
      event.currentTarget = this;
      event.target = this;
      this.dispatchEvent(event);
    },
    set: function set(xml, texture, json) {
      this._texture = texture;
      this._setting = json;
      this._initData(xml);
    },
    _initData: function _initData(xml) {
      if (LGlobal.wx) {
        this._textureData = JSON.parse(xml);
        return;
      }
      var parser = new DOMParser();
      this.xmlDom = parser.parseFromString(xml, 'text/xml');
      var plistDom = this.xmlDom.querySelector('plist').querySelector('dict');
      var children = plistDom.children;
      var frames;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.tagName === 'key' && child.textContent === 'frames') {
          frames = children[i + 1].children;
          break;
        }
      }
      this._textureData = {};
      for (var i = 0; i < frames.length; i += 2) {
        var key = frames[i].textContent.replace('.png', '');
        var value = frames[i + 1];
        var data = this._getTextureData(value.children);
        this._textureData[key] = data;
      }
    },
    getSprite: function getSprite(name, type, width, height) {
      var data = this._textureData[name];
      var atlasSprite = new LAtlasSprite(this._texture, this._setting[name], data, type);
      if (width && height) {
        atlasSprite.resize(width, height);
      }
      return atlasSprite;
    },
    _getTextureData: function _getTextureData(children) {
      var data = {};
      for (var i = 0; i < children.length; i += 2) {
        var key = children[i].textContent;
        var tict = children[i + 1];
        var value = JSON.parse(tict.tagName === 'string' ? tict.textContent.replace(/\{/g, '[').replace(/\}/g, ']') : tict.tagName);
        data[key] = value;
      }
      return data;
    } };

  for (var k in p) {
    LAtlas.prototype[k] = p[k];
  }
  LAtlas.TYPE_PLIST = 'type_plist';
  LAtlas._container = {};
  LAtlas.get = function (name) {
    return LAtlas._container[name] || new LAtlas();
  };
  return LAtlas;
}();
var LLoadManage = function () {
  function LLoadManage() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.llname = "ll.file.";
    s.llload = "ll.load.";
  }
  var p = {
    load: function load(l, u, c) {
      var s = this;
      if (!l || l.length == 0) {
        var event = new LEvent(LEvent.COMPLETE);
        event.currentTarget = s;
        event.target = {};
        s.dispatchEvent(event);
        return;
      }
      s.list = l, s.onupdate = u, s.oncomplete = c;
      s.loader = s, s.index = 0, s.loadIndex = 0, s.result = [], s.lresult = [];
      s.loadInit();
    },
    loadInit: function loadInit() {
      var s = this;
      if (s.index >= s.list.length) {
        return;
      }
      s.loadIndex = 0;
      s.loadStart();
      s.reloadtime = setTimeout(s.loadInit.bind(s), 10000);
    },
    _addEvent: function _addEvent(loader, name) {
      loader.parent = this;
      loader.name = name;
      loader.addEventListener(LEvent.PROGRESS, this._loadProgress);
      loader.addEventListener(LEvent.ERROR, this._loadError);
      loader.addEventListener(LEvent.COMPLETE, this._loadComplete);
    },
    loadStart: function loadStart() {
      var s = this,
      d,ph,phs,ext;
      if (s.loadIndex >= s.list.length) {
        return;
      }
      d = s.list[s.loadIndex];
      if (typeof d.progress == UNDEFINED) {
        d.progress = 0;
      }
      if (!d.name) {
        d.name = s.llname + s.loadIndex;
      }
      if (!s.lresult[s.llload + d.name]) {
        if (!d["type"]) {
          ext = getExtension(d.path);
          if (ext == "txt") {
            d["type"] = LURLLoader.TYPE_TEXT;
          } else if (ext == "js") {
            d["type"] = LURLLoader.TYPE_JS;
          } else if (new Array("mp3", "ogg", "wav", "m4a").indexOf(ext) >= 0) {
            d["type"] = LSound.TYPE_SOUND;
          }
        }
        if (d["type"] == LURLLoader.TYPE_TEXT || d["type"] == LURLLoader.TYPE_JS) {
          s.loader = new LURLLoader();
          s._addEvent(s.loader, d.name);
          s.loader.load(s.url(d.path), d["type"]);
        } else if (d["type"] == LSound.TYPE_SOUND) {
          if (LGlobal.wx) {
            s.loader = new LEventDispatcher();
            setTimeout(function () {
              s._addEvent(s.loader, d.name);
              var event = new LEvent(LEvent.COMPLETE);
              event.currentTarget = s.loader;
              event.target = d.path;
              s.loader.dispatchEvent(event);
            });
          } else if (LSound.webAudioEnabled) {
            s.loader = new LSound();
            s._addEvent(s.loader, d.name);
            s.loader.load(d.path);
          } else {
            s.loader = new LSound();
            LSound.addWait(s.loader, d.path);
            s._waitLoadSound(s.loader, d);
          }
        } else if (d['type'] === LAtlas.TYPE_PLIST) {
          s.loader = new LAtlas();
          s._addEvent(s.loader, d.name);
        } else if (d["type"] == LFontLoader.TYPE_FONT) {
          s.loader = new LFontLoader();
          s._addEvent(s.loader, d.name);
          s.loader.load(d.path, d.name);
        } else {
          s.loader = new LLoader();
          s._addEvent(s.loader, d.name);
          s.loader.load(s.url(d.path), LLoader.TYPE_BITMAPDATE, d.useXHR);
        }
        s.loader._loadIndex = s.loadIndex;
      }
      s.loadIndex++;
      s.loadStart();
    },
    _waitLoadSound: function _waitLoadSound(loader, d) {
      var s = this;
      setTimeout(function () {
        s._addEvent(loader, d.name);
        var event = new LEvent(LEvent.COMPLETE);
        event.currentTarget = loader;
        event.target = d.path;
        loader.dispatchEvent(event);
      });
    },
    _loadProgress: function _loadProgress(e) {
      var loader = e.currentTarget;
      var s = loader.parent;
      var d = s.list[loader._loadIndex];
      d.progress = e.loaded / e.total;
      var progress = 0;
      for (var i = 0, l = s.list.length; i < l; i++) {
        progress += s.list[i].progress;
      }
      var event = new LEvent(LEvent.PROGRESS);
      event.currentTarget = s;
      event.target = e.currentTarget;
      event.loaded = progress;
      event.total = s.list.length;
      event.responseURL = e.responseURL;
      s.dispatchEvent(event);
    },
    _loadError: function _loadError(e) {
      var loader = e.currentTarget;
      var s = loader.parent;
      delete loader.parent;
      loader.removeEventListener(LEvent.ERROR, s._loadError);
      var event = new LEvent(LEvent.ERROR);
      event.currentTarget = s;
      event.target = e.target;
      event.responseURL = e.responseURL;
      s.dispatchEvent(event);
    },
    _loadComplete: function _loadComplete(e) {
      var s = e.currentTarget.parent;
      if (!s) {
        return;
      }
      if (e && e.currentTarget.name) {
        e.currentTarget.removeEventListener(LEvent.COMPLETE, s._loadComplete);
        if (e.currentTarget.name.indexOf(s.llname) >= 0) {
          e.target = 1;
        }
        if (s.lresult[s.llload + e.currentTarget.name]) {
          return;
        }
        s.result[e.currentTarget.name] = e.target;
        s.lresult[s.llload + e.currentTarget.name] = 1;
      }
      s.index++;
      e.loaded = e.total = 1;
      s._loadProgress(e);
      delete e.currentTarget.parent;
      if (s.index >= s.list.length) {
        if (s.reloadtime) {
          clearTimeout(s.reloadtime);
        }
        var event = new LEvent(LEvent.COMPLETE);
        event.currentTarget = s;
        event.target = s.result;
        s.dispatchEvent(event);
        LGlobal.forceRefresh = true;
      }
    },
    url: function url(u) {
      if (!LGlobal.traceDebug) {
        return u;
      }
      return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + new Date().getTime();
    } };

  for (var k in p) {
    LLoadManage.prototype[k] = p[k];
  }
  LLoadManage.load = function (l, u, c, e) {
    var loadObj = new LLoadManage();
    if (u) {
      loadObj.addEventListener(LEvent.PROGRESS, function (event) {
        u((event.loaded * 100 / event.total).toFixed(2));
      });
    }
    if (c) {
      loadObj.addEventListener(LEvent.COMPLETE, function (event) {
        c(event.target);
      });
    }
    if (e) {
      loadObj.addEventListener(LEvent.ERROR, e);
    }
    loadObj.load(l);
  };
  return LLoadManage;
}();
var LEasing = {
  None: {
    easeIn: function easeIn(t, b, c, d) {
      return b + t * c / d;
    },
    easeOut: function easeOut(t, b, c, d) {
      return b + t * c / d;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      return b + t * c / d;
    } },

  Quad: {
    easeIn: function easeIn(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * (--t * (t - 2) - 1) + b;
    } },

  Cubic: {
    easeIn: function easeIn(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    } },

  Quart: {
    easeIn: function easeIn(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      }
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    } },

  Quint: {
    easeIn: function easeIn(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    } },

  Sine: {
    easeIn: function easeIn(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    } },

  Strong: {
    easeIn: function easeIn(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    } },

  Expo: {
    easeIn: function easeIn(t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if (t == 0) {
        return b;
      }
      if (t == d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    } },

  Circ: {
    easeIn: function easeIn(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      }
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    } },

  Elastic: {
    easeIn: function easeIn(t, b, c, d, a, p) {
      var s;
      if (t == 0) {
        return b;
      }
      if ((t /= d) == 1) {
        return b + c;
      }
      if (!p) {
        p = d * .3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function easeOut(t, b, c, d, a, p) {
      var s;
      if (t == 0) {
        return b;
      }
      if ((t /= d) == 1) {
        return b + c;
      }
      if (!p) {
        p = d * .3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOut: function easeInOut(t, b, c, d, a, p) {
      var s;
      if (t == 0) {
        return b;
      }
      if ((t /= d / 2) == 2) {
        return b + c;
      }
      if (!p) {
        p = d * (.3 * 1.5);
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      }
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    } },

  Back: {
    easeIn: function easeIn(t, b, c, d, s) {
      if (typeof s == UNDEFINED) {
        s = 1.70158;
      }
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function easeOut(t, b, c, d, s) {
      if (typeof s == UNDEFINED) {
        s = 1.70158;
      }
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function easeInOut(t, b, c, d, s) {
      if (typeof s == UNDEFINED) {
        s = 1.70158;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    } },

  Bounce: {
    easeIn: function easeIn(t, b, c, d) {
      return c - LEasing.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function easeOut(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
      }
    },
    easeInOut: function easeInOut(t, b, c, d) {
      if (t < d / 2) {
        return LEasing.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      }
      return LEasing.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    } } };


var Quad = LEasing.Quad,
Cubic = LEasing.Cubic,
Quart = LEasing.Quart,
Quint = LEasing.Quint,
Sine = LEasing.Sine,
Strong = LEasing.Strong,
Expo = LEasing.Expo,
Circ = LEasing.Circ,
Elastic = LEasing.Elastic,
Back = LEasing.Back,
Bounce = LEasing.Bounce;
var LTweenLiteTimeline;
var LTweenLite = function () {
  function LTweenLiteChild($target, $duration, $vars) {
    var s = this;
    LExtends(s, LObject, []);
    s.type = "LTweenLiteChild";
    s.toNew = [];
    s.init($target, $duration, $vars);
  }
  var p = {
    init: function init($target, $duration, $vars) {
      var s = this,
      k = null;
      if (typeof $vars["tweenTimeline"] == UNDEFINED) {
        $vars["tweenTimeline"] = LTweenLite.TYPE_FRAME;
      }
      s.target = $target;
      if (!s.target.objectIndex) {
        s.target.objectIndex = ++LGlobal.objectIndex;
      }
      s.duration = $duration || 0.001;
      s.vars = $vars;
      s.delay = s.vars.delay || 0;
      if (s.vars["tweenTimeline"] == LTweenLite.TYPE_TIMER) {
        s.currentTime = new Date().getTime() / 1000;
        s.initTime = s.currentTime;
        s.startTime = s.initTime + s.delay;
      } else {
        s.currentTime = 0;
        s.duration *= 1000;
        s.currentTime -= s.delay * 1000;
      }
      s.combinedTimeScale = s.vars.timeScale || 1;
      s.active = s.duration == 0 && s.delay == 0;
      s.varsto = {};
      s.varsfrom = {};
      s.varsDiff = {};
      s.varsListIndex = {};
      s.varsListCurr = {};
      s.varsListTo = {};
      s.varsListLength = {};
      s.stop = false;
      if (typeof s.vars.ease != "function") {
        s.vars.ease = LEasing.None.easeIn;
      }
      s.ease = s.vars.ease;
      delete s.vars.ease;
      if (typeof s.vars.onComplete == "function") {
        s.onComplete = s.vars.onComplete;
        delete s.vars.onComplete;
      } else {
        s.onComplete = null;
      }
      if (typeof s.vars.onUpdate == "function") {
        s.onUpdate = s.vars.onUpdate;
        delete s.vars.onUpdate;
      } else {
        s.onUpdate = null;
      }
      if (typeof s.vars.onStart == "function") {
        s.onStart = s.vars.onStart;
        delete s.vars.onStart;
      } else {
        s.onStart = null;
      }
      for (k in s.vars) {
        if (k == "coordinate" && Array.isArray(s.vars[k])) {
          var diff = 0,
          curr = { x: s.target.x, y: s.target.y };
          for (var i = 0, l = s.vars[k].length; i < l; i++) {
            var p = s.vars[k][i];
            diff += LPoint.distance(p, curr);
            curr = p;
          }
          s.varsListIndex[k] = 0;
          s.varsListCurr[k] = 0;
          s.varsListTo[k] = diff;
          s.varsto[k] = s.vars[k];
          s.varsfrom[k] = { x: s.target.x, y: s.target.y };
          continue;
        } else if (typeof s.vars[k] != "number") {
          continue;
        }
        s.varsto[k] = s.vars[k];
        s.varsfrom[k] = s.target[k];
        s.varsDiff[k] = s.vars[k] - s.target[k];
      }
    },
    pause: function pause() {
      this.stop = true;
    },
    resume: function resume() {
      this.stop = false;
    },
    tween: function tween() {
      var s = this,
      tweentype;
      var type_timer = s.vars["tweenTimeline"] == LTweenLite.TYPE_TIMER;
      if (type_timer) {
        var time = new Date().getTime() / 1000,
        etime = time - s.startTime;
        if (etime < 0) {
          return;
        }
      } else {
        if (s.stop) {
          return;
        }
        s.currentTime += LGlobal.speed;
        if (s.currentTime < 0) {
          return;
        }
      }
      for (k in s.varsto) {
        if (typeof s.varsListTo[k] != UNDEFINED) {
          var curr = s.ease(type_timer ? etime : s.currentTime, 0, s.varsListTo[k], s.duration);
          if (curr > s.varsListTo[k]) {
            curr = s.varsListTo[k];
          }
          var c = s.varsListIndex[k] > 0 ? s.vars[k][s.varsListIndex[k] - 1] : s.varsfrom[k];
          var v = s.vars[k][s.varsListIndex[k]];
          var d = LPoint.distance(c, v);
          while (s.varsListCurr[k] + d < curr) {
            s.varsListCurr[k] += d;
            c = v;
            s.varsListIndex[k]++;
            v = s.vars[k][s.varsListIndex[k]];
            d = LPoint.distance(c, v);
          }
          s.target.x = c.x;
          s.target.y = c.y;
          if (d != 0 && v.x - c.x != 0) {
            s.target.x += (v.x - c.x) * (curr - s.varsListCurr[k]) / d;
          }
          if (d != 0 && v.y - c.y != 0) {
            s.target.y += (v.y - c.y) * (curr - s.varsListCurr[k]) / d;
          }
          continue;
        }
        s.target[k] = s.ease(type_timer ? etime : s.currentTime, s.varsfrom[k], s.varsDiff[k], s.duration);
      }
      if (s.onStart) {
        s._dispatchEvent(s.onStart);
        delete s.onStart;
      }
      var e;
      if (type_timer) {
        e = etime >= s.duration;
      } else {
        e = s.currentTime >= s.duration;
      }
      if (e) {
        for (tweentype in s.varsto) {
          if (typeof s.varsListTo[tweentype] != UNDEFINED) {
            var p = s.varsto[tweentype][s.vars[tweentype].length - 1];
            s.target.x = p.x;
            s.target.y = p.y;
            continue;
          }
          s.target[tweentype] = s.varsto[tweentype];
        }
        if (s.onComplete) {
          s._dispatchEvent(s.onComplete, true);
        }
        return true;
      } else if (s.onUpdate) {
        s._dispatchEvent(s.onUpdate);
      }
      return false;
    },
    _dispatchEvent: function _dispatchEvent(f, wait) {
      var s = this;
      var target = s.target;
      var fun = function fun() {
        target.target = target;
        target.currentTarget = s;
        f(target);
        delete target.currentTarget;
        delete target.target;
      };
      if (wait) {
        setTimeout(function () {
          fun();
        }, 1);
      } else {
        fun();
      }
    },
    to: function to($target, $duration, $vars, $data) {
      var s = this;
      s.toNew.push({ target: $target, duration: $duration, vars: $vars, data: $data });
      return s;
    },
    keep: function keep() {
      var s = this,
      t,vs,k,d;
      if (s.toNew.length > 0) {
        t = s.toNew.shift();
        if (t.vars.loop) {
          s.loop = true;
        }
        if (s.loop) {
          d = {};
          vs = {};
          for (k in t.vars) {
            vs[k] = t.vars[k];
            if (typeof t.target[k] == UNDEFINED || t.vars.playStyle != LTweenLite.PlayStyle.Init) {
              continue;
            }
            if (t.data) {
              t.target[k] = t.data[k];
              continue;
            }
            d[k] = t.target[k];
          }
          if (!t.data) {
            t.data = d;
          }
          s.to(t.target, t.duration, vs, t.data);
        }
        s.init(t.target, t.duration, t.vars);
        return true;
      }
      return false;
    } };

  for (var k in p) {
    LTweenLiteChild.prototype[k] = p[k];
  }

  function LTweenLite() {
    var s = this;
    LExtends(s, LObject, []);
    s.type = "LTweenLite";
    s.tweens = [];
  }
  LTweenLite.PlayStyle = {
    None: "none",
    Init: "init" };

  LTweenLite.TYPE_FRAME = "type_frame";
  LTweenLite.TYPE_TIMER = "type_timer";
  var p = {
    count: function count() {
      return this.tweens.length;
    },
    ll_show: function ll_show() {
      var s = this;
      var i,length = s.tweens.length,
      t;
      for (i = length - 1; i >= 0; i--) {
        t = s.tweens[i];
        if (t && t.tween && t.tween()) {
          s.tweens.splice(i, 1);
          if (t.keep()) {
            s.add(t);
          }
        }
      }
    },
    to: function to($target, $duration, $vars) {
      if (!$target) {
        return;
      }
      var s = this;
      var tween = new LTweenLiteChild({}, 0, {});
      s.tweens.push(tween);
      tween.to($target, $duration, $vars);
      return tween;
    },
    add: function add(tween) {
      this.tweens.push(tween);
    },
    remove: function remove(tween) {
      var s = this;
      if (typeof tween == UNDEFINED) {
        return;
      }
      for (var i = 0, l = s.tweens.length; i < l; i++) {
        if (tween.objectIndex == s.tweens[i].objectIndex) {
          s.tweens.splice(i, 1);
          break;
        }
      }
    },
    removeTarget: function removeTarget(target) {
      var s = this;
      for (var i = 0, l = s.tweens.length; i < l; i++) {
        if (target.objectIndex == s.tweens[i].target.objectIndex) {
          s.tweens.splice(i, 1);
          break;
        }
      }
    },
    removeAll: function removeAll() {
      this.tweens.splice(0, this.tweens.length);
    },
    pauseAll: function pauseAll() {
      for (var i = 0, l = this.tweens.length; i < l; i++) {
        this.tweens[i].pause();
      }
    },
    resumeAll: function resumeAll() {
      for (var i = 0, l = this.tweens.length; i < l; i++) {
        this.tweens[i].resume();
      }
    } };

  for (var k in p) {
    LTweenLite.prototype[k] = p[k];
  }
  LTweenLiteTimeline = new LTweenLite();
  LGlobal.childList.push(LTweenLiteTimeline);
  var tween = new LTweenLite();
  tween.TYPE_FRAME = LTweenLite.TYPE_FRAME;
  tween.TYPE_TIMER = LTweenLite.TYPE_TIMER;
  tween.PlayStyle = LTweenLite.PlayStyle;
  LGlobal.childList.push(tween);
  return tween;
}();
var WxLocalRequest = function () {
  function WxLocalRequest() {
    this.responseType = 'text';
  }
  var p = {
    setRequestHeader: function setRequestHeader(type, application) {},
    _onreadystatechange: function _onreadystatechange(e) {
      if (!this.onreadystatechange) {
        return;
      }
      var event = {
        currentTarget: {
          readyState: 4,
          status: 200,
          responseType: this.responseType,
          _responseType: this._responseType,
          responseText: e.data,
          response: e.data } };


      this.onreadystatechange(event);
    },
    _onerror: function _onerror(event) {
      if (!this.onerror) {
        return;
      }
      this.onerror(event);
    },
    open: function open(method, url, async, user, password) {
      this.url = url;
    },
    send: function send(body) {
      var s = this;
      var option = {
        filePath: this.url,
        success: function success(event) {
          s._onreadystatechange(event);
        },
        fail: function fail(event) {
          s._onerror(event);
        } };

      if (this.responseType === 'text') {
        option.encoding = 'utf8';
      }
      wx.getFileSystemManager().readFile(option);
    } };

  for (var k in p) {
    WxLocalRequest.prototype[k] = p[k];
  }
  return WxLocalRequest;
}();
var LAjax = function () {
  function LAjax() {
    this.responseType = null;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
    this.canUseBlob = window.Blob || window.BlobBuilder;
    var protocol = location.protocol;
    this.local = !(protocol == "http:" || protocol == "https:");
  }
  LAjax.prototype = {
    TEXT: "text",
    JSON: "json",
    ARRAY_BUFFER: "arraybuffer",
    BLOB: "blob",
    get: function get(url, data, oncomplete, onerror) {
      this.getRequest("GET", url, data, oncomplete, onerror);
    },
    post: function post(url, data, oncomplete, onerror) {
      this.getRequest("POST", url, data, oncomplete, onerror);
    },
    getRequest: function getRequest(t, url, d, oncomplete, err) {
      var s = this,
      k,data = "",
      a = "";
      s.err = err;
      var isLocalUrl = url.indexOf('http') < 0;
      var ajax = s.getHttp(isLocalUrl);
      if (!ajax) {
        return;
      }
      if (d) {
        for (k in d) {
          data += a + k + "=" + d[k];
          a = "&";
        }
      }
      if (t.toLowerCase() == "get" && data.length > 0) {
        url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
        data = null;
      }
      ajax.onerror = function (e) {
        if (err) {
          err(e);
          err = null;
        }
      };
      var progress = s.progress;
      s.progress = null;
      if (!ajax.addEventListener) {
        ajax.addEventListener = function (key, fun) {
          ajax['on' + key] = fun;
        };
      }
      ajax.addEventListener("progress", function (e) {
        if (e.currentTarget.status == 404) {
          if (err) {
            err(e.currentTarget);
            err = null;
          }
        } else if (e.currentTarget.status == 200) {
          if (progress) {
            progress(e);
          }
        }
      }, false);
      ajax.open(t, url, true);
      if (s.responseType) {
        if (s.responseType == s.JSON) {
          try {
            ajax.responseType = s.responseType;
          } catch (e) {
            ajax.responseType = s.TEXT;
            ajax._responseType = "json";
          }
        } else {
          ajax.responseType = s.responseType;
        }
        s.responseType = s.TEXT;
      }
      ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.onreadystatechange = function (e) {
        var request = e.currentTarget;
        if (request.readyState == 4) {
          if (request.status >= 200 && request.status < 300 || request.status === 304) {
            if (oncomplete) {
              if (request._responseType == s.JSON) {
                request._responseType = s.TEXT;
                oncomplete(JSON.parse(request.responseText));
              } else if (request.responseType == s.ARRAY_BUFFER || request.responseType == s.BLOB || request.responseType == s.JSON) {
                oncomplete(request.response);
              } else if (request.responseText.length > 0) {
                oncomplete(request.responseText);
              } else {
                oncomplete(null);
              }
            }
          } else {
            if (err) {
              err(request);
              err = null;
            }
          }
        }
      };
      ajax.send(data);
    },
    getHttp: function getHttp(isLocalUrl) {
      if (LGlobal.wx && isLocalUrl) {
        return new WxLocalRequest();
      }
      if (typeof XMLHttpRequest != UNDEFINED) {
        return new XMLHttpRequest();
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          if (!this.err) {
            this.err(e);
          }
        }
      }
      return false;
    } };

  return new LAjax();
}();
var LStageWebView = function () {
  function LStageWebView() {
    var s = this;
    LExtends(s, LEventDispatcher, []);
    s.display = document.createElement("div");
    s.iframe = document.createElement("iframe");
    s.display.style.position = "absolute";
    s.display.style.marginTop = "0px";
    s.display.style.marginLeft = "0px";
    s.display.style.zIndex = LStageWebView.START_INDEX++;
    if (LGlobal.ios) {
      s.display.style.overflow = "auto";
      s.display.style.webkitOverflowScrolling = "touch";
    }
    s.display.appendChild(s.iframe);
    s.idAdded = false;
  }
  LStageWebView.START_INDEX = 11;
  var p = {
    loadURL: function loadURL(u) {
      var s = this;
      s.iframe.src = u;
      s.iframe.onload = function () {
        s.dispatchEvent(LEvent.COMPLETE);
      };
    },
    show: function show() {
      var s = this;
      if (!s.idAdded) {
        LGlobal.object.appendChild(s.display);
        s.idAdded = true;
      }
      if (s.display.style.display == "none") {
        s.display.style.display = "";
      }
    },
    die: function die() {
      LGlobal.object.removeChild(this.display);
      this.idAdded = false;
    },
    hide: function hide() {
      this.display.style.display = "none";
    },
    setViewPort: function setViewPort(r) {
      var s = this,
      sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width,
      sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
      s.display.style.marginTop = parseInt(LGlobal.canvasObj.style.marginTop) + (r.y * sy >>> 0) + "px";
      s.display.style.marginLeft = parseInt(LGlobal.canvasObj.style.marginLeft) + (r.x * sx >>> 0) + "px";
      s.iframe.style.width = s.display.style.width = (r.width * sx >>> 0) + "px";
      s.iframe.style.height = s.display.style.height = (r.height * sy >>> 0) + "px";
    } };

  for (var k in p) {
    LStageWebView.prototype[k] = p[k];
  }
  return LStageWebView;
}();
var FPS = function () {
  function FPS() {
    var s = this;
    LExtends(s, LSprite, []);
    if (!LGlobal.fpsStatus) {
      LGlobal.fpsStatus = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        bitmapData: 0,
        display: 0,
        transform: 0,
        graphics: 0,
        text: 0,
        reset: function reset() {
          this.a = this.bitmapData;
          this.b = this.display - 1;
          this.c = this.transform - 1;
          this.d = this.graphics - 1;
          this.e = this.text - 5;
          this.bitmapData = 0;
          this.display = 0;
          this.transform = 0;
          this.graphics = 0;
          this.text = 0;
        } };

    }
    s.fps = [];
    s.back = new LShape();
    s.back.alpha = 0.5;
    s.addChild(s.back);
    for (var i = 0; i < 5; i++) {
      var f = new LTextField();
      f.color = "#ffffff";
      f.y = i * 20;
      s.addChild(f);
      s.fps.push(f);
    }
    s.fpsCount = 0;
    s.fpsTime = new Date().getTime();
    s.addEventListener(LEvent.ENTER_FRAME, s.showFPS);
  }
  FPS.prototype.showFPS = function (e) {
    var s = e.currentTarget,
    t,f;
    s.fpsCount++;
    t = new Date().getTime();
    if (t - s.fpsTime < 1000) return;
    s.fps[0].text = "FPS : " + Math.round(s.fpsCount * 10000 / (t - s.fpsTime)) / 10;
    f = LGlobal.fpsStatus;
    s.fps[1].text = "DisplayObject : " + f.c + "/" + f.b;
    s.fps[2].text = "Draw image : " + f.a;
    s.fps[3].text = "Draw graphics : " + f.d;
    s.fps[4].text = "Draw text : " + f.e;
    s.fpsTime = t;
    s.fpsCount = 0;
    s.back.graphics.clear();
    s.back.graphics.drawRect(0, "#000000", [0, 0, s.fps[1].getWidth(), 100], true, "#000000");
  };
  FPS.prototype.die = function () {
    var s = this;
    LGlobal.fpsStatus = null;
    s.callParent("die", arguments);
  };
  return FPS;
}();var _default =

{
  LInit: LInit, LSprite: LSprite, addChild: addChild, LEvent: LEvent, LGraphics: LGraphics };exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map