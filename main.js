var jobs;
window.addEventListener("message", event=>{
    if (event.data.action == "display"){
        var count = 0;
        var jobsdata = event.data.jobs;
        var array = Object.values(event.data.data);
        jobs = {police : jobsdata.police , ems : jobsdata.ems , taxi : jobsdata.taxi};
        var html = 
        `<tr class="details">
            <th>ID</th>
            <th>STEAM</th>
            <th>DISCORD</th>
            <th>PING</th>
        </tr>`
        $('.main-table').html(html);
        for(let i = 0; i < array.length; i++){
            if(array[i] != null) {
                var html = 
                `<tr>
                    <th>${array[i].id}</th>
                    <th>${array[i].steam}</th>
                    <th class="claude"><img
                    src= ${array[i].avatar}
                    width="22" height="22">${array[i].discord}</th>
                    <th style="color:rgb(0, 209, 0)">${array[i].ping}ms</th>
                </tr>`
                $('.main-table').append(html);
                count++;
            }
        }
        $('.scoreboard-bottom span').html(`Queue Length: ${event.data.queue} | Players: ${count}/48 | Average FPS: ${event.data.fps > 0 ? event.data.fps : "Checking"}`);
        $(".scoreboard-wrapper").fadeIn();
        setTimeout(function(){ ToggleScoreBoard(true,jobs); }, 200);
    } 
    if (event.data.action == "close") {
        ToggleScoreBoard(false,jobs);
        setTimeout(function(){ $(".scoreboard-wrapper").fadeOut(); }, 200);
    }
})

 ToggleScoreBoard = (open,data)=>{
    if (open){

        $(".policeload").removeClass('hight low medium');
        $(".emsload").removeClass('hight low medium');
        $(".taxiload").removeClass('hight low medium');
        
        $(".policeload").addClass(`${data.police}`);
        $(".policeload").animate({
            width:`${GetWidth(data.police)}`
        },500)
        $(".policeload span").text(`${data.police.toUpperCase()}`);

        $(".emsload").addClass(`${data.ems}`);
        $(".emsload").animate({
            width:`${GetWidth(data.ems)}`
        },500)
        $(".emsload span").text(`${data.ems.toUpperCase()}`);

        $(".taxiload").addClass(`${data.taxi}`);
        $(".taxiload").animate({
            width:`${GetWidth(data.taxi)}`
        },500)
        $(".taxiload span").text(`${data.taxi.toUpperCase()}`);

    } else {
        $(".policeload").animate({
            width:"0%"
        },300,()=>{
            $(".policeload").removeClass('hight low medium');
        })

        $(".emsload").animate({
            width:"0%"
        },300,()=>{
            $(".emsload").removeClass('hight low medium');
        })
       
        $(".taxiload").animate({
            width:"0%"
        },300,()=>{
            $(".taxiload").removeClass('hight low medium');
        })
    }
}

function GetWidth(level){
    if (level == "high") 
        return "100%";
    else if (level == "medium")
        return "50%";
    else if (level == "low")
        return "30%";
}

 $(document).ready(()=> {
    document.onkeyup = function (data) {
        if (data.which == 33) {
            ToggleScoreBoard(false,jobs);
            setTimeout(function(){ $(".scoreboard-wrapper").fadeOut();  }, 200);
            $.post("http://esx_scoreboard/close",JSON.stringify({}))
        } 
        else if (data.which == 27) {
            ToggleScoreBoard(false,jobs);
            setTimeout(function(){ $(".scoreboard-wrapper").fadeOut();  }, 200);
            $.post("http://esx_scoreboard/close",JSON.stringify({}))
        }
        else if (data.which == 9) {
            $.post("http://esx_scoreboard/NuiFocus",JSON.stringify({}))
        }
    };
});
