function $(selector) {
  return document.querySelector(selector);
}
document.addEventListener("DOMContentLoaded", function(event) { 
  const webview = $('webview');
  $('#addressBar').onsubmit = (e) => {
    e.preventDefault();
  };
});

function loadUrl 
