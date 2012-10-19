/*=============================================================================
#     FileName: guitar.js
#         Desc: 模拟吉他
#       Author: Smeagol
#        Email: star212417@163.com
#     HomePage: http://www.quxing.info
#      Version: 0.0.1
#   LastChange: 2012-10-19 15:20:52
#      History:
=============================================================================*/

seajs.config({
	alias: {
		//'mu': 'mustache/0.4.0/mu',
		//'less': 'less/1.3.0/less-debug',
		'zepto': 'zepto/1.0.0/zepto',
		//'linkfocus': '../../../../base/modules/linkfocus/linkfocus',
		//'tip': '../../../../base/utils/tip/tip',
		//'uriBroker': './../../../../../base/utils/server/uriBroker',
		//'cdn': './../../../../../base/utils/server/cdn'
	},
    //base: 'http://a.tbcdn.cn/mw/base/libs',
	//preload: ['plugin-less'],
	//preload: ['plugin-combo','plugin-less'],
	debug: false
});

define(function(require) {
        var common = require("./common"),
            mark = require("./mark");

        var guitar  =  {

            el: document.getElementById("guitar"),

            fretBoard: (function(){
                var _fretBoard = [];
                var alphabet = ["E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb"];

                _fretBoard[1] = _fretBoard[6] = alphabet; 
                _fretBoard[2] = common.translate(alphabet,7); 
                _fretBoard[3] = common.translate(alphabet,3); 
                _fretBoard[4] = common.translate(alphabet,5); 
                _fretBoard[5] = common.translate(alphabet,10); 

                return _fretBoard;
            })(),

            init: function() {
                this.el.addEventListener("click", this, false);
                //document.getElementById("btn").addEventListener("touchstart", this, false);
            },
            handleEvent: function(e) {
                
                console.log(common.$(e.target.parentNode.childNodes));
                switch(e.type) {
                    case "click":
                        (e.tagName = "LI") && this.trigger(e);
                        break;
                    case "touchstart":
                        this.trigger();
                        break;
                }
            },
            trigger: function(e) {
                var target = e.target;
                var _parent =  target.parentNode;
                var fret = common.$(_parent.childNodes).indexOf(target);
                var chordPos = common.$(_parent.parentNode.childNodes).indexOf(_parent) + 1;
                alert(chordPos + ":" + fret);
            },
            button: function() {
                alert(this.dude);
            }
        };
        
    window.guitar = guitar;
    return guitar;

});

