import React, { useState, useEffect, type ComponentType } from "react";
import HeaderHero from './components/HeaderHero';
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
  HelpCircle, Truck, Plus, Send, Play,
  Bell, Eye
} from "lucide-react";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "landing" | "catalog" | "detail" | "checkout"
  | "dashboard" | "upload" | "gallery"
  | "leaderboard" | "profile" | "settings";

type DropStatus =
  | "coming-soon" | "live" | "production"
  | "shipping" | "challenge" | "voting" | "finished";

type DropCategory = "Wearable" | "Sculpture" | "Decor";

interface Drop {
  id: string;
  dropNumber: string;
  title: string;
  theme: string;
  description: string;
  price: number;
  currency: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: DropCategory;
  materials: string[];
  prizePool: number;
  preorderCount: number;
  maxUnits: number;
  endDate: Date;
  image: string;
  status: DropStatus;
  tag?: string;
  rating: number;
  reviews: number;
}

interface NavProps {
  navigate: (screen: Screen, data?: Record<string, unknown>) => void;
  navData?: Record<string, unknown>;
}

// ─── Official Drops ───────────────────────────────────────────────────────────

const DROPS: Drop[] = [
  {
    id: "1",
    dropNumber: "001",
    title: "Tote Bag",
    theme: "Create a unique tote bag using only the materials included in the box.",
    description:
      "Your canvas. Bold and blank. DROP #001 gives you everything needed to turn a premium cotton tote into a wearable piece of art — no experience required, just intention. All 100 editions share the same starting point. None will look alike. The most voted creation takes the prize.",
    price: 35,
    currency: "€",
    difficulty: "Beginner",
    category: "Wearable",
    materials: [
      "Premium cotton tote bag — natural",
      "Fabric paint set — 8 colors",
      "Brush set — 4 sizes",
      "Geometric stencil kit — 6 shapes",
      "Masking tape & disposable palette",
    ],
    prizePool: 500,
    preorderCount: 73,
    maxUnits: 100,
    endDate: new Date(Date.now() + 2 * 86400000 + 8 * 3600000),
    image: "https://images.unsplash.com/photo-1576695139696-e053aae84148?w=800&h=900&fit=crop&auto=format",
    status: "live",
    tag: "Almost Full",
    rating: 4.9,
    reviews: 12,
  },
  {
    id: "2",
    dropNumber: "002",
    title: "Balaclava",
    theme: "Transform a premium balaclava into a unique wearable artwork.",
    description:
      "The balaclava is your blank statement. Embroider it, paint it, cut it, layer it — anything goes as long as you use only what is in the box. 100 creators. One prize pool. Zero rules beyond the materials.",
    price: 39,
    currency: "€",
    difficulty: "Beginner",
    category: "Wearable",
    materials: [
      "Premium knit balaclava — black",
      "Embroidery thread set — 12 colors",
      "Needle set — 6 sizes",
      "Fabric paint markers — 8 colors",
      "Iron-on transfer paper — 3 sheets",
    ],
    prizePool: 600,
    preorderCount: 45,
    maxUnits: 100,
    endDate: new Date(Date.now() + 5 * 86400000 + 3 * 3600000),
    image: "https://images.unsplash.com/photo-1693250698665-52f7a27f3ce9?w=800&h=900&fit=crop&auto=format",
    status: "live",
    rating: 4.7,
    reviews: 8,
  },
  {
    id: "3",
    dropNumber: "003",
    title: "Animal Creator — FOX",
    theme: "Paint an exclusive 3D printed collectible animal. Each edition features a different exclusive model.",
    description:
      "An exclusive 3D printed fox model, designed only for this drop. Paint it, texture it, detail it — then photograph your creation and submit to the gallery. The rarest interpretations win. Strictly limited to 100 in existence worldwide.",
    price: 49,
    currency: "€",
    difficulty: "Intermediate",
    category: "Sculpture",
    materials: [
      "Exclusive 3D printed fox figurine",
      "Acrylic paint set — 12 colors",
      "Fine detail brush set — 5 pieces",
      "Ceramic palette & mixing tray",
      "UV-finish varnish + display stand",
    ],
    prizePool: 800,
    preorderCount: 28,
    maxUnits: 100,
    endDate: new Date(Date.now() + 8 * 86400000 + 12 * 3600000),
    image: "https://images.unsplash.com/photo-1782877757096-817463a79dcb?w=800&h=900&fit=crop&auto=format",
    status: "live",
    tag: "Exclusive",
    rating: 5.0,
    reviews: 5,
  },
  {
    id: "4",
    dropNumber: "004",
    title: "FIMO Legends",
    theme: "Create an original fantasy creature using only the clay and tools included in the box.",
    description:
      "Shape something that has never existed before. With FIMO clay and sculpting tools, build your own legend — a creature, a character, a being entirely your own. No templates, no guides. Only what your hands can imagine and make.",
    price: 39,
    currency: "€",
    difficulty: "Beginner",
    category: "Sculpture",
    materials: [
      "FIMO effect clay — 8 colors",
      "Sculpting tool set — 6 pieces",
      "Texture stamp set — 4 stamps",
      "Wire armature — 2 sizes",
      "Baking guide & ceramic display base",
    ],
    prizePool: 600,
    preorderCount: 12,
    maxUnits: 150,
    endDate: new Date(Date.now() + 14 * 86400000),
    image: "https://images.unsplash.com/photo-1632928941114-a919da3cd351?w=800&h=900&fit=crop&auto=format",
    status: "coming-soon",
    rating: 0,
    reviews: 0,
  },
  {
    id: "5",
    dropNumber: "005",
    title: "Mosaic Art",
    theme: "Assemble a modern decorative mosaic using only the provided pieces.",
    description:
      "Precision meets creativity. Each box contains the exact same set of pieces — but no two mosaics will ever look alike. Your composition, your palette arrangement, your vision. 150 editions, framed and ready to display.",
    price: 45,
    currency: "€",
    difficulty: "Beginner",
    category: "Decor",
    materials: [
      "Pre-cut mosaic tiles — 250+ pieces",
      "Adhesive & grout kit",
      "Precision tile cutter",
      "Protective gloves",
      "30 × 30 cm display frame",
    ],
    prizePool: 700,
    preorderCount: 8,
    maxUnits: 150,
    endDate: new Date(Date.now() + 21 * 86400000),
    image: "https://images.unsplash.com/photo-1622227920933-7fcd7377703f?w=800&h=900&fit=crop&auto=format",
    status: "coming-soon",
    rating: 0,
    reviews: 0,
  },
  {
    id: "6",
    dropNumber: "006",
    title: "Diorama Builder",
    theme: "Build an entire miniature scene and your own characters or creatures to live inside, using only the contents of the box. No external materials allowed.",
    description:
      "Build a world from scratch. Terrain, atmosphere, characters — everything must come from inside the box. This is the most ambitious drop yet. A miniature universe, entirely yours, judged on storytelling as much as craft.",
    price: 59,
    currency: "€",
    difficulty: "Intermediate",
    category: "Decor",
    materials: [
      "Foam terrain base — 20 × 20 cm",
      "Plaster powder & texture paste",
      "Miniature flora & sand set",
      "FIMO clay for characters",
      "Acrylic paint set + fine brushes",
      "Wire armature & finishing materials",
    ],
    prizePool: 900,
    preorderCount: 5,
    maxUnits: 100,
    endDate: new Date(Date.now() + 28 * 86400000),
    image: "https://images.unsplash.com/photo-1776315670856-9fcc0a08bfec?w=800&h=900&fit=crop&auto=format",
    status: "coming-soon",
    tag: "Most Ambitious",
    rating: 0,
    reviews: 0,
  },
  {
    id: "7",
    dropNumber: "007",
    title: "Hoodie Artist Edition",
    theme: "Transform a premium hoodie into a unique wearable piece of art.",
    description:
      "The most wearable canvas yet. A premium-weight hoodie, a full creative toolkit, and 100 creators with the same starting point but completely different visions. The most iconic submission wins.",
    price: 69,
    currency: "€",
    difficulty: "Intermediate",
    category: "Wearable",
    materials: [
      "Premium heavyweight hoodie — choice of size",
      "Fabric paint set — 12 colors",
      "Stencil & masking kit",
      "Heat-fix rhinestones — 200 pieces",
      "Tie-dye & discharge paste kit",
      "Iron-on patch collection — 8 pieces",
    ],
    prizePool: 1200,
    preorderCount: 3,
    maxUnits: 100,
    endDate: new Date(Date.now() + 35 * 86400000),
    image: "https://images.unsplash.com/photo-1516195851888-6f1a981a862e?w=800&h=900&fit=crop&auto=format",
    status: "coming-soon",
    rating: 0,
    reviews: 0,
  },
  {
    id: "8",
    dropNumber: "008",
    title: "Duo Creator — Your Mine",
    theme: "Two people collaborate to create a matching wearable artwork that only makes sense when both pieces are brought together. Built to show and share your love.",
    description:
      "One box. Two people. A creation that only makes sense when you are together. Each box contains two matching t-shirts and a split-design system — your half and their half. Designed for pairs who want to wear their story.",
    price: 79,
    currency: "€",
    difficulty: "Beginner",
    category: "Wearable",
    materials: [
      "2× premium cotton t-shirts",
      "Split-design stencil system — 2 halves",
      "Shared fabric paint set — 8 colors",
      "Brush set for two",
      "Heat transfer paper & instructions",
      "Matching gift packaging",
    ],
    prizePool: 1500,
    preorderCount: 0,
    maxUnits: 75,
    endDate: new Date(Date.now() + 42 * 86400000),
    image: "https://images.unsplash.com/photo-1687565204876-71763889df13?w=800&h=900&fit=crop&auto=format",
    status: "coming-soon",
    tag: "Duo",
    rating: 0,
    reviews: 0,
  },
];

