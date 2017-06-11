/**
 *
 * @authors WeiwuZhu
 * @date    2015-04-02 20:18:12
 * @version 1.0
 * @desc 基础动画库，基于zepto、zepto animation、zepto.extend.js、animate.less编写，部分采用纯js处理，部分动画直接用css处理
 * @import 动画接入命名规则：动作 + In/Out + 方向(left/right/top/bottom)，如 slideInRight 代表 从右边滑入
 */

var ANI = {
	//配置
	def: {
		element: '', //zepto对象、js对象、class或id
		aniType: '', //aniType与animate.less里的动画名要保持一致
		duration: 400, //动画时间
		ease: '', //动画曲线
		callback: null //回调函数
	},

	animate: function(obj){ 
		obj = obj || {};
		obj = $.extend({},ANI.def,obj);

		var $element = $(obj.element);
		if($element.length < 1){
			return;
		}
		obj.ease && $element.pCss('animation-timing-function', obj.ease);
		$element
			.pCss('animation-duration', obj.duration + 'ms')
			.addClass('animated ' + obj.aniType);
		setTimeout(function(){
			obj.ease && $element.pCss('animation-timing-function', '');
			$element
				.pCss('animation-duration', '')
				.removeClass('animated ' + obj.aniType);
			//回调
			if(obj.callback && typeof obj.callback == 'function'){
				obj.callback();
			}
		},obj.duration);
	},

	//处理传入的参数并执行动画
	passArguments: function(aniType, _arguments){ 
		if(_arguments.length < 1){
			return;
		}
		
		var obj = {
			element: _arguments[0],
			aniType: aniType
		};
		if(_arguments.length == 2){
			if(typeof _arguments[1] == 'string' || typeof _arguments[1] == 'number'){
				obj.duration = _arguments[1];
			}else if(typeof _arguments[1] == 'function'){
				obj.callback = _arguments[1];
			}
		}else if(_arguments.length > 2){
			if(typeof _arguments[1] == 'string' || typeof _arguments[1] == 'number'){
				obj.duration = _arguments[1];
			}
			if(typeof _arguments[2] == 'function'){
				obj.callback = _arguments[2];
			}
		}
		this.animate(obj);
	},

	//传参方式：a(element); a(element, duration); a(element, callback); a(element, duration, callback);
	//放大显示
	scaleIn: function(element, duration, callback){
		this.passArguments('scaleIn', arguments);
	},

	//从顶部放大显示
	scaleInTop: function(element, duration, callback){
		this.passArguments('scaleInTop', arguments);
	},

	//从顶部缩小隐藏
	scaleOutTop: function(element, duration, callback){
		this.passArguments('scaleOutTop', arguments);
	},

	//从右边滑入
	slideInRight: function(element, duration, callback){
		this.passArguments('slideInRight', arguments);
	},

	//从左边滑入
	slideInLeft: function(element, duration, callback){
		this.passArguments('slideInLeft', arguments);
	},

	//从顶部滑入
	slideInTop: function(element, duration, callback){
		this.passArguments('slideInTop', arguments);
	},

	//从底部滑入
	slideInBottom: function(element, duration, callback){
		this.passArguments('slideInBottom', arguments);
	},

	//从左边滑出
	slideOutLeft: function(element, duration, callback){
		this.passArguments('slideOutLeft', arguments);
	},

	//从右边滑出
	slideOutRight: function(element, duration, callback){
		this.passArguments('slideOutRight', arguments);
	},

	//从顶部滑出
	slideOutTop: function(element, duration, callback){
		this.passArguments('slideOutTop', arguments);
	},

	//从底部滑出
	slideOutBottom: function(element, duration, callback){
		this.passArguments('slideOutBottom', arguments);
	},

	//顶部抖动
	bounceTop: function(element, duration, callback){ 
		this.passArguments('bounceTop', arguments);
	},

	//底部抖动
	bounceBottom: function(element, duration, callback){
		this.passArguments('bounceBottom', arguments);
	}
}
