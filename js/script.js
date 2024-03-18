(function ($) {
    $.fn.snow = function (options) {
        var $flake = $('<div id="snowbox" />').css({ 'position': 'absolute', 'z-index': '9999', 'top': '-50px' }).html('&#10052;'),
            documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                minSize: 10,
                maxSize: 20,
                newOn: 1000,
                flakeColor: "#AFDAEF" /* 此处可以定义雪花颜色，若要白色可以改为#FFFFFF */
            },
            options = $.extend({}, defaults, options);
        var interval = setInterval(function () {
            var startPositionLeft = Math.random() * documentWidth - 100,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 200,
                endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
                durationFall = documentHeight * 10 + Math.random() * 5000;
            $flake.clone().appendTo('body').css({
                left: startPositionLeft,
                opacity: startOpacity,
                'font-size': sizeFlake,
                color: options.flakeColor
            }).animate({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.2
            }, durationFall, 'linear', function () {
                $(this).remove()
            });
        }, options.newOn);
    };
})(jQuery);

function updateCurrentTime() {
var now = new Date();
var dayOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
var formattedTime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + dayOfWeek[now.getDay()] + ' ' + now.toLocaleTimeString();
document.getElementById('current-time').textContent = formattedTime;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

$(function () {
    $.fn.snow({
        minSize: 5,
        maxSize: 50,
        newOn: 800 
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var isWechatBrowser = /micromessenger/i.test(navigator.userAgent.toLowerCase());
    var wechatLink = document.getElementById("wechat-link");
    var imagePopup = document.getElementById("image-popup");
    var popupImage = document.getElementById("popup-image");
    var closePopup = document.getElementById("close-popup");
    var hrElements = document.querySelectorAll("hr");

    if (isWechatBrowser) {
        wechatLink.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkzMzY1NDU2MQ==&scene=124#wechat_redirect";
    } else {
        wechatLink.addEventListener("click", function(event) {
            event.preventDefault();
            imagePopup.style.display = "block";
            popupImage.src = "https://cdn.jsdelivr.net/gh/qiguaifu/qiguaifu.github.io@main/image/blog.png";

            // 将所有的 <hr> 标签的 z-index 设置为较低的值
            hrElements.forEach(function(hr) {
                hr.style.zIndex = "-1";
            });
        });

        closePopup.addEventListener("click", function() {
            imagePopup.style.display = "none";

            // 将所有的 <hr> 标签的 z-index 设置为默认值
            hrElements.forEach(function(hr) {
                hr.style.zIndex = "1";
            });
        });
    }
});

