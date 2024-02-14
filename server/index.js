const app=require('express')()
const server= require('http').createServer(app)
const io= require('socket.io')(server, {cors:{origin: 'http://localhost:5173'}})

const PORT=3000
server.listen(PORT, ()=>console.log("server running..."))



io.on('connection',socket=>{
    console.log("usuário conectado"+ socket.id);

    socket.on('disconnect', reason=>{
        console.log("usuario desconectado"+ socket.id)
    })

    
    socket.on('set_user', username=>{
        socket.data.username=username
        console.log("usuario:"+ username)
    })

    

    socket.on('message', (message, room) => {
        io.to(room).emit('receive_message',{
            room,
            message,
            authorId: socket.id,
            author: socket.data.username
        })
        
    });

    socket.on('listRoom', room => {
      socket.data.room=room
      console.log(room)
      room.forEach(room => {
        console.log(room.nameRoom);
     });
        
    });

    socket.on('joinRoom', room => {
      
        // Adiciona o cliente à sala
        socket.join(room);
        console.log(`Cliente entrou na sala: ${room}`);

        // Notifica os clientes na sala sobre a entrada do novo cliente
        io.to(room).emit('message', 'Um novo cliente entrou na sala');
        
    });

    

})




