//做requestAnimationFrame 的兼容
window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
    return setTimeout(fn, 1000 / 60);
}
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;


//获取所需元素
let honor = ["好菜哦!!我都不想说了" , "坠机侠", "飞机小能手", "飞机大师", "鹰击长空"],
    oBox = document.querySelector(".game-area"),
    oScore = document.querySelector(".score"),
    oHardSel = document.querySelector(".hardSele"),
    oMap = document.querySelector(".game-map"),
    oBiuAll = document.querySelector(".biuall"),
    allBiu = oBiuAll.children,
    oEnd = document.querySelector(".game-end"),
    oRestart = document.querySelector(".restart"),
    oHardSeleOpt = oHardSel.querySelectorAll("button"),
    oFinalScore = document.querySelector(".finail-score span"),
    oAchievement = document.querySelector(".achievement span");


//初始化难度选择页面

function hardSel() {
    for(let i = 0 , length = oHardSeleOpt.length ; i < length ; i++) {
        oHardSeleOpt[i].addEventListener('touchstart',function (ev) {
            console.log(111)
            ev = ev || window.ev;
            startGame(i, {
                //获取初始手指的位置
                x: ev.changedTouches[0].clientX,
                y: ev.changedTouches[0].clientY
            });//i就是游戏难度  i：0~3
        })
    }
}

//背景运动模块
function MapBg(level) {
    oMap.style.backgroundImage = "url('img/bg_"+(level+1)+".jpg')";
    (function move() {
        oMap.bgPosY = oMap.bgPosY || 0;
        oMap.bgPosY ++;
        oMap.style.backgroundPositionY = oMap.bgPosY + 'px';
        oMap.bgTimer = requestAnimationFrame(move);
    }())
}

//开始游戏模块
function  startGame() {

}

