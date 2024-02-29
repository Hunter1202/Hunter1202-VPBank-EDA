function displaySlider() {
    // Get the container element to display slider information
    const sliderContainer = document.getElementById('admConfiguration');

    sliderContainer.innerHTML = '';

    // Create a table element
    const sliderTable = document.createElement('table');
    sliderTable.className = 'table table-bordered table-striped';

    // Create table header
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Văn bản 1</th>
            <th scope="col">Văn bản 2</th>
            <th scope="col">Thao tác</th>
        </tr>
    `;
    sliderTable.appendChild(tableHeader);

    // Create table body
    const tableBody = document.createElement('tbody');

    // Fetch header.html content using AJAX
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract slider information
            const heroSliders = doc.querySelectorAll('.hero-slider .single-slider');
            heroSliders.forEach((slider, index) => {
                const sliderId = `slider${index + 1}`;
                const backgroundImage = slider.style.backgroundImage.match(/url\(['"]?(.+?)['"]?\)/)[1];

                // Extract <p> tags
                const paragraphs = Array.from(slider.querySelectorAll('.text p')).map(p => p.textContent.trim());

                //table row
                const tableRow = document.createElement('tr');
                tableRow.innerHTML = `
                    <td>${sliderId}</td>
                    <td>${backgroundImage}</td>
                    <td>${paragraphs[0] || ''}</td>
                    <td>${paragraphs[1] || ''}</td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="editSlider('${sliderId}')">
                            <i class="fa-solid fa-pen-to-square"></i> Sửa
                        </button>
                    </td>
                `;
                tableBody.appendChild(tableRow);
            });

            // Append the table body to the table
            sliderTable.appendChild(tableBody);

            // Append the table to the slider section
            sliderContainer.appendChild(sliderTable);
            sliderContainer.style.display = 'block';
        })
        .catch(error => console.error('Error fetching header.html:', error));
}

function editSlider(sliderId) {
    // Fetch the latest slider information using AJAX
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Find the corresponding slider element
            const sliderToUpdate = doc.getElementById(sliderId);

            // Get the existing content of the slider
            const backgroundImage = sliderToUpdate.style.backgroundImage.match(/url\(['"]?(.+?)['"]?\)/)[1];
            const paragraphs = Array.from(sliderToUpdate.querySelectorAll('.text p')).map(p => p.textContent.trim());

            // Display the existing image in an <img> tag
            const imgPreview = document.getElementById('editImagePreview');
            imgPreview.src = backgroundImage;

            // Populate the form fields with the existing slider information
            document.getElementById('editP1').value = paragraphs[0] || '';
            document.getElementById('editP2').value = paragraphs[1] || '';

            // Set the global variable to the current slider ID
            editedSliderId = sliderId;

            // Open the edit slider modal
            $('#editSlider').modal('show');
        })
        .catch(error => console.error('Error fetching header.html:', error));
}

function updateSlider() {
    // Get the updated slider information from the form fields
    const editImageInput = document.getElementById('editImage');
    const editP1 = document.getElementById('editP1').value;
    const editP2 = document.getElementById('editP2').value;

    // Check if a new image is selected
    if (editImageInput.files.length > 0) {
        // Read the selected image file
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            const newImageSrc = e.target.result;

            // Update the corresponding slider element
            const sliderToUpdate = document.querySelector('.hero-slider #' + editedSliderId);
            console.log('editedSliderId:', editedSliderId);
            console.log('sliderToUpdate:', sliderToUpdate);

            if (sliderToUpdate) {
                sliderToUpdate.style.backgroundImage = `url('${newImageSrc}')`;  //line 117
                sliderToUpdate.querySelectorAll('.text p')[0].textContent = editP1;
                sliderToUpdate.querySelectorAll('.text p')[1].textContent = editP2;

                // After updating, close the modal
                $('#editSlider').modal('hide');
            } else {
                console.error('Slider not found for ID:', editedSliderId);
            }
        };
        fileReader.readAsDataURL(editImageInput.files[0]);
    } else {
        // If no new image is selected, update only text content
        const sliderToUpdate = document.querySelector('.hero-slider #' + editedSliderId);
        console.log('editedSliderId:', editedSliderId);
        console.log('sliderToUpdate:', sliderToUpdate);

        if (sliderToUpdate) {
            sliderToUpdate.querySelectorAll('.text p')[0].textContent = editP1;
            sliderToUpdate.querySelectorAll('.text p')[1].textContent = editP2;

            // After updating, close the modal
            $('#editSlider').modal('hide');
        } else {
            console.error('Slider not found for ID:', editedSliderId);
        }
    }
}

function updateSlider() {
    // Get the updated user information from the form fields
    const editImage = document.getElementById('editImage').value;
    const editP1 = document.getElementById('editP1').value;
    const editP2 = document.getElementById('editP2').value;

    // After updating, close the modal
    $('#editSlider').modal('hide');

    // After updating, update the displayed user information
    displaySlider();
}








