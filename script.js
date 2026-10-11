
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let animationFrame;
let fotoURL = null;

// ===== BINTANG BERKELAP-KELIP =====
function aturBintang() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.7 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.003
    }));
}

function gambarBintang() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    stars.forEach(star => {
        star.alpha += star.speed;

        if (star.alpha > 1 || star.alpha < 0.15) {
            star.speed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 231, 250, ${star.alpha})`;
        ctx.fill();
    });

    animationFrame = requestAnimationFrame(gambarBintang);
}

aturBintang();
gambarBintang();

window.addEventListener("resize", aturBintang);

// ===== EFEK TEKS MENGETIK =====
const kalimat = [
    "orang yang paling aku sayang. ♡",
    "Semoga hari ini rasa sayang kamu ke aku bertmbah. 🌷",
    "semoga impian kita bisa dicapai berdua. ✨"
];

let indeksKalimat = 0;
let indeksHuruf = 0;
let menghapus = false;

function efekMengetik() {
    const target = document.getElementById("typing");
    const teks = kalimat[indeksKalimat];

    if (!menghapus) {
        indeksHuruf++;
        target.textContent = teks.substring(0, indeksHuruf);

        if (indeksHuruf >= teks.length) {
            menghapus = true;
            setTimeout(efekMengetik, 1800);
            return;
        }

        setTimeout(efekMengetik, 65);
    } else {
        indeksHuruf--;
        target.textContent = teks.substring(0, indeksHuruf);

        if (indeksHuruf <= 0) {
            menghapus = false;
            indeksKalimat = (indeksKalimat + 1) % kalimat.length;
            setTimeout(efekMengetik, 400);
            return;
        }

        setTimeout(efekMengetik, 25);
    }
}

efekMengetik();

// ===== HATI MELAYANG =====
const areaHati = document.getElementById("floating-hearts");
const simbolHati = ["♡", "♥", "❤", "✧", "🌸"];

function buatHati() {
    const hati = document.createElement("span");

    hati.className = "floating-heart";
    hati.textContent =
        simbolHati[Math.floor(Math.random() * simbolHati.length)];

    hati.style.left = Math.random() * 100 + "vw";
    hati.style.fontSize = (12 + Math.random() * 22) + "px";

    const durasi = 7 + Math.random() * 8;
    hati.style.animationDuration = durasi + "s";

    areaHati.appendChild(hati);

    setTimeout(() => hati.remove(), durasi * 1000);
}

setInterval(buatHati, 450);

// ===== BUKA SURAT =====
function bukaSurat() {
    const surat = document.getElementById("surat");
    const tombol = document.getElementById("buka-surat");

    surat.classList.toggle("open");

    if (surat.classList.contains("open")) {
        tombol.textContent = "💗 Tutup Surat";
        buatHati();
        surat.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        tombol.textContent = "💌 Buka Surat Kecil Ini";
    }
}

// ===== TAMBAHKAN FOTO SENDIRI =====
const inputFoto = document.getElementById("pilih-foto");
const previewFoto = document.getElementById("foto-preview");
const placeholderFoto = document.getElementById("photo-placeholder");

inputFoto.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Silakan pilih file gambar.");
        this.value = "";
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran foto maksimal 10 MB.");
        this.value = "";
        return;
    }

    if (fotoURL) {
        URL.revokeObjectURL(fotoURL);
    }

    fotoURL = URL.createObjectURL(file);
    previewFoto.src = fotoURL;
    previewFoto.hidden = false;
    placeholderFoto.style.display = "none";
});

// ===== EFEK KEJUTAN =====
function rayakan() {
    const wish = document.getElementById("wish");

    wish.textContent =
        "GABUT BENERAN";

    for (let i = 0; i < 32; i++) {
        const hati = document.createElement("span");

        hati.className = "burst-heart";
        hati.textContent = ["💗", "♡", "✨", "🌸"][
            Math.floor(Math.random() * 20)
        ];

        hati.style.left = (10 + Math.random() * 80) + "vw";
        hati.style.top = (30 + Math.random() * 40) + "vh";

        hati.style.setProperty(
            "--x",
            (Math.random() - 0.5) * 250 + "px"
        );

        hati.style.setProperty(
            "--y",
            (-50 - Math.random() * 200) + "px"
        );

        document.body.appendChild(hati);

        setTimeout(() => hati.remove(), 2600);
    }
}
