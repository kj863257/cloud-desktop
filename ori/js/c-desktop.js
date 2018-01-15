document.ready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadytstatechange', function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
};
document.ready(function () {
    var F5,F5interval,F5timeout;
    document.oncontextmenu = function (e) {
        e = e||window.event;
        if(e.target === document.body){
            showMenu('#deskTopMenu', e);
        }
        return false;
    };
    document.onclick = function () {
        if(true){
            $('.contextmenu').hide();
            $('.icon').removeClass('checked');
        }
    };
    document.onkeydown = function (e) {
        e = e||window.event;
        if(e.keyCode == 116){
            F5 = true;
            F5timeout = setTimeout(function () {
                var refresh_50 = function () {
                    if(F5){
                        refresh(50);
                        setTimeout(refresh_50,100);
                    }
                };
                setTimeout(refresh_50,50);
            }, 450);
        }
        return false;
    };
    document.onkeyup = function (e) {
        e = e||window.event;
        if(F5 && e.keyCode == 116){
            F5 = false;
            try{
                clearTimeout(F5timeout);
            }catch(e){}
            refresh();
        }
        return false;
    };
    let onresize = function () {
        $('#desktopIcons').css('height',document.body.offsetHeight-32+'px');
    };
    onresize();
    document.body.onresize = onresize;
});
function showMenu(selector ,e) {
    beforeActive();
    var x=e.pageX,y=e.pageY;
    var mh = $(selector).height();
    var mw = $(selector).width();
    if(y > document.body.offsetHeight - mh){
        y -= mh;
    }
    if(x > document.body.offsetWidth - mw){
        x -= mw;
    }
    $(selector).css({'top':y,'left':x}).show();
}
$(function () {
    $('#deskTopMenu li:not(.ruleline,.disable,.menu)').click(function () {
        if(this.id == 'refresh'){
            refresh();
        }
        $('.contextmenu').hide();
    });
    $('#deskTopMenu').click(function (e) {
        e = e||window.event;
        e.stopPropagation();
    });
    $('#myComputer li:not(.ruleline,.disable,.menu)').click(function () {
        $('.contextmenu').hide();
    });
    $('#myComputer').click(function (e) {
        e = e||window.event;
        e.stopPropagation();
    });
    var lastClick,dblClickTimeout;
    $('.icon').click(function (e) {
        e = e||window.event;
        e.stopPropagation();
        if(lastClick == this){
            try{clearTimeout(dblClickTimeout)}catch(e){}
            lastClick = undefined;
            alert('双击了' + this.innerText);
        } else {
            lastClick = this;
            dblClickTimeout = setTimeout(function () {
                lastClick = undefined;
            },400);
            beforeActive();
            $(this).addClass('checked');
        }
    }).on('contextmenu',function (e) {
        e = e||window.event;
        e.stopPropagation();
        var $this = $(this);
        beforeActive();
        if($this.children('.icon-img').attr('id') == 'com'){
            showMenu('#myComputer', e);
        }
        $this.addClass('checked');
        return false;
    });
});
function refresh(time) {
    $('#desktopIcons').hide();
    setTimeout(function () {
        beforeActive();
        $('#desktopIcons').show();
    }, time?time:100);
}
function beforeActive() {
    $('.icon').removeClass('checked');
    $('.contextmenu').hide();
}
window.alert = function (msg, title) {
    new DeskWindow(msg, title);
    audio_temp.msg.play();
};
var audio_temp = {
};
(function audioInit() {
    audio_temp.msg = new Audio();
    audio_temp.msg.src="/audio/msg.wav"
})();
function DeskWindow(msg, title) {
    var id = new Date().getTime() + parseInt(Math.random() * 1000);
    var $dwindow = $('<div class="window" style="min-width:280px;"><div class="window-bar"><b style="margin-left:2px;">提示</b><div class="window-bar-close-group"><span class="window-bar-btn-close"></span></div></div><div class="window-content"></div><div class="window-btn-group center"><span class="window-btn active btn-ok">确定(O)</span></div></div>');
    $dwindow.attr('id', 'w_'+id);
    if(title != undefined){
        $dwindow.find('b').text(title);
    }
    $dwindow.find('.window-content').text(msg);
    var close = function () {
        $('#w_' + id).remove();
    };
    $dwindow.find('.window-bar-btn-close').click(close);
    $dwindow.find('.btn-ok').click(close);
    $dwindow.css({
        'left':'50%',
        'top':'50%',
        'margin-left':-($dwindow.width()/2)+'px',
        'margin-top':-($dwindow.height()/2)+'px'
    });
    $('body').append($dwindow);
}