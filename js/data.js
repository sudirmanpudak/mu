// Simulated Backend Data
window.db = {
    banners: [
        { id: 1, image: "https://picsum.photos/id/1018/800/400", caption: "Kajian Akbar: Menjemput Hidayah" },
        { id: 2, image: "https://picsum.photos/id/1015/800/400", caption: "Bantuan Kemanusiaan: Peduli Sesama" },
        { id: 3, image: "https://picsum.photos/id/1036/800/400", caption: "Safari Dakwah: Kota ke Kota" },
        { id: 4, image: "https://picsum.photos/id/1047/800/400", caption: "Pembangunan Masjid: Wakaf Jariyah" }
    ],
    news: [
        { id: 1, title: "Sukses Gelar Kajian di Masjid Istiqlal", date: "2023-10-25", image: "https://picsum.photos/id/237/100/100", content: "Ribuan jamaah memadati Masjid Istiqlal untuk mendengarkan ceramah Manompo Usman tentang pentingnya menjaga ukhuwah islamiyah..." },
        { id: 2, title: "Program Wakaf Al-Quran", date: "2023-10-20", image: "https://picsum.photos/id/238/100/100", content: "Yayasan Usman Manompo meluncurkan program wakaf 10.000 Al-Quran untuk daerah pelosok..." },
        { id: 3, title: "Kunjungan ke Pesantren Darul Ulum", date: "2023-10-15", image: "https://picsum.photos/id/239/100/100", content: "Dalam rangkaian safari dakwah, Manompo Usman mengunjungi para santri untuk memberikan motivasi..." }
    ],
    schedules: [
        { id: 1, mosque: "Masjid Raya Bintaro", address: "Jl. Bintaro Utama 9, Tangerang Selatan", city: "Tangerang", date: "2023-11-05", time: "18:00 WIB" },
        { id: 2, mosque: "Masjid Al-Azhar", address: "Jl. Sisingamangaraja, Kebayoran Baru", city: "Jakarta Selatan", date: "2023-11-12", time: "09:00 WIB" },
        { id: 3, mosque: "Masjid Trans Studio", address: "Jl. Gatot Subroto, Bandung", city: "Bandung", date: "2023-11-19", time: "19:30 WIB" },
        { id: 4, mosque: "Masjid Agung Surabaya", address: "Jl. Masjid Al Akbar, Surabaya", city: "Surabaya", date: "2023-11-26", time: "04:30 WIB" }
    ],
    weekly_gallery: [
        { id: 1, image: "https://picsum.photos/id/1049/600/400", caption: "Ilustrasi Minggu Ini" },
        { id: 2, image: "https://picsum.photos/id/1050/600/400", caption: "Kajian Pekan Lalu" },
        { id: 3, image: "https://picsum.photos/id/1051/600/400", caption: "Dokumentasi Bakti Sosial" },
        { id: 4, image: "https://picsum.photos/id/1052/600/400", caption: "Safari Dakwah" }
    ],
    books: [
        { id: 1, title: "Menjemput Hidayah", cover: "https://picsum.photos/id/24/200/300", link: "#" },
        { id: 2, title: "Indahnya Sabar", cover: "https://picsum.photos/id/25/200/300", link: "#" },
        { id: 3, title: "Fiqih Sehari-hari", cover: "https://picsum.photos/id/26/200/300", link: "#" },
        { id: 4, title: "Tafsir Juz Amma", cover: "https://picsum.photos/id/27/200/300", link: "#" }
    ],
    upcoming_video: {
        title: "Kajian Live: Membersihkan Hati",
        date: "Malam Ini, 20:00 WIB"
    },
    quotes: [
        { id: 1, text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain.", source: "HR. Ahmad" },
        { id: 2, text: "Janganlah engkau marah, maka bagimu surga.", source: "HR. Thabrani" },
        { id: 3, text: "Shalat itu adalah tiang agama.", source: "HR. Baihaqi" },
        { id: 4, text: "Tuntutlah ilmu dari buaian hingga liang lahat.", source: "Mahfudzot" },
        { id: 5, text: "Kebersihan itu sebagian dari iman.", source: "HR. Muslim" }
    ],
    biography: {
        image: "https://picsum.photos/id/1062/200/200",
        summary: "Manompo Usman adalah seorang pendakwah yang dikenal dengan gaya penyampaian yang lembut dan menyentuh hati. Beliau aktif berdakwah di berbagai kota di Indonesia dan sering mengisi kajian di televisi nasional. Lulusan Universitas Islam Madinah ini memiliki fokus pada kajian tafsir dan hadits.",
        full: "Manompo Usman lahir di Gorontalo pada tahun 1980. Beliau menempuh pendidikan dasar hingga menengah di kampung halamannya sebelum melanjutkan studi ke Universitas Islam Madinah, Arab Saudi. Di sana, beliau mendalami ilmu syariah, khususnya bidang tafsir dan hadits. Sekembalinya ke tanah air, Manompo Usman mulai aktif berdakwah dari masjid ke masjid. Gaya bicaranya yang tenang namun tegas dalam prinsip membuat banyak jamaah merasa nyaman dan mudah menerima pesan dakwahnya. Saat ini, beliau juga aktif membina beberapa pondok pesantren dan yayasan sosial."
    },
    articles: [
        { id: 1, title: "Keutamaan Sabar dalam Menghadapi Ujian", date: "2023-10-01", content: "Sabar adalah salah satu sifat mulia yang sangat dicintai Allah...", image: "https://picsum.photos/id/1016/800/400" },
        { id: 2, title: "Membangun Keluarga Sakinah", date: "2023-09-25", content: "Keluarga adalah pondasi utama dalam membangun masyarakat yang islami...", image: "https://picsum.photos/id/1020/800/400" },
        { id: 3, title: "Pentingnya Menuntut Ilmu", date: "2023-09-18", content: "Menuntut ilmu adalah kewajiban bagi setiap muslim, laki-laki maupun perempuan...", image: "https://picsum.photos/id/1025/800/400" },
        { id: 4, title: "Adab Tetangga dalam Islam", date: "2023-09-10", content: "Islam mengatur hubungan antar manusia dengan sangat indah, termasuk dengan tetangga...", image: "https://picsum.photos/id/1021/800/400" }
    ],
    gallery: [
        { id: 1, image: "https://picsum.photos/id/1035/300/300", caption: "Tabligh Akbar Surabaya" },
        { id: 2, image: "https://picsum.photos/id/1033/300/300", caption: "Santunan Yatim" },
        { id: 3, image: "https://picsum.photos/id/1039/300/300", caption: "Kajian Rutin" },
        { id: 4, image: "https://picsum.photos/id/1041/300/300", caption: "Buka Puasa Bersama" },
        { id: 5, image: "https://picsum.photos/id/1044/300/300", caption: "Peresmian Masjid" },
        { id: 6, image: "https://picsum.photos/id/1050/300/300", caption: "Wisuda Santri" }
    ],
    videos: [
        { id: 1, title: "Ceramah Singkat: Bahaya Ghibah", duration: "10:05", thumbnail: "https://picsum.photos/id/1057/800/450", youtubeId: "ysz5S6PUM-U" },
        { id: 2, title: "Tanya Jawab: Hukum Riba", duration: "15:30", thumbnail: "https://picsum.photos/id/1063/800/450" },
        { id: 3, title: "Kajian Kitab: Riyadhus Shalihin", duration: "45:00", thumbnail: "https://picsum.photos/id/1069/800/450" },
        { id: 4, title: "Kisah Inspiratif Para Sahabat", duration: "20:15", thumbnail: "https://picsum.photos/id/1070/800/450" }
    ]
};
