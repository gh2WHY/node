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

hardSel()

//初始化难度选择页面

function hardSel() {
    for(let i = 0 , length = oHardSeleOpt.length ; i < length ; i++) {
        oHardSeleOpt[i].addEventListener('touchstart',function (ev) {
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

//清理模块
function clear() {
    oHardSel.style.display = "none";
    oScore.style.display = "block";
}


//开始游戏模块
function  startGame(level,pos) {
    clear();                   //关闭难度选择页面,显示计算分数页面
    MapBg(level);              //启动背景运动模块
    oScore.score = 0;          //初始化游戏分数为0;
    let p = plane(level,pos);
    enemy(p,level);
}

//创建己方模块 plane
function plane(level,pos) {
    let oplaneImg = new Image();
    oplaneImg.src = "img/plane_0.png";  //设置飞机图片地址
    oplaneImg.width = 70;
    oplaneImg.height = 70;
    oplaneImg.className = 'plane';
    let x = pos.x - oplaneImg.width/2;  //设置飞机初始X的位置
    let y = pos.y - oplaneImg.height/2; //设置飞机初始y的位置
    setTrans(oplaneImg,x,y);            //飞机初始位置设置
    let xMin = 0,
        xMax = oMap.clientWidth - oplaneImg.width,
        yMin = 0,
        yMax = oMap.clientHeight - oplaneImg.height;
    //绑定事件
    oMap.addEventListener('touchmove',function (ev = window.event) {
        let left = ev.changedTouches[0].clientX - oplaneImg.width/2;
        let top = ev.changedTouches[0].clientY - oplaneImg.height/2;
        left = Math.min(xMax,left);  //不能超出最大限制
        left = Math.max(xMin,left);  //不能小于最小值
        top = Math.min(yMax,top);    //不能超出最大限制
        top = Math.max(yMin,top);    //不能小于最小值
        setTrans(oplaneImg,left,top);
    })
    oMap.appendChild(oplaneImg);
    fire(oplaneImg,level)
    return oplaneImg;
}


//创建我军发射的子弹
function fire(obj,level) {
    oBox.biuInterval = setInterval(function () {
        if(oScore.score >= 50) {
            createBiu(true,-1);   //创建子弹
            createBiu(true,1);
        }else {
            createBiu();     //创建普通子弹
        }
    },[100,200,300,15][level]);
    function createBiu(toggle,dis) {
        let oBiu = new Image();
        oBiu.src = 'img/fire.png';
        oBiu.width = 30;
        oBiu.height = 30;
        oBiu.className = 'biu';
        let left = setTrans(obj).translateX + obj.width/2 - oBiu.width/2;  //设置子弹的水平位置
        let top = setTrans(obj).translateY - 60; //子弹的垂直位置
        if(toggle) {
            left += oBiu.width * dis;
        }
        setTrans(oBiu,left,top);
        oBiuAll.appendChild(oBiu);

        function move() {
            if(oBiu.parentNode) {
                let top = setTrans(oBiu).translateY - 20; //20是子弹的速度
                if(top <  -oBiu.height) {
                    oBiuAll.removeChild(oBiu);
                }else {
                    setTrans(oBiu,undefined,top);
                    requestAnimationFrame(move);
                }
            }
        }
        setTimeout(function () {
            requestAnimationFrame(move);
        },50);
    }
}


//创建敌军
function enemy(oPlane,level) {
    let w = oMap.clientWidth;    //游戏地图空间总宽度
    let h = oMap.clientHeight    //游戏地图空间总高度
    let speed = [5,6,7,8][level]; //敌军下落速度
    let count = 1;                //计数器,每30个生成一个打飞机
    oBox.enemyIntetval = setInterval(function () {
        count++;
        let oEnemy = new Image();
        let index = count%30?1:0;
        oEnemy.index = index;
        oEnemy.HP = [20,1][oEnemy.index];    //根据索引,确定敌军大小
        oEnemy.speed = speed*(Math.random()*0.6+0.7);
        oEnemy.src = `img/enemy_${['big','small'][oEnemy.index]}.png`;   //设置图片地址
        oEnemy.className = 'enemy';
        oEnemy.width = [104,54][oEnemy.index];   //设置敌军飞机的尺寸
        oEnemy.height = [80,40][oEnemy.index];
        setTrans(oEnemy,Math.random()*(w-oEnemy.width),-oEnemy.height);
        oMap.appendChild(oEnemy);

        function move() {
            if(oEnemy.parentNode) { //当敌军已经加入战场
                let top = setTrans(oEnemy).translateY + oEnemy.speed;
                if(top >= h) {
                    oScore.score --;
                    oScore.innerText = oScore.score;
                    oMap.removeChild(oEnemy);
                }else {
                    setTrans(oEnemy,undefined,top);
                    //子弹碰撞检测,
                    for(let i = 0,len = allBiu.length; i < len ; i++) {
                        let objBiu = allBiu[i];
                        // console.log(objBiu)
                        let bool = coll(oEnemy,objBiu);
                        console.log(bool)
                        if(bool){
                            oBiuAll.removeChild(objBiu);
                            oEnemy.HP--;
                            if(!oEnemy.HP) {
                                oMap.removeChild(oEnemy);
                                oScore.score += oEnemy.index ? 2:20;
                                boom(
                                    setTrans(oEnemy).translateX,setTrans(oEnemy).translateY,
                                    oEnemy.width,oEnemy.height,index
                                );
                            }
                        }
                    }
                    //我军碰撞检测
                    if (oPlane.parentNode && coll(oEnemy,oPlane)) {
                        boom(setTrans(oEnemy).translateX, setTrans(oEnemy).translateY, oEnemy.width, oEnemy.height, oEnemy.index)
                        boom(setTrans(oPlane).translateX, setTrans(oPlane).translateY, oPlane.width, oPlane.height, 0)
                        oMap.removeChild(oEnemy);//移除敌军
                        oMap.removeChild(oPlane);//移除我军
                        oEnemy = null;
                        GameOver();//结束游戏
                    }
                    requestAnimationFrame(move);
                }
            }
        }
        requestAnimationFrame(move);
    },[300,250,200,100][level])
}

//碰撞检测函数
function coll(obj1,obj2) {
    let T1 = setTrans(obj1).translateY ,   //敌军飞机的顶部位置
        B1 = T1 + obj1.height,            //敌军飞机的底部位置
        L1 = setTrans(obj1).translateX,   //敌军飞机的左部位置
        R1 = L1 + obj1.width;              //敌军飞机的右部位置
    let T2 = setTrans(obj2).translateY,    //我军飞机的顶部位置
        B2 = T2 + obj2.height,                        //我军飞机的底部位置
        L2 = setTrans(obj2).translateX,     //我军飞机的左部位置
        R2 = L2 + obj2.width;                         //我军飞机的右部位置
    return (!(T2 > B1 || L2 > R1 || T1 > B2 || L1 > R2));
}


/*
*  l     敌军飞机的水平偏移量
*  t     敌军飞机的垂直偏移量
*  w     敌军飞机的宽度
*  h     敌军飞机的高度
*  i     敌军的类型
*/

function boom(l,t,w,h,i) {
    let oBoom = new Image();
    oBoom.src = `img/boom_${['big','small'][i]}.png`;       //根据飞机的不同设置不同的爆炸样式
    oBoom.className = `boom${['','2'][i]}`;                 //添加动画样式
    oBoom.width = 64;
    oBoom.height = 64;
    let left = 1 + w/2 - oBoom.width/2;
    let top = 1 + h/2 - oBoom.height/2;
    setTrans(oBoom,left,top);
    oMap.appendChild(oBoom);
    setTimeout(function () {
        oMap.remove(oBoom);
    },1200);
}


// function GameOver() {
//     clearInterval(oBox.biuInterval);//清除子弹生产的定时器
//     clearInterval(oBox.enemyInterval);//清除敌军生的定时器
//     restart();//重新开始游戏
// }

/**********
 重新开始模块：restart；
 ***********/
function restart(){
    oScore.style.display = "none";
    let s = oScore.score;//得到最终的分数
    let finalHonor = honor[Math.floor(s/300)>4?4:Math.floor(s/300)];
    oEnd.style.display = "block";//开启结束界面
    oFinalScore.innerText = s;//设置最终分数
    oAchievement.innerText = finalHonor;
}

function GameOver() {

}
//处理transfrom问题
function setTrans(obj,x,y) {
    if(!obj.transform) {
        obj.transform = {};
    }
    if(arguments.length == 1) {
        return obj.transform;
    }else {
        let str = '';
        if(x) {
            obj.transform.translateX = x;
        }if(y) {
            obj.transform.translateY = y;
        }
        for(let key in obj.transform) {
            str += `${key}(${obj.transform[key]}px)`
        }
        obj.style.transform = str;
    }
}

