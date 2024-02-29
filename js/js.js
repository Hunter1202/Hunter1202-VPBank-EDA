// // Initialize blogData array
// let blogData = [];
//
// function manageBlogs() {
//     const blogListContainer = document.getElementById("admConfiguration");
//
//     // Clear existing content
//     blogListContainer.innerHTML = "";
//
//     // Iterate through blogData and create HTML for each blog
//     blogData.forEach((blog, index) => {
//         const blogHTML = `
//       <div class="text-center">
//           <div class="col-lg-4 col-md-6 col-12">
//             <div class="single-news">
//               <div class="news-head">
//                 <img src="${blog.image}" alt="#">
//               </div>
//               <div class="news-body">
//                 <div class="news-content">
//                   <div class="date">${blog.date}</div>
//                   <h2><a href="#">${blog.title}</a></h2>
//                   <p class="text">${blog.content}</p>
//                   <button onclick="editBlog(${index})">Chỉnh sửa</button>
//                   <button onclick="deleteBlog(${index})">Xóa</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//     `;
//
//         // Append the blog HTML to the container
//         blogListContainer.innerHTML += blogHTML;
//     });
// }
//
// function addBlog() {
//     // Open the add blog modal
//     $('#addBlogModal').modal('show');
// }
//
// function displayBlogs() {
//     const blogListContainer = document.getElementById("blogList");
//
//     // Clear existing content
//     blogListContainer.innerHTML = "";
//
//     // Iterate through blogData and create HTML for each blog
//     blogData.forEach((blog, index) => {
//         const blogHTML = `
//       <div class="col-lg-4 col-md-6 col-12">
//         <div class="single-news">
//           <div class="news-head">
//             <img src="${blog.image}" alt="#">
//           </div>
//           <div class="news-body">
//             <div class="news-content">
//               <div class="date">${blog.date}</div>
//               <h2><a href="">${blog.title}</a></h2>
//               <p class="text">${blog.content}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//
//         // Append the blog HTML to the container
//         blogListContainer.innerHTML += blogHTML;
//     });
// }
//
// // Function to get blogs from localStorage
// function getBlogs() {
//     return JSON.parse(localStorage.getItem('blogs')) || [];
// }
//
// // Function to save blogs to localStorage
// function saveBlog(blogs) {
//     localStorage.setItem('blogs', JSON.stringify(blogs));
// }
//
// // Function to add a new blog
// function addNewBlog() {
//     // Get existing blogs
//     let blogs = getBlogs();
//
//     // Get values from the modal form
//     let newTitle = document.getElementById('newTitle').value;
//     let newContent = document.getElementById('newContent').value;
//     let newDate = document.getElementById('newDate').value;
//     let newImage = document.getElementById('newImage').value;
//
//     // Create a new blog object
//     let newBlog = {
//         title: newTitle,
//         content: newContent,
//         date: newDate,
//         image: newImage,
//     };
//
//     // Add the new blog to the array
//     blogs.push(newBlog);
//
//     // Save the updated blogs to localStorage
//     saveBlogs(blogs);
//
//     // Close the modal
//     $('#addBlogModal').modal('hide');
//
//     // You can optionally update the UI here if needed
// }
//
// // Function to delete a blog by index
// function deleteBlog(index) {
//     // Get existing blogs
//     let blogs = getBlogs();
//
//     // Remove the blog at the specified index
//     blogs.splice(index, 1);
//
//     // Save the updated blogs to localStorage
//     saveBlogs(blogs);
//
//     // You can optionally update the UI here if needed
// }
//
// // Function to edit a blog by index
// function editBlog(index) {
//     // Get existing blogs
//     let blogs = getBlogs();
//
//     // Get values from the modal form
//     let editedTitle = document.getElementById('newTitle').value;
//     let editedContent = document.getElementById('newContent').value;
//     let editedDate = document.getElementById('newDate').value;
//     let editedImage = document.getElementById('newImage').value;
//
//     // Update the values of the blog at the specified index
//     blogs[index].title = editedTitle;
//     blogs[index].content = editedContent;
//     blogs[index].date = editedDate;
//     blogs[index].image = editedImage;
//
//     // Save the updated blogs to localStorage
//     saveBlogs(blogs);
//
//     // Close the modal
//     $('#addBlogModal').modal('hide');
//
//     // You can optionally update the UI here if needed
// }