
var $oul=$('.ulBox');
var $listBox=$('.listBox');


/*
* 实现轮播图
* */
function bannerFn() {
    var mySwiper=new Swiper('.bannerBox',{
        autoplay:{
            //用户操作后 任然自动播放
            disableOnInteraction:false,
            //一个图 在当前窗口的停留时间
            delay:1000,
            // autoPlay:false
        },
        loop:true,//是否无缝滚动
        pagination: {//分页器
            el: '.pageBox',//分页器的盒子
            // type: 'bullets',
            type: 'fraction',// 分页器的类型
            //type : 'progressbar',
            //type : 'custom',
            currentClass:'currentPage',//变动数字的
            totalClass:'totalPage'//盒子的类别
        }
    })
}
bannerFn();


// $.ajax({
//     type:'post',//请求方式
//     url:'./data/banner.json',//请求路径
//     data:{t:123,q:234},//发送给后台的数据
//     success:function (d) {
//         //请求成功后执行的函数
//         console.log(d);
//         giveHtml(d);//把数据放在页面上
//     },
//     error:function () {
//         //请求失败后执行的函数
//     }
// });
//把数据转成页面可见的元素
function giveHtml(data) {
    data=data||[];
    var str='';//用来存拼接好的字符串
    data.forEach((item)=>{
        str+=`<li class="swiper-slide"><a href="##">
                    <img src="${item.img}" alt=""><div>${item.title}</div></a></li>`
    })
    $oul.html(str);
    bannerFn();
}
//promise 写法
var p=new Promise(function (resolve,reject) {
    $.ajax({
        type:'get',
        url:'./data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
// p.then(function (data) {
//     //第一个参数 是promose执行的成功函数
//     console.log(data);
//     giveHtml(data);
//     return data;
// },function () {
//     //第二个参数 失败函数
// }).then(function (data) {
//     console.log(data);
//     bannerFn();
// },function (data) {
//
// });
p.then(function (data) {
    //第一个参数 是promise执行的成功函数
    // console.log(data);
    giveHtml(data);
    return data;
}).then(function (data) {
    bannerFn();
}).catch(function (res) {
    console.log(res)
});

/*
* 新闻部分
* */
var listPro=new Promise(function (resolve,reject) {
    $.ajax({
        type:'post',
        url:'./data/list.json',
        data:{t:1},
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
//把数据放到列表中
function  giveListHtml(data) {
    data=data||[];
    var str='';
    data.forEach((item)=>{
        switch (item.type){
            case 0:
                str+=`<a href="##">
        <div class="text-box">
        <p>${item.title}</p>
    <div class="comment_box">
        <em class="">
            <span class="">${item.num}</span>
            <span class="icon_com"></span>
        </em>
    </div>
    </div></a>`;
                break;
            case 1:
                str+=`<a href="##">
            <div class="img_box">
                <img src="${item.img}" alt="">
            </div>
            <div class="text_box">
            <p>${item.title}</p>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
            </div>
        </a>`
                break;
            case 3:
                str+=` <a href="##" class="three_box">
            <p>${item.title}</p>
            <div class="three_pic">
                <img src="${item.img[0]}" alt="">
                <img src="${item.img[1]}" alt="">
                <img src="${item.img[2]}" alt="">
            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">12</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
        }
    });
    $listBox.html(str);
}

listPro.then(function (data) {
    giveListHtml(data);
})
