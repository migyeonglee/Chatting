const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    // res.render("index");
    res.render("test");
    // res.render("testHome");
});
// app.get("/test", (req, res) => {
//     })
// var express = require("express");
// var app = express();
// http => 기본 내장 모듈 (설치 x)
var http = require("http").Server(app);
// socket.io => 모듈 설치
var io = require("socket.io")(http);
////////////////////////////////////////////////////////
// on -> 메소드 (socket으로 들어오는 모든 동작 관리)
// socket -> 연결한(클라이언트의) 소켓의 정보 담김
//         -> 클라이언트마다 다름
// io.on("connection", function(socket) {
//     console.log("Socket Server");
//     socket.on("welcome", (msg) => {
//         console.log(msg);

//     });
//     // 다른 사용자가 아닌 나에게만(클라이언트) 보냄
//     socket.emit("Welcome From Server", {
//         name: 'kdt',
//         msg: "반가워"
//     });

// });

////////////////////위는 수업내용////////////////////
////////////////////아래는 실습내용///////////////////

///////////////////////test0////////////////////////
// io.on("connection", function(socket) {
//         console.log("Server Socket Connected");
//         socket.on("test", (id) => {
//             console.log("client : ", id);
//         })
//     })
//     // io -> 모든 클라이언트에게 보냄
// socket -> 요청한 클라이언트에게만 보냄
//////////////////////////////////////////////////////
/////////////////////////채팅 test/////////////////////
// 연결 on

io.on("connection", function(socket) {
    ////////////////////입장/////////////////////////
    socket.on("entrance", function(userIn) {
        socket.id = userIn;
        io.emit("notice", userIn);
        console.log(userIn, "입장")


    });


    ////////////////////////////////////////////////////
    //클라이언트 전체에게 socket.id를 보여줌
    // console.log(socket.id)
    ////////////////////message 전송///////////////
    socket.on("message", (msg) => {
        //msg 받아 전체 클라이언트에게 전송
        username = socket.id;
        io.emit("userMsg", msg);
        console.log(username);

    });
    ///////////////////////DM/////////////////////////////
    socket.on("one", (target) => {
        // msg 받아서 전체 클라이언트한테 전송
        console.log("target", target);
        if (target.dm == "all") io.emit("userT", target.msg);
        else io.to(target.dm).emit("userT", target.msg);
        socket.emit("userT", target.msg);

    })

    //////////////////퇴장/////////////////

    socket.on("disconnect", function() {
        out = socket.id
        io.emit("noticeout", out);
        console.log(out, "퇴장");

    });

});


///////////////////////////////////////////////////
http.listen(3000, () => {
    console.log("Server : ", 3000);
})