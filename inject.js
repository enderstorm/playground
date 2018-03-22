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
(function (currentVisitorId) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://enderstorm.github.io/playground/dist/main.bundle.js';
  window.currentVisitorId = currentVisitorId;
  console.log('Current Visitor Id: ' + currentVisitorId);
  window.apiUrl = 'https://yeself-int-api.app.brux.space/yeself-agent/agent/analytics/track/user/api/batch/';
  document.getElementsByTagName('head')[0].appendChild(script);
})('test-2')
