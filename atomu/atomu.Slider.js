/**
* 页面、图片等的滑动动画框架，基于zepto.js 
* @author weiwuzhu(weiwuzhu@tencent.com)
* @date 2015-5-16
* @version  v1.0.0
*/

;(function(global){
	'use strict';

	var atomuSlider = function(options){
		this._opt = options;
		if(!options.wrap){
			throw new Error('wrap不能为空');
		}
		if(!options.data){
			throw new Error('轮播的数据不能为空');
		}
		this._init();
		this._addHtml();
		this._bindEvt();
	};

	atomuSlider.prototype._init = function(){
		var self = this,
			opt;
		self._default = {
			wrap: '', //外层元素：id / class / zepto obj / dom obj
			data: null, //轮播内容数据
			type: 'pic', //轮播的内容：pic/dom
			ctrlType: '', //可为空：dot / btn

			isVertical: false, //是否垂直滚动
			isOverSpread: false, //是否满屏铺开

			duration: 300, //ms,转换动画的时间
			time: 2000, //ms,每屏展示的间隔时间
			initIndex: 0, //首次展示的页面

			isLooping: false, //是否可循环播放
			isAutoPlay: false, //是否自动轮播
			follow: true, //手指滑动过程中图片是否跟着动

			animateType: 'default', //动画类型，目前只有default

			onTMove: null, //手指在移动时的回调
			onTStart: null, //手指点击屏幕时的回调
			onTEnd: null, //手指离开屏幕时的回调
			onSlideBefore: null, //开始转换前的回调
			onSlideEnd: null, //转换完成后的回调

			isDebug: false, //调试模式

			fixPage: true //是否固定页面防止页面回弹
		}

		opt = self._opt = $.extend({},self._default,self._opt);

		opt.slideIndex = opt.initIndex || 0;
		opt.axis = opt.isVertical ? 'y' : 'x';

		if(opt.data.length < 2){
			opt.isLooping = false;
			opt.isAutoPlay = false;
		}

		self.$wrap = $(opt.wrap);
		if(!self.$wrap.hasClass('atomu-slider')){
			self.$wrap.addClass('atomu-slider');
		}
		opt.width = self.$wrap.width();
		opt.height = self.$wrap.height();
		opt.ratio = opt.height / opt.width;

		self._animateFunc = (opt.animateType in this._animateFuncs)
        ? this._animateFuncs[opt.animateType]
        : this._animateFuncs['default'];

        opt.offset = {
        	x: 0,
        	y: 0
        };

		self.log = opt.isDebug ? function (str) {window.console.log(str);} : function () {};

		// 自动播放
        if (opt.isAutoPlay) {
            self.play();
        }

		//debug
		self.log('--init(slider obj)--');
		self.log(self);
	};

	/* 加载图片
	*/
	atomuSlider.prototype.loadImg = function(dataIdx){
		var opt = this._opt,
			item = opt.data[dataIdx],
			img;
		if(item && !item.loaded){
			img = new Image();
			img.src = item.content;
			img.onload = function(){
				item.width = img.width; 
				item.height = img.height;
			}
			item.onloaded = 1;

			//debug
			this.log('--loadImg(img data)--');
			this.log(item);
		}
	};

	/* 加载每一项内容
	* @param ele: 存入内容的元素
	* @param idx: 内容数据中的位置
	*/
	atomuSlider.prototype._addItem = function(ele, idx){
		var self = this,
			opt = self._opt,
			len = opt.data.length,
			item,
			html;

		if(!opt.isLooping){
			item = opt.data[idx] || {empty: true};
		}else{
			if(idx < 0){
				idx =len + idx;
			}else if(idx > len - 1){
				idx = idx - len;
			}
			item = opt.data[idx];
		}

		if(item.empty){
			ele.html('')
				.css('background', '');
			return;
		}
			
		if(opt.type === 'pic'){
			if(opt.isOverSpread){
				ele.css({
					'background': 'url(' + item.content + ') center center no-repeat',
					'-webkit-background-size': 'cover'
				});
			}else{
				if(!item.width && !item.height){
					self.loadImg(idx);
				}

				//debug
				self.log('--addItem(img data)--');
				self.log(item);

				if(item.height/item.width > opt.ratio){
					html = '<img src="' + item.content + '" height="' + opt.height + '" />';
				}else{
					html = '<img src="' + item.content + '" width="' + opt.width + '" />';
				}
				ele.html(html);
			}
		}else{
			ele.html(item.content);
		}
	};

	/* 插入完整的结构，只插入3项
	*/
	atomuSlider.prototype._addHtml = function(){
		var self = this,
			opt = self._opt,
			len = opt.data.length,
			item,
			liItem,
			$ctn = self.$ctn;
		if($ctn){
			$ctn.html('');
		}else{
			$ctn = $('<ul class="atomu-slider-ctn"></ul>');
		}

		if(opt.type === 'pic' && !self.loaded){
			self.$wrap.html('<div class="loading-box"><i></i></div>');
			self.loaded = 1;
		}

		self.eles = [];
		for(var i=0; i<3; i++){
			liItem = $('<li class="' + opt.type + '"></li>');
			self._addItem(liItem, opt.slideIndex - 1 + i);

			self._animateFunc(liItem, i, 0);
			$ctn.append(liItem);
			self.eles.push(liItem);
		}

		if(!self.$ctn){
			self.$wrap.html($ctn);
			self.$ctn = $ctn;
		}

		//增加圆点控制项 或 左右切换按钮
		if(opt.ctrlType === 'dot'){
			self.addDotHtml();
		}else if(opt.ctrlType === 'btn'){
			self.addBtnHtml();
		}
	};

	/* 滚动到指定位置
	*/
	atomuSlider.prototype.slideTo = function(dataIdx){
		var self = this,
			opt = self._opt,
			eles = self.eles,
			n = dataIdx - opt.slideIndex,
			$next;
		if(Math.abs(n) > 1){
			$next = n > 0 ? eles[2] : eles[0];
			self._addItem($next, dataIdx);
		}

		if(opt.data[dataIdx]){
			opt.slideIndex = dataIdx;
		}else{
			if(opt.isLooping){
				opt.slideIndex = n > 0 ? 0 : (opt.data.length - 1);
			}else{
				n = 0;
			}
		}
 
		var tmp;
		if (n > 0) {
            tmp = eles.shift();
            eles.push(tmp);
        } else if (n < 0) {
            tmp = eles.pop();
            eles.unshift(tmp);
        }

        if(n !== 0){
        	if(Math.abs(n) > 1){
        		self._addItem(eles[0],dataIdx - 1);
        		self._addItem(eles[2],dataIdx + 1);
        	}else{
        		self._addItem(tmp,dataIdx + n);
        	}

        	tmp.css('-webkit-transition', '');
        }

        if(self.onSlideBefore && typeof self.onSlideBefore == 'function'){
			self.onSlideBefore();
		}

        for(var i=0; i<3; i++){
        	if(eles[i] !== tmp){
        		eles[i].css('-webkit-transition', 'all ' + opt.duration + 'ms ease');
        	}
        	self._animateFunc(eles[i], i, 0);
        }

        //圆点控制 或 左右切换按钮
        if(opt.ctrlType === 'dot'){
        	self.dotChange();
        }else if(opt.ctrlType === 'btn'){
        	self.btnChange();
        }

        setTimeout(function(){
			if(self.onSlideEnd && typeof self.onSlideEnd == 'function'){
				self.onSlideEnd();
			}
		},opt.duration);

		// 不循环播放的情况下，自动播放到最后一张时停止播放
        if (opt.isAutoPlay && !opt.isLooping && opt.slideIndex === opt.data.length - 1) {
            this.pause();
        }
	};

	/* 转换动画
	* @param item: 需做转换的元素
	* @param i: 元素在 this.eles 数组中所对应的位置（0~2）
	* @param offset: 元素在滑动方向上的偏移量
	*/
	atomuSlider.prototype._animateFuncs = {
		'default': function(item, i, offset, self){
			var opt = this._opt,
				distance,
				translate = opt.isVertical ? 'translateY' : 'translateX';
			if(opt.isVertical){
				distance = (i - 1) * opt.height + offset;
			}else{
				distance = (i - 1) * opt.width + offset;
			}

			item.css('-webkit-transform', translate + '(' + distance +'px)');
		}
	};

	/* 初始化事件类型
	*/
	atomuSlider.prototype._initEvtType = function(){
		var hasTouch = !!(('ontouchstart' in window)
            || window.DocumentTouch && document instanceof window.DocumentTouch);
        var startEvt = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        var endEvt = hasTouch ? 'touchend' : 'mouseup';
        return {
            hasTouch: hasTouch,
            startEvt: startEvt,
            moveEvt: moveEvt,
            endEvt: endEvt
        };
	};

	/* 绑定事件
	*/
	atomuSlider.prototype._bindEvt = function(){
		var self = this,
			$ctn = self.$ctn,
			evtType = self._initEvtType();
		self.evtType = evtType;
		if (!evtType.hasTouch) {
			$ctn.css('cursor', 'pointer')
				.on('dragstart', function(evt){
					self.log('dragstart');

					if (evt) {
	                    return false;
	                }
	                return true;
				});
        }
        //debug
        self.log('--bindEvt--');
        self.log(evtType);

        $ctn.on(evtType.startEvt, self, self._startHandler);
        $ctn.on(evtType.moveEvt, self, self._moveHandler);
        $ctn.on(evtType.endEvt, self, self._endHandler);
        $ctn.on('touchcancel', self, self._endHandler);

        //绑定圆点控制
        if(self._opt.ctrlType === 'dot'){
        	self.dotHandler();
        }else if(self._opt.ctrlType === 'btn'){
        	self.btnHandler();
        }
	};

	/* touchstart/mousedown
	*/
	atomuSlider.prototype._startHandler = function(evt){
		var self = evt.data,
			opt = self._opt,
			evtType = self.evtType;

		//阻止页面回弹
		if(opt.fixPage) {
            var target = evt.target;
            if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                evt.preventDefault();
            }
        }

        self.isMoving = true;
        self.pause();
        if(opt.onTStart && typeof opt.onTStart == 'function'){
        	opt.onTStart();
        }

        self.startTime = new Date().getTime();
        self.startX = evtType.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
        self.startY = evtType.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;

        //debug
        self.log('--start--');
        self.log(self);
        self.log(evt);
	};

	/* touchmove/mousemove
	*/
	atomuSlider.prototype._moveHandler = function(evt){
		var self = evt.data,
			opt = self._opt,
			eles = self.eles,
			evtType = self.evtType;

		if(!self.isMoving) return;

		if(opt.onTMove && typeof opt.onTMove == 'function'){
        	opt.onTMove();
        }

		if(evtType.hasTouch){
			opt.offset = {
				x: evt.targetTouches[0].pageX - self.startX,
				y: evt.targetTouches[0].pageY - self.startY
			};
		}else{
			opt.offset = {
				x: evt.pageX - self.startX,
				y: evt.pageY - self.startY
			};
		}

		if(opt.follow){
			for(var i=0; i<3; i++){
	        	eles[i].css('-webkit-transition', '');
	        	self._animateFunc(eles[i], i, opt.offset[opt.axis]);
	        }
		}

		//debug
		self.log('--move--');
        self.log(self);
        self.log(evt);
	};

	/* touchend/mouseup
	*/
	atomuSlider.prototype._endHandler = function(evt){
		var self = evt.data,
			opt = self._opt,
			offset = opt.offset,
			distance,
			base,
			evtType = self.evtType;

		var getLink = function(el) {
            if (el.tagName === 'A') {
                if (el.href) {
                    window.location.href = el.href
                    return false;
                }
            }
            else if (el.className === 'dom') {
                return false;
            }
            else {
                getLink(el.parentNode);
            }
        }

        self.isMoving = false;
        if(opt.onTEnd && typeof opt.onTEnd == 'function'){
        	opt.onTEnd();
        }

        self.endTime = new Date().getTime();

        if(opt.isVertical){
        	distance = offset.y;
        	base = opt.height / 2;
        }else{
        	distance = offset.x;
        	base = opt.width / 2;
        }

    	if((Math.abs(distance) > 14 && self.endTime - self.startTime < 300) || Math.abs(distance) > base){
    		if(distance < 0){
    			self.slideTo(opt.slideIndex + 1);
    		}else{
    			self.slideTo(opt.slideIndex - 1);
    		}
    	}else{
    		self.slideTo(opt.slideIndex);
    	}

    	// create tap event if offset < 10
        if (Math.abs(offset.X) < 10 && Math.abs(offset.Y) < 10) {
            self.tapEvt = document.createEvent('Event');
            self.tapEvt.initEvent('tap', true, true);
            if (opt.fixPage && opt.type === 'dom') {
                getLink(evt.target);
            }
            if (!evt.target.dispatchEvent(self.tapEvt)) {
                evt.preventDefault();
            }
        }

        opt.offset.x = opt.offset.y = 0;
        opt.isAutoPlay && self.play();

        //debug
		self.log('--end--');
        self.log(self);
        self.log(evt);
	};

	/**
    *  orientationchange callback
    */
    atomuSlider.prototype.orientationchangeHandler = function () {
        setTimeout(function () {
            this.reset();
            this.log('Event: orientationchange');
        }, 100);
    };

	/* 播放
	*/
	atomuSlider.prototype.play = function(){
		var self = this,
			opt = self._opt;
		self.timer && clearInterval(self.timer);
		self.timer = setInterval(function(){
			self.slideTo(opt.slideIndex + 1);
		},opt.time);
	};

	/* 暂停
	*/
	atomuSlider.prototype.pause = function(){
		self.timer && clearInterval(self.timer);
	};

	/* 重新初始化
	*/
	atomuSlider.prototype.reset = function(){
		this.pause();
        this._init();
        this._addHtml();
        this._opt.isAutoPlay && this.play();
	};

	/* 增加圆点控制项
	*/
	atomuSlider.prototype.addDotHtml = function(){
		var self = this,
			opt = self._opt,
			len = opt.data.length,
			html = [],
			$ctrl = self.$ctrl = $('<ul class="atomu-slider-ctrl"></ul>');
		for(var i=0; i<len; i++){
			if(i == opt.slideIndex){
				html.push('<li class="current">' + (i + 1) + '</li>');
			}else{
				html.push('<li>' + (i + 1) + '</li>');
			}
		}
		$ctrl.html(html.join(''));
		self.$wrap.append($ctrl);
	};

	/* 圆点切换
	*/
	atomuSlider.prototype.dotChange = function(){
		var self = this,
			$ctrlItems = self.$ctrl.children();
		$ctrlItems.removeClass('current');
		$ctrlItems.eq(self._opt.slideIndex).addClass('current');
	};

	/* 圆点切换事件绑定
	*/
	atomuSlider.prototype.dotHandler = function(){
		var self = this;
		self.$ctrl.on('click', 'li', function(e){
        	//阻止移动端页面的点透问题
        	e.preventDefault();

        	var idx = $(this).html() - 1;
        	self.slideTo(idx);

        	//清除自动播放的影响
        	if(self._opt.isAutoPlay){
        		self.pause();
        		self.play();
        	}
        });
	};

	/* 增加左右切换按钮
	*/
	atomuSlider.prototype.addBtnHtml = function(){
		var self = this,
			opt = self._opt,
			$btnWrap = $('<div class="atomu-slider-pages">' + 
							'<button class="prev"><span></span></button>' + 
							'<button class="next"><span></span></button>' + 
						'</div>');
		self.$wrap.append($btnWrap);
		self.$btnWrap = $btnWrap;

		self.btnChange();
	};

	/* 按钮状态更新
	*/
	atomuSlider.prototype.btnChange = function(){
		var self = this,
			opt = self._opt,
			$prev = self.$btnWrap.find('.prev'),
			$next = self.$btnWrap.find('.next');
		if(!opt.isLooping){
			if(opt.slideIndex >= (opt.data.length - 1)){
				$next.hide();
			}else{
				$next.show();
			}
			if(opt.slideIndex <= 0){
				$prev.hide();
			}else{
				$prev.show()
			}
		}
	};

	/* 左右切换事件绑定
	*/
	atomuSlider.prototype.btnHandler = function(){
		var self = this;
		self.$btnWrap.on('click', 'button', function(e){
			//阻止移动端页面的点透问题
        	e.preventDefault();

        	if($(this).hasClass('prev')){
        		self.slideTo(self._opt.slideIndex - 1);
        	}else{
        		self.slideTo(self._opt.slideIndex + 1);
        	}

        	//清除自动播放的影响
        	if(self._opt.isAutoPlay){
        		self.pause();
        		self.play();
        	}
		});
	};

	global.atomuSlider = atomuSlider;
})(this);