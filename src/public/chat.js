$(function () {
  const socket = io.connect();

  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $chat = $("#chat");

  const $emailForm = $("#emailForm");
  const $email = $("#email");

  $emailForm.submit((e) => {
    e.preventDefault();
    socket.emit("nuevo usuario", $email.val());
    $("#emailWrap").hide();
    document.querySelector("#contentWrap").style.display = "flex";
    $("#message").focus();
    $email.val("");
  });

  $messageForm.submit((e) => {
    e.preventDefault();
    socket.emit("enviar mensaje", $messageBox.val());
    $messageBox.val("");
  });

  socket.on("nuevo mensaje", function (data) {
    render(data);
  });

  socket.on("mensajes viejos", (mensajes) => {
    for (let i = 0; i < mensajes.length; i++) {
      render(mensajes[i]);
    }
  });
  function render(data) {
    $chat.append(
      `<b style="color: #6441a5"> ${data.email}:</b> ${data.mensaje} <br/>`
    );
  }
});
