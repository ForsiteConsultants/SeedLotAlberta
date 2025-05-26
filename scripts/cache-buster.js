/**
 * Cache-buster for SeedLot Alberta application
 * This script helps prevent browser caching issues when delivering updates to the client
 */
 

// Generate a unique version number based on current timestamp
var version = new Date().getTime();

// Function to add version parameter to a URL
function addVersionToURL(url) {
  return url + (url.indexOf("?") >= 0 ? "&" : "?") + "v=" + version;
}

// Function to dynamically load a JavaScript file with version parameter
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = addVersionToURL(url);

  // When script is loaded, call the callback if provided
  if (callback) {
    script.onload = callback;
  }

  document.head.appendChild(script);
}

// Function to dynamically load a CSS file with version parameter
function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = addVersionToURL(url);
  document.head.appendChild(link);
}

// Load main application CSS
loadCSS("css/styles.css");

// Load application scripts in the correct order
document.addEventListener("DOMContentLoaded", function () {
  // Load the main scripts
  loadScript("scripts/requireMain.js");
});
