// write your code here
const ramenMenu = document.getElementById("ramen-menu")

const ramenDetailImageElement = document.getElementsByClassName("detail-image")[0]
const ramenNameElement = document.getElementsByClassName("name")[0]
const ramenRestaurantElement = document.getElementsByClassName("restaurant")[0]
const ratingElement = document.getElementById("rating-display")
const commentElement = document.getElementById("comment-display")
const newRamenForm = document.getElementById("new-ramen")

function renderRamen(ramen){
    const ramenContainer = document.createElement("div")
    const menuImage = document.createElement("img")
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "DELETE"
    menuImage.src = ramen.image
    ramenContainer.append(menuImage, deleteButton)
    ramenMenu.appendChild(ramenContainer)

    menuImage.addEventListener("click", () => { 
        displayRamen(ramen)
    })

    deleteButton.addEventListener("click", () => {
        deleteRamen(ramen)
        ramenContainer.innerHTML = ""
    })
}

function displayRamen(ramen){
    ramenDetailImageElement.src = ramen.image
    ramenNameElement.textContent = ramen.name
    ramenRestaurantElement.textContent = ramen.restaurant
    ratingElement.textContent = ramen.rating
    commentElement.textContent = ramen.comment
}

function postNewRamen(newRamenData){
    fetch("http://localhost:3000/ramens", { 
        "method": "POST",
        "headers": {"Content-Type":"application/json"},
        "body": JSON.stringify(newRamenData)
    })
}

function deleteRamen(ramen){
    fetch(`http://localhost:3000/ramens/${ramen.id}`, { 
        "method": "DELETE"
    })
}

newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault()
   
    let newRamen = {
        "name": document.getElementById("new-name").value,
        "restaurant": document.getElementById("new-restaurant").value,
        "image": document.getElementById("new-image").value,
        "rating": Number(document.getElementById("new-rating").value),
        "comment": document.getElementById("new-comment").value,
      }
      renderRamen(newRamen)
      postNewRamen(newRamen)
      newRamenForm.reset()
})


fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then((ramenData) => {
    ramenData.forEach(ramen => {
        renderRamen(ramen)})
        displayRamen(ramenData[0])
    }
);