// Team members and company values for the About page

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  accent: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  desc: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Fifin Agustiana",
    role: "Creative Director & Co-Founder",
    bio: "Seorang visioner di dunia modern fashion aesthetics, Fifin punya mata tajam buat minimalist elegance dan textile innovation yang jadi ciri khas setiap piece Novarium.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    accent: "#9b51e0",
  },
  {
    name: "I Gede Bayu Pamungkas",
    role: "Chief Executive Officer",
    bio: "Dengan strategic mindset dan passion buat ngeguncang fast fashion, Bayu mendorong misi Novarium biar premium essentials bisa diakses semua orang.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    accent: "#9cad8f",
  },
  {
    name: "Zilal Afwu Rahman",
    role: "Head of Product Design",
    bio: "Zilal adalah arsitek di balik signature silhouettes Novarium. Setiap potongan, jahitan, dan jatuhnya kain dirancang dengan sangat detail di bawah design philosophy-nya.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    accent: "#27ae60",
  },
  {
    name: "Safdar Rahman",
    role: "Chief Technology Officer",
    bio: "Safdar nyambungin antara fashion dan teknologi, membangun digital infrastructure yang ngepowerin e-commerce experience Novarium yang seamless.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    accent: "#e05177",
  },
];

export const VALUES: CompanyValue[] = [
  { icon: "✦", title: "Craftsmanship", desc: "Setiap piece dibikin dengan presisi — dari benang pertama sampai press terakhir." },
  { icon: "◆", title: "Sustainability", desc: "Produksi yang conscious ketemu modern design, dibuat buat tahan lebih dari satu season." },
  { icon: "●", title: "Inovasi", desc: "Kita push boundaries di fabric technology, fit science, dan cara lo belanja." },
  { icon: "▲", title: "Komunitas", desc: "Novarium bukan cuma brand — ini culture dari orang-orang yang nolak jadi biasa aja." },
];
