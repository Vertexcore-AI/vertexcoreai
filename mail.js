  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    fetch("https://script.google.com/macros/s/AKfycbwTKbGHFw25Zck-twNGkAlCc-UG_HErnixm5W4iyGjfZWG3g0v3nvROh2Zh0aR2DWnQ/exec", {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(text => {
      document.getElementById("response-msg").innerText = "Message sent successfully!";
      form.reset();
    })
    .catch(err => {
      console.error("Error:", err);
      document.getElementById("response-msg").innerText = "There was a problem. Please try again.";
    });
  });