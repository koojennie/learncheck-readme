# Dokumentasi LearnCheck! A25-CS153

## 🚀 Tentang

**LearnCheck!** merupakan fitur formative assessment milik Dicoding yang dapat menghasilkan soal otomatis menggunakan model LLM (Gemini AI) berdasarkan materi submodul Dicoding. Fitur ini di-embed melalui iFrame ke dalam mock Dicoding Classroom sehingga dapat digunakan tanpa perubahan pada codebase Dicoding.

**LearnCheck!** dikembangkan untuk meningkatkan pengalaman belajar siswa Dicoding. Saat ini Dicoding hanya memiliki fitur kuis pada akhir modul yang bersifat summative assessment sehingga siswa tidak mengetahui pemahaman mereka sejauh mana terhadap materi Dicoding. Summative assessment hanya menilai hasil akhir tanpa memberikan feedback langsung terhadap proses belajar siswa sehingga siswa sering melanjutkan ke materi yang lebih kompleks dengan pemahaman yang belum matang.

Penelitian oleh Ogange et al. (2018) menunjukkan bahwa penerapan formative assessment dalam pembelajaran daring dapat meningkatkan motivasi dan hasil belajar siswa melalui feedback langsung dan refleksi mandiri. Namun, praktik formative assessment otomatis berbasis Artificial Intelligence (AI) masih jarang diterapkan pada platform pembelajaran online di Indonesia.

## ✨ Fitur Utama

* Generate 3 soal otomatis (multiple choice / multiple answer) yang relevan dengan materi submodul Dicoding menggunakan LLM (AI)
* Feedback secara langsung berupa penjelasan atau hint untuk setiap jawaban siswa
* Penyimpanan progress siswa menggunakan Local Storage (berdasarkan `user_id`).
* Integrasi yang mudah melalui iFrame sehingga dapat di-embed di mana saja
* Preferensi tampilan yang adaptif untuk setiap pengguna

## 🤖 Inovasi

* Menghasilkan 2 soal tambahan pada sisi Back-End untuk menentukan tingkat kesulitan berdasarkan performa siswa.
* Penggunaan Redis untuk mengurangi frekuensi permintaan ke Gemini API agar menghindari rate limit.
* Mengoptimalkan prompt agar kualitas feedback tidak terlalu kaku dan terasa menyenangkan

## 💾 Struktur Repository

Repositori dibagi menjadi dua bagian utama sebagai berikut.

1. Front-End berfungsi untuk menampilkan soal formative assessment, opsi jawaban, hint/feedback, fitur restart kuis, dan menyimpan progress siswa melalui *localStorage* berdasarkan `user_id`. Front-End juga menyediakan tampilan adaptif sesuai preferensi siswa, seperti tema, jenis font, ukuran font, dan ukuran layout kuis.
2. Back-End berfungsi untuk mengambil `tutorial_id` dan `user_id`, kemudian memanggil Dicoding Mock API untuk mengambil materi submodul. Data materi kemudian diproses dan dikirimkan ke Gemini LLM untuk menghasilkan soal, jawaban, hint, dan feedback. Backend juga mengatur level kesulitan soal, caching request LLM menggunakan Redis, dan endpoint REST API untuk frontend

### **Rincian File Repository**

### 📁 **Root Directory**

```
📦 learncheck-all
├─ .gitignore
├─ Backend-LearnCheck
├─ Frontend-LearnCheck
└─ README.md
```

Root berisi file `.gitignore` untuk mengecualikan file atau folder tertentu agar tidak ikut ter-commit ke repository, seperti folder node_modules, file .env, dan folder /dist. Selain itu, terdapat file `README.md` yang berisi dokumentasi utama proyek LearnCheck!, seperti penjelasan utama, fitur, cara clone, dan panduan penggunaan. 

### 🧠 **Backend-LearnCheck**

```
Backend-LearnCheck
├─ package.json
├─ package-lock.json
└─ src
```

* `package.json` & `package-lock.json`: berisi konfigurasi proyek backend, dependensi yang digunakan (Express, Redis client, Gemini SDK, dll), dan versi dari setiap library.

* 📂 `src/`: merupakan folder utama yang berisi source code backend.

