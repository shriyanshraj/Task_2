const apiUrl = "https://coding-week-2024-api.onrender.com/api/data"
document.addEventListener("DOMContentLoaded", function () {
  updateDocument();
});
function updateDocument() {

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const bigBlog = document.getElementById("bigBlog");
      bigBlog.innerHTML = data.slice(0, 4).map((post, index) => {
        return `<div class="boxcontent">
                 <a href="#">
                     <div class="image-container" id="imageContainer${index}">
                         <img src="${post.image}" alt="${post.headline}" class="imagee">
                         <div class="popup" id="popup${index}">
                             <p class="content">${post.content}</p>
                         </div>
                     </div>
                 </a>
                 <a href="#" class="featured">Featured</a>
                 <a href="#" class="featured2">${post.type}</a>
                 <a href="#">
                     <h3 class="heading3">${post.headline}</h3>
                 </a>
                 <p>📆${post.date}</p>
             </div>`;
      }).join('');


      data.slice(0, 4).forEach((post, index) => {
        const imageContainer = document.getElementById(`imageContainer${index}`);
        const popup = document.getElementById(`popup${index}`);

        imageContainer.addEventListener("mouseenter", () => {
          popup.style.display = "block";
        });

        imageContainer.addEventListener("mouseleave", () => {
          popup.style.display = "none";
        });
      });
    })
    .catch((error) => console.log(error));


  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      const bigBlog = document.getElementById("smallBlog");
      if (data.length > 9) {
        bigBlog.classList.add('scrollable');
      } else {
        bigBlog.classList.remove('scrollable');
      }

      function createPopupContent(post) {
        return `<div class="popup-content">
                <p>${post.content}</p>
              </div>`;
      }

      bigBlog.innerHTML = data?.slice(4).map((post) => {
        return `<div class="newscontainer">
                <a href="#">
                  <img src="${post.image}" style="max-width: 80px; max-height: 80px;" alt="${post.headline}" class="shortnewsimg">
                </a>
                <div>
                  <a href="#" class="newheading-container">
                    <h3 class="newheading">${post.headline}</h3>
                    <p class="content2">${post.content}</p>
                  </a>
                  <p class="smalltext">📆${post.date}</p>
                 
                </div>
              </div>`
      }).join('');

      const newHeadingContainers = document.querySelectorAll('.newheading-container');
      newHeadingContainers.forEach(container => {
        const popupContent = container.querySelector('.content2');
        container.addEventListener('mouseenter', () => {
          popupContent.style.display = 'block';
        });
        container.addEventListener('mouseleave', () => {
          popupContent.style.display = 'none';
        });
      });
    })
    .catch((error) => console.log(error));


}
setInterval(function () {
  updateDocument();
}, 60000
)