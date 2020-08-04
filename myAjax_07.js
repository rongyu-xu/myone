function resolveData (data) {
    var arr = [];
    for(var k in data) {
        var str = k + '=' + data[k]  //遍历得到 str = 'k = data[k]' 的字符串
        arr.push(str); //将字符串str增加到数组arr中
    }
    return arr.join('&')  //将数组转换成用&分隔的字符串
}
function pseudoAjax (option) {
    var xhr = new XMLHttpRequest();
    var qs = resolveData(option.data);
    if(option.method.toUpperCase() === 'GET') {
        xhr.open(option.method,option.url + '?' + qs);
        xhr.send()
    }else if(option.method.toUpperCase() === 'POST'){
        xhr.open(option.method,option.url);
        xhr.setRequestHeader('Content-Type','location/x-www-form-urlencoded')
        xhr.send(qs)
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            option.success(result);
        }
    }
}