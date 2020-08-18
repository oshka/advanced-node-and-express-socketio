$( document ).ready(function() {
  
  /*global io*/
var socket = io();  
  socket.on('user', function(data){
  $('#num-users').text(data.currentUsers+' users online');
  var message = data.name;
  if(data.connected) {
    message += ' has joined the chat.';
  } else {
    message += ' has left the chat.';
  }
  $('#messages').append($('<li>').html('<b>'+ message +'<\/b>'));
});

  
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){    
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    //send message to server here?  
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  
  socket.on('chat message', function(data){
       console.log('data form server');
       console.log(data);
       $('#messages').append($('<li>').html('<b>'+ data.name +'<\/b>: '+data.message));
     });
  
});
