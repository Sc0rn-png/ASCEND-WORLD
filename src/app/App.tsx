import HeaderHero from './components/HeaderHero';
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

// Status badge with live pulse animation
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

// Inline mini countdown for cards
function MiniCountdown({ endDate }: { endDate: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate);
  if (days > 0) return <span className="tabular-nums">{days}d {hours}h</span>;
  if (hours > 0) return <span className="tabular-nums">{hours}h {minutes}m</span>;
  return <span className="tabular-nums">{minutes}m {seconds}s</span>;
}

// Full countdown blocks for detail screen
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
    // 2-column compact card for landing highlights
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

  // Full 1-column card for catalog
  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="bg-card rounded-3xl overflow-hidden border border-border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative">
        <img src={drop.image} alt={drop.title} className="w-full h-52 object-cover bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Drop label */}
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

        {/* Status */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={drop.status} />
        </div>

        {/* Bottom row on image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3
              className="text-white text-xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
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

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Theme */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{drop.theme}</p>

        {/* Preorder progress */}
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

        {/* Prize + countdown chips */}
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

        {/* CTA */}
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

// ─── Screen 1: Landing ────────────────────────────────────────────────────────

function LandingScreen({ navigate }: NavProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featured = DROPS[0]; // DROP #001 — always featured
  const remaining = featured.maxUnits - featured.preorderCount;

  return (
    <div>
      {/* ── Featured Hero — DROP #001 ── */}
      <div className="relative overflow-hidden">
        <div className="relative h-[520px]">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover bg-slate-900"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <Crown size={13} className="text-white" />
              </div>
              <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-display)" }}>
                Craftly
              </span>
            </div>
            <StatusBadge status="live" />
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            {/* Drop label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                DROP #{featured.dropNumber}
              </span>
              <div className="h-px flex-1 bg-white/10" />
              {featured.tag && (
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                  {featured.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-5xl font-bold text-white leading-none mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {featured.title}
            </h1>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              {featured.theme}
            </p>

            {/* Live stats card */}
            <div className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-3xl p-4 mb-4">
              {/* Progress */}
              <ProgressBar value={featured.preorderCount} max={featured.maxUnits} light className="mb-2" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] text-white/50 font-medium tabular-nums">
                  {featured.preorderCount} reserved
                </span>
                <span className="text-[11px] font-bold text-rose-400 tabular-nums">
                  {remaining} spots left
                </span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center bg-white/8 rounded-2xl py-2.5">
                  <div className="text-base font-bold text-white tabular-nums">{featured.preorderCount}</div>
                  <div className="text-[9px] text-white/40 font-semibold uppercase tracking-wide">Joined</div>
                </div>
                <div className="text-center bg-white/8 rounded-2xl py-2.5">
                  <div className="text-base font-bold text-rose-400 tabular-nums">{remaining}</div>
                  <div className="text-[9px] text-white/40 font-semibold uppercase tracking-wide">Remaining</div>
                </div>
                <div className="text-center bg-white/8 rounded-2xl py-2.5">
                  <div className="text-base font-bold text-violet-300 tabular-nums">{featured.currency}{featured.prizePool}</div>
                  <div className="text-[9px] text-white/40 font-semibold uppercase tracking-wide">Prize Pool</div>
                </div>
              </div>

              {/* Countdown */}
              <CountdownWidget endDate={featured.endDate} light />
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Btn
                fullWidth
                size="lg"
                onClick={() => navigate("detail", { dropId: featured.id })}
                className="shadow-2xl shadow-primary/40"
              >
                Join the Challenge · {featured.currency}{featured.price}
                <ArrowRight size={16} />
              </Btn>
              <button
                className="w-full text-center text-white/40 text-xs font-semibold py-1 hover:text-white/60 transition-colors"
                onClick={() => navigate("catalog")}
              >
                View all 8 drops ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 space-y-10">

        {/* ── Live Drops ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Live Now</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Preorder open — limited spots</p>
            </div>
            <button
              className="text-sm text-primary font-semibold flex items-center gap-1"
              onClick={() => navigate("catalog")}
            >
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {LIVE_DROPS.slice(1).map((d) => (
              <DropCard key={d.id} drop={d} compact onClick={() => navigate("detail", { dropId: d.id })} />
            ))}
          </div>
        </section>

        {/* ── Coming Soon ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Coming Soon</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Secure early access now</p>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {UPCOMING_DROPS.map((d) => (
              <div key={d.id} className="flex-shrink-0 w-48">
                <DropCard drop={d} compact onClick={() => navigate("detail", { dropId: d.id })} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Total prize pool banner ── */}
        <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 rounded-3xl p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Crown size={16} className="text-yellow-300" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Season Prize Pool</span>
          </div>
          <div className="text-4xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
            {DROPS[0].currency}{DROPS.reduce((s, d) => s + d.prizePool, 0).toLocaleString()}
          </div>
          <p className="text-white/60 text-sm mb-4">Distributed across all 8 drops to top creators</p>
          <div className="grid grid-cols-3 gap-2">
            {["🥇 50%", "🥈 30%", "🥉 20%"].map((p) => (
              <div key={p} className="bg-white/10 rounded-xl py-2 text-center text-xs font-bold">{p}</div>
            ))}
          </div>
        </div>

        {/* ── How it works ── */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-6">How It Works</h2>
          <div className="space-y-5">
            {[
              { step: "1", title: "Secure Your Spot", desc: "Preorder a Drop before it sells out. Each edition is strictly limited — once it is gone, it is gone.", icon: Package, color: "bg-indigo-50 text-indigo-600" },
              { step: "2", title: "Receive & Create", desc: "Your box arrives with everything you need. No external materials. Just the contents and your vision.", icon: Zap, color: "bg-violet-50 text-violet-600" },
              { step: "3", title: "Submit & Win", desc: "Upload your creation. The community votes, the jury judges, and the best work wins real prizes.", icon: Trophy, color: "bg-amber-50 text-amber-600" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", item.color)}>
                  <item.icon size={19} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">Step {item.step}</div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Creator Stories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] bg-card border border-border rounded-3xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={11} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover bg-muted" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.drop}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden bg-card">
                <button
                  className="w-full flex items-center justify-between p-4 text-left gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-foreground flex-1 leading-snug">{faq.q}</span>
                  <ChevronDown size={15} className={cn("text-muted-foreground flex-shrink-0 transition-transform duration-200", openFaq === i && "rotate-180")} />
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

        {/* ── Footer ── */}
        <footer className="border-t border-border pt-8 pb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Crown size={14} className="text-white" />
            </div>
            <span className="font-bold text-foreground text-lg" style={{ fontFamily: "var(--font-display)" }}>Craftly</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xs">
            Premium limited-edition creative challenge boxes. Not just a product — an exclusive creative event.
          </p>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-6">
            {["About", "All Drops", "Community", "Press Kit", "Privacy Policy", "Terms of Use"].map((l) => (
              <button key={l} className="text-left hover:text-foreground transition-colors">{l}</button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">&copy; 2025 Craftly Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// ─── Screen 2: Catalog ────────────────────────────────────────────────────────

function CatalogScreen({ navigate }: NavProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const FILTERS = ["All", "Live", "Coming Soon", "Wearable", "Sculpture", "Decor"];

  const filtered = DROPS.filter((d) => {
    const matchesSearch = search === "" || d.title.toLowerCase().includes(search.toLowerCase()) || d.dropNumber.includes(search);
    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Live"
        ? d.status === "live"
        : activeFilter === "Coming Soon"
        ? d.status === "coming-soon"
        : d.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-4 py-4">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          All Drops
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {LIVE_DROPS.length} live · {UPCOMING_DROPS.length} coming soon
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or drop number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 bg-input-background rounded-2xl pl-10 pr-4 text-sm text-foreground border border-border outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-4 px-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "flex-shrink-0 h-9 px-4 rounded-xl text-sm font-semibold transition-all",
              activeFilter === f
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Drops list — 1-column, full cards */}
      <div className="space-y-4">
        {filtered.map((d) => (
          <DropCard key={d.id} drop={d} onClick={() => navigate("detail", { dropId: d.id })} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold text-foreground mb-1">No drops found</p>
          <p className="text-sm text-muted-foreground">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}

// ─── Screen 3: Detail ─────────────────────────────────────────────────────────

function DetailScreen({ navigate, navData }: NavProps) {
  const dropId = (navData?.dropId as string) ?? "1";
  const drop = DROPS.find((d) => d.id === dropId) ?? DROPS[0];
  const [bookmarked, setBookmarked] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const remaining = drop.maxUnits - drop.preorderCount;
  const isLive = drop.status === "live";

  return (
    <div className="pb-40">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border">
        <button
          onClick={() => navigate("catalog")}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">
          DROP #{drop.dropNumber}
        </span>
        <div className="flex gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark size={16} className={cn(bookmarked ? "fill-primary text-primary" : "text-foreground")} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
            <Share2 size={16} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative">
        <img src={drop.image} alt={drop.title} className="w-full h-72 object-cover bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <StatusBadge status={drop.status} />
          {drop.tag && (
            <span className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 text-[10px] font-bold text-white">
              {drop.tag}
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h1
            className="text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {drop.title}
          </h1>
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{drop.category}</Badge>
          <Badge variant={drop.difficulty === "Intermediate" ? "warning" : "success"}>{drop.difficulty}</Badge>
          {drop.reviews > 0 && (
            <div className="flex items-center gap-1 ml-auto">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold">{drop.rating}</span>
              <span className="text-xs text-muted-foreground">({drop.reviews})</span>
            </div>
          )}
        </div>

        {/* Theme — the creative brief */}
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-primary/10 rounded-3xl p-4">
          <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Creative Brief</div>
          <p className="text-sm text-foreground leading-relaxed font-medium">{drop.theme}</p>
        </div>

        {/* Quick meta */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-medium">Edition Size</div>
              <div className="font-bold text-sm text-foreground">{drop.maxUnits} boxes</div>
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-medium">Preorders</div>
              <div className="font-bold text-sm text-foreground">{drop.preorderCount.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Preorder progress */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-sm text-foreground">Preorder Progress</span>
            {isLive ? (
              <span className="text-sm font-bold text-rose-600">{remaining} spots left</span>
            ) : (
              <span className="text-xs text-muted-foreground">Early access open</span>
            )}
          </div>
          <ProgressBar value={drop.preorderCount} max={drop.maxUnits} showCount />
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((drop.preorderCount / drop.maxUnits) * 100)}% of this limited edition has been reserved
          </p>
        </div>

        {/* Countdown */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-primary" />
            <span className="font-bold text-sm text-foreground">
              {isLive ? "Preorder closes in" : "Opens in"}
            </span>
          </div>
          <CountdownWidget endDate={drop.endDate} />
        </div>

        {/* Prize pool */}
        <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 rounded-3xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center">
                <Crown size={15} className="text-yellow-300" />
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/60">Prize Pool</div>
                <div className="text-2xl font-bold">{drop.currency}{drop.prizePool.toLocaleString()}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/50 uppercase tracking-wide">Awarded to</div>
              <div className="text-sm font-bold">Top 3 creators</div>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              `🥇 ${drop.currency}${Math.round(drop.prizePool * 0.5)}`,
              `🥈 ${drop.currency}${Math.round(drop.prizePool * 0.3)}`,
              `🥉 ${drop.currency}${Math.round(drop.prizePool * 0.2)}`,
            ].map((p) => (
              <div key={p} className="flex-1 bg-white/10 rounded-xl py-1.5 text-center text-xs font-bold">{p}</div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-foreground mb-2">About This Drop</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{drop.description}</p>
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
                What&apos;s Inside ({drop.materials.length} items)
              </span>
            </div>
            <ChevronDown size={15} className={cn("text-muted-foreground transition-transform duration-200", materialsOpen && "rotate-180")} />
          </button>
          {materialsOpen && (
            <div className="px-4 pb-4 space-y-2.5 border-t border-border pt-3">
              {drop.materials.map((m, i) => (
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

        {/* Rules */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ground Rules</div>
          <ul className="space-y-1.5">
            {[
              "Only materials included in the box may be used",
              "One submission per person per Drop",
              "Submissions must be your own original work",
              "Photo must clearly show the finished piece",
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-slate-300 mt-0.5">—</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur-md border-t border-border px-4 pt-4 pb-4 z-30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground font-medium">Price per edition</div>
            <div className="text-2xl font-bold text-foreground">{drop.currency}{drop.price}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground font-medium">Prize pool</div>
            <div className="text-lg font-bold text-violet-600">{drop.currency}{drop.prizePool.toLocaleString()}</div>
          </div>
        </div>
        <Btn fullWidth size="lg" onClick={() => navigate("checkout", { drop })}>
          Join the Challenge <ArrowRight size={16} />
        </Btn>
      </div>
    </div>
  );
}

// ─── Screen 4: Checkout ───────────────────────────────────────────────────────

function CheckoutScreen({ navigate, navData }: NavProps) {
  const drop = (navData?.drop as Drop) ?? DROPS[0];
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", card: "", expiry: "", cvv: "" });

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          You&apos;re In.
        </h2>
        <p className="text-muted-foreground mb-1 text-sm leading-relaxed">
          DROP #{drop.dropNumber} — <strong>{drop.title}</strong>
        </p>
        <p className="text-muted-foreground mb-8 text-sm">
          Your box ships within 3–5 business days after preorders close. Good luck.
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
          onClick={() => navigate("detail", { dropId: drop.id })}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="font-bold text-foreground flex-1">Checkout</h1>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lock size={12} /> Secured
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 pb-12">
        {/* Order Summary */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="flex gap-4 p-4">
            <img src={drop.image} alt={drop.title} className="w-20 h-20 rounded-2xl object-cover bg-muted flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                DROP #{drop.dropNumber}
              </div>
              <h3 className="font-bold text-foreground leading-tight">{drop.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{drop.difficulty} · {drop.category}</p>
              <div className="text-lg font-bold text-foreground mt-1">{drop.currency}{drop.price}</div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Crown size={12} className="text-violet-500" />
              Competing for prize pool
            </div>
            <span className="text-sm font-bold text-violet-600">{drop.currency}{drop.prizePool.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping */}
        <div className="space-y-3">
          <h2 className="font-bold text-foreground">Shipping</h2>
          <FieldInput label="Full Name" placeholder="Sofia Martinez" value={form.name} onChange={(v) => setForm({ ...form, name: v })} icon={User} />
          <FieldInput label="Email Address" type="email" placeholder="sofia@email.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <FieldInput label="Street Address" placeholder="12 Rue de la Créativité" value={form.address} onChange={(v) => setForm({ ...form, address: v })} icon={MapPin} />
          <FieldInput label="City, Country" placeholder="Paris, France" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
        </div>

        {/* Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">Payment</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock size={11} /> Powered by Stripe
            </div>
          </div>
          <FieldInput label="Card Number" placeholder="4242 4242 4242 4242" value={form.card} onChange={(v) => setForm({ ...form, card: v })} icon={CreditCard} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Expiry" placeholder="MM / YY" value={form.expiry} onChange={(v) => setForm({ ...form, expiry: v })} />
            <FieldInput label="CVV" placeholder="•••" value={form.cvv} onChange={(v) => setForm({ ...form, cvv: v })} />
          </div>
        </div>

        {/* Trust */}
        <div className="grid grid-cols-3 gap-2">
          {[{ icon: Shield, label: "SSL Secured" }, { icon: Truck, label: "Free Shipping" }, { icon: CheckCircle, label: "30-day Guarantee" }].map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-2 p-3 bg-muted rounded-2xl">
              <t.icon size={18} className="text-primary" />
              <span className="text-[10px] font-semibold text-muted-foreground text-center leading-tight">{t.label}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-border pt-4 space-y-2">
          {[
            { label: "Subtotal", value: `${drop.currency}${drop.price}` },
            { label: "Shipping", value: "Free", color: "text-emerald-600" },
            { label: "VAT included", value: "✓" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className={cn("text-sm font-semibold", row.color ?? "text-foreground")}>{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-foreground text-lg">{drop.currency}{drop.price}</span>
          </div>
          <div className="pt-2">
            <Btn fullWidth size="lg" onClick={() => setOrderPlaced(true)}>
              <Lock size={15} /> Confirm & Join — {drop.currency}{drop.price}
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
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Your Creative Hub</p>
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
          { label: "Completed", value: "5", icon: CheckCircle, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
          { label: "Wins", value: "2", icon: Trophy, bg: "bg-amber-50", iconColor: "text-amber-600" },
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

      {/* Active Drops */}
      <section className="mb-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Active Drops</h2>
          <button className="text-sm text-primary font-semibold flex items-center gap-1" onClick={() => navigate("catalog")}>
            Browse <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-3">
          {LIVE_DROPS.map((d) => (
            <div
              key={d.id}
              className="bg-card border border-border rounded-3xl p-4 flex gap-3 items-center cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => navigate("detail", { dropId: d.id })}
            >
              <img src={d.image} alt={d.title} className="w-14 h-14 rounded-2xl object-cover bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                    #{d.dropNumber}
                  </span>
                  <StatusBadge status={d.status} />
                </div>
                <h3 className="font-bold text-sm text-foreground truncate">{d.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <ProgressBar value={d.preorderCount} max={d.maxUnits} className="flex-1" />
                  <span className="text-xs font-bold text-rose-600 flex-shrink-0">
                    {d.maxUnits - d.preorderCount} left
                  </span>
                </div>
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
            { icon: "👜", name: "Tote Creator", earned: true },
            { icon: "🎭", name: "Balaclava", earned: true },
            { icon: "⭐", name: "Top Rated", earned: false },
            { icon: "🔥", name: "3-Drop Streak", earned: false },
            { icon: "👑", name: "Grandmaster", earned: false },
          ].map((a) => (
            <div
              key={a.name}
              className={cn("flex-shrink-0 flex flex-col items-center gap-2 w-20 p-3 rounded-2xl border",
                a.earned ? "border-primary/20 bg-primary/5" : "border-border bg-muted/50"
              )}
            >
              <span className={cn("text-2xl", !a.earned && "grayscale opacity-40")}>{a.icon}</span>
              <span className={cn("text-[10px] font-semibold text-center leading-tight",
                a.earned ? "text-primary" : "text-muted-foreground"
              )}>
                {a.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-base font-bold text-foreground mb-4">My Orders</h2>
        <div className="space-y-2">
          {[
            { drop: "#001 — Tote Bag", status: "Delivered", date: "Jul 28", price: 35 },
            { drop: "#002 — Balaclava", status: "In Transit", date: "Aug 3", price: 39 },
            { drop: "#003 — Fox", status: "Preorder", date: "Aug 10", price: 49 },
          ].map((o, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl">
              <div>
                <div className="text-sm font-semibold text-foreground">DROP {o.drop}</div>
                <div className="text-xs text-muted-foreground">{o.date}</div>
              </div>
              <div className="text-right">
                <div className={cn("text-xs font-bold px-2.5 py-1 rounded-full",
                  o.status === "Delivered" ? "bg-emerald-50 text-emerald-700" :
                  o.status === "In Transit" ? "bg-amber-50 text-amber-700" :
                  "bg-violet-50 text-violet-700"
                )}>
                  {o.status}
                </div>
                <div className="text-xs text-muted-foreground mt-1">€{o.price}</div>
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
  const [selectedId, setSelectedId] = useState(DROPS[0].id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const selectedDrop = DROPS.find((d) => d.id === selectedId) ?? DROPS[0];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Submitted.
        </h2>
        <p className="text-muted-foreground text-sm mb-2">
          DROP #{selectedDrop.dropNumber} — {selectedDrop.title}
        </p>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          Your creation is now live in the gallery. The community can vote, and the jury will review all submissions when the challenge closes.
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
        <button onClick={() => navigate("gallery")} className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Upload Creation</h1>
          <p className="text-xs text-muted-foreground">Submit to the gallery</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Drop selector */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Which Drop?</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {DROPS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 h-10 px-3 rounded-xl border text-xs font-bold transition-all",
                  selectedId === d.id
                    ? "border-primary bg-primary/8 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-[9px] font-black opacity-60">#{d.dropNumber}</span>
                <span>{d.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Photos — up to 3</label>
          <div className="grid grid-cols-3 gap-3">
            {[{ primary: true }, { primary: false }, { primary: false }].map((slot, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all",
                  slot.primary ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted"
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
                    <span className="text-[10px] text-muted-foreground">Add</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <FieldInput label="Title" placeholder={`My ${selectedDrop.title} creation`} value={title} onChange={setTitle} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-foreground">Description</label>
          <textarea
            placeholder="Share the story behind your creation — what choices did you make and why?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-input-background rounded-xl border border-border text-foreground text-sm p-4 outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/60"
          />
          <span className="text-xs text-muted-foreground text-right">{description.length} / 500</span>
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
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Gallery</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Community creations from all drops</p>
        </div>
        <button
          onClick={() => navigate("upload")}
          className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25"
        >
          <Plus size={18} className="text-white" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide -mx-4 px-4">
        {["All", "DROP #001", "DROP #002", "DROP #003"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-shrink-0 h-9 px-4 rounded-xl text-xs font-bold transition-all",
              filter === f ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

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
  const totalPrize = DROPS.reduce((s, d) => s + d.prizePool, 0);

  return (
    <div>
      <div className="relative bg-gradient-to-b from-slate-950 via-[#1e1048] to-[#2d1065] px-4 pt-10 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-display)" }}>Leaderboard</h1>
          <p className="text-slate-400 text-sm mb-5">
            Season prize pool: <span className="text-violet-300 font-bold">€{totalPrize.toLocaleString()}</span>
          </p>

          <div className="flex gap-1 bg-white/10 rounded-2xl p-1 mb-8">
            {(["weekly", "monthly", "alltime"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn("flex-1 h-9 rounded-xl text-sm font-semibold transition-all",
                  period === p ? "bg-white text-slate-900" : "text-white/70 hover:text-white"
                )}
              >
                {p === "weekly" ? "Weekly" : p === "monthly" ? "Monthly" : "All Time"}
              </button>
            ))}
          </div>

          {/* Podium */}
          <div className="flex items-end justify-center gap-3 pb-0">
            <div className="flex flex-col items-center">
              <img src={LEADERBOARD[1].avatar} alt={LEADERBOARD[1].name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-400 bg-muted" />
              <div className="mt-1.5 text-white text-xs font-bold">{LEADERBOARD[1].name.split(" ")[0]}</div>
              <div className="text-slate-300 text-[10px]">{LEADERBOARD[1].points.toLocaleString()} pts</div>
              <div className="w-16 h-10 bg-slate-600/40 rounded-t-xl flex items-center justify-center mt-2">
                <span className="text-slate-300 font-bold text-lg">2</span>
              </div>
            </div>
            <div className="flex flex-col items-center -mt-4">
              <Crown size={18} className="text-yellow-400 mb-1" />
              <img src={LEADERBOARD[0].avatar} alt={LEADERBOARD[0].name} className="w-16 h-16 rounded-full object-cover border-[3px] border-yellow-400 bg-muted" />
              <div className="mt-1.5 text-white text-sm font-bold">{LEADERBOARD[0].name.split(" ")[0]}</div>
              <div className="text-yellow-300 text-[10px]">{LEADERBOARD[0].points.toLocaleString()} pts</div>
              <div className="w-20 h-14 bg-yellow-500/20 rounded-t-xl flex items-center justify-center mt-2 border-t border-yellow-400/30">
                <span className="text-yellow-300 font-bold text-2xl">1</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={LEADERBOARD[2].avatar} alt={LEADERBOARD[2].name} className="w-12 h-12 rounded-full object-cover border-2 border-amber-600 bg-muted" />
              <div className="mt-1.5 text-white text-xs font-bold">{LEADERBOARD[2].name.split(" ")[0]}</div>
              <div className="text-slate-300 text-[10px]">{LEADERBOARD[2].points.toLocaleString()} pts</div>
              <div className="w-16 h-6 bg-amber-700/30 rounded-t-xl flex items-center justify-center mt-2">
                <span className="text-amber-500 font-bold text-lg">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Season Prize", value: `€${totalPrize.toLocaleString()}`, icon: Crown },
            { label: "Creators", value: "134", icon: Users },
            { label: "Active Drops", value: `${LIVE_DROPS.length}`, icon: Trophy },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <s.icon size={16} className="text-primary mx-auto mb-1" />
              <div className="font-bold text-foreground text-base leading-none mb-0.5">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-foreground">Rankings</h2>
        <div className="space-y-2">
          {LEADERBOARD.map((u, i) => (
            <div
              key={u.rank}
              className={cn("flex items-center gap-3 p-4 rounded-3xl border",
                i < 3 ? "bg-card border-primary/15 shadow-sm" : "bg-card border-border"
              )}
            >
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0",
                i === 0 ? "bg-yellow-100 text-yellow-700" :
                i === 1 ? "bg-slate-100 text-slate-600" :
                i === 2 ? "bg-amber-50 text-amber-700" :
                "bg-muted text-muted-foreground"
              )}>
                {u.rank}
              </div>
              <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-foreground truncate">{u.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={u.badge === "Grandmaster" ? "purple" : u.badge === "Expert" ? "success" : "default"}>
                    {u.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{u.wins} wins</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-foreground text-sm">{u.points.toLocaleString()}</div>
                {u.earnings > 0 && (
                  <div className="text-xs font-bold text-violet-600">€{u.earnings.toLocaleString()}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 9: Profile ────────────────────────────────────────────────────────

function ProfileScreen({ navigate }: NavProps) {
  return (
    <div>
      <div className="relative h-36 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center" onClick={() => navigate("settings")}>
          <Settings size={16} className="text-white" />
        </button>
        <button className="absolute top-4 right-14 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
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
            <Btn variant="outline" size="sm" onClick={() => navigate("dashboard")}>Dashboard</Btn>
            <Btn size="sm"><Edit size={13} /> Edit</Btn>
          </div>
        </div>

        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>Sofia Martinez</h1>
        <p className="text-sm text-muted-foreground mb-1">@sofia_creates &middot; Paris, France</p>
        <p className="text-sm text-foreground leading-relaxed mb-5 max-w-xs">
          Visual artist. Participated in DROP #001, #002 and #003. Won DROP #001 — Tote Bag. Grandmaster creator.
        </p>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {[{ value: "4,820", label: "Points" }, { value: "2", label: "Wins" }, { value: "3", label: "Drops" }, { value: "2.4k", label: "Likes" }].map((s) => (
            <div key={s.label} className="text-center bg-muted rounded-2xl py-3">
              <div className="font-bold text-foreground text-base leading-none mb-0.5">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-foreground mb-3">Badges</h2>
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-4 px-4">
          {[
            { icon: "🏆", name: "Drop #001 Winner" },
            { icon: "👜", name: "Tote Creator" },
            { icon: "🎭", name: "Balaclava" },
            { icon: "🦊", name: "Fox Painter" },
            { icon: "👑", name: "Grandmaster" },
          ].map((a) => (
            <div key={a.name} className="flex-shrink-0 flex flex-col items-center gap-2 w-20 p-3 rounded-2xl bg-primary/5 border border-primary/15">
              <span className="text-2xl">{a.icon}</span>
              <span className="text-[10px] font-bold text-primary text-center leading-tight">{a.name}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">Creations</h2>
          <span className="text-xs text-muted-foreground font-medium">3 submissions</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {GALLERY_ITEMS.slice(0, 6).map((item) => (
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
  const [notifs, setNotifs] = useState({ newDrops: true, voteReminders: true, winAlerts: true, marketing: false });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showActivity: true });

  return (
    <div className="px-4 py-4 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("profile")} className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-4 flex items-center gap-4 mb-7">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" alt="Profile" className="w-14 h-14 rounded-2xl object-cover bg-muted flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-foreground">Sofia Martinez</div>
          <div className="text-sm text-muted-foreground truncate">sofia@email.com</div>
          <Badge variant="purple" className="mt-1.5">Grandmaster</Badge>
        </div>
        <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
      </div>

      <SettingsSection title="Notifications">
        <SettingsRow icon={Bell} label="New Drops" desc="When a new Drop goes live" toggle checked={notifs.newDrops} onToggle={(v) => setNotifs({ ...notifs, newDrops: v })} />
        <SettingsRow icon={Clock} label="Vote Reminders" desc="When voting is about to close" toggle checked={notifs.voteReminders} onToggle={(v) => setNotifs({ ...notifs, voteReminders: v })} />
        <SettingsRow icon={Trophy} label="Win Alerts" desc="When you win a prize" toggle checked={notifs.winAlerts} onToggle={(v) => setNotifs({ ...notifs, winAlerts: v })} />
        <SettingsRow icon={Star} label="Marketing" desc="Promotions and early-access news" toggle checked={notifs.marketing} onToggle={(v) => setNotifs({ ...notifs, marketing: v })} />
      </SettingsSection>

      <SettingsSection title="Privacy">
        <SettingsRow icon={User} label="Public Profile" desc="Anyone can view your profile" toggle checked={privacy.publicProfile} onToggle={(v) => setPrivacy({ ...privacy, publicProfile: v })} />
        <SettingsRow icon={Eye} label="Show Activity" desc="Display your drop participation" toggle checked={privacy.showActivity} onToggle={(v) => setPrivacy({ ...privacy, showActivity: v })} />
      </SettingsSection>

      <SettingsSection title="Account">
        <SettingsRow icon={CreditCard} label="Payment Methods" />
        <SettingsRow icon={MapPin} label="Saved Addresses" />
        <SettingsRow icon={Award} label="Membership & Plan" />
        <SettingsRow icon={HelpCircle} label="Help & Support" />
      </SettingsSection>

      <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-destructive/30 text-destructive font-semibold text-sm mt-2 mb-6 hover:bg-destructive/5 transition-colors">
        <LogOut size={15} /> Log Out
      </button>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────

const NAV_TABS = [
  { screen: "landing" as Screen, icon: Home, label: "Home" },
  { screen: "catalog" as Screen, icon: Search, label: "Drops" },
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

function BottomNav({ active, navigate }: { active: Screen; navigate: (screen: Screen) => void }) {
  const activeTab = getActiveTab(active);
  const liveDots = LIVE_DROPS.length;
  return (
    <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center px-2 py-1">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => navigate(tab.screen)}
              className={cn("flex-1 flex flex-col items-center gap-0.5 py-2 transition-all duration-150", isActive ? "text-primary" : "text-muted-foreground hover:text-foreground")}
            >
              <div className={cn("relative w-10 h-7 flex items-center justify-center rounded-xl transition-all duration-150", isActive ? "bg-primary/10" : "bg-transparent")}>
                <tab.icon size={19} strokeWidth={isActive ? 2.5 : 1.8} />
                {tab.screen === "catalog" && !isActive && (
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-background" />
                )}
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
    const main = document.getElementById("app-main");
    if (main) main.scrollTop = 0;
  };

  const props: NavProps = { navigate, navData };

  return (
    <div className="min-h-screen bg-slate-900 sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="relative w-full sm:max-w-[430px] min-h-screen sm:min-h-0 sm:h-[900px] bg-background flex flex-col sm:rounded-[40px] sm:overflow-hidden shadow-2xl">
        <main id="app-main" className="flex-1 overflow-y-auto scrollbar-hide">
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
