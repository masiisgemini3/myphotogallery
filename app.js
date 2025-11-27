// Dapatkan token ini dari Telegram Bot
const BOT_TOKEN = '8314866928:AAHmyjgJdoJCwgZROCEu8er2OKqf134c7Ug'; 

// Dapatkan ini dari Supabase (Anon Key)
const SUPABASE_KEY = 'sb_anon_3j89sJhQvNpGzVc1dZtBfP2rR4iMxLq';

// Dapatkan ini dari Supabase (URL Project)
const SUPABASE_URL = 'https://your-project.supabase.co';

// Ambil data dari Supabase
async function loadPhotos() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?select=*`, {
    headers: { 'apikey': SUPABASE_KEY }
  });
  const photos = await res.json();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = `https://api.telegram.org/bot${BOT_TOKEN}/file/bot${photo.file_id}`;
    gallery.appendChild(img);
  });
}

// Upload foto ke Telegram + Supabase
async function uploadPhoto(formData) {
  const response = await fetch('https://your-worker-name.workers.dev/upload', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  if (data.success) {
    alert("Photo uploaded!");
    loadPhotos(); // Refresh gallery
  } else {
    alert("Error: " + data.error);
  }
}

// Handle form submit
document.getElementById('uploadForm').addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  await uploadPhoto(formData);
});

// Initial load
loadPhotos();
