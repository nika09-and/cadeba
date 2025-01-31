const time = document.getElementById('time');
const click = document.getElementById('click');

click.addEventListener('click', () => {
  let timee = parseInt(time.textContent); // Get the initial time

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      timee--; 
      time.textContent = timee; // Update the time display
      console.log(timee);
    }, i * 1000); // Delay increases for each iteration
  }
});
