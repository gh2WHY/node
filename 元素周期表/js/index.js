window.onload = function () {
    //初始化所有li的值
    (function () {
        let len = 5 * 5 * 5;
        let oUl = document.getElementById('list').children[0];
        let alis = oUl.children;


        //做所有初始化的工作
        (function () {
            //通过for循环动态的创建li标签
            for (let x = 0, i = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    for (let z = 0; z < 5; z++, i++) {
                        //创建li
                        let oLi = document.createElement('li');

                        //通过自定义属性给li绑定下标
                        oLi.index = i;

                        //根据索引记录下标的位置
                        oLi.x = x;
                        oLi.y = y;
                        oLi.z = z;

                        //获取数据
                        let data = flyData[i % 3];

                        oLi.innerHTML = `
                        <b class="cover"></b>
                        <p class="title">${data.type}</p>
                        <p class="author">${data.author}</p>
                        <p class="time">${data.time}</p>
                        `

                        //确定随机的li的位置
                        let tx = Math.random() * 6000 - 3000;
                        let ty = Math.random() * 6000 - 3000;
                        let tz = Math.random() * 6000 - 3000;

                        oLi.style.transform = `translate3d(${tx}px,${ty}px,${tz}px)`

                        //将li元素渲染到页面
                        oUl.appendChild(oLi);
                    }
                }
            }
            //Grid()
            setTimeout(Grid, 0)
        })();

        // 拖拽,缩放
        (function () {
            // 信号量保存初始值
            let roX = 0,
                roY = 0,
                trZ = -2000;

            // 通过事件禁止文字被选中
            document.onselectstart = function () {
                    return false
                }


                ! function (fn) {
                    if (document.onmousewheel === undefined) {
                        // 火狐浏览
                        document.addEventListener("DOMMouseScroll", function (e) {
                            let d = -e.detail / 3
                            fn(d)
                        }, false)
                    } else {
                        // 主流浏览器
                        document.onmousewheel = function (e) {
                            let d = e.wheelDelta / 120;
                            fn(d)
                        }
                    }
                }(function (d) {
                    trZ += d * 100;
                    oUl.style.transform = ` translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`
                })
        })();


        //Alert弹窗
        (function (ev) {
            //获取所有要操作的元素
            let oAlert = document.getElementById('alert'),
                oTitle = document.getElementById('title').getElementsByTagName('span')[0],
                oAImg = oAlert.getElementsByClassName('img')[0].getElementsByTagName('img')[0],
                oAAuthor = oAlert.getElementsByClassName('author')[0].getElementsByTagName('span')[0],
                oAInfo = oAlert.getElementsByClassName('info')[0].getElementsByTagName('span')[0];

            // 获取点击弹窗需要变化元素
            let oAll = document.getElementById('all'),
                oFrame = document.getElementById("frame"),
                oBack = document.getElementById('back');


            oUl.onclick = function (ev) {
                ev = ev || window.event;

                // 获取事件源对象
                var target = ev.target;

                if (target.nodeName === "B") {
                    if (target.x) {
                        target.x = fasle;
                    } else {
                        if (oAlert.style.display === "block") {
                            hide();
                            // console.log(1)
                        } else {
                            // 改变弹窗的内容
                            var index = target.parentNode.index;
                            var data = flyData[index % 3]
                            oAlert.index = index;
                            // oAlert.data = data;
                            oAlert.src = data.src;
                            // console.log(oAlert.src);

                            // 填充数据
                            oTitle.innerHTML = `课题: ${data.title}`;
                            oAImg.src = `./src/${data.src}/index.png`;
                            oAAuthor.innerHTML = `主讲: ${data.author}`;
                            oAInfo.innerHTML = `描述: ${data.desc}`;

                            // 显示
                            show()
                        }
                    }
                }
                //阻止冒泡
                ev.cancelBubble = true;
            }


            //定义显示函数
            function show() {

                oAlert.style.display = "block";

                //设置初始值
                oAlert.style.transform = `rotateY(0deg) scale(2)`;
                oAlert.style.opacity = 0;

                //定义动画完成时间
                let time = 300;
                //获取动画开始执行的时间
                let sTime = new Date();

                //定义函数m
                function m() {
                    //定义prop
                    let prop = (new Date() - sTime) / time;

                    //当prop等于1的时候动画执行结束
                    if (prop >= 1) {
                        prop = 1;
                        return;
                    } else {
                        requestAnimationFrame(m);
                    }
                    oAlert.style.transform = `rotateY(0deg) scale(${2 - prop})`
                    oAlert.style.opacity = prop
                }
                requestAnimationFrame(m);
            }

            //定义隐藏函数
            function hide() {
                if (oAlert.style.display === 'block' && !oAlert.timer) {
                    oAlert.timer = true;
                    // 确定弹出的初始值
                    oAlert.style.display = 'block';
                    oAlert.style.transform = `rotateY(0deg) scale(1)`;
                    oAlert.style.opacity = 1;

                    // 动画
                    var time = 300; // 动画完成的时间
                    var sTime = new Date() // 获取动画开始的时间
                    function m() {
                        var prop = (new Date() - sTime) / time; // 时间比例 0-1

                        // 判断终止 
                        if (prop >= 1) {
                            // 超出拉回
                            prop = 1;
                            oAlert.style.display = 'none';
                            oAlert.timer = false
                        } else {
                            requestAnimationFrame(m)
                        }
                        oAlert.style.transform = `rotateY(${180 * prop}deg) scale(${1 - prop})`
                        oAlert.style.opacity = 1 - prop
                    }
                    requestAnimationFrame(m)
                }
            }

            //设置点击页面的任何位置,弹窗隐藏
            document.onclick = function () {
                if (oAlert.style.display === "block") {
                    hide();
                }
            }

            //点击弹窗,切换页面
            oAlert.onclick = function (ev) {
                ev = ev || window.event
                ev.cancelBubble = true;
                oAll.className = 'left'

                var data = flyData[this.index % 3]
                oFrame.src = `./src/${data.src}/index.html`
            }

            // oBack.onclick
            oBack.onclick = function () {
                oAll.className = ''
            }
        })();


        //页面左下角四个按钮设置
        (function () {
            let lis = document.querySelector('#btn').querySelector('ul').getElementsByTagName('li')
            // console.log(btns);
            lis[0].onclick = table;
            lis[3].onclick = Grid;
        })()

        //table
        function table() {
            // 计算坐标
            let n = Math.ceil(len / 18) + 2; // 计算一共排列多好行
            let midY = n / 2 - 0.5; // 计算ul所在的行
            let midX = 18 / 2 - 0.5; // 计算ul所在的列

            let  disY = 210,
                disX = 170;

            let arr = [{
                    x: 0,
                    y: 0
                },
                {
                    x: 17,
                    y: 0
                },
                {
                    x: 0,
                    y: 1
                },
                {
                    x: 1,
                    y: 1
                },
                {
                    x: 12,
                    y: 1
                },
                {
                    x: 13,
                    y: 1
                },
                {
                    x: 14,
                    y: 1
                },
                {
                    x: 15,
                    y: 1
                },
                {
                    x: 16,
                    y: 1
                },
                {
                    x: 17,
                    y: 1
                },
                {
                    x: 0,
                    y: 2
                },
                {
                    x: 1,
                    y: 2
                },
                {
                    x: 12,
                    y: 2
                },
                {
                    x: 13,
                    y: 2
                },
                {
                    x: 14,
                    y: 2
                },
                {
                    x: 15,
                    y: 2
                },
                {
                    x: 16,
                    y: 2
                },
                {
                    x: 17,
                    y: 2
                }
            ];

            for(let i = 0 ; i < len ; i++ ) {
                if(i < 18) {
                    x = arr[i].x;
                    y = arr[i].y;
                }else {
                    x = i % 18;
                    y = Math.floor(i / 18) + 2;
                    console.log(x);
                    
                }
                alis[i].style.transform = `translate3d(${(x - midX) * disX}px, ${(y - midY) * disY}px , 0px)`;
            }

            
        }

        // 5*5*5排列
        function Grid() {
            //确定每个li之间水平垂直以及Z轴之间的间隔
            let disX = 350,
                disY = 350,
                disZ = 800;
            //循环每一个li,确定li的位置
            for (let i = 0; i <= len; i++) {
                let oli = alis[i];
                // console.log(oli.x);

                // 通过li的位置计算li的偏移量
                let x = (oli.x - 2) * disX;
                let y = (oli.y - 2) * disY;
                let z = (oli.z - 2) * disZ;
                oli.style.transform = `translate3d(${x}px, ${y}px , ${z}px)`;
            }
        }
    })()
}