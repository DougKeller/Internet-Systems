(function() {
  var setTime = function() {
    var date = moment().format('dddd MMMM Do - h:mm:ss a').toLowerCase();
    document.getElementById('date').innerHTML = date;
  };

  setInterval(setTime, 100);
})();
