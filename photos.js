document.addEventListener('DOMContentLoaded', function() {
    loadPictures();
});
let column, picture;
let a = 1
function loadPictures() {
    for (let i = 84 + 1; i > 1; i--) {
        column = document.getElementById(`c${a}`)
        picture = document.createElement("img")
        column.appendChild(picture).setAttribute("src", `photos/${i - 1}.jpg`)
        if (a == 4) {
            a = 1
        } else {
            a++
        }
    }
}