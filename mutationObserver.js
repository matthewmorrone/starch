MutationObserver = window.MutationObserver || window.WebKitMutationObserver, log = console.log.bind(console)
$(function() {
  var observer = new MutationObserver(function(mutations, observer) {
    if (window.location.protocol.includes("http")) {
      $.post("api.php", {mode: "write", handle:"index.html", content: $("html")[0].outerHTML, debug: true}, function(d) {log(mutations, Date.now())})
    }
  })
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  })
})


// function remove(sel) {
//   var elements = document.querySelectorAll(sel);
//   for (var i = 0; i < elements.length; i++) {
//     while(elements.length > 0){
//       elements[0].parentNode.removeChild(elements[0]);
//     }
//   }
// }

// if (window.location.protocol.includes("file")) {
//   remove("script:not(:first-child)")
//   remove("link")
//   remove("img")
// }