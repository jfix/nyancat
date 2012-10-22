// put this in url field: javascript:var s=document.createElement('script');s.src='http://nc/nc.js';document.body.appendChild(s);void(0);

$(document).ready(function () {
    // not sure how one can deduce the location of the script (that is included in a page) and not that of the including page.
    var url = 'http://nc';
    /*var url = location.href.substring(0, location.href.lastIndexOf('/') + 1);*/

    var shiftPressed = 0;   // counter of key presses
    var shiftMax = 5;   // when pressed that many times sequentially, start animation
    var keyCode = 16; // shift key
    var animationDuration = 9000; // number of milliseconds the animation will take

    $('body').append('<img src="' + url + '/nyancat.gif" id="image" width="100" style="position:fixed;z-index:9999;left:-100px;top:50px;"/>');
    var img = $("img#image");

    $('body').append('<audio id="sound" preload="auto"><source src="' + url + '/nyancat.ogg" type="audio/ogg"/><source src="' + url + '/nyancat.mp3" type="audio/mp3" /></audio>');
    var sound = $("#sound").get(0);

    var nyancat_reset = function () {
        //no sound control if not in HTML5
        if (sound.volume != undefined) {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = 1;
        } else {
            $("#sound-ie").remove();
        }

        img.css("left", "-100px");
    };

    function nyancat_start() {
        //no sound control if not in HTML5
        if (sound.volume != undefined) {
            sound.play();
        }
        else {
            $('body').append('<embed id="sound-ie" src="' + url + '/nyancat.mp3" type="application/x-mplayer2" autostart="true" playcount="true" loop="false" height="0" width="0">');
        }
        img.show().animate({ "left": "+=" + parseInt($("body").width() + 100) + "px" }, animationDuration, nyancat_reset);
    };

    $("body").keyup(function (event) {
        if (event.which == keyCode) {
            shiftPressed++;
            event.preventDefault();
        } else {
            shiftPressed = 0;
        }
        if (shiftPressed == shiftMax) {
            nyancat_start();
            shiftPressed = 0;
        }
    });

    $("#sound").on('timeupdate', function () {
        var vol = 1,
        interval = 200;
        if (Math.floor(sound.currentTime) == 6) {
            //console.log("now starting to decrease volume ...");
            if (sound.volume == 1) {
                var intervalID = setInterval(function () {
                    if (vol > 0) {
                        vol -= 0.10;
                        if (vol >= 0.10)
                            sound.volume = vol.toFixed(1);
                    } else {
                        clearInterval(intervalID);
                    }
                },
                interval);
            }
        }
    });
});
