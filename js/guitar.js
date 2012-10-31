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
            alphabet: ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"],
            selectedChord: 0,
            voice: [undefined,24,19,15,10,5,0],
            init: function() {
                this.el.addEventListener("click", this.again, false);
                //document.getElementById("btn").addEventListener("touchstart", this, false);
                this.chords = this.el.getElementsByTagName("ul");
                this.alphabetEl = this.el.getElementsByClassName("alphabet")[0];
                this.fretBoard = [];
                this.fretBoard[1] = this.fretBoard[6] = common.translate(this.alphabet,4); //E
                this.fretBoard[2] = common.translate(this.alphabet,11); //B
                this.fretBoard[3] = common.translate(this.alphabet,7); //G
                this.fretBoard[4] = common.translate(this.alphabet,2); //D
                this.fretBoard[5] = common.translate(this.alphabet,9); //A

                this.alphabetEl.addEventListener("click", this, false);

                this.sound = [];
                for (var i = 0; i < 37; i++) {
                    this.sound.push(document.createElement("audio"));
                    this.sound[i].src = "audio/" + i + ".mp3";
                    this.sound[i].load();
                };

                this.start();
            },
            handleEvent: function(e) {
                
                //console.log(common.$(e.target.parentNode.childNodes));
                switch(e.type) {
                    case "click":
                        var that = this;
                        var target = e.target;
                        var _parent =  target.parentNode;
                        var i = common.$(_parent.childNodes).indexOf(target);

                        (this.x == 12) && (this.x = 0);
                        console.log(this.fretBoard[this.y][this.x]);
                        if (this.fretBoard[this.y][this.x] == this.alphabet[i]) {
                            target.className = "green";
                            setTimeout(function(){
                                that.reset();
                                that.addMark();
                            },1000);
                        }else{
                            target.className = "red";
                        }


                        break;
                    case "touchstart":
                        this.trigger();
                        break;
                }
            },
            again: function(e) {
                (e.target.tagName == "LI") && guitar.sound[guitar.voice[guitar.y] + guitar.x].play();
            },
            reset: function() {
                for (var i = 0; i < this.alphabetEl.childNodes.length; i++) {
                    this.alphabetEl.childNodes[i].className = "";
                };
                this.curMark.className = "";
            },
            button: function() {
                alert(this.dude);
            },
            addMark: function() {
                this.x = common.random(13,1)[0];
                this.selectedChord ? (this.y = this.selectedChord) : (this.y = common.random(6,1)[0] + 1);

                console.log(this.x,this.y);
                this.curMark = common.$(this.chords[this.y-1].childNodes)[this.x];
                this.curMark.className = "mark";

                this.sound[this.voice[this.y] + this.x].play();
            },
            start: function() {
                this.addMark();
            }
        };
        
    window.guitar = guitar;
    return guitar;

});

