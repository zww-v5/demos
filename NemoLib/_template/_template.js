(function(doc){
    var funcs = {};

    /**
     * 功能描述
     * @param {String} 参数一
     */
    funcs.alertTemplate = function(){
        alert('alertTemplate');
    }

    if (window.NEMO) {
        NEMO = Object.assign(NEMO, funcs);
    } else {
        window.NEMO = funcs;
    }
})(document);