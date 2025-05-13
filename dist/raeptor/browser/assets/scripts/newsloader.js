$.getJSON("https://api.jsonbin.io/b/6036417cf1be644b0a643be5", function(json) {
  console.log(json["document"][0].title); // this will show the info it in firebug console
});