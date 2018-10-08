(function(doc){
    var funcs = {};

    /**
     * getJSON
     * @param {String} 参数一
     */
    funcs.getJSON = function(url, callback){
        
    }

	if (window.NEMO) {
        NEMO = Object.assign(NEMO, funcs);
    } else {
        window.NEMO = funcs;
    }
    window.N = window.NEMO;
})(document);