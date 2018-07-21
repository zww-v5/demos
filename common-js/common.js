// 常用脚本库

//获得url参数
function getUrlParameters(){
    var search = window.location.search.slice(1).split('&'),
        parameters = {},
        temp;
    for (var i = 0; i < search.length; i++) {
        temp = search[i].split('=');
        if (temp[1]) {
            parameters[temp[0]] = temp[1];
        }
    }
    return parameters;
}