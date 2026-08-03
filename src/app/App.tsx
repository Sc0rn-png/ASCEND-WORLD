import { useState, useEffect, type ComponentType } from "react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Home, Search, Trophy, User, Heart, Star,
  Clock, Users, Award, ArrowRight, Filter,
  ThumbsUp, Share2, Shield, CreditCard, MapPin,
  Lock, ChevronRight, ChevronLeft, ChevronDown,
  Camera, Package, Crown, Check, Settings, Zap,
  Bookmark, ImageIcon, CheckCircle, Edit, LogOut,
  HelpCircle, Truck, DollarSign, Plus, Send, Play,
  Bell, Eye
} from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "landing" | "catalog" | "detail" | "checkout"
  | "dashboard" | "upload" | "gallery"
  | "leaderboard" | "profile" | "settings";

interface Challenge {
  id: string;
  title: string;
  tagline: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeRequired: string;
  prizePool: number;
  preorderCount: number;
  maxUnits: number;
  price: number;
  image: string;
  materials: string[];
  description: string;
  endDate: Date;
  tag?: string;
  rating: number;
  reviews: number;
}

interface NavProps {
  navigate: (screen: Screen, data?: Record<string, unknown>) => void;
  navData?: Record<string, unknown>;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Macro Photography Explorer",
    tagline: "Capture the invisible universe",
    category: "Photography",
    difficulty: "Intermediate",
    timeRequired: "3–5 hours",
    prizePool: 2400,
    preorderCount: 847,
    maxUnits: 1000,
    price: 89,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop&auto=format",
    materials: [
      "3× macro lens attachments",
      "Polarizing filter",
      "Specimen collection kit",
      "Studio diffuser card",
      "Inspiration booklet (48pp)",
    ],
    description:
      "Dive into the hidden world of extreme close-up photography. This kit contains professional-grade macro attachments compatible with any smartphone, along with a curated specimen collection and lighting diffuser to help you capture images you never thought possible.",
    endDate: new Date(Date.now() + 5 * 86400000 + 14 * 3600000),
    tag: "Best Seller",
    rating: 4.9,
    reviews: 234,
  },
  {
    id: "2",
    title: "Watercolor Dreams",
    tagline: "Paint your inner landscape",
    category: "Painting",
    difficulty: "Beginner",
    timeRequired: "2–4 hours",
    prizePool: 1800,
    preorderCount: 612,
    maxUnits: 800,
    price: 74,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop&auto=format",
    materials: [
      "24-color professional watercolor set",
      "Cold-press paper — 10 sheets",
      "5 watercolor brushes",
      "Masking fluid pen",
      "Project reference card deck",
    ],
    description:
      "Explore the fluid, dreamlike world of watercolor painting. Receive a curated set of professional-grade pigments and guided project cards to create your own series of atmospheric landscapes.",
    endDate: new Date(Date.now() + 8 * 86400000),
    tag: "New",
    rating: 4.7,
    reviews: 178,
  },
  {
    id: "3",
    title: "Urban Sketch Kit",
    tagline: "Document the city you love",
    category: "Drawing",
    difficulty: "Intermediate",
    timeRequired: "4–6 hours",
    prizePool: 3200,
    preorderCount: 423,
    maxUnits: 600,
    price: 95,
    image: "https://images.unsplash.com/photo-1513364776-537bdf677e0b?w=800&h=600&fit=crop&auto=format",
    materials: [
      "Fountain pen + 3 ink cartridges",
      "A5 sketchbook — 80 pages",
      "Watercolor pencils — 12 colors",
      "Fineliner set — 5 nibs",
      "Perspective guide card",
    ],
    description:
      "Step outside and capture the energy of urban spaces. This kit is for artists who want to document architecture, street life, and cityscapes with confidence and style.",
    endDate: new Date(Date.now() + 3 * 86400000 + 6 * 3600000),
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "4",
    title: "Origami Architectures",
    tagline: "Fold complexity into beauty",
    category: "Craft",
    difficulty: "Advanced",
    timeRequired: "5–8 hours",
    prizePool: 4000,
    preorderCount: 289,
    maxUnits: 500,
    price: 119,
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&h=600&fit=crop&auto=format",
    materials: [
      "Premium washi paper — 30 sheets",
      "Bone folder",
      "Precision tweezers",
      "Architectural diagram booklet",
      "Acrylic display case",
    ],
    description:
      "Master the ancient art of complex modular origami. This advanced kit includes detailed instruction booklets for building architectural structures — from geodesic domes to intricate tessellations.",
    endDate: new Date(Date.now() + 12 * 86400000),
    tag: "Limited",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "5",
    title: "Culinary Plating Arts",
    tagline: "Transform food into sculpture",
    category: "Cooking",
    difficulty: "Intermediate",
    timeRequired: "3–4 hours",
    prizePool: 2800,
    preorderCount: 534,
    maxUnits: 750,
    price: 82,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format",
    materials: [
      "Stainless plating tweezers",
      "Squeeze bottles — set of 3",
      "Stencil set — 8 patterns",
      "Dried edible flower mix",
      "Professional plating guide",
    ],
    description:
      "Explore the visual art of food presentation. Learn professional plating techniques used by Michelin-starred restaurants with every tool you need to create stunning edible compositions.",
    endDate: new Date(Date.now() + 6 * 86400000),
    tag: "Popular",
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "6",
    title: "Calligraphy & Ink Arts",
    tagline: "Write with intention and grace",
    category: "Writing",
    difficulty: "Beginner",
    timeRequired: "2–3 hours",
    prizePool: 1500,
    preorderCount: 391,
    maxUnits: 600,
    price: 67,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&auto=format",
    materials: [
      "Calligraphy pens — 4 nibs",
      "India ink — black + sepia",
      "Guideline sheets — 20 pages",
      "Practice pad — 30 sheets",
      "Reference booklet",
    ],
    description:
      "Discover the meditative art of calligraphy. Whether you want to master classic Copperplate or explore modern brush lettering, this kit provides everything you need to develop an elegant hand.",
    endDate: new Date(Date.now() + 10 * 86400000),
    rating: 4.7,
    reviews: 127,
  },
];