const LIVE_DROPS = DROPS.filter((d) => d.status === "live");
const UPCOMING_DROPS = DROPS.filter((d) => d.status === "coming-soon");

const GALLERY_ITEMS = [
  { id: "1", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop&auto=format", creator: "Sofia M.", likes: 342, drop: "DROP #001 — Tote Bag", voted: false },
  { id: "2", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=320&fit=crop&auto=format", creator: "James K.", likes: 218, drop: "DROP #002 — Balaclava", voted: false },
  { id: "3", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=440&fit=crop&auto=format", creator: "Yuki T.", likes: 495, drop: "DROP #003 — Fox", voted: true },
  { id: "4", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=560&fit=crop&auto=format", creator: "Ana L.", likes: 671, drop: "DROP #001 — Tote Bag", voted: false },
  { id: "5", image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=480&fit=crop&auto=format", creator: "Priya S.", likes: 412, drop: "DROP #002 — Balaclava", voted: false },
  { id: "6", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=360&fit=crop&auto=format", creator: "Lucas B.", likes: 287, drop: "DROP #003 — Fox", voted: false },
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
  { name: "Sofia M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", text: "The Tote Bag drop completely changed how I think about everyday objects. Every material was chosen with care, and the competition made every brushstroke feel intentional.", rating: 5, drop: "DROP #001 — Tote Bag" },
  { name: "James K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", text: "I won the Balaclava drop. The prize was real, but the skill I built and the community I found were the actual rewards. This is not a product — it is an event.", rating: 5, drop: "DROP #002 — Balaclava" },
  { name: "Yuki T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", text: "Painting the Fox figurine was meditative. The 3D model was stunning even before I touched it. I submitted something I am genuinely proud of.", rating: 5, drop: "DROP #003 — Fox" },
];

const FAQS = [
  { q: "What exactly is inside each box?", a: "Every Drop contains a curated set of premium materials specific to that challenge. The full materials list is displayed on each Drop page before you preorder." },
  { q: "When do I receive my box?", a: "Boxes ship within 3–5 business days after the preorder period closes. You receive a tracking number via email once dispatched." },
  { q: "How are winners selected?", a: "Community votes count for 60% of the final score. Our expert jury accounts for the remaining 40%. Voting opens the day after submission closes." },
  { q: "Can I join multiple Drops at once?", a: "Yes — you can preorder as many active Drops as you like. Each box is an independent creative event with its own prize pool." },
  { q: "What if I am unhappy with my box?", a: "We offer a 30-day satisfaction guarantee. If any item falls below our quality standard, we replace it or refund you — no questions asked." },
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
  children, variant = "primary", size = "md",
  className = "", onClick, disabled = false, fullWidth = false,
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
  children, variant = "default", className = "",
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

function StatusBadge({ status, className = "" }: { status: DropStatus; className?: string }) {
  const config: Record<DropStatus, { label: string; cls: string; pulse?: boolean }> = {
    "live": { label: "Live", cls: "bg-emerald-50 text-emerald-700 border border-emerald-200", pulse: true },
    "coming-soon": { label: "Coming Soon", cls: "bg-amber-50 text-amber-700 border border-amber-200" },
    "production": { label: "In Production", cls: "bg-blue-50 text-blue-700 border border-blue-200" },
    "shipping": { label: "Shipping", cls: "bg-sky-50 text-sky-700 border border-sky-200" },
    "challenge": { label: "Challenge Open", cls: "bg-violet-100 text-violet-700 border border-violet-200" },
    "voting": { label: "Voting", cls: "bg-orange-50 text-orange-700 border border-orange-200" },
    "finished": { label: "Finished", cls: "bg-muted text-muted-foreground border border-border" },
  };
  const c = config[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full", c.cls, className)}>
      {c.pulse ? (
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
      ) : null}
      {c.label}
    </span>
  );
}

function ProgressBar({
  value, max = 100, showCount = false, label, className = "", light = false,
}: {
  value: number; max?: number; showCount?: boolean; label?: string; className?: string; light?: boolean;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={cn("w-full", className)}>
      {(label || showCount) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className={cn("text-xs font-medium", light ? "text-white/60" : "text-muted-foreground")}>{label}</span>}
          {showCount && (
            <span className={cn("text-xs font-bold", light ? "text-white" : "text-foreground")}>
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className={cn("h-1.5 rounded-full overflow-hidden", light ? "bg-white/15" : "bg-muted")}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function FieldInput({
  label, placeholder, type = "text", value = "", onChange, icon: Icon,
}: {
  label?: string; placeholder?: string; type?: string; value?: string;
  onChange?: (v: string) => void;
  icon?: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-foreground">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />}
        <input
          type={type} placeholder={placeholder} value={value}
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
      <span className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200", checked ? "translate-x-[22px]" : "translate-x-0.5")} />
    </button>
  );
}

function MiniCountdown({ endDate }: { endDate: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate);
  if (days > 0) return <span className="tabular-nums">{days}d {hours}h</span>;
  if (hours > 0) return <span className="tabular-nums">{hours}h {minutes}m</span>;
  return <span className="tabular-nums">{minutes}m {seconds}s</span>;
}

function CountdownWidget({ endDate, className = "", light = false }: { endDate: Date; className?: string; light?: boolean }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate);
  return (
    <div className={cn("flex gap-2", className)}>
      {[{ label: "Days", v: days }, { label: "Hrs", v: hours }, { label: "Min", v: minutes }, { label: "Sec", v: seconds }].map(({ label, v }) => (
        <div key={label} className={cn("flex-1 flex flex-col items-center rounded-2xl py-3", light ? "bg-white/10" : "bg-muted")}>
          <span className={cn("text-xl font-bold tabular-nums leading-none", light ? "text-white" : "text-foreground")}>
            {String(v).padStart(2, "0")}
          </span>
          <span className={cn("text-[10px] font-bold uppercase tracking-wider mt-1", light ? "text-white/50" : "text-muted-foreground")}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Drop Card ────────────────────────────────────────────────────────────────

function DropCard({ drop, onClick, compact = false }: { drop: Drop; onClick: () => void; compact?: boolean }) {
  const remaining = drop.maxUnits - drop.preorderCount;
  const pct = Math.round((drop.preorderCount / drop.maxUnits) * 100);
  const isLive = drop.status === "live";

  if (compact) {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className="bg-card rounded-3xl overflow-hidden border border-border cursor-pointer shadow-sm"
      >
        <div className="relative">
          <img src={drop.image} alt={drop.title} className="w-full h-36 object-cover bg-muted" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">
              DROP #{drop.dropNumber}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <StatusBadge status={drop.status} />
          </div>
          <div className="absolute bottom-2.5 right-2.5">
            <span className="bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-sm font-bold text-foreground">
              {drop.currency}{drop.price}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-bold text-foreground text-[13px] leading-snug mb-2">{drop.title}</h3>
          <ProgressBar value={drop.preorderCount} max={drop.maxUnits} className="mb-1.5" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground font-medium">{drop.preorderCount}/{drop.maxUnits}</span>
            {isLive && (
              <span className="text-[11px] font-bold text-rose-600">{remaining} left</span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="bg-card rounded-3xl overflow-hidden border border-border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img src={drop.image} alt={drop.title} className="w-full h-52 object-cover bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">
            DROP #{drop.dropNumber}
          </span>
          {drop.tag && (
            <span className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-2 py-0.5 text-[10px] font-bold text-white">
              {drop.tag}
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <StatusBadge status={drop.status} />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-white text-xl font-bold leading-tight">
              {drop.title}
            </h3>
            <Badge
              variant={drop.difficulty === "Intermediate" ? "warning" : "success"}
              className="mt-1.5"
            >
              {drop.difficulty}
            </Badge>
          </div>
          <div className="flex-shrink-0 ml-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-1.5 text-right">
              <div className="text-lg font-bold text-foreground leading-tight">{drop.currency}{drop.price}</div>
              <div className="text-[10px] text-muted-foreground font-medium">per box</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{drop.theme}</p>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">{drop.preorderCount} / {drop.maxUnits} reserved</span>
            {isLive ? (
              <span className="text-sm font-bold text-rose-600">{remaining} spots left</span>
            ) : (
              <span className="text-xs text-muted-foreground font-medium">{pct}% early access</span>
            )}
          </div>
          <ProgressBar value={drop.preorderCount} max={drop.maxUnits} />
        </div>

        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-violet-50 rounded-2xl px-3 py-2">
            <Crown size={13} className="text-violet-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-violet-500 font-medium uppercase tracking-wide">Prize Pool</div>
              <div className="text-sm font-bold text-violet-700">{drop.currency}{drop.prizePool.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-2xl px-3 py-2">
            <Clock size={13} className="text-muted-foreground flex-shrink-0" />
            <div>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                {isLive ? "Closes in" : "Opens in"}
              </div>
              <div className="text-sm font-bold text-foreground">
                <MiniCountdown endDate={drop.endDate} />
              </div>
            </div>
          </div>
        </div>

        <Btn fullWidth size="md" onClick={onClick}>
          View Challenge <ArrowRight size={15} />
        </Btn>
      </div>
    </motion.div>
  );
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────

function GalleryItemCard({ item, onVote }: { item: (typeof GALLERY_ITEMS)[0]; onVote: () => void }) {
  return (
    <div className="rounded-3xl overflow-hidden bg-card border border-border">
      <img src={item.image} alt={item.creator} className="w-full object-cover bg-muted" />
      <div className="p-3">
        <div className="text-xs font-bold text-foreground truncate">{item.creator}</div>
        <div className="text-[10px] text-muted-foreground truncate mb-2.5">{item.drop}</div>
        <div className="flex items-center justify-between">
          <button
            onClick={onVote}
            className={cn("flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-all",
              item.voted ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"
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

// ─── Settings Helpers ─────────────────────────────────────────────────────────

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">{title}</h2>
      <div className="bg-card border border-border rounded-3xl px-4 divide-y divide-border">{children}</div>
    </div>
  );
}

function SettingsRow({
  icon: Icon, label, desc, toggle, checked, onToggle,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string; desc?: string;
  toggle?: boolean; checked?: boolean; onToggle?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        {desc && <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>}
      </div>
      {toggle && checked !== undefined && onToggle ? (
        <Toggle checked={checked} onChange={onToggle} />
      ) : (
        <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
      )}
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function LandingScreen({ navigate }: NavProps) {
  return (
    <div className="space-y-8 pb-12">
      <section className="px-4 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Active Drops</h2>
          <button onClick={() => navigate("catalog")} className="text-xs font-bold text-primary flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LIVE_DROPS.map((drop) => (
            <DropCard key={drop.id} drop={drop} onClick={() => navigate("detail", { dropId: drop.id })} />
          ))}
        </div>
      </section>

      <section className="px-4 max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Upcoming Drops</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {UPCOMING_DROPS.slice(0, 4).map((drop) => (
            <DropCard key={drop.id} drop={drop} compact onClick={() => navigate("detail", { dropId: drop.id })} />
          ))}
        </div>
      </section>

      <section className="px-4 max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Community Showcase</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_ITEMS.slice(0, 3).map((item) => (
            <GalleryItemCard key={item.id} item={item} onVote={() => {}} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CatalogScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-black uppercase tracking-tight">All Drops</h1>
        <p className="text-xs font-semibold text-muted-foreground">Discover physical creation kits and join the competition.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DROPS.map((drop) => (
          <DropCard key={drop.id} drop={drop} onClick={() => navigate("detail", { dropId: drop.id })} />
        ))}
      </div>
    </div>
  );
}

function DetailScreen({ navigate, navData }: NavProps) {
  const dropId = (navData?.dropId as string) || "1";
  const drop = DROPS.find((d) => d.id === dropId) || DROPS[0];

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate("catalog")} className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
        <ChevronLeft size={16} /> Back to drops
      </button>

      <div className="rounded-3xl overflow-hidden border border-border bg-card">
        <img src={drop.image} alt={drop.title} className="w-full h-64 object-cover" />
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">DROP #{drop.dropNumber}</span>
              <h1 className="text-3xl font-black uppercase tracking-tight">{drop.title}</h1>
            </div>
            <StatusBadge status={drop.status} />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{drop.description}</p>

          <CountdownWidget endDate={drop.endDate} />

          <div className="border-t border-border pt-4">
            <h3 className="font-bold text-sm mb-3">Included Materials</h3>
            <ul className="space-y-2">
              {drop.materials.map((m, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Check size={14} className="text-emerald-500" /> {m}
                </li>
              ))}
            </ul>
          </div>

          <Btn fullWidth size="lg" onClick={() => navigate("checkout", { dropId: drop.id })}>
            Preorder Now — {drop.currency}{drop.price}
          </Btn>
        </div>
      </div>
    </div>
  );
}

function CheckoutScreen({ navigate, navData }: NavProps) {
  const dropId = (navData?.dropId as string) || "1";
  const drop = DROPS.find((d) => d.id === dropId) || DROPS[0];

  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-6">
      <button onClick={() => navigate("detail", { dropId })} className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
        <ChevronLeft size={16} /> Back to detail
      </button>

      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <h1 className="text-xl font-black uppercase">Order Summary</h1>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm font-semibold">{drop.title} (DROP #{drop.dropNumber})</span>
          <span className="text-sm font-bold">{drop.currency}{drop.price}</span>
        </div>
        <FieldInput label="Email" placeholder="you@example.com" />
        <FieldInput label="Shipping Address" placeholder="123 Street, City" />
        <Btn fullWidth size="lg" onClick={() => alert("Preorder submitted!")}>
          Complete Preorder
        </Btn>
      </div>
    </div>
  );
}

function DashboardScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black uppercase">Creator Dashboard</h1>
      <p className="text-xs font-semibold text-muted-foreground">Track your preorders and active challenge submissions.</p>
    </div>
  );
}

function UploadScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-black uppercase">Submit Entry</h1>
      <FieldInput label="Title" placeholder="Give your creation a name" />
      <FieldInput label="Description" placeholder="Tell the story of how you made it" />
      <Btn fullWidth size="lg">Submit to Gallery</Btn>
    </div>
  );
}

function GalleryScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black uppercase">Community Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {GALLERY_ITEMS.map((item) => (
          <GalleryItemCard key={item.id} item={item} onVote={() => {}} />
        ))}
      </div>
    </div>
  );
}

function LeaderboardScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black uppercase">Leaderboard</h1>
      <div className="bg-card border border-border rounded-3xl p-4 divide-y divide-border">
        {LEADERBOARD.map((item) => (
          <div key={item.rank} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="font-black text-sm w-5">{item.rank}</span>
              <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <div className="text-xs font-bold">{item.name}</div>
                <div className="text-[10px] text-muted-foreground">{item.badge}</div>
              </div>
            </div>
            <span className="text-xs font-bold text-violet-600">{item.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-lime-400 border-2 border-black flex items-center justify-center font-black text-xl">
          AW
        </div>
        <div>
          <h1 className="text-xl font-black uppercase">Creator Profile</h1>
          <p className="text-xs font-semibold text-muted-foreground">Member since 2026</p>
        </div>
      </div>
      <Btn variant="outline" fullWidth onClick={() => navigate("settings")}>
        <Settings size={16} /> Account Settings
      </Btn>
    </div>
  );
}

function SettingsScreen({ navigate }: NavProps) {
  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-6">
      <button onClick={() => navigate("profile")} className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
        <ChevronLeft size={16} /> Back to profile
      </button>
      <h1 className="text-2xl font-black uppercase">Settings</h1>
      <SettingsSection title="Notifications">
        <SettingsRow icon={Bell} label="Push Notifications" toggle checked={true} onToggle={() => {}} />
      </SettingsSection>
    </div>
  );
}

// ─── Main App Component ───────────────────────────────────────────────────────

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [navData, setNavData] = useState<Record<string, unknown>>({});

  const navigate = (screen: Screen, data?: Record<string, unknown>) => {
    if (data) setNavData(data);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 md:pb-0">
      <HeaderHero />

      <main>
        {currentScreen === "landing" && <LandingScreen navigate={navigate} />}
        {currentScreen === "catalog" && <CatalogScreen navigate={navigate} />}
        {currentScreen === "detail" && <DetailScreen navigate={navigate} navData={navData} />}
        {currentScreen === "checkout" && <CheckoutScreen navigate={navigate} navData={navData} />}
        {currentScreen === "dashboard" && <DashboardScreen navigate={navigate} />}
        {currentScreen === "upload" && <UploadScreen navigate={navigate} />}
        {currentScreen === "gallery" && <GalleryScreen navigate={navigate} />}
        {currentScreen === "leaderboard" && <LeaderboardScreen navigate={navigate} />}
        {currentScreen === "profile" && <ProfileScreen navigate={navigate} />}
        {currentScreen === "settings" && <SettingsScreen navigate={navigate} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-2 flex justify-around items-center md:hidden">
        <button onClick={() => navigate("landing")} className={cn("flex flex-col items-center gap-1 p-2", currentScreen === "landing" ? "text-primary" : "text-muted-foreground")}>
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => navigate("catalog")} className={cn("flex flex-col items-center gap-1 p-2", currentScreen === "catalog" ? "text-primary" : "text-muted-foreground")}>
          <Search size={20} />
          <span className="text-[10px] font-bold">Drops</span>
        </button>
        <button onClick={() => navigate("gallery")} className={cn("flex flex-col items-center gap-1 p-2", currentScreen === "gallery" ? "text-primary" : "text-muted-foreground")}>
          <ImageIcon size={20} />
          <span className="text-[10px] font-bold">Gallery</span>
        </button>
        <button onClick={() => navigate("leaderboard")} className={cn("flex flex-col items-center gap-1 p-2", currentScreen === "leaderboard" ? "text-primary" : "text-muted-foreground")}>
          <Trophy size={20} />
          <span className="text-[10px] font-bold">Ranks</span>
        </button>
        <button onClick={() => navigate("profile")} className={cn("flex flex-col items-center gap-1 p-2", currentScreen === "profile" ? "text-primary" : "text-muted-foreground")}>
          <User size={20} />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}
