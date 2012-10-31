/*=============================================================================
#     FileName: dialog.js
#         Desc: for 双11活动
#       Author: Smeagol
#        Email: wb-quxing@taobao.com
#     HomePage: http://www.quxing.info
#      Version: 0.0.1
#   LastChange: 2012-09-18 16:58:54
#      History:
=============================================================================*/

;define(function(require,exports,module){

    var common = require("./common");

    var dialog = function(param) {
        param = param || {};
        this.container = param.container || document.body; //容器
        this.onClose = param.onClose || function(){ };
        this.hasClose = param.hasClose || false; //是否有关闭按钮
        this.width = param.width || 225;
        this.height = param.height || 205;
        this.content = param.content || "";

        var _d = document,
        that = this;
        this.el = _d.createElement("div");
        this.el.className = "dialog";

        this.el.innerHTML = '<div class="dialog-content"></div><div class="dialog-bg"></div>';

        _d.body.appendChild(this.el);
        this.render();
    }

    dialog.prototype.show = function(){
        this.el.style.display = "block";
    };

    dialog.prototype.hide = function(){
        this.el.style.display = "none";
    };

    dialog.prototype.render = function(){

        var that = this;

        //隐藏在渲染
        this.el.style.display = "none";
        this.el.style.width =  (typeof this.width === 'number') ? this.width + "px" : this.width;
        this.el.style.height = (typeof this.height === 'number') ? this.height + "px" : this.height;
        this.el.firstChild.innerHTML = this.content;
        //渲染关闭按钮
        //console.log(this.close);

        if(!this.close){
            this.close = document.createElement("span");
            this.close.addEventListener("touchstart",function(){
                that.hide();
                that.onClose();
            },false);
            this.el.appendChild(this.close);
        }
        
        this.hasClose ? (this.close.className = "close") : (this.close.className = "");

        //显示获得宽高
        this.el.style.display = "block";
        this.el.style.marginLeft = "-" + this.el.clientWidth/2 + "px";

        this.el.style.marginTop = "-" + (common.isIOS ? (this.el.clientHeight/2 - 30) : this.el.clientHeight/2) + "px";
        //this.el.style.display = "none";
        //console.dir(this.el);

    };

    return dialog;

});

