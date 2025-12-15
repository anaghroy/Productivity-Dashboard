let allElems = document.querySelectorAll(".elem");
let allfullElems = document.querySelectorAll(".fullElem");
let allfullElemsbackBtn = document.querySelectorAll(".fullElem .back");

allElems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    allfullElems[elem.id].style.display = "block";
  });
});

allfullElemsbackBtn.forEach(function (back) {
  back.addEventListener("click", function () {
    allfullElems[back.id].style.display = "none";
  });
});
