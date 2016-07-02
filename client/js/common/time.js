/**
 * Created by Keum_nim on 2016. 7. 3..
 */

function curTime() {
    $("#clock").text("00:00:00");
    setInterval(function () {
        var d = new Date();

        var nowTime=
            leadingZeros(d.getFullYear(), 4) + '-' +
            leadingZeros(d.getMonth() + 1, 2) + '-' +
            leadingZeros(d.getDate(), 2) + ' ' +

            leadingZeros(d.getHours(), 2) + ':' +
            leadingZeros(d.getMinutes(), 2) + ':' +
            leadingZeros(d.getSeconds(), 2);

        $("#clock").html(nowTime);
    }, 1000);
}

function leadingZeros(n, digits) {
    var zeroD = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zeroD += '0';
    }
    return zeroD + n;
}

$(function(){
    curTime();
});