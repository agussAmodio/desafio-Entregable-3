const client = require("twilio")(process.env.TWILIO_ID, process.env.TWILIO_SK);

const botonFinalizar = document.getElementById("botonFinalizar");
botonFinalizar.addEventListener("click", whatsapp);

function whatsapp() {
  client.messages.create({
    from: "whatsapp:+14155238886 ",
    body: "hola mundo!",
    to: "whatsapp:+541168473149",
  });
  console.log("HOLA");
}
