module.exports = function (socket) {

    var auth =  function(data){
        socket.emit('login:get', {
            email: data.email,
            password: data.password
        });
    }
    socket.on('login:set', auth);

};
