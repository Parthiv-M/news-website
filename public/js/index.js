document.onreadystatechange = function () {
  var state = document.readyState;
  console.log(state);
  if (state == 'interactive') {
        document.getElementById('web-body').style.visibility = "hidden";
  } else if (state == 'complete') {
        document.getElementById('load').style.visibility = "hidden";
        document.getElementById('web-body').style.visibility = "visible";
   }
}