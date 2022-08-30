let dropDown = document.querySelectorAll(".menu-btn"); 

dropDown.forEach(function(item) {
    item.addEventListener("click", function() {
        item.classList.toggle("active") 
        let dropdownContent = item.nextElementSibling;
        if (dropdownContent.style.display === "flex") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "flex";
        }
    });
})