const port = process.env.PORT || 10000;
const server =require('http').Server();

var io = require('socket.io')(server);

var allusers = [];

io.on('connection', function(socket){
        console.log("connect");
        allusers.push(socket.id);
        console.log(allusers);
        
        socket.emit("yourid", socket.id);
        
            //this lets people know someone joined
        io.emit("userjoined", allusers);
    
        socket.on('mymove', function(data){
            socket.broadcast.emit('newmove', data);
        });
    
        socket.on('disconnect', function(){
            var index = allusers.includes(socket.id);
            allusers.splice(index, 1);
                //this lets people know that someone left
            io.emit("userjoined", allusers);
        });
    });

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("port is running");
})