/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.emit('send:name', {
    name: 'Bob'
  });
    var auth =  function(data){
        console.log(data)
        socket.emit('login:get', {
            name: data
        });
    }
  socket.on('login:set', auth);

};
