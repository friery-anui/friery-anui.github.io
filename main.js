// Hàm chỉnh sửa avatar và các ảnh khác
let isOwner = false;
const password = prompt("Nếu bạn là người quản lý, vui lòng nhập mật khẩu:");

if (password === "anui2025") {
  isOwner = true;
}

const galleryEl = document.getElementById('gallery');
const imageInput = document.getElementById('imageInput');
const ownerControls = document.getElementById('ownerControls');
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');
const avatarUpload = document.getElementById('avatarUpload');

if (isOwner) {
  ownerControls.style.display = 'block';
  avatarUpload.style.display = 'block';
}

let imageCount = 0;

function addImageToGallery(src, title = "", desc = "") {
  imageCount++;
  const container = document.createElement('div');
  container.className = 'gallery-item';
  if (isOwner) container.classList.add('owner');

  container.innerHTML = `
    <img src="${src}" alt="${title}">
    <h4>Ảnh ${imageCount}</h4>
    <p>${desc || "Tải từ máy người dùng"}</p>
    ${isOwner ? '<button class="delete-btn">Xoá</button>' : ''}
  `;

  if (isOwner) {
    container.querySelector('.delete-btn').addEventListener('click', () => {
      galleryEl.removeChild(container);
    });
  }

  container.querySelector('img').addEventListener('click', () => {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.remove('active');
    });
    container.classList.add('active');
  });

  galleryEl.appendChild(container);
}

imageInput?.addEventListener('change', (event) => {
  const files = event.target.files;
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      addImageToGallery(e.target.result);
    };
    reader.readAsDataURL(file);
  });
});

avatarInput?.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      avatar.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
