const storedTools = localStorage.getItem('Tool');
const Tool = storedTools ? JSON.parse(storedTools) : [];

function addToolForm() {
    const formHtml = `
        <form id="addToolForm" class="mt-4">
            <div class="news-title text-center"><h2> Thông tin chung </h2></div>
            <div class="form-group">
                <label for="title">Tên title</label>
                <input type="text" id="title" class="form-control" placeholder="Tiêu đề" required onfocus>
            </div>
    
            <div class="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address" class="form-control" placeholder="Địa chỉ">
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" class="form-control" placeholder="Email">
            </div>

            <div class="form-group">
                <label for="icon">Icon trình duyệt:</label>
                <input type="text" id="icon" class="form-control">
            </div>
            
            <div class="form-group">
                <label for="date">Thời gian:</label>
                <input type="date" id="date" class="form-control">
            </div>
            
            <div class="form-group">
                <label for="copyright">Copyright:</label>
                <input type="text" id="copyright" class="form-control" placeholder="Copyright">
            </div>
            
            <div class="form-group text-center">
                <button class="btn btn-success" type="button" onclick="saveTool()">Lưu</button>
            </div>
        </form>
    `;

    // Replace the content inside the admConfiguration div
    document.getElementById("admConfiguration").innerHTML = formHtml;
}

function saveTool() {
    let ToolId = Date.now();
    let title = document.getElementById('title').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
    let icon = document.getElementById('icon').value;
    let date = document.getElementById('date').value;
    let copyright = document.getElementById('copyright').value;

    // Check if the number of Tools is greater than or equal to the limit (4)
    if (Tool.length >= 4) {
        // Remove the oldest Tool (the one at index 0)
        Tool.shift();
    }

    Tool.push({ ToolId, title, address, email, icon, date, copyright});
    localStorage.setItem('Tool', JSON.stringify(Tool));
    alert('Thêm Tool mới thành công!');

    // Clear the form or perform other actions after submission
    document.getElementById("addToolForm").reset();
}

function manageTool() {
    const ToolConfig = document.getElementById('admConfiguration');
    ToolConfig.innerHTML = '';

    const ToolTable = document.createElement('table');
    ToolTable.className = 'table table-bordered table-striped';

    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <button class="btn btn-success btn-sm" onclick="addToolForm()">
                            <i class="fa-solid fa-plus"></i> Thêm mới
                        </button>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Tên title</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Email</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Copyright</th>
            <th scope="col">Icon</th>
            <th scope="col">Thao tác</th>
        </tr>
    `;
    ToolTable.appendChild(tableHeader);

    // Create table body
    const tableBody = document.createElement('tbody');

    // Populate the table with Tool list
    Tool.forEach((Tool, i) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${i + 1}</td>
            <td>${Tool.title}</td>
            <td>${Tool.address}</td>
            <td>${Tool.email}</td>
            <td>${Tool.date}</td>
            <td>${Tool.copyright}</td>
            <td>
                <img src="${Tool.icon}" alt="Tool Image" style="max-width: 100px; max-height: 100px;">
            </td>
            <td>
                <button class="btn btn-success btn-sm" onclick="editTool(${Tool.ToolId})">
                    <i class="fa-solid fa-pen-to-square"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTool('${Tool.title}')">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(tableRow);
    });

    ToolTable.appendChild(tableBody);

    ToolConfig.appendChild(ToolTable);
    ToolConfig.style.display = 'block';
}

function deleteTool(title) {
    // Find the index of the Tool with the specified title
    const index = Tool.findIndex(Tool => Tool.title === title);

    if (index !== -1) {
        // Remove the Tool from the array
        Tool.splice(index, 1);

        // Update local storage with the modified Tool array
        localStorage.setItem('Tool', JSON.stringify(Tool));

        manageTool();

        alert('Xoá thành công !');
    } else {
        alert('Không tìm thấy Tool');
    }
}

// Function to populate the form for editing a Tool
function editTool(id) {
    // Retrieve the Tool data using the index
    const ToolToEdit = Tool.find(Tool => Tool.ToolId === id);

    if (ToolToEdit) {
        // Set editingIndex to the index of the Tool being edited
        editingIndex = Tool.findIndex(Tool => Tool.ToolId === id);  // remember 2 fix this pls
        console.log("id: " + id );
        // Populate the form fields with existing Tool data
        document.getElementById('title').value = ToolToEdit.title;
        document.getElementById('address').value = ToolToEdit.address;
        document.getElementById('email').value = ToolToEdit.email;
        document.getElementById('icon').value = ToolToEdit.icon;
        document.getElementById('date').value = ToolToEdit.date;
        document.getElementById('copyright').value = ToolToEdit.copyright;

        // Open the edit user modal
        $('#editToolModal').modal('show');
    } else {
        console.log("id: " + id );
        alert('Không tìm thấy Tool');
    }
}

//update Tool after finish modal form
function updateTool() {
    if (editingIndex !== -1) {
        // Retrieve updated values from the form
        const newTitle = document.getElementById('title').value;
        const newAddress = document.getElementById('address').value;
        const newEmail = document.getElementById('email').value;
        const newIcon = document.getElementById('icon').value;
        const newDate = document.getElementById('date').value;
        const newCopyright = document.getElementById('copyright').value;

        // Update the Tool data at the specified index
        Tool[editingIndex].title = newTitle;
        Tool[editingIndex].address = newAddress;
        Tool[editingIndex].email = newEmail;
        Tool[editingIndex].icon = newIcon;
        Tool[editingIndex].date = newDate;
        Tool[editingIndex].copyright = newCopyright;

        // Update local storage with the modified Tool array
        localStorage.setItem('Tool', JSON.stringify(Tool));

        editingIndex = -1;

        // After updating, close the modal
        $('#editToolModal').modal('hide');

        // Re-render the Tool table
        manageTool();

        alert('Cập nhật Tool thành công!');
    } else {
        alert('Cập nhật Tool lỗi!');
    }
}

function displayTools() {
    const ToolListContainer = document.getElementById("ToolList");

    ToolListContainer.innerHTML = "";

    // Iterate through ToolData and create HTML for each Tool
    Tool.forEach((Tool, index) => {
        const ToolHTML = `
      <div class="col-lg-3 col-md-6 col-12">
        <div class="single-news">
            <div onclick="popup()" class="news-head">
                <img src="${Tool.icon}" alt="#">
            </div>
            <div class="news-body">
                <div class="news-content text-center">
                    <div class="date">${Tool.date}</div>
                    <h2><a href="${getUrlWithProtocol(Tool.address)}">${Tool.title}</a></h2>
                    <p class="text">${Tool.email}</p>
                    <p class="text">${Tool.copyright}</p>
                </div>
            </div>
          </div>
        </div>

    `;

        // Append the Tool HTML to the container
        ToolListContainer.innerHTML += ToolHTML;
    });
}

function getUrlWithProtocol(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "http://" + url;
    }
    return url;
}


document.addEventListener("DOMContentLoaded", function () {
    // Display the Tools on page load
    displayTools();
});

