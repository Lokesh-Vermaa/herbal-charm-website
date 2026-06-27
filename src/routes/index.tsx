import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { Leaf, Shield, Zap, Pill, MessageCircle, ChevronDown, X } from "lucide-react";
import logo from "@/assets/product-logo.webp";
import productImg from "@/assets/product-main.webp";
import heroBg from "@/assets/hero-bg.webp";
import gallery1 from "@/assets/product-gallery-1.webp";
import gallery2 from "@/assets/product-gallery-2.webp";
import gallery3 from "@/assets/product-gallery-3.webp";
import gallery1Thumb from "@/assets/product-gallery-1-thumb.webp";
import gallery2Thumb from "@/assets/product-gallery-2-thumb.webp";
import gallery3Thumb from "@/assets/product-gallery-3-thumb.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" },
    ],
    meta: [
      { title: "BSR Green Gold — Pure. Natural. Powerful." },
      {
        name: "description",
        content:
          "BSR Green Gold Moringa Powder — 100% pure, natural superfood. Nature's finest gift for a healthier you.",
      },
      { property: "og:title", content: "BSR Green Gold — Nature's Finest Gift" },
      {
        property: "og:description",
        content: "100% Pure Moringa Powder. Vegan, Non-GMO, Lab Tested.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "918306936755";
const WHATSAPP_ORDER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C+I+want+to+order+BSR+Green+Gold+Moringa+Powder+100g`;
const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 2.001A9.96 9.96 0 0 0 2.05 12c0 1.761.464 3.486 1.345 5.005L2 22l5.105-1.345A9.953 9.953 0 0 0 12.05 22 9.96 9.96 0 0 0 22.05 12c0-2.668-1.04-5.176-2.928-7.064a9.928 9.928 0 0 0-7.072-2.935zm0 18.183a8.227 8.227 0 0 1-4.198-1.149l-.302-.179-3.029.798.809-2.952-.197-.314A8.21 8.21 0 0 1 3.86 12a8.193 8.193 0 0 1 8.19-8.182c2.187 0 4.241.852 5.788 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.51-3.681 8.176-8.188 8.176z" />
    </svg>
  );
}

// Renders a shimmer placeholder while the image loads, then fades it in.
// Parent element must be `position: relative` for the absolute skeleton to fill it.
function ShimmerImg({
  src,
  alt,
  imgClassName,
  width,
  height,
  loading,
  onClick,
}: {
  src: string;
  alt: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  onClick?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Handle images already in browser cache — onLoad won't fire for them
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && (
        <div className="skeleton absolute inset-0" aria-hidden="true" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition duration-500 motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName ?? ""}`}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        onClick={onClick}
      />
    </>
  );
}

const trustBadges = ["100% Natural", "Vegan", "Non-GMO", "Lab Tested"];

