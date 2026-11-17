/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Moon,
  Sun,
  Menu,
  X,
  Play,
  Sparkles,
  Trophy,
  Medal,
  Eye,
  Target,
  Laptop,
  Globe,
  FlaskConical,
  HeartHandshake,
  BookOpen,
  Dumbbell,
  Music,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Clock,
  Download,
  Search,
  ChevronDown,
  ShieldCheck,
  Star,
  User,
  Lock,
  FileText,
  Printer,
  Compass,
  Cpu,
  MessageSquare,
  Award,
  Share2,
  Send,
  Building2,
  MapPin,
  Mail,
  Info
} from 'lucide-react';

interface Facility {
  id: number;
  title: string;
  badge: string;
  capacity: string;
  desc: string;
  img: string;
  features: string[];
}

interface EkskulItem {
  id: number;
  name: string;
  category: 'sains' | 'olahraga' | 'seni' | 'kepemimpinan';
  schedule: string;
  achievement: string;
  desc: string;
  img: string;
  pembina: string;
}

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  img: string;
  author: string;
}

interface FaqItem {
  id: number;
  topic: 'akademik' | 'ppdb' | 'layanan';
  badge: string;
  question: string;
  answer: string;
}

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  // Synchronize dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Facilities data
  const facilitiesData: Facility[] = [
    {
      id: 0,
      title: 'Laboratorium Terpadu & Robotika',
      badge: 'Sains & Teknologi',
      capacity: 'Kapasitas: 40 Siswa',
      desc: 'Dilengkapi mikroskop digital resolusi tinggi, kit mikroprosesor Arduino & IoT, workstation pemrograman, printer 3D, serta instrumen praktikum Fisika-Biologi modern.',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      features: ['Kit Mikrokontroler Arduino & ESP32', '3D Printer Creality & Scanner', 'Mikroskop Digital Berlayar LCD', 'Proyektor Interaktif 4K']
    },
    {
      id: 1,
      title: 'Perpustakaan Digital & Co-Working Space',
      badge: 'Literasi Modern',
      capacity: '12.000+ Koleksi Buku & E-Book',
      desc: 'Ruang baca nyaman berkonsep cafe literasi dengan katalog digital terintegrasi (OPAC), ribuan e-book nasional, sudut diskusi pod kolaboratif, dan workstation komputer multimedia.',
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      features: ['Akses Perpustakaan Nasional (Perpusnas)', 'Ruang Baca Lesehan Ber-AC', 'Koleksi Buku Bilingual & Ensiklopedia', 'Charging Station & High-Speed Wi-Fi']
    },
    {
      id: 2,
      title: 'Gelanggang Olahraga & Lapangan Sintetis',
      badge: 'Olahraga & Kebugaran',
      capacity: 'Standar Kompetisi Pelajar',
      desc: 'Meliputi lapangan basket & voli indoor berlantai vinyl standar FIBA, lapangan futsal rumput sintetis outdoor, arena bulutangkis, serta lintasan lari atletik.',
      img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
      features: ['Lapangan Basket Indoor Vinyl', 'Lapangan Futsal Rumput Sintetis', 'Tribun Penonton 300 Kursi', 'Loker Siswa & Kamar Bilas Bersih']
    },
    {
      id: 3,
      title: 'Studio Seni Musik, Tari & Podcast',
      badge: 'Seni & Kreativitas',
      capacity: 'Ruang Akustik Kedap Suara',
      desc: 'Wadah eksplorasi musikalitas dan olah vokal siswa, dilengkapi gamelan pelog-slendro komplit, drum set elektrik, keyboard, studio rekaman podcast siaran radio sekolah, dan cermin tari dinding penuh.',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      features: ['Gamelan Jawa Laras Pelog-Slendro', 'Sound Engineering & Audio Interface', 'Kamera Studio Multi-Angle Podcasting', 'Cermin Latihan Tari 12 Meter']
    }
  ];
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);

  // Extracurricular data
  const ekskulData: EkskulItem[] = [
    {
      id: 1,
      name: 'Klub Robotik & Coding',
      category: 'sains',
      schedule: 'Sabtu, 08.00 WIB',
      achievement: 'Emas IYRC 2026',
      desc: 'Merakit robot pintar berbasis Arduino, sensor ultrasonik, IoT, dan pemrograman logika Python.',
      img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      pembina: 'Fajar Nugraha, S.Kom.'
    },
    {
      id: 2,
      name: 'Karya Ilmiah Remaja (KIR)',
      category: 'sains',
      schedule: 'Jumat, 14.00 WIB',
      achievement: 'Finalis OPSI Nasional',
      desc: 'Eksperimen sains terapan, uji laboratorium pangan, inovasi energi terbarukan, dan metodologi riset.',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      pembina: 'Dra. Endang Sulistyowati'
    },
    {
      id: 3,
      name: 'English Debate & MUN Club',
      category: 'sains',
      schedule: 'Kamis, 15.00 WIB',
      achievement: 'Best Speaker Provinsi',
      desc: 'Melatih public speaking bahasa Inggris berbobot, critical thinking, dan simulasi sidang PBB (Model UN).',
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      pembina: 'Michael Tan, B.Ed.'
    },
    {
      id: 4,
      name: 'Basket SMP Negeri Jember',
      category: 'olahraga',
      schedule: 'Rabu & Sabtu, 15.30 WIB',
      achievement: 'Juara 1 DBL Junior',
      desc: 'Pembinaan fisik atletik, fundamental passing-dribbling, set play taktis, dan chemistry tim juara.',
      img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
      pembina: 'Coach Denny Triyadi'
    },
    {
      id: 5,
      name: 'Futsal & Sepak Bola SMP Negeri Jember',
      category: 'olahraga',
      schedule: 'Jumat, 15.00 WIB',
      achievement: 'Juara Walikota Cup',
      desc: 'Latihan taktik futsal modern, agilitas kaki, penyelesaian akhir, dan sportivitas lapangan sintetis.',
      img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
      pembina: 'Aris Setiawan, S.Pd.'
    },
    {
      id: 6,
      name: 'Pencak Silat & Beladiri Prestasi',
      category: 'olahraga',
      schedule: 'Sabtu, 08.30 WIB',
      achievement: '3 Emas O2SN Pelajar',
      desc: 'Seni beladiri warisan luhur bangsa untuk mengasah reflek pertahanan diri, kedisiplinan, dan stamina.',
      img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80',
      pembina: 'Pendekar Hadi Suwarno'
    },
    {
      id: 7,
      name: 'Tari Tradisional & Kreasi Nusantara',
      category: 'seni',
      schedule: 'Jumat, 14.00 WIB',
      achievement: 'Juara 1 FLS2N Jawa Timur',
      desc: 'Mempelajari ragam koreografi tari tradisional Jawa, Bali, Saman, serta kreasi kontemporer nusantara.',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      pembina: 'Niken Saraswati, S.Sn.'
    },
    {
      id: 8,
      name: 'Ansambel Musik & Paduan Suara',
      category: 'seni',
      schedule: 'Sabtu, 09.00 WIB',
      achievement: 'Gold Medal Choir Fest',
      desc: 'Eksplorasi olah vokal paduan suara, alat musik akustik, drum band sekolah, dan band festival.',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      pembina: 'Bagus Wicaksono, M.Sn.'
    },
    {
      id: 9,
      name: 'Pramuka Garuda & Pecinta Alam',
      category: 'kepemimpinan',
      schedule: 'Jumat, 13.30 WIB',
      achievement: 'Gudep Tergiat I Kwarda',
      desc: 'Kemandirian hidup di alam bebas, navigasi kompas, pertolongan darurat, kemah bakti, dan konservasi pohon.',
      img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
      pembina: 'Kak Wahyu Ramadhan'
    },
    {
      id: 10,
      name: 'Palang Merah Remaja (PMR Madya)',
      category: 'kepemimpinan',
      schedule: 'Kamis, 15.00 WIB',
      achievement: 'Juara Umum Jumbara PMR',
      desc: 'Pelatihan medis pertolongan pertama (P3K), donor darah sukarela, sanitasi lingkungan, dan kepedulian sosial.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      pembina: 'dr. Anisa Rahma'
    }
  ];
  const [selectedEkskulCategory, setSelectedEkskulCategory] = useState<string>('semua');

  // News data
  const newsData: NewsItem[] = [
    {
      id: 0,
      title: 'Tim Robotik SMP Negeri Jember Raih Medali Emas di Ajang Nasional IYRC 2026',
      category: 'Prestasi Siswa',
      date: '12 Oktober 2026',
      summary: 'Inovasi robot pemilah sampah otomatis berbasis sensor warna karya siswa kelas VIII berhasil memukau dewan juri nasional di Jakarta Convention Center.',
      content:
        'Prestasi membanggakan kembali dipersembahkan oleh Tim Robotik SMP Negeri Jember di kancah nasional. Pada ajang Indonesia Youth Robot Competition (IYRC) 2026 yang dihelat di Jakarta, tim yang digawangi oleh Farhan Alatas (Kelas VIII-A) dan Clarissa Putri (Kelas VIII-C) sukses meraih Juara I (Gold Medal) pada kategori Creative Eco-Innovation.\n\nRobot yang dinamai "EcoSort Jember V-2" ini mampu mendeteksi jenis sampah plastik, kertas, dan logam menggunakan sensor warna terintegrasi dan sistem lengan hidrolik mini yang dikendalikan oleh mikrokontroler. Kepala Sekolah Dr. H. Hendra Wijaya, M.Pd. menyampaikan apresiasi setinggi-tingginya atas dedikasi para siswa dan guru pembimbing.',
      img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80',
      author: 'Tim Humas SMP Negeri Jember'
    },
    {
      id: 1,
      title: 'Semarak Festival Gelar Karya P5: Kewirausahaan Muda & Pelestarian Budaya Nusantara',
      category: 'Kegiatan Sekolah',
      date: '05 Oktober 2026',
      summary: 'Lebih dari 30 stan kreasi siswa mulai dari kuliner tradisional sehat, hidroponik sekolah, hingga pergelaran drama musikal memadati halaman kampus hijau.',
      content:
        'Sebagai wujud implementasi Kurikulum Merdeka Projek Penguatan Profil Pelajar Pancasila (P5), SMP Negeri Jember menggelar festival tahunan dengan mengusung tema "Kearifan Lokal Menjawab Tantangan Zaman".\n\nKegiatan ini dihadiri langsung oleh perwakilan Dinas Pendidikan, tokoh masyarakat, dan ratusan orang tua murid. Stan pameran memamerkan produk olahan pangan lokal tanpa pengawet buatan, prototype pengolahan air hujan menjadi air layak pakai, serta busana kreasi daur ulang limbah kertas koran yang artistik.',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      author: 'Koordinator P5 Sekolah'
    }
  ];

  // FAQ data
  const faqData: FaqItem[] = [
    {
      id: 0,
      topic: 'akademik',
      badge: 'Akademik & Kurikulum',
      question: 'Bagaimana sistem kurikulum dan jam belajar harian di SMP Negeri Jember?',
      answer:
        'Sekolah menerapkan Kurikulum Merdeka yang diperkaya dengan 4 pilar keunggulan (Smart Digital Class, Bilingual Speaking, Riset Sains, & Bina Karakter). Pembelajaran berlangsung 5 hari kerja (Senin - Jumat) mulai pukul 07.00 hingga 15.15 WIB, diawali pembiasaan ibadah pagi dan literasi. Hari Sabtu difokuskan untuk kegiatan ekstrakurikuler pilihan dan pembinaan olimpiade (08.00 - 11.30 WIB).'
    },
    {
      id: 1,
      topic: 'ppdb',
      badge: 'PPDB & Beasiswa',
      question: 'Apa saja syarat dan ketentuan Beasiswa Jalur Prestasi PPDB?',
      answer:
        'Calon siswa dapat mendaftar Beasiswa Prestasi Bebas Biaya Gedung & SPP dengan melampirkan sertifikat kejuaraan minimal Juara 1-3 tingkat Kabupaten/Kota/Provinsi di bidang akademik, olahraga, seni, maupun keagamaan. Atau melampirkan fotokopi rapor SD kelas 4, 5, dan 6 (semester ganjil) dengan nilai rata-rata ≥ 90. Kuota beasiswa adalah 30% dari total daya tampung.'
    },
    {
      id: 2,
      topic: 'layanan',
      badge: 'Fasilitas & Keamanan',
      question: 'Apakah sekolah menyediakan armada jemputan dan katering makan siang bergizi?',
      answer:
        'Ya, kami menyediakan layanan armada antar-jemput ber-AC yang menjangkau 6 rute utama kota dengan supir berlisensi dan pendamping siswa. Sekolah juga menyediakan katering makan siang higienis yang menu hariannya dikurasi oleh ahli gizi bersertifikasi untuk memastikan asupan seimbang siswa masa pertumbuhan.'
    },
    {
      id: 3,
      topic: 'akademik',
      badge: 'Pembinaan Karakter',
      question: 'Bagaimana pendekatan sekolah dalam mencegah perundungan (Anti-Bullying)?',
      answer:
        'SMP Negeri Jember memiliki sertifikasi Sekolah Ramah Anak (SRA) Tingkat Nasional. Kami menerapkan regulasi Zero Tolerance terhadap segala bentuk perundungan (verbal, fisik, maupun siber). Setiap kelas memiliki tutor sebaya dan didampingi guru Bimbingan Konseling (BK) yang proaktif, serta CCTV 24 jam di seluruh area publik sekolah.'
    },
    {
      id: 4,
      topic: 'layanan',
      badge: 'Komunikasi Orang Tua',
      question: 'Bagaimana cara orang tua memantau nilai akademik dan presensi harian siswa?',
      answer:
        'Setiap wali murid mendapatkan akun resmi pada Portal Wali Murid berbasis web dan mobile. Melalui aplikasi ini, orang tua menerima notifikasi real-time saat siswa tiba dan pulang sekolah (tapping kartu digital), melihat rekap nilai harian, jadwal ujian, hingga catatan bimbingan karakter dari wali kelas.'
    }
  ];

  const [activeFaqTopic, setActiveFaqTopic] = useState<string>('semua');
  const [openFaqId, setOpenFaqId] = useState<number | null>(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');

  // PPDB Form State
  const [formData, setFormData] = useState({
    nama: '',
    sd: '',
    nisn: '',
    jalur: 'Reguler',
    ortu: '',
    wa: '',
    program: 'Smart Digital & Coding',
    pesan: ''
  });

  const [registrationResult, setRegistrationResult] = useState<{
    code: string;
    nama: string;
    sd: string;
    jalur: string;
    program: string;
    ortu: string;
    wa: string;
    date: string;
  } | null>(null);

  const [isCopied, setIsCopied] = useState(false);

  const handlePpdbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.sd || !formData.ortu || !formData.wa) {
      showToast('Harap lengkapi semua kolom wajib bertanda bintang (*)');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `PPDB-2026-${randomNum}`;
    const resultObj = {
      code,
      nama: formData.nama,
      sd: formData.sd,
      jalur: formData.jalur,
      program: formData.program,
      ortu: formData.ortu,
      wa: formData.wa,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    setRegistrationResult(resultObj);
    showToast(`Pendaftaran calon siswa ${formData.nama} berhasil tersimpan!`);
  };

  const copyRegCode = () => {
    if (!registrationResult) return;
    navigator.clipboard.writeText(registrationResult.code);
    setIsCopied(true);
    showToast(`Kode ${registrationResult.code} berhasil disalin ke clipboard!`);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Filtered FAQ
  const filteredFaqs = faqData.filter((item) => {
    const matchTopic = activeFaqTopic === 'semua' || item.topic === activeFaqTopic;
    const q = faqSearchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q);
    return matchTopic && matchQuery;
  });

  // Filtered Ekskul
  const filteredEkskuls =
    selectedEkskulCategory === 'semua'
      ? ekskulData
      : ekskulData.filter((e) => e.category === selectedEkskulCategory);

  // Portal Login Simulation
  const [portalNisn, setPortalNisn] = useState('');
  const [portalPass, setPortalPass] = useState('');
  const [portalRole, setPortalRole] = useState<'siswa' | 'ortu' | 'guru'>('siswa');

  const handlePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPortalModalOpen(false);
    showToast(`Berhasil login ke Portal ${portalRole.toUpperCase()} (NISN: ${portalNisn || '1029384756'})`);
    setPortalNisn('');
    setPortalPass('');
  };

  return (
    <div className="min-w-[320px] transition-colors duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-blue-950 text-white text-xs sm:text-sm py-2.5 px-4 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 inline" /> PPDB 2026/2027
            </span>
            <span className="font-medium text-slate-100">
              Penerimaan Siswa Baru Gelombang 1 Dibuka! Beasiswa Prestasi s.d 100%
            </span>
          </div>
          <div className="flex items-center gap-4 text-blue-200">
            <a
              href="tel:0331482910"
              className="hover:text-white flex items-center gap-1.5 transition text-xs sm:text-sm"
            >
              <Phone className="w-3.5 h-3.5" /> (0331) 482910
            </a>
            <span className="hidden sm:inline text-blue-400">|</span>
            <a
              href="#ppdb"
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
                  SMP NEGERI JEMBER
                </span>
                <span className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                  Unggul • Terakreditasi A
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <a
                href="#beranda"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                Beranda
              </a>
              <a
                href="#profil"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                Profil
              </a>
              <a
                href="#akademik"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                Akademik
              </a>
              <a
                href="#fasilitas"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                Fasilitas
              </a>
              <a
                href="#ekskul"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                Ekstrakurikuler
              </a>
              <a
                href="#berita"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                Berita
              </a>
              <a
                href="#testimoni-faq"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition"
              >
                FAQ
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Ganti Tema Warna"
                className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                title={darkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Portal Siswa */}
              <button
                onClick={() => setPortalModalOpen(true)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700 transition flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Portal Siswa</span>
              </button>

              {/* PPDB Action */}
              <a
                href="#ppdb"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 transition flex items-center gap-2"
              >
                <span>PPDB Online</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Ganti Tema Warna"
                className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Buka Menu"
                className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
            <a
              href="#beranda"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Beranda
            </a>
            <a
              href="#profil"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Profil Sekolah
            </a>
            <a
              href="#akademik"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Program Akademik
            </a>
            <a
              href="#fasilitas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Fasilitas Kampus
            </a>
            <a
              href="#ekskul"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Ekstrakurikuler
            </a>
            <a
              href="#berita"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Berita & Agenda
            </a>
            <a
              href="#testimoni-faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              Testimoni & FAQ
            </a>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPortalModalOpen(true);
                }}
                className="w-full py-3 rounded-xl font-semibold text-blue-700 bg-blue-50 dark:bg-slate-800 dark:text-blue-400 flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>Masuk Portal Siswa</span>
              </button>
              <a
                href="#ppdb"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Daftar PPDB 2026/2027</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="beranda"
        className="relative overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-16 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950"
      >
        {/* Subtle Bottom-Left Accent */}
        <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-amber-400/15 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Column: Headline */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping inline-block" />
                <span>Sekolah Penggerak & Ramah Anak Terbaik Nasional</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Membangun Generasi{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Cerdas, Berkarakter
                </span>{' '}
                & Mendunia.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SMP Negeri Jember memadukan Kurikulum Merdeka berbasis teknologi digital, penguatan
                karakter mulia, dan pengembangan bakat siswa dalam lingkungan belajar yang inspiratif,
                inklusif, dan menyenangkan.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#ppdb"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2.5 text-base"
                >
                  <span>Daftar Siswa Baru</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setTourModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-3 text-base group"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </span>
                  <span>Tur Virtual Kampus</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-2">
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    980+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Siswa Aktif
                  </div>
                </div>
                <div className="p-2">
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    68
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Guru Tersertifikasi
                  </div>
                </div>
                <div className="p-2">
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    120+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Penghargaan Prestasi
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Composition (Clean, Larger, No Blue Shadow) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-xl lg:max-w-none flex items-end justify-center">
                {/* Main Hero Student Cutout — no blue shadow/glow behind photo */}
                <img
                  src="/assets/aistudio/Siswi_Berhijab_Membawa_Buku_Pelajaran_f4b9fae1.png"
                  alt="Siswi SMP Negeri Jember Membawa Buku Pelajaran"
                  className="relative z-10 w-full max-w-[620px] xl:max-w-[680px] lg:scale-105 origin-bottom h-auto object-contain [mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Profile & Principal Message */}
      <section id="profil" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Principal Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-200/70 dark:border-slate-700/60 relative">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
                    alt="Kepala Sekolah Dr. H. Hendra Wijaya, M.Pd."
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-100 dark:ring-blue-900/50"
                  />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Sambutan Kepala Sekolah
                    </span>
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                      Dr. H. Hendra Wijaya, M.Pd.
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Kepala SMP Negeri Jember
                    </p>
                  </div>
                </div>
                <blockquote className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
                  "Pendidikan di usia SMP adalah fondasi emas pembentukan jati diri. Di SMP Negeri
                  Jember, kami memastikan setiap anak dihargai keunikannya, ditantang daya pikirnya, dan
                  dibimbing akhlak mulianya agar siap menjadi pemimpin masa depan yang berdaya saing global."
                </blockquote>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                  <span>NPSN: 20548912</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 inline" /> Sekolah Adiwiyata Mandiri
                  </span>
                </div>
              </div>
            </div>

            {/* Vision, Mission & Values */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                  Mengenal Lebih Dekat
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Pendidikan Holistik Berbasis Karakter & Inovasi
                </h2>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Didirikan sejak tahun 1998, SMP Negeri Jember terus bertransformasi menjadi sekolah
                rujukan nasional yang mengintegrasikan kecerdasan intelektual, kematangan emosional, dan
                keluhuran budi pekerti dalam bingkai Profil Pelajar Pancasila.
              </p>

              {/* Vision & Mission Cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl mb-3">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">
                    Visi Sekolah
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Terwujudnya lulusan yang beriman, bertakwa, unggul dalam prestasi akademik & non-akademik,
                    menguasai IPTEK modern, serta berwawasan lingkungan global.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl mb-3">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">
                    Misi Utama
                  </h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
                      <span>Pembelajaran aktif berbasis STEAM, coding & proyek kontekstual.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
                      <span>Pembiasaan karakter religius, adab sopan santun, dan empati sosial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-1 shrink-0" />
                      <span>Pendampingan bakat intensif menuju prestasi olimpiade & seni budaya.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Akademik Unggulan */}
      <section id="akademik" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
              Kurikulum & Program Unggulan
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Dirancang Untuk Menggali Potensi Terbaik Siswa
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3">
              Kami menerapkan Kurikulum Merdeka yang diperkaya dengan 4 pilar program unggulan khas SMP
              Negeri Jember.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Program 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Laptop className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
                  Smart Digital Class
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Pembelajaran interaktif menggunakan tablet, coding dasar (Python & Scratch), logika
                  algoritma, serta literasi kecerdasan buatan (AI) sejak kelas VII.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 mt-2">
                Kurikulum IT Terpadu <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Program 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
                  Bilingual & Global
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Program penguatan Bahasa Inggris & Bahasa Arab/Mandarin aktif melalui English Day rutin,
                  Native Speaker Session, dan pertukaran budaya (Sister School).
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                Sertifikasi TOEFL Junior <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Program 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <FlaskConical className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
                  Riset & Olimpiade
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Kelas pembinaan intensif Olimpiade Sains Nasional (Matematika, IPA, IPS) serta bimbingan
                  Karya Ilmiah Remaja (KIR) bersama mentor dosen dan praktisi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 mt-2">
                Inkubator Sains Muda <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Program 4 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mb-5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
                  Bina Karakter & Tahfidz
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Program pembinaan kerohanian sesuai agama masing-masing, target hafalan Juz 29 & 30 bagi
                  Muslim, serta projek kepedulian sosial bagi sesama.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 mt-2">
                Profil Pelajar Pancasila <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Facilities Section */}
      <section id="fasilitas" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                Sarana & Prasarana
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                Fasilitas Modern Berstandar Nasional
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm sm:text-base">
              Lingkungan kampus hijau seluas 2,4 hektar yang asri, dilengkapi ruang belajar ber-AC,
              laboratorium lengkap, dan sarana olahraga terpadu.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Facility Selector Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {facilitiesData.map((item, idx) => {
                const isActive = idx === activeFacilityIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFacilityIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 scale-[1.01]'
                        : 'bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {idx === 0 && <Cpu className="w-6 h-6" />}
                      {idx === 1 && <BookOpen className="w-6 h-6" />}
                      {idx === 2 && <Dumbbell className="w-6 h-6" />}
                      {idx === 3 && <Music className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block ${
                          isActive ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                      <h4 className="font-heading font-bold text-base sm:text-lg leading-snug">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'translate-x-1 text-white' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Facility Preview Display */}
            <div className="lg:col-span-7">
              {facilitiesData[activeFacilityIndex] && (
                <div className="rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl relative aspect-[16/10] group">
                  <img
                    src={facilitiesData[activeFacilityIndex].img}
                    alt={facilitiesData[activeFacilityIndex].title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                        {facilitiesData[activeFacilityIndex].badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                        {facilitiesData[activeFacilityIndex].capacity}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                      {facilitiesData[activeFacilityIndex].title}
                    </h3>
                    <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                      {facilitiesData[activeFacilityIndex].desc}
                    </p>

                    {/* Facility Spec Highlights */}
                    <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-xs text-blue-200">
                      {facilitiesData[activeFacilityIndex].features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Section with Filter */}
      <section id="ekskul" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
              Pengembangan Bakat & Minat
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              20+ Cabang Ekstrakurikuler Aktif
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3">
              Wadah ekspresi siswa untuk berprestasi di bidang sains teknologi, olahraga ketangkasan, seni
              budaya, maupun kepemimpinan kepanduan.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'semua', label: 'Semua Bidang' },
              { id: 'sains', label: 'Sains & IT' },
              { id: 'olahraga', label: 'Olahraga' },
              { id: 'seni', label: 'Seni & Budaya' },
              { id: 'kepemimpinan', label: 'Kepemimpinan' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedEkskulCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                  selectedEkskulCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Ekskul Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEkskuls.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual with badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Achievement Pill */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold shadow-md flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" /> {item.achievement}
                    </span>

                    {/* Category Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-200 flex items-center gap-1">
                        <User className="w-3 h-3 text-blue-400" /> {item.pembina}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {item.schedule}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Aktif <Check className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPDB Online Interactive Section */}
      <section
        id="ppdb"
        className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info & Timeline */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 inline" />
                <span>Pendaftaran Tahun Ajaran 2026/2027</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Mari Bergabung Menjadi Keluarga Besar{' '}
                <span className="text-amber-400">SMP Negeri Jember</span>
              </h2>

              <p className="text-blue-100 text-base leading-relaxed">
                Kami menyediakan 4 jalur penerimaan peserta didik baru dengan kesempatan beasiswa prestasi
                hingga 100% bebas biaya pengembangan dan SPP.
              </p>

              {/* Admission Tracks Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-white">Jalur Prestasi</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                      Kuota 30%
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Bebas tes akademik bagi peraih juara lomba tingkat Kab/Provinsi atau nilai rapor rata-rata ≥ 90.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-white">Jalur Reguler</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-bold">
                      Kuota 50%
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Seleksi melalui pemetaan potensi akademik dasar, wawancara minat siswa, dan observasi karakter.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-white">Jalur Tahfidz & Agama</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-sky-400 text-slate-950 font-bold">
                      Kuota 10%
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Apresiasi khusus bagi calon siswa dengan hafalan Al-Qur'an minimal 2 Juz atau prestasi keagamaan.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-white">Jalur Afirmasi</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-400 text-slate-950 font-bold">
                      Kuota 10%
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Beasiswa penuh bagi siswa berprestasi dari keluarga prasejahtera dan lingkungan mitra sekolah.
                  </p>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="pt-4">
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-amber-300 mb-3">
                  Jadwal Gelombang 1
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/10">
                    <div className="text-xs text-blue-200">Pendaftaran</div>
                    <div className="font-bold text-sm mt-0.5 text-white">Okt - Des 2026</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/10">
                    <div className="text-xs text-blue-200">Observasi & Tes</div>
                    <div className="font-bold text-sm mt-0.5 text-white">10 Jan 2027</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/10">
                    <div className="text-xs text-blue-200">Pengumuman</div>
                    <div className="font-bold text-sm mt-0.5 text-white">18 Jan 2027</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive PPDB Registration Form */}
            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Formulir Pra-Pendaftaran
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Dapatkan nomor registrasi resmi & undangan tur sekolah.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <form onSubmit={handlePpdbSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Nama Lengkap Calon Siswa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      placeholder="Contoh: Aditya Pratama"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Asal SD / MI *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.sd}
                        onChange={(e) => setFormData({ ...formData, sd: e.target.value })}
                        placeholder="Nama sekolah asal"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Jalur Pendaftaran *
                      </label>
                      <select
                        value={formData.jalur}
                        onChange={(e) => setFormData({ ...formData, jalur: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      >
                        <option value="Reguler">Jalur Reguler</option>
                        <option value="Prestasi Akademik/Non-Akademik">Jalur Prestasi (Beasiswa)</option>
                        <option value="Tahfidz & Keagamaan">Jalur Tahfidz & Keagamaan</option>
                        <option value="Afirmasi">Jalur Afirmasi Mitra</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Nama Orang Tua / Wali *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ortu}
                        onChange={(e) => setFormData({ ...formData, ortu: e.target.value })}
                        placeholder="Nama Bapak/Ibu"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.wa}
                        onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                        placeholder="0812xxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Minat Program Unggulan
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {[
                        'Smart Digital & Coding',
                        'Bilingual Class',
                        'Sains & Olimpiade',
                        'Tahfidz & Karakter'
                      ].map((prog) => (
                        <label
                          key={prog}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
                            formData.program === prog
                              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="program"
                            value={prog}
                            checked={formData.program === prog}
                            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span>{prog}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>Kirim & Dapatkan Kartu Registrasi</span>
                  </button>
                </form>

                {/* Registration Result Box */}
                {registrationResult && (
                  <div className="mt-6 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div className="w-full">
                        <h4 className="font-heading font-bold text-base">
                          Pra-Pendaftaran Berhasil Tercatat!
                        </h4>
                        <p className="text-xs sm:text-sm mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                          Data calon siswa atas nama <strong>{registrationResult.nama}</strong> ({registrationResult.sd})
                          pada <strong>{registrationResult.jalur}</strong> telah diverifikasi oleh sistem. Panitia
                          akan segera menghubungi via WhatsApp ({registrationResult.wa}).
                        </p>

                        <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">
                              Kode Registrasi PPDB
                            </span>
                            <span className="font-mono font-extrabold text-lg text-blue-600 dark:text-blue-400">
                              {registrationResult.code}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={copyRegCode}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition text-slate-700 dark:text-slate-200"
                            >
                              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                              <span>{isCopied ? 'Tersalin!' : 'Salin Kode'}</span>
                            </button>
                            <button
                              onClick={() => setShowSlipModal(true)}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white flex items-center gap-1.5 transition"
                            >
                              <Printer className="w-4 h-4" />
                              <span>Cetak Slip</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Agenda Section */}
      <section id="berita" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
                Kabar Sekolah & Prestasi
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                Berita & Agenda Terbaru
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Update Berkala Kegiatan & Prestasi Siswa
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <article className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-200/70 dark:border-slate-800 flex flex-col group hover:shadow-xl transition">
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-200">
                <img
                  src={newsData[0].img}
                  alt={newsData[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                  {newsData[0].category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" /> <span>{newsData[0].date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {newsData[0].title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {newsData[0].summary}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNews(newsData[0])}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all self-start cursor-pointer"
                >
                  <span>Baca Selengkapnya</span> <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* News Card 2 */}
            <article className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-200/70 dark:border-slate-800 flex flex-col group hover:shadow-xl transition">
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-200">
                <img
                  src={newsData[1].img}
                  alt={newsData[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  {newsData[1].category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" /> <span>{newsData[1].date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {newsData[1].title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {newsData[1].summary}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNews(newsData[1])}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all self-start cursor-pointer"
                >
                  <span>Baca Selengkapnya</span> <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* Upcoming Agenda List */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" /> Agenda Mendatang
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    Semester Ganjil
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex flex-col items-center justify-center shrink-0 font-heading">
                      <span className="text-lg font-extrabold leading-none">24</span>
                      <span className="text-[10px] font-bold uppercase mt-0.5">Okt</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Open House & Trial Class Siswa SD
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 08.00 - 11.30 WIB • Aula Utama
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex flex-col items-center justify-center shrink-0 font-heading">
                      <span className="text-lg font-extrabold leading-none">28</span>
                      <span className="text-[10px] font-bold uppercase mt-0.5">Okt</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Pekan Bahasa & Sumpah Pemuda
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 07.30 - 14.00 WIB • Lapangan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center shrink-0 font-heading">
                      <span className="text-lg font-extrabold leading-none">10</span>
                      <span className="text-[10px] font-bold uppercase mt-0.5">Nov</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Jember Science & Art Cup
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Lomba Tingkat SD/MI Se-Jawa
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                <span>Unduh kalender akademik format PDF?</span>
                <button
                  onClick={() => showToast('Kalender Akademik TA 2026/2027 (PDF) berhasil diunduh!')}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ Section */}
      <section
        id="testimoni-faq"
        className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* PART 1: TESTIMONIALS */}
          <div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Suara Orang Tua & Alumni</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Kepercayaan Keluarga Adalah{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Kebanggaan Kami
                  </span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
                  Pengalaman nyata dari para orang tua wali murid dan alumni yang telah merasakan dampak
                  pendidikan holistik di SMP Negeri Jember.
                </p>
              </div>

              {/* Rating Summary Card */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:px-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4 self-start lg:self-auto">
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 text-amber-500 flex items-center justify-center text-2xl font-bold shrink-0">
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                      4.9 / 5.0
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 inline" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Indeks Kepuasan Wali Murid (Survei 2026)
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                      Wali Murid Kelas VIII
                    </span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic">
                    "Perkembangan putri kami luar biasa sejak masuk SMP Negeri Jember. Tidak hanya nilai
                    akademiknya yang meningkat pesat, tetapi juga kepercayaan dirinya saat berbicara bahasa
                    Inggris di depan umum serta adab sopan santunnya di rumah."
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5" /> Program Favorit: Bilingual & Public Speaking
                  </div>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                    alt="Ibu dr. Ratna Kumalasari"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                      <span>Ibu dr. Ratna Kumalasari</span>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Orang Tua dari Nabila (Kelas VIII-A)
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-7 shadow-xl shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold">
                      Komite Sekolah
                    </span>
                    <div className="flex items-center text-amber-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-blue-50 text-sm sm:text-base leading-relaxed italic">
                    "Lingkungan sekolah bebas perundungan (anti-bullying) benar-benar diterapkan dengan tegas
                    dan penuh kasih oleh bapak ibu guru. Aplikasi portal digital siswa juga sangat memudahkan
                    kami memantau kehadiran, nilai, dan perkembangan anak secara real-time."
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-white/10 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5" /> Lingkungan Aman & Ramah Anak
                  </div>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-white/15">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Bapak Ir. Budi Santoso"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-400"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1">
                      <span>Bapak Ir. Budi Santoso, M.T.</span>
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                    </h4>
                    <p className="text-xs text-blue-200">Ketua Komite & Wali Murid Kelas IX</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold">
                      Alumni Angkatan 2023
                    </span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic">
                    "Pembinaan riset dan olimpiade di SMP Negeri Jember menjadi bekal terbaik saya hingga
                    bisa diterima di SMA Taruna Nusantara dengan beasiswa penuh. Guru-gurunya sangat suportif
                    dan mengajarkan integritas di atas segalanya."
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-lg">
                    <Medal className="w-3.5 h-3.5" /> Peraih Perak OSN Fisika
                  </div>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
                    alt="M. Rizky Aditya"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-900"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                      <span>M. Rizky Aditya</span>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Alumni 2023 • Siswa SMA Taruna Nusantara
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PART 2: FAQ ACCORDION WITH LIVE SEARCH */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 lg:p-12 border border-slate-200/80 dark:border-slate-800 shadow-lg">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: FAQ controls */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <Info className="w-3.5 h-3.5" />
                    <span>Pusat Informasi & Bantuan</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    Pertanyaan yang Sering Diajukan (FAQ)
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
                    Temukan jawaban cepat seputar tata cara pendaftaran PPDB, kurikulum sekolah, biaya
                    pendidikan, dan layanan siswa.
                  </p>
                </div>

                {/* FAQ Search Input */}
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    placeholder="Cari kata kunci (beasiswa, seragam, jam belajar)..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  {faqSearchQuery && (
                    <button
                      onClick={() => setFaqSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-600 dark:text-slate-300 rounded-lg px-2 py-1"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* FAQ Topic Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'semua', label: 'Semua Topik' },
                    { id: 'akademik', label: 'Akademik & Jam Belajar' },
                    { id: 'ppdb', label: 'PPDB & Beasiswa' },
                    { id: 'layanan', label: 'Fasilitas & Layanan' }
                  ].map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setActiveFaqTopic(topic.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeFaqTopic === topic.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>

                {/* Direct Consultation Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 text-white border border-slate-700/80 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-2xl shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">
                        Masih Punya Pertanyaan Lain?
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Tim Humas & Panitia PPDB kami siap melayani konsultasi orang tua setiap hari kerja pukul
                        07.30 - 15.30 WIB.
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <a
                          href="#ppdb"
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition"
                        >
                          <Send className="w-3.5 h-3.5" /> Konsultasi PPDB
                        </a>
                        <button
                          onClick={() =>
                            showToast('Brosur Digital SMP Negeri Jember (PDF) sedang diunduh...')
                          }
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> Unduh Brosur
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: FAQ Accordion List */}
              <div className="lg:col-span-7 space-y-3.5">
                {filteredFaqs.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-center">
                    <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-heading font-bold text-slate-700 dark:text-slate-200 text-sm">
                      Pertanyaan tidak ditemukan
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Silakan gunakan kata kunci lain atau pilih topik "Semua Topik".
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, idx) => {
                    const isOpen = openFaqId === faq.id;
                    const num = String(idx + 1).padStart(2, '0');
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                          isOpen
                            ? 'bg-blue-50/40 dark:bg-slate-800/90 border-blue-300 dark:border-blue-700 shadow-md'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-3.5">
                            <span
                              className={`w-8 h-8 rounded-xl font-heading font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isOpen
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {num}
                            </span>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                                {faq.badge}
                              </span>
                              <span className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug block">
                                {faq.question}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                              isOpen
                                ? 'bg-blue-600 text-white rotate-180'
                                : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-6 pt-1 pl-16 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Identity */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-heading font-extrabold text-lg text-white block leading-none">
                    SMP NEGERI JEMBER
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
                    Unggul & Berkarakter
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Jl. Pendidikan Raya No. 45, Jember, Jawa Timur 68121, Indonesia.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#beranda"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition"
                >
                  <Share2 className="w-5 h-5" />
                </a>
                <a
                  href="#beranda"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition"
                >
                  <Play className="w-5 h-5 fill-current" />
                </a>
                <a
                  href="#beranda"
                  aria-label="Portal"
                  onClick={(e) => {
                    e.preventDefault();
                    setPortalModalOpen(true);
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition"
                >
                  <Building2 className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
                Navigasi
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#profil" className="hover:text-white transition">
                    Profil & Visi Misi
                  </a>
                </li>
                <li>
                  <a href="#akademik" className="hover:text-white transition">
                    Kurikulum Merdeka
                  </a>
                </li>
                <li>
                  <a href="#fasilitas" className="hover:text-white transition">
                    Fasilitas Kampus
                  </a>
                </li>
                <li>
                  <a href="#ekskul" className="hover:text-white transition">
                    Ekstrakurikuler
                  </a>
                </li>
                <li>
                  <a href="#berita" className="hover:text-white transition">
                    Berita & Prestasi
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Digital Services */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
                Layanan Digital
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => setPortalModalOpen(true)}
                    className="hover:text-white transition text-left cursor-pointer"
                  >
                    E-Learning & CBT Siswa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPortalModalOpen(true)}
                    className="hover:text-white transition text-left cursor-pointer"
                  >
                    E-Rapor & Presensi Real-Time
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPortalModalOpen(true)}
                    className="hover:text-white transition text-left cursor-pointer"
                  >
                    Perpustakaan Digital (E-Lib)
                  </button>
                </li>
                <li>
                  <a href="#ppdb" className="hover:text-white transition">
                    Portal PPDB Online 2026
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
                Hubungi Kami
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <span>(0331) 482910 / 0812-3456-7890 (Hotline PPDB)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <span>info@smpnegerijember.sch.id</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <span>
                    Senin - Jumat: 07.00 - 15.30 WIB
                    <br />
                    Sabtu: 08.00 - 12.00 WIB
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 SMP Negeri Jember. Hak Cipta Dilindungi Undang-Undang.</p>
            <p>Terakreditasi A (Unggul) • Sekolah Ramah Anak Nasional • NPSN 20548912</p>
          </div>
        </div>
      </footer>

      {/* Modal 1: Portal Siswa / E-Learning Modal */}
      {portalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setPortalModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-blue-600/30">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                Portal Akademik Terpadu
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Akses E-Learning, Tugas, Jadwal, Absensi & E-Rapor
              </p>
            </div>

            {/* Role Tab */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-5">
              {(['siswa', 'ortu', 'guru'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setPortalRole(r)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition cursor-pointer ${
                    portalRole === r
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r === 'ortu' ? 'Orang Tua' : r}
                </button>
              ))}
            </div>

            <form onSubmit={handlePortalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  {portalRole === 'siswa'
                    ? 'NISN / Username Siswa'
                    : portalRole === 'ortu'
                    ? 'No. HP / ID Wali Murid'
                    : 'NIP / NUPTK Guru'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={portalNisn}
                    onChange={(e) => setPortalNisn(e.target.value)}
                    placeholder={
                      portalRole === 'siswa'
                        ? 'Contoh: 0081928374'
                        : portalRole === 'ortu'
                        ? '08123456789'
                        : '197805122005011002'
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={portalPass}
                    onChange={(e) => setPortalPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Ingat saya</span>
                </label>
                <a href="#beranda" className="text-blue-600 hover:underline">
                  Lupa sandi?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition cursor-pointer"
              >
                Masuk ke Dashboard {portalRole === 'ortu' ? 'Orang Tua' : portalRole}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Virtual Tour Modal */}
      {tourModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setTourModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Tur Virtual Kampus 360°
              </span>
              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-4">
                Jelajahi Lingkungan SMP Negeri Jember
              </h3>

              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-950 relative flex items-center justify-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover opacity-60"
                  alt="Video Tur Kampus Preview"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-3xl mb-3 shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <p className="font-heading font-bold text-lg sm:text-xl">
                    Profil Video & Tur Lingkungan 2026/2027
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-md">
                    Menampilkan ruang kelas pintar, laboratorium sains terpadu, gelanggang olahraga, dan
                    kehangatan pergaulan siswa berkarakter.
                  </p>
                </div>
              </div>

              {/* Tour Stops */}
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Zona Kampus Pilihan
              </h4>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Smart Classroom</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Ruang belajar interaktif ber-AC dengan layar sentuh interaktif 75 inci.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Kantin Sehat Adiwiyata</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Kantin bebas plastik sekali pakai dengan sertifikasi higienis BPOM.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Masjid & Pusat Ibadah</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Pusat pembinaan adab shalat berjamaah dan ruang ibadah lintas agama.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: News Article Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-slate-200">
              <img src={selectedNews.img} alt={selectedNews.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-bold">
                {selectedNews.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {selectedNews.date}
              </span>
              <span>•</span>
              <span>Oleh: {selectedNews.author}</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
              {selectedNews.title}
            </h3>

            <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
              {selectedNews.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Bagikan artikel ini ke media sosial:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Tautan artikel disalin ke papan klip!')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer text-slate-700 dark:text-slate-200"
                >
                  <Copy className="w-3.5 h-3.5" /> Salin Tautan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Official PPDB Registration Proof Slip */}
      {showSlipModal && registrationResult && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowSlipModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slip Header */}
            <div className="text-center pb-5 mb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                SMP NEGERI JEMBER
              </h3>
              <p className="text-xs text-slate-500">
                Bukti Pra-Pendaftaran Peserta Didik Baru (PPDB) TA 2026/2027
              </p>
            </div>

            {/* Slip Card Details */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Kode Registrasi:</span>
                <span className="font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                  {registrationResult.code}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Nama Calon Siswa:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registrationResult.nama}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Sekolah Asal:</span>
                <span className="font-medium text-slate-900 dark:text-white">{registrationResult.sd}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Jalur Penerimaan:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {registrationResult.jalur}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Minat Program:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {registrationResult.program}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Orang Tua / Wali:</span>
                <span className="font-medium text-slate-900 dark:text-white">{registrationResult.ortu}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">No. WhatsApp:</span>
                <span className="font-medium text-slate-900 dark:text-white">{registrationResult.wa}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Tanggal Pendaftaran:</span>
                <span className="text-xs text-slate-600 dark:text-slate-300">{registrationResult.date}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Catatan untuk Orang Tua:</strong>
              <p className="mt-1">
                Silakan simpan slip ini atau ambil tangkapan layar (screenshot). Tunjukkan bukti registrasi ini
                saat menghadiri sesi observasi & wawancara di kampus pada tanggal 10 Januari 2027 pukul 08.00 WIB.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Perintah cetak bukti pendaftaran telah dikirim.');
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" /> Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