* 📂 `core/`: berisi logika inti pembuatan dan pengolahan kuis formative assessment berbasis AI, seperti pipeline.js untuk mengatur alur pemrosesan data, mulai dari pengambilan materi, pemanggilan model LLM, hingga pembentukan soal kuis dan prompt.js untuk template prompt yang digunakan untuk berinteraksi dengan LLM (Gemini) agar menghasilkan soal, opsi jawaban, dan feedback yang sesuai.

* 📂 `providers/`: untuk menyimpan mekanisme implementasi untuk integrasi dengan Gemini API.

* 📂 `schemas/`: berisi skema validasi data yang akan memastikan struktur soal dan jawaban hasil AI sesuai dengan format yang diharapkan

* 📂 `utils/`: merupakan folder yang berisi file pendukung, seperti cache.js untuk mengelola Redis, fetchTutorials.js untuk mengambil materi submodul dari Mock Dicoding API, text.js untuk pemrosesan materi dalam bentuk teks sebelum dikirim ke Gemini API, dan validate.js untuk memvalidasi input output sistem.

* 📂 `routes/`: berisi definisi endpoint REST API yang digunakan oleh Front-End, seperti health.js untuk mengecek status server backend dan quiz.js untuk untuk memulai kuis, menghasilkan soal, mengelola progres kuis, dan mengembalikan data ke Front-End.

* `server.js`: file utama untuk menjalankan server Express, mengatur middleware, routing, dan konfigurasi aplikasi backend.

### 🎨 **Frontend-LearnCheck**

```
Frontend-LearnCheck
├─ .env
├─ package.json
├─ package-lock.json
├─ index.html
├─ vite.config.js
└─ src
```

* `.env`: file untuk konfigurasi environment Front-End seperti URL API backend dan endpoint mock.

* `package.json` & `package-lock.json`: berisi konfigurasi dan dependensi Front-End seperti React, Vite, dan Tailwind CSS.

* `index.html`: merupakan file utama yang berisi aplikasi Front-End yang akan di-render di dalam iFrame.

* `vite.config.js`: berisi konfigurasi Vite sebagai bundler dan development server.

* 📂 `src/`: folder utama untuk source code Front-End, berisi file App.jsx untuk mengatur routing dan struktur global aplikasi, file index.css dan main.jsx untuk styling global dan mounting aplikasi React.

* 📂 `assets/`: untuk menyimpan gambar file dokumentasi dan tampilan kuis.

* 📂 `components/`: berisi komponen UI yang dapat digunakan kembali (*reusable components*), seperti OptionButton.jsx, ProgressBar.jsx, QuizHeader.jsx, dll.

* 📂 `contexts/`: berisi file UserPreferencesContext.jsx untuk mengelola preferensi tampilan pengguna (tema, font, layout) yang berasal dari query parameter.

* 📂 `pages/`: berisi file QuizPage.jsx untuk mengatur halaman utama kuis yang menggabungkan seluruh komponen dan logika tampilan.

* 📂 `service/`: berisi file api.js untuk memanggil API.

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Vite
* Tailwind CSS
* Netlify

**Backend:**

* Node.js
* Express.js
* Gemini AI
* Redis
* Docker
* Langchain
* Proxmox

## ☁️ Mengambil API Key Gemini

Untuk menghasilkan soal otomatis kita memerlukan API Key dari Gemini. Berikut merupakan cara untuk mendapatkan API key Gemini

