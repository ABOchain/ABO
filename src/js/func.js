module.exports = {
    translateTime : function (now){
        var currentTime = new Date(parseInt(now));
        var year = new String(currentTime.getFullYear());
        var intMonth = parseInt(currentTime.getMonth()+1);
        var date = new String(currentTime.getDate());
        var hour = new String(currentTime.getHours());
        var intMinute = parseInt(currentTime.getMinutes());
        var seconds = new String(currentTime.getSeconds());
        var month, minute;

        if (intMonth < 10){
            month = "0" + new String(intMonth);
        }
        else{
            month = new String(intMonth);
        }

        if (intMinute < 10){
            minute = "0" + new String(intMinute);
        }
        else{
            minute = new String(intMinute);
        }

        var time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + seconds
        
        return time;
    }
};