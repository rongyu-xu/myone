// 1.准备渲染的数据
let newsData = [
    {
        title: '美国科技巨头"花式劝退"老员工，数万人丢掉饭碗',
        content: '在数十年前称霸业界的时代，IBM在美国的员工人数曾一度增至25万。'
    },
    {
        title: '央视名嘴贺炜8连红变彩神 命中11场比赛带彩民致富',
        content: '2019年8月1日，周中足彩比赛火热进行中，在今天上午结束的两场解放者杯比赛中'
    },
    {
        title: '53岁巩俐为新戏现身女排集训 紧盯郎平认真做笔记',
        content: '当天的巩俐穿着非常普通，而且没有化妆，看起来非常低调'
    },
    {
        title: '郎朗回应没帮老婆拿行李：以后得多帮她提些',
        content: '郎朗与妻子吉娜·爱丽丝现身机场'
    },
    {
        title: '以身试菌”的疯狂科学家',
        content: '几十年来，主流学说一直认为胃溃疡主要是由于压力过大、吃太多辛辣食物和胃酸过多引起的。'
    },
    {
        title: '詹皇回应被喷:黑够了吧 皇冠被玩弄太久我该爆发了',
        content: '他看儿子比赛时的激动反应被一些专家质疑“抢戏博关注”'
    },
    {
        title: '格里芬：围绕詹姆斯建队很无趣 夺冠后就想离开',
        content: '从2014-2017，格里芬在骑士队完成了多笔出色的运作'
    },
    {
        title: ' 《哪吒》票房超《疯狂动物城》，位列中国影史动画电影票房第一',
        content: '哪吒之魔童降世》的累积票房破15.28亿，打破由《疯狂动物城》保持的分账票房15.27705亿元累计综合票房纪录，登顶新冠军。'
    },
    {
        title: ' 浓眉哥赤膊苦练！训练机器纪录被打破，湖人二当家霸气秀肌肉',
        content: '北京时间8月1日，浓眉哥继续今夏的苦练'
    },
    {
        title: ' 新疆男篮大外援人选确定 阿的江的选择让人意外！',
        content: '这两天CBA似乎掀起了夏季转会的高潮，包括辽宁男篮在内的冲冠集团都开始确定外援'
    },
    {
        title: ' 乔家大院被摘牌后：晋中市委书记要求彻查整改，尽快再创5A',
        content: '山西省晋中市乔家大院景区在被文化和旅游部取消旅游景区质量等级次日，晋中市召开专题会议研究部署整改工作等。'
    },
    {
        title: ' 大族激光低开逾9% 股价创逾两年新低',
        content: '大族激光低开逾9%，股价创逾两年新低。公司公告为董事长不当言论致歉，同时公司称欧洲研发中心项目主体建筑已经建成，预计在2020年底竣工。'
    },
    {
        title: ' 捡漏悍将！快船又升级，夺冠赔率第一超湖人，仍留位抢FMVP？',
        content: '北京时间8月2日，根据ESPN名记沃纳洛夫斯基的报道，雷霆正式买断了大前锋帕特里克·帕特森，而帕特森在过了澄清期之后计划加盟快船。'
    },
    {
        title: ' 又将有两名NBA球员加盟CBA？其中一位还是勇士总冠军成员',
        content: '北京时间8月1日，据国内媒体报道，辽宁队主帅郭士强表示正在球队考察小外援，前洛杉矶湖人队球员兰斯-史蒂芬森是候选人之一。'
    }

];

// 2.获取页面元素
let newMain = document.getElementsByClassName('new-main')[0];
let paginationMain = document.getElementsByClassName('.pagination-main')[0];
let pageA = document.getElementsByTagName('a');

let pagesize = 3;  //自定义每页显示3条数据
let newDataRender = [] //每页渲染的数据
let p = 1;  // 根据p的值显示每页对应的数据
let count = Math.ceil(newsData.length / 3) //计算出一共有多少页

// 3.渲染初始化页面
function render () {
    newMain.innerHTML = '';
    newDataRender= newsData.slice((p-1)*pagesize,p*pagesize); //从(p-pagesize)*pagesize，开始截取数组，到p*pagesize结束，
    newDataRender.forEach(function(item,index){
        newMain.innerHTML += `
        <div class="item">
            <div class="item-title">${item.title}</div>
            <div class="item-content">${item.content}</div>
        </div>
        `   
    })
}
render()

// 4.点击页面标签的时候，实现跳转
for(let i = 0;i < pageA.length;i++) {
    pageA[i].onclick = function(){
        for(let j = 0;j < pageA.length;j++) {
            pageA[j].className = '';
        }
        this.className = 'active';
        p = i+1;
        render()
    }
}   

// 5.输入值跳转到对应值
let input = document.getElementsByTagName('input')[0];
input.onkeyup = function (e) {
    let value = this.value.trim();  
    let reg = /^[0-9]+$/
    if(e.keyCode == 13 && value !== '') {
        if(reg.test(value)){
            if(value > count) {
                alert('当前共只有' + count + '页');
                return;
            }else {
                p = value;
                render();                
                input.value = '';
                for(let i = 0;i < pageA.length;i++) {
                    pageA[i].className = '';                   
                }
                if(value <= pageA.length){
                    pageA[Number(value)-1].className = 'active'
                    // console.log(value);                   
                }
            }            
        }else{
            alert('请输入正确数据');
            return;
        }
        
    }

}
  
// 6.点击上一页下一页实现切换
let prvePage = document.getElementsByClassName('page-prve')[0];
let nextPage = document.getElementsByClassName('page-next')[0];
// 封装一个函数，实现点击切换前三页高亮的效果
function targetClass() {
    for(let j=0;j<pageA.length;j++){
        pageA[j].classList.remove('active');
    }
    if(p>=4) {
        return
    }else{
        pageA[p-1].classList.add('active');
    }
    
}
prvePage.onclick = function () {
    if(p<=1){
        return;
    }else{
        p -= 1;
        targetClass()
        render();
    }
}
nextPage.onclick = function () {
    if(p>=count){
        return;
    }else{
        p += 1;
        targetClass()
        render();
    }
}