1. Buka link [API key Gemini](https://aistudio.google.com/api-keys)
2. Klik “Create a new project”
3. Beri nama project, misalnya “learncheck-ai”
4. Lalu klik “Create project”
5. Setelah project berhasil dibuat, pada sidebar buka halaman “API keys”
6. Klik “Create API key”
7. Beri nama pada API key, misalnya “learncheck-api”
8. Kemudian pada bagian “Choose an imported project” pilih project yang sudah dibuat sebelumnya, yaitu “learncheck-ai”
9. Klik “Create key”
10. Simpan API key tersebut untuk digunakan pada env proyek

## 🚨 Instalasi Redis

Sebelum melakukan clone pada proyek LearnCheck! kita harus mengunduh dan memasang Redis pada komputer kita. Syarat instalasi Redis adalah harus memiliki WSL pada komputer.

**Instalasi WSL**

Buka PowerShell dalam mode **administrator** dengan mengklik kanan dan klik "Run as administrator" lalu ketikkan perintah `wsl --install` . Terakhir, restart komputer untuk mengaktifkan WSL pada Windows.

Setelah WSL berhasil di-install, buka WSL dan ketikkan perintah berikut untuk mengunduh package Redis terbaru pada repository APT. Selanjutnya tambahkan repository tersebut pada APT index, perbarui APT index, dan install Redis

```powershell
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

Untuk menyalakan server Redis, ketikkan

```powershell
redis-server --daemonize yes
```

Kemudian, untuk terhubung dengan Redis dan uji coba koneksi ketikkan perintah berikut

```powershell
redis-cli
127.0.0.1:6379> ping
```

## 📌 Cara Clone Proyek LearnCheck!

1. Buka link repository [LearnCheck! All](https://github.com/LearnCheck-A25CS153/LearnCheck-All) lalu clone repository dengan cara mengunduh file .zip atau clone menggunakan Git Desktop (Bash / GUI).

2. Setelah proses clone selesai, buka folder yang berisi repository tersebut pada Visual Studio Code. Disini dapat terlihat bahwa terdapat dua folder, yaitu frontend dan backend

3. Kemudian, buka terminal VS Code melalui menu bar, klik “Terminal” lalu klik “New Terminal”

4. Masuk ke dalam direktori frontend dengan mengetikkan

   ```powershell
   cd Frontend-LearnCheck
   ```

5. Install semua package yang ada pada `package.json` direktori frontend

   ```powershell
   npm install
   ```

6. Kemudian, buat file baru bernama .env di dalam folder Frontend-LearnCheck dan isi file tersebut dengan konfigurasi sebagai berikut

   ```powershell
   VITE_QUIZ_BASE=https://learncheck-a25cs153.netlify.app
   VITE_MOCK_API=https://learncheck-dicoding-mock-666748076441.europe-west1.run.app
   ```

7. Selanjutnya, keluar dari direktori frontend untuk masuk ke direktori backend

   ```powershell
   cd ..
   cd Backend-LearnCheck
   ```

8. Install semua package yang ada pada `package.json` direktori backend

   ```powershell
   npm install
   ```

9. Kemudian, buat file baru bernama .env di dalam folder Backend-LearnCheck sama seperti tadi dan isi file tersebut dengan konfigurasi sebagai berikut

   ```powershell
   PORT=8002
   LLM_PROVIDER=gemini
   GOOGLE_API_KEY=<isi dengan Gemini API key yang dimiliki> # hilangkan tanda <...>
   GEMINI_MODEL=gemini-2.5-flash
   QUIZ_TTL_SEC=3600
   TUTORIALS_BASE=https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/
   CORS_ALLOWED=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5500,http://localhost:5500
   QUIZ_MULTI_MIN_SPANS=1
   QUIZ_REQUIRE_MIX=1
   QUIZ_DEBUG=1
   REDIS_HOST="localhost"
   REDIS_PORT=6379
   REDIS_DB=0
   ```

## </> Cara Embed

1. Buka web Mock Dicoding Classroom

2. Klik “Belajar Sekarang”

3. Pada bagian Navbar, klik icon “</>"

4. Scroll ke bawah halaman Mock Dicoding Classroom, pada bagian “Embed iframe” klik “Edit”

5. Masukkan format iFrame berikut

   ```powershell
   <iframe src="https://learncheck-a25cs153.netlify.app/?tutorial_id={tutorial_id}&user_id={user_id}" width="100%" height="400" style="border: none; overflow: hidden;"> </iframe>
   ```

6. Terakhir, klik “Save” dan tunggu hingga tampilan iFrame muncul

## 💻 Cara Penggunaan

Setelah tampilan iFrame LearnCheck! muncul, pengguna dapat mengerjakan kuis

1. Klik “Mulai Kuis”
2. Pilih jawaban yang diinginkan
3. Klik tombol “Periksa” dan LearnCheck! akan menampilkan feedback dari jawaban yang dipilih
4. Kemudian klik “Selanjutnya” dan lakukan hal yang sama hingga soal terakhir
5. Pada soal terakhir, klik tombol “Selesai”
6. LearnCheck! akan menampilkan skor dan rangkuman hasil kuis.
7. Untuk memulai ulang kuis, klik tombol “Mulai Ulang Quiz”