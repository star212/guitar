/**
 * 
 * 依赖zepto
 * 通用js
 * 作者：瞿星
*/

 define(function(require,exports,module){
    
    var common = window.common = {

        init: function(){
        },
        isIOS: (function() {
            var userAgent = window.navigator.userAgent.toLowerCase(),
            returnValue = false;
            console.log(userAgent);
            /iphone/.test(userAgent) && (returnValue = true);
            return returnValue;
        })(),
        //html编码，除br
        htmlEncode: function(str){
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(str));
            return div.innerHTML.replace(/\&lt;br\/\&gt;/g,"<br/>");
        },
        imgOnError: function() {
            this.src = 'http://a.tbcdn.cn/mw/s/common/icons/nopic/no-90.png';
            this.onerror = null;
        },
        //数组去重复
        uniq: function (arr) {
            var a = [],
                o = {},
                i,
                v,
                len = arr.length;
            if (len < 2) {
                return arr;
            }
            for (i = 0; i < len; i++) {
                v = arr[i];
                if (o[v] !== 1) {
                    a.push(v);
                    o[v] = 1;
                }
            }
            return a;
        },
        //随机，range范围，n为个数
        //range要大于n
        random: function(range,n){
            if(range<n) return;
            var arr = [];
            while(arr.length < n) {
                arr.push(Math.floor(Math.random()*range));
                if(arr.length == n) {
                    arr = common.uniq(arr);
                }
            }
            return arr;
        },
        $: function(els) {
            var arr = [];
            for (var i = 0; i < els.length; i++) {
                if(els[i].nodeType == 1){
                    arr.push(els[i])
                }
            };
            return arr;
        },
        translate: function(arr,pos) {
            return arr.slice(0,pos).reverse().concat(arr.slice(pos,arr.length).reverse()).reverse();
        }
        //scroll: (function() {

            //var interpolate = function (source, target, shift) { 
                //return (source + (target - source) * shift); 
            //};

            //var easing = function (pos) { 
                //return (-Math.cos(pos * Math.PI) / 2) + .5; 
            //};

            //return function(endY, duration, easingF) {

                //endY = endY || 0;
                //duration = duration || 200;
                //(typeof easingF === 'function') && (easing = easingF);

                //var startY = window.pageYOffset,
                    //startT  = Date.now(),
                    //finishT = startT + duration;

                //var animate = function() {
                    //var now = +(new Date()),
                        //shift = (now > finishT) ? 1 : (now - startT) / duration;

                    //window.scrollTo(0, interpolate(startY, endY, easing(shift)));

                    //(now > finishT) || setTimeout(animate, 15);
                //};

                //animate();
            //};
            
        //})()
    }

    return common;
});