const benefits = [
  {
    icon: Leaf,
    title: "100% Pure & Natural",
    desc: "No chemicals or artificial additives. Directly sourced from natural farms and processed with care to retain maximum nutrients. Hygienically packed to maintain freshness.",
  },
  {
    icon: Pill,
    title: "Rich in Nutrients",
    desc: "Packed with 25+ essential vitamins, minerals, and antioxidants. Supports immunity, improves energy levels, and promotes overall body functions naturally.",
  },
  {
    icon: Shield,
    title: "Farm Fresh Quality",
    desc: "Sourced directly from farms and processed with maximum care. Every pack is pure, chemical-free, and verified for quality. Zero preservatives.",
  },
  {
    icon: Zap,
    title: "Easy to Use",
    desc: "Simply mix 1 teaspoon (3-5g) with water, juice, or smoothies daily. Works seamlessly in your daily routine for natural nutrition.",
  },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="BSR Green Gold"
            className="h-12 w-12 shrink-0 rounded-full object-contain"
            width={48}
            height={48}
            decoding="async"
          />
          <span className="truncate font-serif text-xl font-bold text-primary sm:text-2xl">
            BSR <span className="text-[color:var(--gold)]">Green Gold</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {[
            ["Home", "#home"],
            ["Products", "#products"],
            ["Benefits", "#benefits"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_ORDER_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-md sm:px-5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Order on WhatsApp</span>
          <span className="sm:hidden">Order</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className={`h-full w-full object-cover transition duration-700 motion-reduce:transition-none ${
            heroBgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          onLoad={() => setHeroBgLoaded(true)}
        />
        <div className="absolute inset-0 bg-[color:var(--deep-green)]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--deep-green)]/40 via-transparent to-[color:var(--deep-green)]/70" />
      </div>
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[color:var(--gold)]">
          BSR Green Gold
        </p>
        <h1 className="font-serif text-5xl font-bold leading-tight text-cream sm:text-6xl md:text-7xl">
          Nature's Finest <span className="italic text-[color:var(--gold)]">Gift</span>
        </h1>
        <p className="mt-4 font-serif text-2xl text-cream/90 sm:text-3xl">For a Healthier You</p>
        <p className="mt-6 text-base text-cream/75 sm:text-lg">Pure. Natural. Powerful.</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#products"
            className="btn-gold inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg"
          >
            Shop Now
          </a>
          <a
            href="#benefits"
            className="inline-flex items-center justify-center rounded-full border border-cream/40 px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-cream/10 hover:border-cream"
          >
            Learn More
          </a>
        </div>

        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-cream/80 sm:text-sm">
          {trustBadges.map((b, i) => (
            <li key={b} className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-[color:var(--gold)]" />
              <span>{b}</span>
              {i < trustBadges.length - 1 && (
                <span className="ml-6 hidden h-1 w-1 rounded-full bg-cream/40 sm:inline-block" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const galleryImages = [
  { id: 1, img: gallery1, thumb: gallery1Thumb, alt: "BSR Green Gold - Gallery View 1" },
  { id: 2, img: gallery2, thumb: gallery2Thumb, alt: "BSR Green Gold - Gallery View 2" },
  { id: 3, img: gallery3, thumb: gallery3Thumb, alt: "BSR Green Gold - Gallery View 3" },
];

const vitamins = [
  "Vitamin A",
  "Vitamin B1",
  "Vitamin B2",
  "Vitamin B3",
  "Vitamin B5",
  "Vitamin B6",
  "Vitamin B9",
  "Vitamin B12",
  "Vitamin C",
  "Vitamin D",
  "Vitamin E",
  "Vitamin K",
];

function Collapsible({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-150 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ${className}`}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Product() {
  const [showDetails, setShowDetails] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [productLoaded, setProductLoaded] = useState(false);
  const productImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Handle cached images — onLoad won't fire if already in browser cache
    if (productImgRef.current?.complete && productImgRef.current.naturalWidth > 0) {
      setProductLoaded(true);
    }
  }, []);

  const preloadGallery = useCallback(() => {
    galleryImages.forEach(({ img }) => {
      const preload = new Image();
      preload.src = img;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedImage(null);
    };
    if (zoomedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [zoomedImage]);

  return (
    <section id="products" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--gold)]">
            Our Product
          </p>
          <h2 className="font-serif text-4xl font-bold text-primary sm:text-5xl">
            A single jar. A world of wellness.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] ring-1 ring-border">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="bg-[color:var(--deep-green)]/10">
              <div className="relative aspect-square">
                {/* Shimmer placeholder while product image loads */}
                {!productLoaded && (
                  <div className="skeleton absolute inset-0" aria-hidden="true" />
                )}
                <img
                  ref={productImgRef}
                  src={productImg}
                  alt="BSR Green Gold Moringa Powder"
                  decoding="async"
                  fetchPriority="high"
                  onClick={() => setZoomedImage(productImg)}
                  onLoad={() => setProductLoaded(true)}
                  onError={() => setProductLoaded(true)}
                  className={`h-full w-full cursor-pointer object-cover active:opacity-90 transition duration-500 motion-reduce:transition-none ${
                    productLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  width={800}
                  height={800}
                />
                <span className="absolute left-5 top-5 rounded-full bg-[color:var(--gold)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--gold-foreground)] shadow-md">
                  Limited Time Offer
                </span>
                <button
                  type="button"
                  onMouseEnter={preloadGallery}
                  onFocus={preloadGallery}
                  onClick={() => {
                    preloadGallery();
                    setShowGallery((prev) => !prev);
                  }}
                  aria-expanded={showGallery}
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-lg bg-primary/90 px-4 py-2.5 text-sm font-semibold text-cream active:bg-primary"
                >
                  {showGallery ? "Hide" : "Show More"} Photos
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${showGallery ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <Collapsible open={showGallery}>
                <div className="grid grid-cols-3 gap-2 p-3 pt-0">
                  {galleryImages.map((gallery) => (
                    <button
                      key={gallery.id}
                      type="button"
                      onClick={() => setZoomedImage(gallery.img)}
                      className="relative aspect-square overflow-hidden rounded-lg border-2 border-[color:var(--gold)]/30 active:border-[color:var(--gold)]"
                    >
                      {/* ShimmerImg: skeleton + fade-in, parent is relative */}
                      <ShimmerImg
                        src={gallery.thumb}
                        alt={gallery.alt}
                        loading="lazy"
                        imgClassName="h-full w-full object-cover"
                        width={200}
                        height={200}
                      />
                    </button>
                  ))}
                </div>
              </Collapsible>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <h3 className="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
                BSR Green Gold Moringa Powder
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                100% Pure Moringa Powder — Nature's Superfood
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-lg text-muted-foreground line-through">₹499</span>
                <span className="font-serif text-5xl font-bold text-[color:var(--gold)]">₹349</span>
              </div>

              <p className="mt-2 text-sm font-medium text-foreground/70">Net weight: 100g</p>

              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                aria-expanded={showDetails}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold)] active:text-primary"
              >
                {showDetails ? "Hide" : "View"} Product Details
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${showDetails ? "rotate-180" : ""}`}
                />
              </button>

              <Collapsible open={showDetails}>
                <div className="mt-4 space-y-4 rounded-lg border border-[color:var(--gold)]/20 bg-primary/5 p-4">
                  <div>
                    <h4 className="mb-3 font-semibold text-primary">
                      About BSR Green Gold Moringa Powder
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      A premium-quality, 100% natural superfood made from carefully selected moringa
                      leaves. Sourced directly from farms and processed with care, our moringa
                      powder retains maximum nutrients to support your daily health and wellness.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-primary">Why Choose BSR Green Gold?</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex gap-2">
                        <span className="font-bold text-[color:var(--gold)]">✓</span>
                        <span>100% Pure & Natural – No chemicals or artificial additives</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[color:var(--gold)]">✓</span>
                        <span>Farm Fresh Quality – Directly sourced from natural farms</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[color:var(--gold)]">✓</span>
                        <span>Rich in Nutrients – Loaded with vitamins & minerals</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[color:var(--gold)]">✓</span>
                        <span>Easy to Use – Mix with water, juice, or smoothies</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-[color:var(--gold)]">✓</span>
                        <span>Premium Packaging – Safe, hygienic, and long-lasting freshness</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-primary">Product Specifications</h4>
                    <div className="space-y-2 text-sm text-foreground/80">
                      <p>
                        <span className="font-medium">Product Name:</span> BSR Green Gold Moringa
                        Powder
                      </p>
                      <p>
                        <span className="font-medium">Weight:</span> 100 Grams
                      </p>
                      <p>
                        <span className="font-medium">Contains 12 Main Vitamins:</span>
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {vitamins.map((vitamin) => (
                          <div key={vitamin} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
                            <span>{vitamin}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[color:var(--gold)]/20 pt-3">
                    <h4 className="mb-2 font-semibold text-primary">How to Use</h4>
                    <p className="text-sm text-foreground/80">
                      Take 1 teaspoon (approx. 3–5g) daily with warm water, juice, or smoothie for
                      best results.
                    </p>
                  </div>
                </div>
              </Collapsible>

              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp mt-8 inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-base font-semibold shadow-lg"
              >
                <WhatsAppIcon />
                Buy on WhatsApp
              </a>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
                {trustBadges.map((b) => (
                  <li key={b} className="flex items-center gap-1.5">
                    <Leaf className="h-3.5 w-3.5 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Image Zoom Lightbox */}
        {zoomedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setZoomedImage(null)}
          >
            <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <img
                src={zoomedImage}
                alt="Zoomed view"
                decoding="async"
                className="h-full w-full rounded-lg object-contain shadow-2xl"
                width={1200}
                height={900}
              />
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white active:bg-black/80"
                aria-label="Close zoom"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="bg-[color:var(--secondary)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--gold)]">
            Benefits
          </p>
          <h2 className="font-serif text-4xl font-bold text-primary sm:text-5xl">Why Moringa?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card-lift group relative rounded-2xl border border-[color:var(--gold)]/30 bg-card p-7 shadow-sm"
            >
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[color:var(--gold)] via-primary to-[color:var(--gold)]" />
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-primary py-20 text-cream sm:py-28">
      <div className="absolute inset-0 -z-10 opacity-20">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          loading="lazy"
        />
      </div>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--gold)]">
          Contact
        </p>
        <h2 className="font-serif text-4xl font-bold sm:text-5xl">Get in Touch</h2>

        <a
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp mt-10 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold shadow-xl"
        >
          <WhatsAppIcon />
          Chat with us on WhatsApp
        </a>
        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-cream/80">
          <MessageCircle className="h-4 w-4 text-[color:var(--gold)]" />
          +91 8306936755
        </p>
        <div className="mt-8 space-y-2 text-sm text-cream/80">
          <p className="font-semibold text-cream">Rathore Organic Herbs and Bamboo Farm</p>
          <p>Khasara No. 212 (Khamiyad)</p>
          <p>Village Mamroda, Tehsil Chooti Khatu</p>
          <p>District Didwana Kuchaman, Rajasthan - 341305</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--deep-green)] py-6 text-center text-sm text-cream/80">
      © 2026 BSR Green Gold. All rights reserved.
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Product />
        <Benefits />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
