// Create a script element for the external script
const script = document.createElement('script');
script.src = 'https://accounts.google.com/gsi/client';
script.async = true;
script.defer = true;
// script.onload = googleLoaded; // Assign the function to the onload event

// Append the script element to the document
document.body.appendChild(script);



// Create a script element for the external script
const fbScript = document.createElement('script');
fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
fbScript.async = true;
fbScript.defer = true;
fbScript.crossorigin="anonymous";

// Append the script element to the document
document.body.appendChild(fbScript);

window.fbAsyncInit = function() {
    FB.init({
    appId      : FB_APP_ID,
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v17.0'           // Use this Graph API version for this call.
    });
};