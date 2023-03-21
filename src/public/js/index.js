const socket = io();
let user;
let chatBox = document.getElementById('chatbox');

Swal.fire({
    title: "Indentificate",
    input: "text",
    text: "Ingresa el nombre de usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar';
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
});

chatBox.addEventListener('keyup', event => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
});

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user}: ${message.message}<br>`;
    });

    log.innerHTML = messages;
});