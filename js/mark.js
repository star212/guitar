/*=============================================================================
#     FileName: cat.js
#         Desc: for 双11活动
#       Author: Smeagol
#        Email: wb-quxing@taobao.com
#     HomePage: http://www.quxing.info
#      Version: 0.0.1
#   LastChange: 2012-09-17 14:43:02
#      History:
=============================================================================*/

;define(function(require,exports,module){

    var $ = require('zepto');

    var cat = function(param) {
        param = param || {};
        this.x = param.x || 0;
        this.y = param.y || 0;
        this.direction = param.direction || 0;
        this.animate = param.animate || 300;
        this.container = param.container || $("body");
        this.remain = param.remain || 100;
        this.timer = null;
        this.callback = param.callback || function(){ };
        this.catched = false;
        this.onUnCatched = param.onUnCatched || function(){ };


        var that = this;
        var t = $('<button class="cat"></button>');
        

        t.css({
            "-webkit-transform": "rotate("+this.direction+")",
            "bottom": this.y
        })
        .bind("touchstart click",function(e){
                $(this).unbind("touchstart click");
                that.catched = true;
                clearInterval(that.timer);
                that.callback();
                e.preventDefault();
                e.stopPropagation();
        })

        //插入dom
        this.container.append(t);

        //动画
        t.animate({
            translate: this.x + "," + this.y,
            rotate: this.direction
        }, this.animate, 'cubic-bezier(0, 0, 0.1, 1.0)', function(){
            var $this = $(this);
            //console.log(this);
            if(!that.catched){

                that.timer = setTimeout(function(){

                    $this.unbind("touchstart click");
                    $this.bind("touchstart click", function(e){
                        that.onUnCatched();
                        e.preventDefault();
                        e.stopPropagation();
                    })
                    $this.animate({
                       translate: '0,0',
                       rotate: that.direction
                    }, this.animate, 'cubic-bezier(0, 0, 0.1, 1.0)', function(){
                       //zepto貌似会无限增加listener，remove无效
                       $this.unbind("touchstart click");
                       $this.remove();
                    });

                },that.remain)

            }

        })
                

    }

    cat.prototype.show = function(){
            
    };

    cat.prototype.hide = function(){
            
    };

    return cat;

});

