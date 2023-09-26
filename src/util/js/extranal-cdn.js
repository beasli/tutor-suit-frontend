// Create a script element for the external script
const script = document.createElement('script');
script.src = 'https://accounts.google.com/gsi/client';
script.async = true;
script.defer = true;
// script.onload = googleLoaded; // Assign the function to the onload event

// Append the script element to the document
document.body.appendChild(script);



