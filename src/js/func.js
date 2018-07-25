module.exports = {
    OK : 200,
    translateTime : function (now){
        var currentTime = new Date(parseInt(now));
        var year = new String(currentTime.getFullYear());
        var intMonth = parseInt(currentTime.getMonth()+1);
        var date = new String(currentTime.getDate());
        var hour = new String(currentTime.getHours());
        var minute = new String(currentTime.getMinutes());
        var seconds = new String(currentTime.getSeconds());
        var month;

        if (intMonth < 10){
            month = "0" + new String(intMonth);
        }
        else{
            month = new String(intMonth);
        }

        var time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + seconds
        
        return time;
    }
};