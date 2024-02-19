// Paso 1
const form = document.getElementById("form");
const fitxersTotals = [];

// Paso 2
const dropArea = document.querySelector(".drop-area");
const dragDropText = document.querySelector(".drop-area h2");
const button = document.querySelector(".drop-area button");
const input = document.querySelector("#input-file");
const preview = document.querySelector("#preview");

// Paso 3
dropArea.addEventListener("dragover", prevDefault);
function prevDefault(e) {
  e.preventDefault();
}

// Paso 4
dropArea.addEventListener("dragover", function (e) {
  prevDefault(e);
  dropArea.classList.add("active");
  dragDropText.textContent = "Desplaça";
});

// Paso 5
dropArea.addEventListener("dragleave", function () {
  dropArea.classList.remove("active");
});

// Paso 6
dropArea.addEventListener("drop", function (event) {
  prevDefault(event);
  fitxersTotals.push(...Array.from(event.dataTransfer.files));
  showFiles();
});

// Paso 7
function showFiles() {
  preview.innerHTML = "";
  if (fitxersTotals.length > 0) {
    fitxersTotals.forEach((file, index) => {
      processFile(file, index);
    });
  }
}

// Paso 8
function processFile(file, index) {
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const docType = file.type;
  if (validExtensions.includes(docType)) {
    let reader = new FileReader();
    reader.onloadend = function () {
      let prev = `<div class="previewImage">
                <img src="${reader.result}" alt="${file.name}"/>
                <span>${file.name}</span>
                <span onclick="remove(${index})" class="material-symbols-outlined removeBtn">c</span>
                </div>`;
      preview.innerHTML += prev;
    };
    reader.readAsDataURL(file);
  } else {
    remove(index);
  }
}

// Paso 9
function remove(index) {
  fitxersTotals.splice(index, 1);
  showFiles();
}

// Paso 10
button.addEventListener("click", function (e) {
  e.preventDefault();
  input.click();
});

// Paso 11
input.addEventListener("change", function () {
  fitxersTotals.push(...Array.from(input.files));
  showFiles();
  input.value = "";
  form.submit();
});

// Paso 12

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files;
  form.submit();
});
