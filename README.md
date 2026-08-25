<div align="center">

  # 🎯 SNIPER RANGE ARCADE
  **A Precision Cyberpunk Web-Based Shooting Range Game**

  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

  <p align="center">
    Uji ketepatan refleks dan manajemen waktu dalam game tembak-menembak futuristik berbasis <b>HTML5 Canvas Engine</b>.
    <br />
    <a href="[https://github.com/T4KUG1R1S0/sniper-arcade](https://github.com/T4KUG1R1S0/sniper-arcade)"><strong>Jelajahi Dokumentasi »</strong></a>
    <br />
    <br />
    <a href="[https://sniper-arcade.vercel.app](https://sniper-arcade.vercel.app)"> Mainkan Live Demo</a>
    ·
    <a href="[https://github.com/T4KUG1R1S0/sniper-arcade/issues](https://github.com/T4KUG1R1S0/sniper-arcade/issues)">🐛 Laporkan Bug</a>
  </p>

</div>

---

## 📌 Tentang Proyek

**Sniper Range Arcade** adalah game *browser-based* buatan sendiri (*solo-developed*) yang dirancang untuk memberikan pengalaman bermain cepat dengan nuansa **Cyberpunk & Sci-Fi UI**. Game ini menggabungkan render grafik 60 FPS menggunakan Canvas API dengan efek audio yang disintesis secara langsung di memori (*zero external audio file dependencies*).

### **Mengapa Proyek Ini Dibuat?**
Proyek ini dibangun sebagai bagian dari portofolio *Frontend Engineering* modern untuk mendemonstrasikan penguasaan:
* Manipulasi logika matematika & fisika 2D pada **HTML5 Canvas API**.
* Manajemen status game kompleks (*state management*) dan siklus *game loop* di **React**.
* Sintesis audio real-time menggunakan **Web Audio API**.
* Implementasi **TypeScript** tingkat tinggi tanpa *any-type casting*.

---

## ⚡ Fitur Utama

- 🎯 **Target System Dynamic:**
  - **Standard Target (Blue):** Target dasar bernilai 100 poin.
  - **Golden Target (Gold):** Target bernilai 500 poin yang bergerak 1.8x lebih cepat dan lebih kecil.
  - **Bomb Target (Red):** Target tengkorak berbahaya yang mengurangi 300 poin dan meriset *combo streak*.
  - **Headshot Multiplier:** Tembakan presisi di pusat *bullseye* memberikan bonus multiplier poin dan SFX unik.
- 🔊 **Web Audio Synthesizer Engine:**
  - Efek suara tembakan (*gunshot*) dan benturan (*hit sound*) dihasilkan secara sintetis lewat gelombang sinyal audio.
  - Fitur Mute/Unmute audio instan terintegrasi dengan status aplikasi.
- 💥 **Visual FX & Interactive HUD:**
  - Efek *Screen Shake* saat menembak.
  - Custom Sniper Crosshair pengganti kursor mouse.
  - *Floating Damage/Score Text* yang menganimasi statistik tembakan.
- 🏆 **Agent Profile & Persistent Leaderboard:**
  - Modal penyerahan skor akhir saat game over (Input *Callsign* Agent + Pilihan Avatar Custom).
  - *Auto-sorting leaderboard* yang disimpan secara lokal (**LocalStorage**) hingga Top 100 pemain.

---

## 🛠️ Tech Stack & Arsitektur

* **Core Framework:** React 18
* **Build Tool:** Vite
* **Language:** TypeScript
* **Graphics & Game Loop:** HTML5 Canvas API (Custom 60 FPS RequestAnimationFrame)
* **Sound Engine:** Web Audio API (OscillatorNode & AudioBuffer)
* **Animation & UI:** Framer Motion & Lucide Icons
* **Router:** React Router DOM

---

## 📁 Struktur Direktori Project

```text
sniper-range-arcade/
├── public/                  # Static asset & favicon
├── src/
│   ├── components/          # Reusable UI Component & Game Modules
│   │   ├── Button/          # Modular Cyberpunk Button
│   │   ├── GameCanvas/      # Core Game Canvas Loop & Mechanics
│   │   └── Header/          # HUD & Audio Controller
│   ├── types/               # Strict TypeScript Interface Declarations
│   │   └── leaderboard.ts   # Leaderboard & Agent Profile Schema
│   ├── utils/
│   │   ├── audio.ts         # Web Audio API Synthesizer Helper
│   │   └── leaderboardData.ts # LocalStorage Operations & Mock Data
│   ├── App.tsx              # Application Root & Routing
│   └── main.tsx             # React DOM Mounting
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts