var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server,{ // 해당 서버를 소켓 서버로 설정
    pingTimeout: 1000,
});


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// localhost:3000서버에 접속하면 클라이언트로 메세지을 전송한다
app.get('/', function(req, res) {
    res.sendFile('Hellow Chating App Server');
});

//connection event handler
io.on('connection' , function(socket) { // connection 수립 , callback 인자로 socket 을 받음
    console.log('Connect from Client: '+socket)

    socket.on('hello', function(data){
        console.log('hello from Client: '+data)
    });

    socket.on('chat', function(data){ // cilent가 chat이라는 이벤트명을 사용하여 메세지를 전달한다.
        console.log('message from Client: '+data.message)

        var rtnMessage = {
            message: data.message
        };

        // 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', rtnMessage); // 자신을 제외한 나머지 cilent 에게 메세지 전달
    });


})

server.listen(3000, function() {
    console.log('socket io server listening on port 3000')
})