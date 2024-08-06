
  document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    fetch('https://script.google.com/macros/s/AKfycbwjOZYU0RwC4QDrqeknXtzr668Fdf3JPiO0xzkcG0S3xI4rzi5WJtWlzgaNZyROhFgg/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then(response => {
      var popup = document.getElementById("popup");
      var span = document.getElementsByClassName("close")[0];
      popup.style.display = "block";
      document.getElementById("popup-text").textContent = "Form submitted successfully!";
      span.onclick = function () {
        popup.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == popup) {
          popup.style.display = "none";
        }
      }
    })
    .catch(error => {
      var popup = document.getElementById("popup");
      var span = document.getElementsByClassName("close")[0];
      popup.style.display = "block";
      document.getElementById("popup-text").textContent = "Error Occurred";
      span.onclick = function () {
        popup.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == popup) {
          popup.style.display = "none";
        }
      }
    })
})






















