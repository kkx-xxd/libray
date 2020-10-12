$(function () {
    // 点击去注册时切换到注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    // 点击去登录时切换到登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwdc = $('.reg-box [name=password]').val()
            if (pwdc !== value) {
                return '两次密码不一致'
            }
        }

    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1.阻止默认行为
        e.preventDefault()
        var data = {
            username: $('#form_reg  [name=username]').val(),
            password: $('#form_reg  [name=password]').val()
        }
        //2.发起ajax的post请求
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                //模拟人的行为
                $('#link_login').click()
            })
    })
    // $('#form_login').submit(function (e) {
    //     // 阻止默认提交行为
    //     e.preventDefault()
    //     $.ajax({
    //         url: '/api/login',
    //         method: 'POST',
    //         // 快速获取表单中的数据
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('登录失败！')
    //             }
    //             layer.msg('登录成功！')
    //             // 将登录成功得到的 token 字符串，保存到 localStorage 中
    //             localStorage.setItem('token', res.token)
    //             // 跳转到后台主页
    //             location.href = '/index.html'
    //         }
    //     })
    // })
    $('#form_login').on('submit', function (e) {
        //1.阻止默认行为
        e.preventDefault()
        var data = {
            username: $('#form_reg  [name=username]').val(),
            password: $('#form_reg  [name=password]').val()
        }
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            //渲染到页面
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        })

    })

})
