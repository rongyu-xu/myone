$(function(){
    // 1.大概看了一下源代码，实现过程是先把实现消息置底，也就是 resetui() 这个方法
    // 点击发送信息
    $('.input_sub').on('click',function(){
        var content = $('#ipt').val().trim();
        if(content.length <= 0) {
            alert('请输入内容，发送内容不能为空');
            return;
        }
        var str = []
        str.push(`
            <li class="right_word">
                <img src="img/person02.png" /> <span>${content}</span>
            </li>
        `)       
        $('#talkList').append(str.join(''));
        $('#ipt').val('')
        resetui()  
        getMsg (content)
    })
    function getMsg (detail){
        $.ajax({
            method:'get',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken:detail
            },
            success:function(res){               
                if(res.message != 'success') return alert('获取消息失败');
                // console.log(res);
                var data = res.data.info.text;
                var rel = [];
                rel.push(`
                    <li class="left_word">
                        <img src="img/person01.png" /> <span>${data}</span>
                    </li>
                `)
                $('#talkList').append(rel.join(''));
                resetui()  
                getVoice (data)
            }
        })
    }

    function getVoice (vio) {
        $.ajax({
            method:'get',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{text:vio},
            success:function(res){
                // console.log($('#voice')[0]);               
                if(res.status != 200) return alert('获取语音回复失败');
                $('#voice')[0].src = res.voiceUrl
                // $('#voice').attr('src',res.voiceUrl)
            }
        })
    }
    $('#ipt').on('keyup',function(e){
        if(e.keyCode === 13) {
            $('.input_sub').click()
        }
    })
})


// 总结：这么一点代码写了却有一个多小时，实在是不应该，不过还好，基本上都是自己独立完成的。
// 如果下次写东西没有思路，可以尝试写一下能想到的功能，尤其是最开始需要做什么，比如上面的代码，
// 最开始就是发送信息然后渲染到页面，一步一步实现，慢慢就有思路了
// 回顾一下遇到的几个问题：
//         + join()方法只知道使用，但是不懂其真正的作用
//         + 原生js和jq操作dom元素的不熟练，尤其是设置属性和获取属性混淆了
//         + keyup事件的使用不熟练