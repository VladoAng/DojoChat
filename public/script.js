var socket = io.connect();
function addMessage(msg, pseudo) {
		var p = '<div class="message"><p><span style="font-weight:bold; ';
		if(pseudo == "Me") {
		  p += 'color: blue;">';
		}
		else {
		  p += 'color: red;">';
		}
		p += pseudo + '</span> : ' + msg + '</p></div>';
		$("#chatEntries").append(p);
		$('#chatEntries').scrollTop($('#chatEntries').prop("scrollHeight"));
}
function sentMessage() {
        if ($('#messageInput').val() != "") 
        {
                socket.emit('message', $('#messageInput').val());
                addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
                $('#messageInput').val('');
        }
}
function setPseudo() {
        if ($("#pseudoInput").val() != "")
        {
                socket.emit('setPseudo', $("#pseudoInput").val());
                $('#chatControls').show();
                $('#pseudoInput').hide();
                $('#pseudoSet').hide();
				$('#messageInput').focus();
        }
}
socket.on('message', function(data) {
        addMessage(data['message'], data['pseudo']);
});
$(document).keypress(function(e) {
  if(e.which == 13) {
	if($(document.activeElement)[0] == $("#messageInput")[0])
	  sentMessage();
	if($(document.activeElement)[0] == $("#pseudoInput")[0])
	  setPseudo();
  }
});