const CATEGORIES = ["All", "Photography", "Painting", "Drawing", "Craft", "Cooking", "Writing"];

const GALLERY_ITEMS = [
  { id: "1", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop&auto=format", creator: "Sofia M.", likes: 342, challenge: "Watercolor Dreams", voted: false },
  { id: "2", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=320&fit=crop&auto=format", creator: "James K.", likes: 218, challenge: "Urban Sketch Kit", voted: false },
  { id: "3", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=440&fit=crop&auto=format", creator: "Yuki T.", likes: 495, challenge: "Macro Photography", voted: true },
  { id: "4", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=560&fit=crop&auto=format", creator: "Ana L.", likes: 671, challenge: "Origami Architectures", voted: false },
  { id: "5", image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=480&fit=crop&auto=format", creator: "Priya S.", likes: 412, challenge: "Urban Sketch Kit", voted: false },
  { id: "6", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=360&fit=crop&auto=format", creator: "Lucas B.", likes: 287, challenge: "Calligraphy", voted: false },
];

const LEADERBOARD = [
  { rank: 1, name: "Sofia Martinez", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format", points: 4820, wins: 7, badge: "Grandmaster", earnings: 2400 },
  { rank: 2, name: "James Kowalski", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format", points: 4210, wins: 5, badge: "Expert", earnings: 1500 },
  { rank: 3, name: "Yuki Tanaka", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format", points: 3890, wins: 6, badge: "Expert", earnings: 900 },
  { rank: 4, name: "Ana Luiza", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format", points: 3450, wins: 4, badge: "Advanced", earnings: 0 },
  { rank: 5, name: "Marco Rossi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format", points: 3120, wins: 3, badge: "Advanced", earnings: 0 },
  { rank: 6, name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&auto=format", points: 2870, wins: 2, badge: "Rising Star", earnings: 0 },
  { rank: 7, name: "Lucas Bernard", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&auto=format", points: 2590, wins: 2, badge: "Rising Star", earnings: 0 },
];

const TESTIMONIALS = [
  {
    name: "Sofia M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    text: "The macro photography box changed how I see the world. Premium quality throughout, and the prize pool made every submission feel meaningful.",
    rating: 5,
    challenge: "Macro Photography",
  },
  {
    name: "James K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    text: "I won the urban sketching challenge last month. The prize was exciting, but the skill I developed was the real reward.",
    rating: 5,
    challenge: "Urban Sketch Kit",
  },
  {
    name: "Yuki T.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    text: "Origami kit with materials I had never seen at this price. Instructions were clear, and the community gallery was genuinely inspiring.",
    rating: 5,
    challenge: "Origami Architectures",
  },
];

const FAQS = [
  {
    q: "When do I receive my challenge box?",
    a: "Boxes ship within 3–5 business days after the preorder period closes. You will receive a tracking number via email once your order dispatches.",
  },
  {
    q: "How are winners selected?",
    a: "Winners are determined by community votes (60%) combined with a score from our expert judges panel (40%). Voting opens once submissions close.",
  },
  {
    q: "Can I participate in multiple challenges?",
    a: "Yes — you can preorder and participate in as many simultaneous challenges as you like. Each box is an independent entry.",
  },
  {
    q: "What if I am unhappy with my box?",
    a: "We offer a 30-day satisfaction guarantee. If you are unhappy with the quality of any item, we will replace it or issue a full refund.",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useCountdown(endDate: Date) {
  const calc = () => {
    const diff = Math.max(0, endDate.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Primitive Components ─────────────────────────────────────────────────────

function Btn({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  fullWidth = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-150 cursor-pointer select-none";
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.97]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97]",
    ghost: "text-foreground hover:bg-muted active:scale-[0.97]",
    outline: "border border-border text-foreground hover:bg-muted active:scale-[0.97]",
  };
  const sizes = { sm: "h-9 px-4 text-sm", md: "h-12 px-6 text-sm", lg: "h-14 px-8 text-base" };
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", disabled && "opacity-50 pointer-events-none", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "purple" | "outline";
  className?: string;
}) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    purple: "bg-violet-100 text-violet-700",
    outline: "border border-border text-muted-foreground",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full", variants[variant], className)}>
      {children}
    </span>
  );
}

function ProgressBar({
  value,
  max = 100,
  showCount = false,
  label,
  className = "",
}: {
  value: number;
  max?: number;
  showCount?: boolean;
  label?: string;
  className?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={cn("w-full", className)}>
      {(label || showCount) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-muted-foreground font-medium">{label}</span>}
          {showCount && (
            <span className="text-xs font-semibold text-foreground">
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function FieldInput({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange,
  icon: Icon,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  icon?: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-foreground">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "w-full h-12 bg-input-background rounded-xl border border-border text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60",
            Icon ? "pl-10 pr-4" : "px-4"
          )}
        />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={cn("relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0", checked ? "bg-primary" : "bg-muted")}
      onClick={() => onChange(!checked)}
    >
      <span
        className={cn(
          "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

function CountdownWidget({ endDate, className = "" }: { endDate: Date; className?: string }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate);
  return (
    <div className={cn("flex gap-2", className)}>
      {[
        { label: "Days", v: days },
        { label: "Hrs", v: hours },
        { label: "Min", v: minutes },
        { label: "Sec", v: seconds },
      ].map(({ label, v }) => (
        <div key={label} className="flex-1 flex flex-col items-center bg-muted rounded-2xl py-3">
          <span className="text-xl font-bold tabular-nums text-foreground leading-none">
            {String(v).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PrizePoolWidget({ amount, className = "" }: { amount: number; className?: string }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 rounded-3xl p-5 text-white",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center">
            <Crown size={15} className="text-yellow-300" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">Prize Pool</div>
            <div className="text-2xl font-bold leading-tight">${amount.toLocaleString()}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/60 uppercase tracking-wide">Split between</div>
          <div className="text-sm font-semibold">Top 3 creators</div>
        </div>
      </div>
      <div className="flex gap-2">
        {["🥇 $" + Math.round(amount * 0.5).toLocaleString(), "🥈 $" + Math.round(amount * 0.3).toLocaleString(), "🥉 $" + Math.round(amount * 0.2).toLocaleString()].map((p) => (
          <div key={p} className="flex-1 bg-white/10 rounded-xl py-1.5 text-center text-xs font-semibold">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, onClick }: { challenge: Challenge; onClick: () => void }) {
  const diffColor =
    challenge.difficulty === "Advanced"
      ? "warning"
      : challenge.difficulty === "Beginner"
      ? "success"
      : "default";
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="bg-card rounded-3xl overflow-hidden border border-border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-36 object-cover bg-muted"
        />
        {challenge.tag && (
          <div className="absolute top-2.5 left-2.5">
            <Badge variant="purple">{challenge.tag}</Badge>
          </div>
        )}
        <div className="absolute top-2.5 right-2.5">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <DollarSign size={9} className="text-violet-600" />
            <span className="text-[11px] font-bold text-violet-700">{(challenge.prizePool / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex gap-1.5 mb-2">
          <Badge variant="outline">{challenge.category}</Badge>
          <Badge variant={diffColor}>{challenge.difficulty}</Badge>
        </div>
        <h3 className="font-bold text-foreground text-[13px] leading-snug mb-1 line-clamp-2">{challenge.title}</h3>
        <ProgressBar value={challenge.preorderCount} max={challenge.maxUnits} className="my-2" />
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-muted-foreground">{challenge.preorderCount}/{challenge.maxUnits}</span>
          <span className="text-sm font-bold text-foreground">${challenge.price}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Gallery Item Sub-component ───────────────────────────────────────────────

function GalleryItemCard({
  item,
  onVote,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  onVote: () => void;
}) {
  return (
    <div className="rounded-3xl overflow-hidden bg-card border border-border">
      <img src={item.image} alt={item.creator} className="w-full object-cover bg-muted" />
      <div className="p-3">
        <div className="text-xs font-bold text-foreground truncate">{item.creator}</div>
        <div className="text-[10px] text-muted-foreground truncate mb-2.5">{item.challenge}</div>
        <div className="flex items-center justify-between">
          <button
            onClick={onVote}
            className={cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-all",
              item.voted
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <ThumbsUp size={11} className={cn(item.voted && "fill-primary")} />
            {item.likes}
          </button>
          <button className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
            <Share2 size={12} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Sub-components ──────────────────────────────────────────────────

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
        {title}
      </h2>
      <div className="bg-card border border-border rounded-3xl px-4 divide-y divide-border">
        {children}
      </div>
    </div>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  desc,
  toggle,
  checked,
  onToggle,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  desc?: string;
  toggle?: boolean;
  checked?: boolean;
  onToggle?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        {desc && <div className="text-xs text-muted-foreground leading-tight mt-0.5">{desc}</div>}
      </div>
      {toggle && checked !== undefined && onToggle ? (
        <Toggle checked={checked} onChange={onToggle} />
      ) : (
        <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
      )}
    </div>
  );
}

// ─── Screen 1: Landing ────────────────────────────────────────────────────────

function LandingScreen({ navigate }: NavProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featured = CHALLENGES[0];

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-slate-950 via-[#1e1048] to-[#2d1065] px-6 pt-14 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-72 bg-violet-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-5 bg-violet-400 rounded-full" />
            <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">
              Limited-Edition Boxes
            </span>
          </div>
          <h1
            className="text-[42px] font-bold text-white leading-[1.1] mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create.
            <br />
            Compete.
            <br />
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Win.
            </span>
          </h1>
          <p className="text-slate-300 text-[15px] leading-relaxed mb-8 max-w-xs">
            Receive curated creative boxes, complete the challenge, and compete for cash prizes — with 12,400+ creators worldwide.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Btn size="md" onClick={() => navigate("catalog")}>
              Explore Challenges <ArrowRight size={15} />
            </Btn>
            <Btn
              variant="outline"
              size="md"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Play size={14} fill="white" /> Watch Story
            </Btn>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
            {[
              { value: "12.4k", label: "Creators" },
              { value: "$284k", label: "Prizes Paid" },
              { value: "94", label: "Challenges" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Featured Challenge */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Featured Challenge</h2>
            <button
              className="text-sm text-primary font-semibold flex items-center gap-1"
              onClick={() => navigate("catalog")}
            >
              See all <ChevronRight size={13} />
            </button>
          </div>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="relative rounded-3xl overflow-hidden cursor-pointer bg-muted"
            onClick={() => navigate("detail", { challengeId: featured.id })}
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {featured.tag && <Badge variant="purple" className="mb-2">{featured.tag}</Badge>}
              <h3
                className="text-white text-xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featured.title}
              </h3>
              <p className="text-white/70 text-sm mt-0.5">{featured.tagline}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-white/80 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {featured.timeRequired}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {featured.preorderCount} joined
                  </span>
                </div>
                <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-bold">
                  ${featured.price}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Prize Pool */}
        <PrizePoolWidget amount={featured.prizePool} />

        {/* Active Preorders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Active Preorders</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CHALLENGES.slice(1, 5).map((c) => (
              <ChallengeCard
                key={c.id}
                challenge={c}
                onClick={() => navigate("detail", { challengeId: c.id })}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Browse Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {[
              { name: "Photography", emoji: "📷", bg: "bg-indigo-50", text: "text-indigo-700" },
              { name: "Painting", emoji: "🎨", bg: "bg-emerald-50", text: "text-emerald-700" },
              { name: "Drawing", emoji: "✏️", bg: "bg-amber-50", text: "text-amber-700" },
              { name: "Craft", emoji: "🪡", bg: "bg-violet-50", text: "text-violet-700" },
              { name: "Cooking", emoji: "🍴", bg: "bg-rose-50", text: "text-rose-700" },
              { name: "Writing", emoji: "🖋️", bg: "bg-sky-50", text: "text-sky-700" },
            ].map((cat) => (
              <button
                key={cat.name}
                className="flex-shrink-0 flex flex-col items-center gap-2"
                onClick={() => navigate("catalog")}
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-2xl", cat.bg)}>
                  {cat.emoji}
                </div>
                <span className={cn("text-xs font-semibold whitespace-nowrap", cat.text)}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-6">How It Works</h2>
          <div className="space-y-5">
            {[
              { step: "1", title: "Preorder Your Box", desc: "Browse limited-edition challenge boxes and secure your spot before they sell out.", icon: Package, color: "bg-indigo-50 text-indigo-600" },
              { step: "2", title: "Create Your Work", desc: "Receive your curated kit and complete the creative challenge at your own pace.", icon: Zap, color: "bg-violet-50 text-violet-600" },
              { step: "3", title: "Submit & Win", desc: "Upload to the gallery. The community votes, and the top creators earn cash prizes.", icon: Trophy, color: "bg-amber-50 text-amber-600" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", item.color)}>
                  <item.icon size={19} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">
                    Step {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Creator Stories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 bg-card border border-border rounded-3xl p-5"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover bg-muted"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.challenge}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden bg-card">
                <button
                  className="w-full flex items-center justify-between p-4 text-left gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-foreground flex-1 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={15}
                    className={cn(
                      "text-muted-foreground flex-shrink-0 transition-transform duration-200",
                      openFaq === i && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Crown size={14} className="text-white" />
            </div>
            <span className="font-bold text-foreground text-lg" style={{ fontFamily: "var(--font-display)" }}>
              Craftly
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xs">
            Premium creative challenge boxes for makers, artists, and explorers. Limited quantities. Unlimited creativity.
          </p>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-6">
            {["About", "Challenges", "Community", "Careers", "Privacy Policy", "Terms of Use"].map((l) => (
              <button key={l} className="text-left hover:text-foreground transition-colors">
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2025 Craftly Inc. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

// ─── Screen 2: Catalog ────────────────────────────────────────────────────────

function CatalogScreen({ navigate }: NavProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price">("popular");
  const [showSort, setShowSort] = useState(false);

  const filtered = CHALLENGES.filter((c) => {
    const matchesCat = activeCategory === "All" || c.category === activeCategory;
    const matchesSearch =
      search === "" || c.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-foreground">Discover</h1>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted text-sm font-semibold text-muted-foreground"
          >
            <Filter size={14} /> Sort
          </button>
          {showSort && (
            <div className="absolute right-0 top-11 w-40 bg-card border border-border rounded-2xl shadow-xl z-20 overflow-hidden">
              {(["popular", "newest", "price"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => { setSortBy(s); setShowSort(false); }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm capitalize transition-colors",
                    sortBy === s ? "text-primary font-semibold bg-primary/5" : "text-foreground hover:bg-muted"
                  )}
                >
                  {s === "popular" ? "Most Popular" : s === "newest" ? "Newest First" : "Lowest Price"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search challenges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 bg-input-background rounded-2xl pl-10 pr-4 text-sm text-foreground border border-border outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide -mx-4 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-shrink-0 h-9 px-4 rounded-xl text-sm font-semibold transition-all duration-150",
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-4 font-medium">
        {filtered.length} challenge{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((c) => (
          <ChallengeCard
            key={c.id}
            challenge={c}
            onClick={() => navigate("detail", { challengeId: c.id })}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold text-foreground mb-1">No challenges found</p>
          <p className="text-sm text-muted-foreground">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}

// ─── Screen 3: Detail ─────────────────────────────────────────────────────────

function DetailScreen({ navigate, navData }: NavProps) {
  const challengeId = (navData?.challengeId as string) ?? "1";
  const challenge = CHALLENGES.find((c) => c.id === challengeId) ?? CHALLENGES[0];
  const [bookmarked, setBookmarked] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  return (
    <div className="pb-36">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border">
        <button
          onClick={() => navigate("catalog")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-foreground truncate mx-3">Challenge Details</span>
        <div className="flex gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark
              size={16}
              className={cn(bookmarked ? "fill-primary text-primary" : "text-foreground")}
            />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
            <Share2 size={16} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative">
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-64 object-cover bg-muted"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {challenge.tag && (
          <div className="absolute top-4 left-4">
            <Badge variant="purple">{challenge.tag}</Badge>
          </div>
        )}
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Title + meta */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="outline">{challenge.category}</Badge>
            <Badge
              variant={
                challenge.difficulty === "Advanced"
                  ? "warning"
                  : challenge.difficulty === "Beginner"
                  ? "success"
                  : "default"
              }
            >
              {challenge.difficulty}
            </Badge>
            <div className="flex items-center gap-1 ml-auto">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold">{challenge.rating}</span>
              <span className="text-xs text-muted-foreground">({challenge.reviews})</span>
            </div>
          </div>
          <h1
            className="text-2xl font-bold text-foreground mb-1 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {challenge.title}
          </h1>
          <p className="text-muted-foreground text-sm">{challenge.tagline}</p>
        </div>

        {/* Quick meta grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-medium">Time Required</div>
              <div className="font-bold text-sm text-foreground">{challenge.timeRequired}</div>
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-medium">Preorders</div>
              <div className="font-bold text-sm text-foreground">
                {challenge.preorderCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Preorder Progress */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-sm text-foreground">Preorder Progress</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {challenge.maxUnits - challenge.preorderCount} left
            </span>
          </div>
          <ProgressBar value={challenge.preorderCount} max={challenge.maxUnits} showCount />
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((challenge.preorderCount / challenge.maxUnits) * 100)}% of this batch has been claimed
          </p>
        </div>

        {/* Countdown */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-primary" />
            <span className="font-bold text-sm text-foreground">Preorder closes in</span>
          </div>
          <CountdownWidget endDate={challenge.endDate} />
        </div>

        {/* Prize Pool */}
        <PrizePoolWidget amount={challenge.prizePool} />

        {/* Description */}
        <div>
          <h3 className="font-bold text-foreground mb-2">About this challenge</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{challenge.description}</p>
        </div>

        {/* Materials */}
        <div className="border border-border rounded-3xl overflow-hidden bg-card">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => setMaterialsOpen(!materialsOpen)}
          >
            <div className="flex items-center gap-2">
              <Package size={15} className="text-primary" />
              <span className="font-bold text-sm text-foreground">
                What&apos;s Included ({challenge.materials.length} items)
              </span>
            </div>
            <ChevronDown
              size={15}
              className={cn(
                "text-muted-foreground transition-transform duration-200",
                materialsOpen && "rotate-180"
              )}
            />
          </button>
          {materialsOpen && (
            <div className="px-4 pb-4 space-y-2.5 border-t border-border pt-3">
              {challenge.materials.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur-md border-t border-border px-4 pt-4 pb-4 z-30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground font-medium">Price per box</div>
            <div className="text-2xl font-bold text-foreground">${challenge.price}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground font-medium">Prize pool</div>
            <div className="text-lg font-bold text-violet-600">${challenge.prizePool.toLocaleString()}</div>
          </div>
        </div>
        <Btn fullWidth size="lg" onClick={() => navigate("checkout", { challenge })}>
          Preorder Now <ArrowRight size={16} />
        </Btn>
      </div>
    </div>
  );
}

// ─── Screen 4: Checkout ───────────────────────────────────────────────────────

function CheckoutScreen({ navigate, navData }: NavProps) {
  const challenge = (navData?.challenge as Challenge) ?? CHALLENGES[0];
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "",
    card: "", expiry: "", cvv: "",
  });

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2
          className="text-2xl font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Order Confirmed!
        </h2>
        <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
          Your box for <strong>{challenge.title}</strong> is on its way.
        </p>
        <p className="text-muted-foreground mb-8 text-sm">
          You will receive a tracking notification within 3–5 business days.
        </p>
        <Btn onClick={() => navigate("dashboard")}>
          Go to Dashboard <ArrowRight size={15} />
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
        <button
          onClick={() => navigate("detail", { challengeId: challenge.id })}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="font-bold text-foreground flex-1">Checkout</h1>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lock size={12} /> SSL Secured
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 pb-12">
        {/* Order Summary */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="flex gap-4 p-4">
            <img
              src={challenge.image}
              alt={challenge.title}
              className="w-20 h-20 rounded-2xl object-cover bg-muted flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="mb-1">{challenge.category}</Badge>
              <h3 className="font-bold text-foreground text-sm leading-tight">{challenge.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {challenge.difficulty} · {challenge.timeRequired}
              </p>
              <div className="text-lg font-bold text-foreground mt-1">${challenge.price}</div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Eligible for prize pool</span>
            <span className="text-sm font-bold text-violet-600">
              ${challenge.prizePool.toLocaleString()} pool
            </span>
          </div>
        </div>

        {/* Shipping */}
        <div className="space-y-3">
          <h2 className="font-bold text-foreground">Shipping Information</h2>
          <FieldInput
            label="Full Name"
            placeholder="Sofia Martinez"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            icon={User}
          />
          <FieldInput
            label="Email Address"
            type="email"
            placeholder="sofia@email.com"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <FieldInput
            label="Street Address"
            placeholder="123 Creative Lane, Apt 4B"
            value={form.address}
            onChange={(v) => setForm({ ...form, address: v })}
            icon={MapPin}
          />
          <FieldInput
            label="City, Country"
            placeholder="New York, USA"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
          />
        </div>

        {/* Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">Payment</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock size={11} /> Powered by Stripe
            </div>
          </div>
          <FieldInput
            label="Card Number"
            placeholder="4242 4242 4242 4242"
            value={form.card}
            onChange={(v) => setForm({ ...form, card: v })}
            icon={CreditCard}
          />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput
              label="Expiry"
              placeholder="MM / YY"
              value={form.expiry}
              onChange={(v) => setForm({ ...form, expiry: v })}
            />
            <FieldInput
              label="CVV"
              placeholder="•••"
              value={form.cvv}
              onChange={(v) => setForm({ ...form, cvv: v })}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Shield, label: "SSL Secured" },
            { icon: Truck, label: "Free Shipping" },
            { icon: CheckCircle, label: "30-day Guarantee" },
          ].map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-center gap-2 p-3 bg-muted rounded-2xl"
            >
              <t.icon size={18} className="text-primary" />
              <span className="text-[10px] font-semibold text-muted-foreground text-center leading-tight">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Totals + CTA */}
        <div className="border-t border-border pt-4 space-y-2">
          {[
            { label: "Subtotal", value: `$${challenge.price}`, emphasis: false },
            { label: "Shipping", value: "Free", emphasis: true, color: "text-emerald-600" },
            { label: "Tax", value: "$0.00", emphasis: false },
          ].map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className={cn("text-sm font-semibold", row.color ?? "text-foreground")}>
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-foreground text-lg">${challenge.price}</span>
          </div>
          <div className="pt-2">
            <Btn fullWidth size="lg" onClick={() => setOrderPlaced(true)}>
              <Lock size={15} /> Place Order · ${challenge.price}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Dashboard ──────────────────────────────────────────────────────

function DashboardScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Good morning,</p>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Sofia ✦
          </h1>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 bg-muted"
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-7">
        {[
          { label: "Active", value: "2", icon: Zap, bg: "bg-violet-50", iconColor: "text-violet-600" },
          { label: "Completed", value: "14", icon: CheckCircle, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
          { label: "Wins", value: "3", icon: Trophy, bg: "bg-amber-50", iconColor: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-3xl p-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.bg)}>
              <s.icon size={17} className={s.iconColor} />
            </div>
            <div className="text-2xl font-bold text-foreground leading-none mb-1">{s.value}</div>
            <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Challenges */}
      <section className="mb-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Active Challenges</h2>
          <button className="text-sm text-primary font-semibold flex items-center gap-1" onClick={() => navigate("catalog")}>
            Browse <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-3">
          {CHALLENGES.slice(0, 2).map((c) => (
            <div
              key={c.id}
              className="bg-card border border-border rounded-3xl p-4 flex gap-3 items-center cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => navigate("detail", { challengeId: c.id })}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-14 h-14 rounded-2xl object-cover bg-muted flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-foreground truncate">{c.title}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={11} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Closes in</span>
                  <span className="text-xs font-bold text-primary">
                    {Math.floor((c.endDate.getTime() - Date.now()) / 86400000)}d
                  </span>
                </div>
                <ProgressBar value={c.preorderCount} max={c.maxUnits} className="mt-2" />
              </div>
              <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-7">
        <h2 className="text-base font-bold text-foreground mb-4">Achievements</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {[
            { icon: "🏆", name: "First Win", earned: true },
            { icon: "🎨", name: "Painter", earned: true },
            { icon: "📸", name: "Photographer", earned: true },
            { icon: "⭐", name: "Top Rated", earned: false },
            { icon: "🔥", name: "7-Day Streak", earned: false },
            { icon: "👑", name: "Grandmaster", earned: false },
          ].map((a) => (
            <div
              key={a.name}
              className={cn(
                "flex-shrink-0 flex flex-col items-center gap-2 w-20 p-3 rounded-2xl border",
                a.earned ? "border-primary/20 bg-primary/5" : "border-border bg-muted/50"
              )}
            >
              <span className={cn("text-2xl", !a.earned && "grayscale opacity-40")}>{a.icon}</span>
              <span
                className={cn(
                  "text-[10px] font-semibold text-center leading-tight",
                  a.earned ? "text-primary" : "text-muted-foreground"
                )}
              >
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Orders */}
      <section>
        <h2 className="text-base font-bold text-foreground mb-4">Recent Orders</h2>
        <div className="space-y-2">
          {[
            { title: "Origami Architectures", status: "In Transit", date: "Jul 28", price: 119 },
            { title: "Watercolor Dreams", status: "Delivered", date: "Jul 14", price: 74 },
            { title: "Urban Sketch Kit", status: "Completed", date: "Jun 30", price: 95 },
          ].map((o, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{o.title}</div>
                <div className="text-xs text-muted-foreground">{o.date}</div>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    "text-xs font-bold px-2.5 py-1 rounded-full",
                    o.status === "Delivered"
                      ? "bg-emerald-50 text-emerald-700"
                      : o.status === "In Transit"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {o.status}
                </div>
                <div className="text-xs text-muted-foreground mt-1">${o.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Screen 6: Upload ─────────────────────────────────────────────────────────

function UploadScreen({ navigate }: NavProps) {
  const [selectedId, setSelectedId] = useState(CHALLENGES[0].id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-primary" />
        </div>
        <h2
          className="text-2xl font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Creation Submitted!
        </h2>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          Your work has been added to the gallery. The community can now vote for it to win this cycle&apos;s prize pool.
        </p>
        <Btn onClick={() => navigate("gallery")}>
          View in Gallery <ArrowRight size={15} />
        </Btn>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("gallery")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-foreground">Upload Creation</h1>
      </div>

      <div className="space-y-6">
        {/* Challenge selector */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Challenge</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {CHALLENGES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 h-10 px-3 rounded-xl border text-xs font-semibold transition-all",
                  selectedId === c.id
                    ? "border-primary bg-primary/8 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{c.category}</span>
                <span className="opacity-50">·</span>
                <span className="truncate max-w-[80px]">{c.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Photos (up to 3)</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { primary: true, label: "Main photo" },
              { primary: false, label: "Add photo" },
              { primary: false, label: "Add photo" },
            ].map((slot, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all",
                  slot.primary
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted"
                )}
              >
                {slot.primary ? (
                  <>
                    <Camera size={22} className="text-primary" />
                    <span className="text-[10px] font-bold text-primary">Main photo</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">Add photo</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <FieldInput
          label="Title"
          placeholder="My Macro Photography Series"
          value={title}
          onChange={setTitle}
        />

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-foreground">Description</label>
          <textarea
            placeholder="Share the story behind your creation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-input-background rounded-xl border border-border text-foreground text-sm p-4 outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/60"
          />
          <span className="text-xs text-muted-foreground text-right">
            {description.length} / 500
          </span>
        </div>

        <Btn fullWidth size="lg" onClick={() => setSubmitted(true)}>
          <Send size={15} /> Submit to Gallery
        </Btn>
      </div>
    </div>
  );
}

// ─── Screen 7: Gallery ────────────────────────────────────────────────────────

function GalleryScreen({ navigate }: NavProps) {
  const [items, setItems] = useState(GALLERY_ITEMS);
  const [filter, setFilter] = useState("All");

  const toggleVote = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, voted: !item.voted, likes: item.voted ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
        <button
          onClick={() => navigate("upload")}
          className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25"
        >
          <Plus size={18} className="text-white" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide -mx-4 px-4">
        {["All", "Photography", "Painting", "Drawing", "Craft", "Cooking"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-shrink-0 h-9 px-4 rounded-xl text-sm font-semibold transition-all",
              filter === f
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Gallery stats */}
      <div className="flex gap-4 mb-5 text-xs text-muted-foreground font-medium">
        <span className="flex items-center gap-1"><ImageIcon size={12} /> {items.length} creations</span>
        <span className="flex items-center gap-1"><Heart size={12} /> {items.reduce((s, i) => s + i.likes, 0).toLocaleString()} likes</span>
      </div>

      {/* Masonry */}
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-3">
          {left.map((item) => (
            <GalleryItemCard key={item.id} item={item} onVote={() => toggleVote(item.id)} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-3 mt-8">
          {right.map((item) => (
            <GalleryItemCard key={item.id} item={item} onVote={() => toggleVote(item.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 8: Leaderboard ────────────────────────────────────────────────────

function LeaderboardScreen() {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "alltime">("monthly");

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-slate-950 via-[#1e1048] to-[#2d1065] px-4 pt-10 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Leaderboard
          </h1>
          <p className="text-slate-300 text-sm mb-5">Top creators competing for $4,000</p>

          {/* Period tabs */}
          <div className="flex gap-1 bg-white/10 rounded-2xl p-1 mb-8">
            {(["weekly", "monthly", "alltime"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "flex-1 h-9 rounded-xl text-sm font-semibold transition-all",
                  period === p ? "bg-white text-slate-900" : "text-white/70 hover:text-white"
                )}
              >
                {p === "weekly" ? "Weekly" : p === "monthly" ? "Monthly" : "All Time"}
              </button>
            ))}
          </div>

          {/* Podium */}
          <div className="flex items-end justify-center gap-3 pb-0">
            {/* 2nd */}
            <div className="flex flex-col items-center mb-0">
              <img
                src={LEADERBOARD[1].avatar}
                alt={LEADERBOARD[1].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-400 bg-muted"
              />
              <div className="mt-1.5 text-white text-xs font-bold text-center">
                {LEADERBOARD[1].name.split(" ")[0]}
              </div>
              <div className="text-slate-300 text-[10px]">
                {LEADERBOARD[1].points.toLocaleString()} pts
              </div>
              <div className="w-16 h-10 bg-slate-600/40 rounded-t-xl flex items-center justify-center mt-2">
                <span className="text-slate-300 font-bold text-lg">2</span>
              </div>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center -mt-4">
              <Crown size={18} className="text-yellow-400 mb-1" />
              <img
                src={LEADERBOARD[0].avatar}
                alt={LEADERBOARD[0].name}
                className="w-16 h-16 rounded-full object-cover border-[3px] border-yellow-400 bg-muted"
              />
              <div className="mt-1.5 text-white text-sm font-bold text-center">
                {LEADERBOARD[0].name.split(" ")[0]}
              </div>
              <div className="text-yellow-300 text-[10px]">
                {LEADERBOARD[0].points.toLocaleString()} pts
              </div>
              <div className="w-20 h-14 bg-yellow-500/20 rounded-t-xl flex items-center justify-center mt-2 border-t border-yellow-400/30">
                <span className="text-yellow-300 font-bold text-2xl">1</span>
              </div>
            </div>
            {/* 3rd */}
            <div className="flex flex-col items-center mb-0">
              <img
                src={LEADERBOARD[2].avatar}
                alt={LEADERBOARD[2].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-600 bg-muted"
              />
              <div className="mt-1.5 text-white text-xs font-bold text-center">
                {LEADERBOARD[2].name.split(" ")[0]}
              </div>
              <div className="text-slate-300 text-[10px]">
                {LEADERBOARD[2].points.toLocaleString()} pts
              </div>
              <div className="w-16 h-6 bg-amber-700/30 rounded-t-xl flex items-center justify-center mt-2">
                <span className="text-amber-500 font-bold text-lg">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Prize", value: "$4,800", icon: DollarSign },
            { label: "Participants", value: "847", icon: Users },
            { label: "Challenges", value: "94", icon: Trophy },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <s.icon size={16} className="text-primary mx-auto mb-1" />
              <div className="font-bold text-foreground text-base leading-none mb-0.5">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Rankings */}
        <div>
          <h2 className="font-bold text-foreground mb-3">Full Rankings</h2>
          <div className="space-y-2">
            {LEADERBOARD.map((u, i) => (
              <div
                key={u.rank}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-3xl border",
                  i < 3 ? "bg-card border-primary/15 shadow-sm" : "bg-card border-border"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0",
                    i === 0
                      ? "bg-yellow-100 text-yellow-700"
                      : i === 1
                      ? "bg-slate-100 text-slate-600"
                      : i === 2
                      ? "bg-amber-50 text-amber-700"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {u.rank}
                </div>
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-full object-cover bg-muted flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-foreground truncate">{u.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge
                      variant={
                        u.badge === "Grandmaster"
                          ? "purple"
                          : u.badge === "Expert"
                          ? "success"
                          : "default"
                      }
                    >
                      {u.badge}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{u.wins} wins</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-foreground text-sm">
                    {u.points.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 9: Profile ────────────────────────────────────────────────────────

function ProfileScreen({ navigate }: NavProps) {
  return (
    <div>
      {/* Cover */}
      <div className="relative h-36 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <button
          className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
          onClick={() => navigate("settings")}
        >
          <Settings size={16} className="text-white" />
        </button>
        <button
          className="absolute top-4 right-14 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
        >
          <Bell size={16} className="text-white" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="flex items-end justify-between -mt-8 mb-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format"
              alt="Profile"
              className="w-20 h-20 rounded-3xl border-4 border-background object-cover bg-muted shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-xl flex items-center justify-center border-2 border-background">
              <Crown size={11} className="text-white" />
            </div>
          </div>
          <div className="flex gap-2 mb-1">
            <Btn variant="outline" size="sm" onClick={() => navigate("dashboard")}>
              Dashboard
            </Btn>
            <Btn size="sm">
              <Edit size={13} /> Edit
            </Btn>
          </div>
        </div>

        <h1
          className="text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sofia Martinez
        </h1>
        <p className="text-sm text-muted-foreground mb-1">
          @sofia_creates &middot; New York, USA
        </p>
        <p className="text-sm text-foreground leading-relaxed mb-5 max-w-xs">
          Visual artist & photographer. Passionate about macro photography, watercolors, and exploring creative challenges. Grandmaster creator.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { value: "4,820", label: "Points" },
            { value: "7", label: "Wins" },
            { value: "14", label: "Entries" },
            { value: "2.4k", label: "Likes" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-muted rounded-2xl py-3">
              <div className="font-bold text-foreground text-base leading-none mb-0.5">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h2 className="font-bold text-foreground mb-3">Achievements</h2>
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-4 px-4">
          {[
            { icon: "🏆", name: "First Win" },
            { icon: "🎨", name: "Painter" },
            { icon: "📸", name: "Photographer" },
            { icon: "⭐", name: "Top Rated" },
            { icon: "👑", name: "Grandmaster" },
          ].map((a) => (
            <div
              key={a.name}
              className="flex-shrink-0 flex flex-col items-center gap-2 w-20 p-3 rounded-2xl bg-primary/5 border border-primary/15"
            >
              <span className="text-2xl">{a.icon}</span>
              <span className="text-[10px] font-bold text-primary text-center leading-tight">
                {a.name}
              </span>
            </div>
          ))}
        </div>

        {/* Creations */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">Creations</h2>
          <span className="text-xs text-muted-foreground font-medium">6 works</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="aspect-square rounded-2xl overflow-hidden bg-muted relative group cursor-pointer">
              <img src={item.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <div className="flex items-center gap-1 text-white text-[10px] font-semibold">
                  <Heart size={10} className="fill-white" /> {item.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 10: Settings ──────────────────────────────────────────────────────

function SettingsScreen({ navigate }: NavProps) {
  const [notifs, setNotifs] = useState({
    newChallenges: true,
    voteReminders: true,
    winAlerts: true,
    marketing: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showActivity: true,
  });

  return (
    <div className="px-4 py-4 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("profile")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-3xl p-4 flex items-center gap-4 mb-7">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
          alt="Profile"
          className="w-14 h-14 rounded-2xl object-cover bg-muted flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-foreground">Sofia Martinez</div>
          <div className="text-sm text-muted-foreground truncate">sofia@email.com</div>
          <Badge variant="purple" className="mt-1.5">Grandmaster</Badge>
        </div>
        <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
      </div>

      {/* Notifications */}
      <SettingsSection title="Notifications">
        <SettingsRow
          icon={Bell}
          label="New Challenges"
          desc="When new boxes become available"
          toggle
          checked={notifs.newChallenges}
          onToggle={(v) => setNotifs({ ...notifs, newChallenges: v })}
        />
        <SettingsRow
          icon={Clock}
          label="Vote Reminders"
          desc="When voting is about to close"
          toggle
          checked={notifs.voteReminders}
          onToggle={(v) => setNotifs({ ...notifs, voteReminders: v })}
        />
        <SettingsRow
          icon={Trophy}
          label="Win Alerts"
          desc="When you win a prize"
          toggle
          checked={notifs.winAlerts}
          onToggle={(v) => setNotifs({ ...notifs, winAlerts: v })}
        />
        <SettingsRow
          icon={Star}
          label="Marketing"
          desc="Promotional offers and news"
          toggle
          checked={notifs.marketing}
          onToggle={(v) => setNotifs({ ...notifs, marketing: v })}
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection title="Privacy">
        <SettingsRow
          icon={User}
          label="Public Profile"
          desc="Anyone can view your profile"
          toggle
          checked={privacy.publicProfile}
          onToggle={(v) => setPrivacy({ ...privacy, publicProfile: v })}
        />
        <SettingsRow
          icon={Eye}
          label="Show Activity"
          desc="Display your challenge activity"
          toggle
          checked={privacy.showActivity}
          onToggle={(v) => setPrivacy({ ...privacy, showActivity: v })}
        />
      </SettingsSection>

      {/* Account */}
      <SettingsSection title="Account">
        <SettingsRow icon={CreditCard} label="Payment Methods" />
        <SettingsRow icon={MapPin} label="Saved Addresses" />
        <SettingsRow icon={Award} label="Membership & Plan" />
        <SettingsRow icon={HelpCircle} label="Help & Support" />
      </SettingsSection>

      {/* Danger */}
      <button className="w-full flex items-center justify-center gap-2 h-13 py-3.5 rounded-2xl border border-destructive/30 text-destructive font-semibold text-sm mb-6 mt-2 hover:bg-destructive/5 transition-colors">
        <LogOut size={15} />
        Log Out
      </button>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────

const NAV_TABS = [
  { screen: "landing" as Screen, icon: Home, label: "Home" },
  { screen: "catalog" as Screen, icon: Search, label: "Discover" },
  { screen: "gallery" as Screen, icon: ImageIcon, label: "Gallery" },
  { screen: "leaderboard" as Screen, icon: Trophy, label: "Ranks" },
  { screen: "profile" as Screen, icon: User, label: "Profile" },
];

function getActiveTab(screen: Screen): Screen {
  if (screen === "detail" || screen === "checkout") return "catalog";
  if (screen === "upload") return "gallery";
  if (screen === "dashboard" || screen === "settings") return "profile";
  return screen;
}

function BottomNav({
  active,
  navigate,
}: {
  active: Screen;
  navigate: (screen: Screen) => void;
}) {
  const activeTab = getActiveTab(active);
  return (
    <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center px-2 py-1">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => navigate(tab.screen)}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 transition-all duration-150",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "w-10 h-7 flex items-center justify-center rounded-xl transition-all duration-150",
                  isActive ? "bg-primary/10" : "bg-transparent"
                )}
              >
                <tab.icon size={19} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [navData, setNavData] = useState<Record<string, unknown>>({});

  const navigate = (s: Screen, data?: Record<string, unknown>) => {
    setScreen(s);
    setNavData(data ?? {});
    // Scroll to top on navigate
    const main = document.getElementById("app-main");
    if (main) main.scrollTop = 0;
  };

  const props: NavProps = { navigate, navData };

  return (
    <div className="min-h-screen bg-slate-900 sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="relative w-full sm:max-w-[430px] min-h-screen sm:min-h-0 sm:h-[900px] bg-background flex flex-col sm:rounded-[40px] sm:overflow-hidden shadow-2xl">
        <main
          id="app-main"
          className="flex-1 overflow-y-auto scrollbar-hide"
        >
          {screen === "landing" && <LandingScreen {...props} />}
          {screen === "catalog" && <CatalogScreen {...props} />}
          {screen === "detail" && <DetailScreen {...props} />}
          {screen === "checkout" && <CheckoutScreen {...props} />}
          {screen === "dashboard" && <DashboardScreen {...props} />}
          {screen === "upload" && <UploadScreen {...props} />}
          {screen === "gallery" && <GalleryScreen {...props} />}
          {screen === "leaderboard" && <LeaderboardScreen />}
          {screen === "profile" && <ProfileScreen {...props} />}
          {screen === "settings" && <SettingsScreen {...props} />}
        </main>
        <BottomNav active={screen} navigate={navigate} />
      </div>
    </div>
  );
}
