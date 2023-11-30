const ramenDiv = document.getElementById("ramen-menu")
const ramenDetails = document.getElementById("ramen-detail")
const detailImage = document.getElementsByClassName("detail-image")[0]
const detailName = document.getElementsByClassName("name")[0]
const detailRestaurant = document.getElementsByClassName("restaurant")[0]
const ratingDisplay = document.getElementById("rating-display")
const commentDisplay = document.getElementById("comment-display")
const newRamenForm = document.getElementById("new-ramen")

function renderRamen(ramen){
    const ramenImage = document.createElement("img")
    ramenImage.src = ramen.image
    ramenDiv.appendChild(ramenImage)
    ramenImage.addEventListener("click", () => {
        displayRamen(ramen)
    })
}

function displayRamen(ramen){
     detailImage.src = ramen.image
     detailName.textContent = ramen.name
     detailRestaurant.textContent = ramen.restaurant
     ratingDisplay.textContent = ramen.rating
     commentDisplay.textContent = ramen.comment
}

newRamenForm.addEventListener("submit", (event) => { 
    event.preventDefault()

    let newRamen = { 
        "name": document.getElementById("new-name").value,
        "restaurant": document.getElementById("new-restaurant").value,
        "image": document.getElementById("new-image").value,
        "rating": document.getElementById("new-rating").value,
        "comment": document.getElementById("new-comment").value
    }

    renderRamen(newRamen)

})
fetch("http://localhost:3000/ramens")
.then(res => res.json())
.then(ramenData => {
    ramenData.forEach(ramen => {
        renderRamen(ramen)
    })
    displayRamen(ramenData[0])
})
