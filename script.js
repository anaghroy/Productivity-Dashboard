let allElems = document.querySelectorAll(".elem");
let allfullElems = document.querySelectorAll(".fullElem");

allElems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    allfullElems[elem.id].style.display = "block";
  });
});
