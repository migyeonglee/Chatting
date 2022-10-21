var socket = io.connect();
function entry(){
    var nickname = $("#nickname").val();
    socket.emit("setNick", nickname);
}
socket.on("entrySuccess", ()=>{
    $("#chat").removeClass("none");
    $("#chatStart").hide();
    socketEvent();
})
function sendMsg(){
    // 1. input 의 value 가져옴
    var msg = $("#msg").val();
    var name = $("#nickname").val();
    var data = {
        dm: $("#dm").val(),
        msg: msg,
        name:name

    }
    socket.emit("sendMsg", data);
}
function socketEvent(){
    socket.on("notice",(id)=>{
        $(".chat-list").append(`<div class="notice">${id}님이 입장했습니다.</div>`);
    });
    socket.on("send", (msg,name)=>{
        var myMsg = $("#msg").val();
        var myName = $("#nickname").val();
        var className = "";
        if(myMsg == msg && myName == name) className = "my-chat";
        else className = "other-chat";
        $("#msg").val("");
        console.log("이름",name);
        $(".chat-list").append(`
        <div class="${className}">
            <p>${name}</p>
            <div>${msg}</div>
        </div>`);
    });
    socket.on("clientUpdate", (client)=>{
        /* client = {
            111: "aaaa",
            222: "bbbb"
        } */
        var option = `<option value="all">전체</option>`;
        for(var key in client){
            /*
            key = "111"
            client[key] = "aaaa";
            key = "222";
            client[key] = "bbbb";
            */
            if( client[key] != $("#nickname").val() ) {
                option += `<option value="${key}">${client[key]}</option>`;
            }
        }
        $("#dm").html(option);
    })
    socket.on("noticeOut",(id)=>{
        $(".chat-list").append(`<div class="notice">${id}님이 퇴장했습니다.</div>`);
    });
}
socket.on("err", (msg)=>{
    alert(msg);
})
// emit, on