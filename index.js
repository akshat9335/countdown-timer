const countdownInput = document.getElementById("countdownDate");
const resetbutton = document.getElementById("resetbutton");

let time; // interval reference
let startdate;

countdownInput.addEventListener("change", () => {
  startdate = new Date().getTime(); // reset start date each time user picks

  const endDate = new Date(countdownInput.value).getTime();

  clearInterval(time); // stop previous timer

  // Run every second
  time = setInterval(() => {
    const now = new Date().getTime();

    const distancecovered = now - startdate;
    const distancepending = endDate - now;
    const totaldistance = endDate - startdate;

    // Calculate time left
    const days = Math.floor(distancepending / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distancepending % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distancepending % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distancepending % (1000 * 60)) / 1000);

    // Update display
    document.getElementById("day").innerHTML = days.toString().padStart(2, "0");
    document.getElementById("hrs").innerHTML = hours.toString().padStart(2, "0");
    document.getElementById("min").innerHTML = minutes.toString().padStart(2, "0");
    document.getElementById("sec").innerHTML = seconds.toString().padStart(2, "0");

    // Progress bar
    const percentageCovered = (distancecovered / totaldistance) * 100;
    document.getElementById("progress-fill").style.width =
      percentageCovered + "%";

    // Countdown finished
    if (distancepending <= 0) {
      clearInterval(time);
      document.querySelector(".timer").style.display = "none"; 
      document.querySelector(".countdown2").textContent = "🎉 Countdown has ended!";
      document.getElementById("progress-fill").style.width = "100%";
    }
  }, 1000);
});

// Reset button
resetbutton.addEventListener("click", () => {
  clearInterval(time);
  countdownInput.value = ""; // clear input field

  document.getElementById("progress-fill").style.width = "0%";
  document.querySelector(".timer").style.display = "flex"; 
  document.querySelector(".countdown2").textContent = ""; 

  // Reset display values
  document.getElementById("day").innerHTML = "00";
  document.getElementById("hrs").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
});
