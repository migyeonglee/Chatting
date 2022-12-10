const express = require("express");
const { Socket } = require("socket.io");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("static"));
app.get("/", (req, res) => {
    res.render("chat");
});

// http => 기본 내장 모듈 (설치 x)
var http = require("http").Server(app);
// socket.io => 모듈 설치
var io = require("socket.io")(http);
////////////////////////////////////////////////////////
// on -> 메소드 (socket으로 들어오는 모든 동작 관리)
// socket -> 연결한(클라이언트의) 소켓의 정보 담김
//         -> 클라이언트마다 다름

/////////////////////////채팅 test/////////////////////
var client_list = {};
// { 소켓아이디 : 닉네임, 소켓아이디 : 닉네임, .... }
// client_list = {
//     fklsdjflskdjflksjfa: "김소연",
//     dkfjslfjlsdkfjsdl: "홍길동",
//     dskfjsdlkfjlsdfjsdl: "djfsdkljfs",
// }
io.on("connection", function(socket){
    // io.emit("notice", socket.id);
    //본인이 보내고 싶은 클라이언트의 id를 to 안에 쓰면 해당하는 사람한테만 emit 할 수 있음
    //io.to(소켓 아이디).emit()
    socket.on("sendMsg", (data)=>{
        // msg 받아서 전체 클라이언트한테 전송
        console.log(data);
        
        if( data.dm == "all" ) {
            io.emit("send", data.msg,data.name);
        } else {
            io.to(data.dm).emit("send", data.msg, data.name);
            socket.emit("send", data.msg, data.name);
        }
        
    })
    socket.on("setNick", (nick)=>{
        console.log("aaaa", Object.values(client_list));
        // 배열에서 내가원하는 값의 존재여부를 확인할 수 있는 함수 : arr.indexOf()
        // [123,2,3,54,5,2].indexOf(1) = -1
        if( Object.values(client_list).indexOf(nick) > -1 ){
            socket.emit("err", "중복되는 닉네임입니다.");
        } else {
            client_list[socket.id] = nick;
            console.log(client_list);
            io.emit("notice", nick);
            socket.emit("entrySuccess", "입장 성공");
            io.emit("clientUpdate", client_list);
            console.log("nick",nick)
        }
    })
    socket.on("disconnect", ()=>{
        io.emit("noticeOut", client_list[socket.id]); 
        delete client_list[socket.id];
        io.emit("clientUpdate", client_list); 
        

    })
});
//////////////////
http.listen(3000, () => {
    console.log("Server : ", 3000);
});