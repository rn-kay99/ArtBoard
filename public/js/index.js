
let like_buttons = document.getElementsByClassName("painting-like-button");

for (let button of like_buttons) {
    button.addEventListener("click", toggleLikeButton);
}

function toggleLikeButton(event){
    let button = event.target;
    button.classList.toggle("icon-red");
}