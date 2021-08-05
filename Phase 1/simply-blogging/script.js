var example_blog = {
    image : "https://media.gettyimages.com/photos/cropped-image-of-woman-holding-tiny-yellow-flower-picture-id629724419?k=6&m=629724419&s=612x612&w=0&h=NvRa65n_tdvTN-GNkGZWMaDPAgCmC45UnX8X--KNS0M="
    ,title : "EXAMPLE"
    ,article : " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do consequat ac felis donec et odio. \
                 Eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                 Tempor Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique."
}

var noBlogs = true;

function addBlog() {
    new_img = document.getElementById("new_image").value
    new_title = document.getElementById("new_title").value
    new_article = document.getElementById("new_article").value

    if (new_img == "" || new_title == "" || new_article == "") {
        alert("Please enter all information!") 
        return
    }

    blog = {
        image: new_img
        ,title: new_title
        ,article: new_article
    }
    if (localStorage.getItem("blogs") == null)
        localStorage.setItem("blogs", "[]")
    blogs = JSON.parse(localStorage.getItem("blogs"))
    blogs.push(blog)
    localStorage.setItem("blogs", JSON.stringify(blogs))
    clearForm()
    displayBlog()
}

function clearForm() {
    document.getElementById("addForm").reset()
}


function displayBlog(){
    blogs_data = JSON.parse(localStorage.getItem("blogs"))
    console.log(blogs_data)
    latest_blog = blogs_data[blogs_data.length - 1]
    if (latest_blog != null) {
        msg=
            `
            <div class="col-md-4 scroll">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" alt="Thumbnail [100%x225]" src="${latest_blog.image}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                <div class="card-body">
                    <p class="card-text"><strong>${latest_blog.title}</strong></p>
                  <p class="card-text">${latest_blog.article}</p>
                </div>
              </div>
            </div>
            `
        if(noBlogs){
            noBlogs = false;
            document.getElementById("blogs").innerHTML = ""
        }
        document.getElementById("blogs").innerHTML += msg
    }
}


function clearBlogs() {
    localStorage.clear()
    noBlogs = true
    msg = "<h6>Add a blog and see them get displayed here!</h6>"
    document.getElementById("blogs").innerHTML = msg
}