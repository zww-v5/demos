(function(doc){
    var funcs = {};

    /** 
     * 版本号
    */
    funcs.version = '0.1';

    /**
     * getFirstElement
     * @param {DOM/String} DOM 元素或选择器字符串
     */
    funcs.getFirstElement = function(el){
        if (typeof el !== 'object') {
            if (typeof el === 'string') {
                el = document.querySelector(el);
            } else {
                console.error('请输入正确的 dom 元素');
            }
        } else if (el.length){
            el = el[0];
        }
        return el;
    }

    /**
     * classHandle
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要添加的类名，有多个时，以空格隔开
     * @param {Function} 要执行的操作函数
     */
    funcs.classHandle = function(el, className, handle){
        if (typeof el !== 'object') {
            if (typeof el === 'string') {
                el = document.querySelectorAll(el);
            } else {
                console.error('请输入正确的 dom 元素');
            }
        }

        if (typeof className !== 'string') {
            console.error('className 必需是字符串');
        }

        if (el.length) { //一组 dom 元素
            Array.prototype.forEach.call(el, function(el, i){
                handle(el, className);
            });
        } else {
            handle(el, className);
        }
    }

    /**
     * addClass
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要添加的类名，有多个时，以空格隔开
     */
    funcs.addClass = function(el, className){
        funcs.classHandle(el, className, add);

        function add(el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        }
    }

    /**
     * removeClass
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要添加的类名，有多个时，以空格隔开
     */
    funcs.removeClass = function(el, className){
        funcs.classHandle(el, className, remove);

        function remove(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    }

    /**
     * hasClass
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要添加的类名，有多个时，以空格隔开
     */
    funcs.hasClass = function(el, className){
        if (typeof el !== 'object') {
            if (typeof el === 'string') {
                el = document.querySelectorAll(el);
            } else {
                console.error('请输入正确的 dom 元素');
            }
        }

        if (typeof className !== 'string') {
            console.error('className 必需是字符串');
        }

        if (el.length) { //一组 dom 元素
            var result;

            for (let i = 0; i < el.length; i++) {
                result = hasClass(el[i], className);
                if (result) {
                    return true;
                }
            }
            return false;
        } else {
            return hasClass(el, className);
        }

        function hasClass(el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            } else {
                return (new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className));
            }
        }
    }

    /**
     * toggleClass
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要添加的类名
     */
    funcs.toggleClass = function(el, className){
        funcs.classHandle(el, className, toggle);

        function toggle(el, className){
            if (el.classList) {
                el.classList.toggle(className);
            } else {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);
                else
                    classes.push(className);

                el.className = classes.join(' ');
            }
        }
    }

    /**
     * insertAdjacentHTML
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 插入 html 的位置，beforebegin / afterend
     * @param {String} 要插入的 html 字符串、dom 元素、文本节点、元素数组或文本节点数组
     */
    funcs.insertAdjacentHTML = function(el, position, htmlString){
        if (typeof el !== 'object') {
            if (typeof el === 'string') {
                el = document.querySelectorAll(el);
            } else {
                console.error('请输入正确的 dom 元素');
            }
        }

        if (el.length) { //一组 dom 元素
            Array.prototype.forEach.call(el, function(el, i){
                el.insertAdjacentHTML(position, htmlString);
            });
        } else {
            el.insertAdjacentHTML(position, htmlString);
        }
    }

    /**
     * before
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要插入的 html 字符串、dom 元素、文本节点、元素数组或文本节点数组
     */
    funcs.before = function(el, htmlString){
        funcs.insertAdjacentHTML(el, 'beforebegin', htmlString);
    }

    /**
     * after
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 要插入的 html 字符串、dom 元素、文本节点、元素数组或文本节点数组
     */
    funcs.after = function(el, htmlString){
        funcs.insertAdjacentHTML(el, 'afterend', htmlString);
    }

    /**
     * contains
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {DOM/String} DOM 元素或选择器字符串
     */
    funcs.contains = function(el, child){
        el = funcs.getFirstElement(el);

        if (typeof child !== 'object') {
            if (typeof child === 'string') {
                child = document.querySelector(child);
            } else {
                console.error('请输入正确的 dom 元素');
            }
        } else if (child.length){
            child = child[0];
        }

        return el !== child && el.contains(child);
    }

    /**
     * matches
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 选择器字符串
     */
    funcs.matches = function(el, selector) {
        el = funcs.getFirstElement(el);

        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };

    /**
     * offset
     * @param {DOM/String} DOM 元素或选择器字符串
     */
    funcs.offset = function(el){
        el = funcs.getFirstElement(el);

        var rect = el.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        }
    }

    /**
     * outerHeight
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {Boolean} 是否包含 margin
     */
    funcs.outerHeight = function(el, withMargin){
        el = funcs.getFirstElement(el);

        if (!withMargin) {
            return el.offsetHeight;
        } else {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        }
    }

    /**
     * outerWidth
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {Boolean} 是否包含 margin
     */
    funcs.outerWidth = function(el, withMargin){
        el = funcs.getFirstElement(el);

        if (!withMargin) {
            return el.offsetWidth;
        } else {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        }
    }

    /**
     * siblings
     * @param {DOM/String} DOM 元素或选择器字符串
     */
    funcs.siblings = function(el){
        el = funcs.getFirstElement(el);

        return Array.prototype.filter.call(el.parentNode.children, function(child){
            return child !== el;
        });
    }

    /**
     * ready
     * @param {DOM} 非必填项，不填时，默认是当前窗口
     * @param {Function} 执行函数
     */
    funcs.ready = function(docEle, fn){
        if (funcs.isFunction(docEle)) {
            fn = docEle;
            docEle = document;
        }

        if (docEle.attachEvent ? docEle.readyState === "complete" : docEle.readyState !== "loading"){
            fn(docEle);
        } else {
            docEle.addEventListener('DOMContentLoaded', fn);
        }
    }

    /**
     * trigger
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 事件类型，如 click 等,
     * 完整的事件类型列表见 https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
     */
    funcs.trigger = function(el, type){
        el = funcs.getFirstElement(el);

        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
        el.dispatchEvent(event);
    }

    /**
     * triggerCustom
     * @param {DOM/String} DOM 元素或选择器字符串
     * @param {String} 自定义事件名称
     * @param {Object} 执行事件时，传递过去的数据
     */
    funcs.triggerCustom = function(el, customType, detail){
        el = funcs.getFirstElement(el);

        if (window.CustomEvent) {
            var event = new CustomEvent(customType, {detail: detail});
        } else {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(customType, true, true, detail);
        }

        el.dispatchEvent(event);
    }

    /**
     * isFunction
     * @param {Object} 要判断的对象
     */
    funcs.isFunction = function(obj){
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    }

    /**
     * isPlainObject
     * @param {Object} 要判断的对象
     */
    funcs.isPlainObject = function(obj){
        var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = Object.getPrototypeOf( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
    }

    /**
     * extend
     * @param {Boolean} 是否要深度拷贝，非必填项
     * @param {Object} 要拷贝的对象，第1个对象是目标对象
     * ... 同第二个参数，个数无限
     */
    funcs.extend = function(){
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !func.isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {

                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( funcs.isPlainObject( copy ) ||
                        ( copyIsArray = Array.isArray( copy ) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray( src ) ? src : [];

                        } else {
                            clone = src && funcs.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = funcs.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    /**
     * parseHTML
     * @param {String} 参数一
     */
    funcs.parseHTML = function(htmlString){
        if ( typeof htmlString !== "string" ) {
            return [];
        }

        var context = document.implementation.createHTMLDocument();
        context.body.innerHTML = htmlString;
        return tmp.body.children;
    }

    /**
     * type //输出对象的 typeof 字体串
     * @param {Object} 参数一
     */
    funcs.type = function(obj){
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    }

    /**
     * testAlert
     * @param {String} 参数一
     */
    // funcs.testAlert = function(){
    //     alert('hello world');
    // }

    /*
getJSON
ajax
    Post
    request
fadeIn //直接使用 move.js 或 animate.css 代替
    */

    if (window.NEMO) {
        NEMO = Object.assign(NEMO, funcs);
    } else {
        window.NEMO = funcs;
    }
    window.N = window.NEMO;
})(document);