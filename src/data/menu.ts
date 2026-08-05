import { Product } from '../context/AppContext';

const foodImages = [
  '/images/food-1.jpg',
  '/images/food-2.jpg',
  '/images/food-3.jpg',
  '/images/food-4.jpg',
  '/images/food-5.jpg',
  '/images/food-1.jpg', // Gado-Gado
  '/images/food-2.jpg', // Lumpia Goreng
  '/images/food-3.jpg', // Perkedel Nikmat
  '/images/food-4.jpg', // Nasi Kuning
  '/images/food-5.jpg', // Tahu Goreng Krispi
];

const drinkImages = [
  '/images/drink-1.jpg',
  '/images/drink-2.jpg',
  '/images/drink-3.jpg',
  '/images/drink-4.jpg',
  '/images/drink-5.jpg',
];

const snackImages = [
  '/images/snack-1.jpg',
  '/images/snack-2.jpg',
  '/images/snack-3.jpg',
  '/images/snack-4.jpg',
  '/images/snack-5.jpg',
];

const foodNames = [
  "Nasi Goreng Alam",
  "Ayam Bakar Madu",
  "Mie Goreng Spesial",
  "Rendang Daging Sapi",
  "Sate Ayam Madura",
  "Gado-Gado Sempurna",
  "Lumpia Goreng Emas",
  "Perkedel Nikmat",
  "Nasi Kuning Wangi",
  "Tahu Goreng Krispi",
];

const foodDescriptions = [
  "Nasi putih yang digoreng dengan telur, sayuran segar, dan bumbu rempah pilihan. Sajian otentik Nusantara yang menggugah selera.",
  "Daging ayam pilihan dipanggang dengan madu dan bumbu khusus, menghasilkan rasa manis dan gurih yang menggugah. Sempurna dengan nasi hangat.",
  "Mie kuning yang digoreng dengan daging cincang, telur, sayuran, dan sambal pedas nikmat. Cita rasa autentik dengan tekstur yang sempurna.",
  "Daging sapi lunak yang dimasak lama dalam kelapa dan rempah, hingga empuk dan lezat. Menu istimewa Nusantara yang memanjakan lidah.",
  "Daging ayam madura ditusuk dan dipanggang dengan bumbu kacang Madura yang kaya. Pelengkap sempurna dengan saus kacang nikmat.",
  "Sayuran segar (kol, tauge, mentimun) dengan tahu dan telur, disiram saus kacang kental yang lezat. Makanan sehat yang memuaskan.",
  "Kulit lumpia yang renyah berisi daging dan sayuran pilihan. Gurih dan nikmat, sempurna untuk menemani makan siang atau sore hari.",
  "Kentang rebus yang digeprek dan dibumbui, digoreng hingga emas keemasan. Crispy di luar, lembut di dalam dengan rasa yang gurih.",
  "Nasi putih yang dimasak dengan santan dan rempah, menghasilkan warna kuning emas dan aroma yang sangat menggugah selera.",
  "Tahu yang dipotong tebal, digoreng hingga permukaannya garing dan emas. Tekstur luar crispy dan dalam lembut, sempurna dengan sambal.",
];

const foodImageMapping = [
  '/images/food-1.jpg', // Nasi Goreng Alam
  '/images/food-2.jpg', // Ayam Bakar Madu
  '/images/food-3.jpg', // Mie Goreng Spesial
  '/images/food-5.jpg', // Rendang Daging Sapi
  '/images/food-4.jpg', // Sate Ayam Madura
  '/images/food-1.jpg', // Gado-Gado Sempurna
  '/images/food-2.jpg', // Lumpia Goreng Emas
  '/images/food-3.jpg', // Perkedel Nikmat
  '/images/food-4.jpg', // Nasi Kuning Wangi
  '/images/food-5.jpg', // Tahu Goreng Krispi
];

const drinkNames = [
  "Es Teh Manis",
  "Es Jeruk Peras",
  "Kopi Hitam Tubruk",
  "Kopi Susu Aren",
  "Jus Alpukat Segar",
];

const drinkDescriptions = [
  "Teh hitam yang diseduh hangat, didinginkan dengan es, dan diberi sirup gula. Minuman segar yang sempurna untuk menemani santap Anda.",
  "Jeruk segar diperas langsung, dicampur dengan air es dan gula, menciptakan kesegaran alami. Minuman vitamin C terbaik untuk keluarga.",
  "Kopi robusta pilihan diseduh dengan metode tubruk tradisional, menghasilkan cita rasa pekat dan nikmat. Untuk pecinta kopi sejati.",
  "Kopi dengan susu kental dan gula aren, menciptakan rasa manis dan lezat yang khas. Minuman favorit untuk bersantai.",
  "Alpukat segar diblender dengan susu dan es, menciptakan tekstur creamy yang lezat. Minuman bernutrisi tinggi dan menyegarkan.",
];

const snackNames = [
  "Pisang Goreng Keju",
  "Tempe Mendoan Hangat",
  "Tahu Isi Sayur",
  "Singkong Keju Merekah",
  "Kentang Goreng Renyah",
];

const snackDescriptions = [
  "Pisang matang yang dibalut adonan tepung, digoreng hingga golden, dan disajikan dengan taburan keju lembut. Cemilan manis dan gurih.",
  "Tempe tipis yang dilapisi adonan bawang, digoreng hingga renyah dan lembut di dalam. Cemilan tradisional yang tetap favorit.",
  "Tahu goreng yang diisi dengan sayuran segar dan bumbu, menghasilkan rasa lezat dan tekstur menggigit. Cemilan bergizi untuk keluarga.",
  "Singkong segar dipotong memanjang, digoreng dengan penambahan keju, menghasilkan tekstur luar renyah dan dalam lembut. Gurih dan nikmat.",
  "Kentang pilihan dipotong sesuai selera, digoreng hingga kuning keemasan, disajikan sambil hangat. Cemilan favorit semua usia.",
];

export const menuData: Product[] = [
  ...foodNames.map((name, i) => ({
    id: `f${i}`,
    name,
    category: 'Makanan' as const,
    price: 25000 + (i * 5000),
    image: foodImageMapping[i],
    description: foodDescriptions[i],
  })),

  ...drinkNames.map((name, i) => ({
    id: `d${i}`,
    name,
    category: 'Minuman' as const,
    price: 10000 + (i * 5000),
    image: drinkImages[i],
    description: drinkDescriptions[i],
  })),

  ...snackNames.map((name, i) => ({
    id: `s${i}`,
    name,
    category: 'Cemilan' as const,
    price: 15000 + (i * 5000),
    image: snackImages[i],
    description: snackDescriptions[i],
  })),
];