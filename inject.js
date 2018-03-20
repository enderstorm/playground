// var script = document.createElement("script");
// script.type="text/javascript";
// script.innerHTML="alert('Hi!');";
// document.getElementsByTagName('head')[0].appendChild(script);
(function (a) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://localhost/jsinject/main.bundle.js';
  window.currentVisitorId = 'test1';
  window.apiUrl = 'http://localhost:9205/api';
  document.getElementsByTagName('head')[0].appendChild(script);
})("a")
// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'url';    

// document.getElementsByTagName('head')[0].appendChild(script);