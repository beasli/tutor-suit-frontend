function initCounter() {
    let count = document.querySelectorAll(".counter")
        let arr = Array.from(count)

        arr.map(function(item){
        let startnumber = 0

        function counterup(){
        startnumber++
        item.innerHTML= startnumber
        
        if(startnumber == item.dataset.number){
            clearInterval(stop)
        }
        }

        let stop = setInterval(function(){
        counterup()
        },0)

        })
}

function checkIfHTMLLoaded() {
    // Check if the HTML code is loaded in the DOM
    const customCode = document.querySelector('#counterArea');

    if (customCode) {
      // The HTML code is detected in the DOM
      initCounter();
    } else {
      // The HTML code is not yet loaded, wait and check again
      setTimeout(checkIfHTMLLoaded, 100); // Adjust the timeout as needed
    }
  }


  // Call the function to start checking if the HTML code is loaded
  checkIfHTMLLoaded();