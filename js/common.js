//the top boxes
function tipClose() {
    $(".close-tip").click(function() {
        $(".tip-container").fadeTo(100, 0.01, function() {
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

    tipClose();
}

function pop(content) {
    mainBox = '<div class="popbox">' + content + '</div>';
    $(".popbox").remove();
    $("body").append(mainBox);

    $(".popbox").fadeTo(100, 0.01, function() {
        $(this).slideUp(150, function() {
            $(this).css("display", "block");
            $(this).css("opacity", "1");
        });
    });
    setTimeout(function() {
        $(".popbox").fadeTo(100, 0.01, function() {
            $(this).slideUp(150, function() {
                $(this).remove();
            });
        });
    }, 1200)

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