module.exports = {
    secretKey : "d5b6a8da6f6ccda2fb1a44d7a38fa5d502c808f00523dbcf3eea8f56f3585c2e516c8b36cde55bd8079a1518e79e5bd6accff425cef75fdf53747584dc2f84c2",
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