(function () {
  emailjs.init("oSnHLddSE2O0wn5CX"); // ✅ Your public key
})();

// Set timestamp before sending
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Set timestamp value
    document.getElementById("timestamp").value = new Date().toLocaleString();

    emailjs
      .sendForm("service_2pxf4u7", "template_aijrvla", this)
      .then(function () {
        alert("✅ Message sent successfully!");
      })
      .catch(function (error) {
        alert("❌ Failed to send message:\n" + JSON.stringify(error));
      });
  });
