function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function sendMessage(btn) {
  btn.innerText = "Message Sent!";
  btn.style.background = "green";

  setTimeout(() => {
    btn.innerText = "Send";
    btn.style.background = "#1D9E75";
  }, 2000);
}