//the top boxes
function tipClose() {
    $(".close-tip").click(function() {

        $(".tip-box").css({ "transform": "scale(0)" });
        $(".tip-container").fadeTo(100, 0.01, function() {
            $(this).slideUp(150, function() {
                $(this).remove();
            });
        });
    })
}

function confirmClose() {
    $(".close-confirm").click(function() {

        $(".confirm-box").css({ "transform": "scale(0)" });
        $(".confirm-container").fadeTo(100, 0.01, function() {
            $(this).slideUp(150, function() {
                $(this).remove();
            });
        });
    })
}

function closeLogin() {
    $(".close-log").click(function() {
        $(".loginBox").css({ "transform": "scale(0)" });
        $(".login-container").fadeTo(100, 0.01, function() {
            $(this).slideUp(150, function() {
                $(this).remove();
            });
        });
    })
}

function tip(content) {
    mainBox = `
    <div class="tip-container">
        <div class="tip-box">
            <div class="tip-title">提示</div>
            <div class="tip-content">`
    mainBox = mainBox + content;
    mainBox = mainBox +
        `</div>
            <div class="tip-menus">
                <div class="close-tip mdui-ripple">确定</div>
            </div>
        </div>
    </div>`;
    $("body").append(mainBox);
    $(".tip-box").css({ "transform": "scale(0)" });
    $(".tip-container").fadeIn(0.01, 100, function() {
        $(this).slideDown(150, function() {
            $(".tip-box").css({ "transform": "scale(1)" });
        });
    });

    tipClose();
}

function pop(content) {
    mainBox = '<div class="popbox">' + content + '</div>';
    $(".popbox").remove();
    $("body").append(mainBox);
    $(".popbox").css({ "transform": "translate(-50%, 0) scale(0)", "top": "-20px" });
    $(".popbox").fadeIn(0.01, 100, function() {
        $(this).slideDown(150, function() {
            $(".popbox").css({ "transform": "translate(-50%, 0) scale(1)", "top": "0px" });
        });
    });

    setTimeout(function() {
        $(".popbox").fadeTo(100, 0.01, function() {
            $(".popbox").css({ "transform": "translate(-50%, 0) scale(0)", "top": "-20px" });
            $(this).slideUp(150, function() {
                $(this).remove();
            });
        });
    }, 1200)

}

function confirm(title, content) {
    mainBox = `
    <div class="confirm-container">
        <div class="confirm-box">
            <div class="confirm-title">`

    mainBox = mainBox + title;
    mainBox = mainBox + `</div>
            <div class="confirm-content">`
    mainBox = mainBox + content;
    mainBox = mainBox +
        `</div>
            <div class="confirm-menus">
                <div class="close-confirm confirm-confirm mdui-ripple">确定</div>
                <div class="close-confirm mdui-ripple">取消</div>
                
            </div>
        </div>
    </div>`;
    $("body").append(mainBox);
    $(".confirm-box").css({ "transform": "scale(0)" });
    $(".confirm-container").fadeIn(0.01, 100, function() {
        $(this).slideDown(150, function() {
            $(".confirm-box").css({ "transform": "scale(1)" });
        });
    });


    confirmClose();
}

function register() {
    pop("正在处理，请稍候")
    auth
        .signUpWithEmailAndPassword($("#email").val(), $("#password").val())
        .then(() => {
            tip("发送成功，请注意查收，如果未收到，请检查垃圾箱或者重新发送。")
        })
        .catch((result) => {
            var obj = JSON.parse(result.message)
            tip(obj.msg)

        })
}

function login() {
    pop("正在处理，请稍候")
    auth
        .signInWithEmailAndPassword($("#email").val(), $("#password").val())
        .then((loginState) => {
            pop("登陆成功");
            window.location = "/";
        })
        .catch((result) => {
            var obj = JSON.parse(result.message)
            tip(obj.msg)

        })
}

function loginBox() {
    let html;
    html = `
    <div class="login-container">
        <div class="loginBox">
            <div class="close-log">关闭</div>
            <div class="title">登陆</div>
            <div class="mdui-textfield">
                <label class="mdui-textfield-label" for="email">邮箱</label>
                <input class="mdui-textfield-input" type="email" name="email" id="email" placeholder="请输入邮箱">
            </div>
            <div class="mdui-textfield">
                <label class="mdui-textfield-label" for="password">密码</label>
                <input class="mdui-textfield-input" type="password" name="password" id="password" placeholder="请输入密码">
            </div>
            <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink-accent" onclick="login();">登陆</button>
            <button class="mdui-btn mdui-btn-raised mdui-ripple" onclick="register();">注册</button>
        </div>
    </div>
    `
    $("body").append(html);
    $(".loginBox").css({ "transform": "scale(0)" });
    $(".login-container").fadeIn(0.01, 100, function() {
        $(this).slideDown(150, function() {
            $(".loginBox").css({ "transform": "scale(1)" });
        });
    });
    closeLogin();

}
//getUrlData
(function($) {
    $.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);
//link to the database
const app = cloudbase.init({
    env: 'web-7g0m4nd1ed13ff81'
});
const auth = app.auth({
    persistence: "local"
})
var db = app.database();
const user = auth.currentUser;
const _ = db.command;





//loginStateControl
const isLogin = auth.hasLoginState();
if (isLogin) {
    if (!user.nickName) {
        user.nickName = "未设置昵称";
    }
}

function logout() {
    auth.signOut();
    tip("退出成功");
    $(".close-tip").click(function() {
        location.reload();
    })

}
