const storedsliders = localStorage.getItem('slider');
const slider = storedsliders ? JSON.parse(storedsliders) : [];

function addSliderForm() {
    const formHtml = `
        <form id="add-sliderForm" class="mt-4">
            <div class="news-title text-center"><h2>Thêm Slider</h2></div>
            <div class="form-group">
                <label for="img">Ảnh slider</label>
                <input type="text" id="img" class="form-control" placeholder="img/vanhoa2.jpeg" required onfocus>
            </div>

            <div class="form-group">
                <label for="p1">Văn bản 1:</label>
                <input type="text" id="p1" class="form-control" placeholder="Văn bản 1">
            </div>
            
            <div class="form-group">
                <label for="p2">Văn bản 2:</label>
                <input type="text" id="p2" class="form-control" placeholder="Văn bản 2">
            </div>
            
            <div class="form-group text-center">
                <button class="btn btn-success" type="button" onclick="saveSlider()">Lưu</button>
            </div>
        </form>
    `;

    // Replace the content inside the admConfiguration div
    document.getElementById("admConfiguration").innerHTML = formHtml;
}

let sliderId = 0;
function saveSlider() {
    sliderId++;
    let img = document.getElementById('img').value;
    let p1 = document.getElementById('p1').value;
    let p2 = document.getElementById('p2').value;

    slider.push({sliderId, img, p1, p2});
    localStorage.setItem('slider', JSON.stringify(slider));
    alert('Thêm slider mới thành công!');

    // Clear the form or perform other actions after submission
    document.getElementById("add-sliderForm").reset();
}

