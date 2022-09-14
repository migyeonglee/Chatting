const express = require("express");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var express = require("express");
var app = express();
// http => 기본 내장 모듈 (설치 x)
var http = require("http").Server(app);
// socket.io => 모듈 설치
var io = require("socket.io")(http);

// on -> 메소드 (socket으로 들어오는 모든 동작 관리)
io.on("connection", function(socket) {
    console.log("Server Socket Connected");
});

app.listen(3000, () => {
    console.log("Server Port : ", 3000);
});