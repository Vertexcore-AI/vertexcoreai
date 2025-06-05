(function () {
  emailjs.init("o2uwMyK_X4ztFw95L"); // ✅ Your public key
})();

// Set timestamp before sending
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Set timestamp value
    document.getElementById("timestamp").value = new Date().toLocaleString();

    emailjs
      .sendForm("service_j1zsr3a", "template_gd0zth7", this)
      .then(function () {
        alert("✅ Message sent successfully!");
      })
      .catch(function (error) {
        alert("❌ Failed to send message:\n" + JSON.stringify(error));
      });
  });