function manageSlider() {
    const sliderConfig = document.getElementById('admConfiguration');
    sliderConfig.innerHTML = '';

    const sliderTable = document.createElement('table');
    sliderTable.className = 'table table-bordered table-striped';

    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
    <button style="margin-left: 1px;" class="btn btn-success btn-sm" onclick="addSliderForm()">
                   <i class="fa-solid fa-sliders"></i> Thêm slider
                </button>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Văn bản 1</th>
            <th scope="col">Văn bản 2</th>
            <th scope="col">Thao tác</th>
        </tr>
    `;
    sliderTable.appendChild(tableHeader);

    // Create table body
    const tableBody = document.createElement('tbody');

    // Populate the table with slider list
    slider.forEach((slider, i) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${i + 1}</td>
            <td>
                <img src="${slider.img}" alt="slider Image" style="max-width: 100px; max-height: 100px;">
            </td>
            <td>${slider.p1}</td>
            <td>${slider.p2}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="editSlider(${slider.sliderId})">
                    <i class="fa-solid fa-pen-to-square"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteSlider(${slider.sliderId})">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(tableRow);
    });

    sliderTable.appendChild(tableBody);

    sliderConfig.appendChild(sliderTable);
    sliderConfig.style.display = 'block';
}

function deleteSlider(id) {
    // Convert id to a number
    const sliderToDeleteIndex = slider.findIndex(slider => slider.sliderId === Number(id));

    if (sliderToDeleteIndex !== -1) {
        slider.splice(sliderToDeleteIndex, 1);

        // Update local storage with the modified slider array
        localStorage.setItem('slider', JSON.stringify(slider));

        manageSlider();
        alert('Xóa thành công!');
    } else {
        alert('Không tìm thấy slider');
    }
}

function editSlider(id) {
    // Retrieve the slider data using the unique sliderId
    const sliderToEdit = slider.find(slider => slider.sliderId === id);

    if (sliderToEdit) {
        // Set editingIndex to the index of the slider being edited
        editingIndex = slider.findIndex(slider => slider.sliderId === id);
        console.log("id slider: " + id);
        // Populate the form fields with existing slider data
        document.getElementById('img').value = sliderToEdit.img;
        document.getElementById('p1').value = sliderToEdit.p1;
        document.getElementById('p2').value = sliderToEdit.p2;

        // Open the edit slider modal
        $('#editSliderModal').modal('show');
    } else {
        alert('Không tìm thấy slider');
    }
}

//update slider after finish modal form
function updateSlider() {
    if (editingIndex !== -1) {
        // Retrieve updated values from the form
        const newImg = document.getElementById('img').value;
        const newP1 = document.getElementById('p1').value;
        const newP2 = document.getElementById('p2').value;

        // Update the slider data at the specified index
        slider[editingIndex].img = newImg;
        slider[editingIndex].p1 = newP1;
        slider[editingIndex].p2 = newP2;

        // Update local storage with the modified slider array
        localStorage.setItem('slider', JSON.stringify(slider));

        editingIndex = -1;

        // After updating, close the modal
        $('#editSliderModal').modal('hide');

        // Re-render the slider table
        manageSlider();

        alert('Cập nhật slider thành công!');
    } else {
        alert('Cập nhật slider lỗi!');
    }
}

function displaySlider() {
    const sliderListContainer = document.getElementById("sliderList");

    sliderListContainer.innerHTML = "";

    // Iterate through slider data and create HTML for each slider
    slider.forEach((slider, index) => {
        const sliderHTML = `
        <style>
                    /*===========================
        \tStart Hero Area CSS
        =============================*/
        .slider-2 .single-slider-2 {
            height: 400px;
            background-size: cover;
            background-position: center;
            background-repeat:no-repeat;
            justify-content: center;
        }
        .slider-2 .single-slider-2 .text{
            margin-top:120px;
        }
        .slider-2.index2 .single-slider-2 .text{
            margin-top:150px;
        }
        .slider-2 .single-slider-2 h1 {
            color: #2C2D3F;
            font-size: 38px;
            font-weight: 700;
            margin: 0;
            padding: 0;
            line-height: 42px;
        }
        .slider-2 .single-slider-2 h1 span{
            color:#00b74f;
        }
        .slider-2 .single-slider-2 p {
            color: #000000;
            margin-top: 27px;
            font-weight: 400;
        }
        .slider-2 .single-slider-2 .button{
            margin-top:30px;
        }
        .slider-2 .single-slider-2 .btn{
            color:#fff;
            background:#00b74f;
            font-weight:500;
            display:inline-block;
            margin:0;
            margin-right:10px;
        }
        .slider-2 .single-slider-2 .btn:last-child{
            margin:0;
        }
        .slider-2 .single-slider-2 .btn.primary{
            background:#2C2D3F;
            color:#fff;
        }
        .slider-2 .single-slider-2 .btn.primary:before{
            background:#00b74f;
        }
        .slider-2 .owl-carousel .owl-nav {
            margin: 0;
            position: absolute;
            top: 50%;
            width: 100%;
            margin-top:-25px;
        }
        .slider-2 .owl-carousel .owl-nav div {
            height: 50px;
            width: 50px;
            line-height: 50px;
            text-align: center;
            background: #00b74f;
            color: #fff;
            font-size: 26px;
            position: absolute;
            margin: 0;
            -webkit-transition: all 0.4s ease;
            -moz-transition: all 0.4s ease;
            transition: all 0.4s ease;
            padding: 0;
            border-radius: 50%;
        }
        .slider-2 .owl-carousel .owl-nav div:hover{
            background:#2C2D3F;
            color:#fff;
        }
        .slider-2 .owl-carousel .owl-controls .owl-nav .owl-prev{
            left:20px;
        }
        .slider-2 .owl-carousel .owl-controls .owl-nav .owl-next{
            right:20px;
        }
        
        /* slider-2 Animation */
        .owl-item.active .single-slider-2 h1{
            animation: fadeInUp 1s both 0.6s;
        }
        .owl-item.active .single-slider-2 p{
            animation: fadeInUp 1s both 1s;
        }
        .owl-item.active .single-slider-2 .button{
            animation: fadeInDown 1s both 1.5s;
        }
        /*===========================
        \tEnd Hero Area CSS
        =============================*/
        </style>
            <div class="single-slider" style="background-image:url('${slider.img}')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="text">
                                <h1>We Provide <span>Data Services</span> That You Can <span>Trust!</span></h1>
                                <p>${slider.p1}</p>
                                <p>${slider.p2}</p>
                                <div class="button">
                                    <a href="Index.html" class="btn">Khám phá ngay</a>
                                    <a href="Lienhe.html" class="btn">Liên hệ với chúng tôi</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the slider HTML to the container
        sliderListContainer.innerHTML += sliderHTML;
    });
    console.log('function called');
}

document.addEventListener("DOMContentLoaded", function () {
    // Display the blogs on page load
    displaySlider();
});




