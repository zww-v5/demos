"use strict";
/** 
* 基于 Nemo 脚本库进行编写
*/

/**
 * createNav：创建左侧菜单
 *
 */
function createNav(){
    let titles = document.querySelectorAll('.content-mod-tit'),
        html = [],
        id;

    Array.prototype.forEach.call(titles, function(el, i){
        id = el.getAttribute('id');

        if (!id) {
            id = 'title' + i;
            el.id = id;
        }

        html.push(`<li><a href="` + id + `">` + el.textContent + `</a></li>`);
    });

    document.querySelector('.component-guide-nav .nav-content').innerHTML = html.join('');
}

/**
 * bindNavFunc：绑定左侧菜单定位
 *
 */
function bindNavFunc(){
    let navs = document.querySelectorAll('.component-guide-nav .nav-content a');
    Array.prototype.forEach.call(navs, function(el, i){
        el.addEventListener('click', function(e){
            e.preventDefault();
            let anchorName = el.getAttribute('href');

            if (anchorName) {
                let anchorElement = document.getElementById(anchorName);
                if (anchorElement) { anchorElement.scrollIntoView(); }
            }
        })
    });
}

/**
 * triggerView：切换 iframe 的查看模式（PC端或移动端）
 *
 */
function triggerView(){
    let viewMode = 'pc',
        viewBtn = document.getElementById('trigger-view'),
        iframes = document.querySelectorAll('.component-guide-wrap .content-mod-iframe');
    
    viewBtn.addEventListener('click', function(){
        if (viewMode == 'pc') {
            viewMode = 'mobile';

            Array.prototype.forEach.call(iframes, function(el, i){
                N.addClass(el, viewMode);
                viewBtn.textContent = '在pc端下查看';
            });
        } else {
            Array.prototype.forEach.call(iframes, function(el, i){
                N.removeClass(el, viewMode);
                viewBtn.textContent = '在移动端下查看';
            });
            
            viewMode = 'pc';
        }
    });
}

/**
 * adjustIframeHeight 自动设置 iframe 的高度
 *
 * @param {dom}} iFrame
 */
function adjustIframeHeight( iFrame ) {
    var wrap = iFrame.parentNode;

    try {
        if (!wrap.style.height) {
            wrap.style.height = iFrame.contentWindow.document.body.scrollHeight + 'px';   
        }
    } catch (error) {
        console.log('adjust error', iFrame.src,error); 
    }
}

function adjustAllIframes() {
    var iframes = document.querySelectorAll(".content-mod-iframe iframe");
    
    for( var i = 0; i < iframes.length; i++) {
        iframes[i].addEventListener('load', function(){
            adjustIframeHeight(iframes[i - 1]);
        });
    }
    
    window.addEventListener('resize', adjust);

    function adjust(){
        for( var i = 0; i < iframes.length; i++) {
            adjustIframeHeight( iframes[i] );
        }
    }
}

