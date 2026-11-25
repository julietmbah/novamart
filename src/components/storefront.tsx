"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Headphones, House, Menu, Moon, Pause, Play, Search, Shirt, ShoppingBag, Smartphone, Sparkles, Sun, X, LayoutGrid, SlidersHorizontal } from "lucide-react";

const photos = {
  phone: "1511707171634-5f897ff02aa9",
  headphones: "1505740420928-5e560c06d30e",
  sneakers: "1542291026-7eec264c27ff",
  beauty: "1571781926291-c477ebfd024b",
  home: "1600210492486-724fe5c67fb0",
  watch: "1523275335684-37898b6baf30",
} as const;
type Photo = keyof typeof photos;
const photoUrl = (name: Photo, wide: boolean) => `https://images.unsplash.com/photo-${photos[name]}?auto=format&fit=crop&w=${wide ? 1200 : 640}&q=82`;

// Remote photographs are temporary. A bundled illustration replaces any failed image.
function ProductImage({ name, alt, wide = false, eager = false }: { name: Photo; alt: string; wide?: boolean; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <Image src={failed ? `/images/novamart-fallbacks/${name}.svg` : photoUrl(name, wide)} alt={alt} fill sizes={wide ? "(max-width: 767px) 100vw, 55vw" : "(max-width: 767px) 50vw, 25vw"} unoptimized loading={eager ? "eager" : "lazy"} className="nm-image" onError={() => setFailed(true)} />;
}

const categories = [
  { name: "Electronics", photo: "phone", icon: Smartphone, description: "Smart tech for every day" },
  { name: "Fashion", photo: "sneakers", icon: Shirt, description: "Find your personal style" },
  { name: "Beauty", photo: "beauty", icon: Sparkles, description: "Everyday self-care" },
  { name: "Home & Lifestyle", photo: "home", icon: House, description: "Make yourself at home" },
] as const;
type Category = (typeof categories)[number]["name"];
type Product = { name: string; category: Category; photo: Photo; price: number; description: string };
const products: Product[] = [
  { name: "Wireless Headphones", category: "Electronics", photo: "headphones", price: 48000, description: "An over-ear headphone concept for music, work and everyday listening." },
  { name: "Everyday Sneakers", category: "Fashion", photo: "sneakers", price: 65000, description: "A casual sneaker concept to pair with your everyday wardrobe." },
  { name: "Daily Skincare Set", category: "Beauty", photo: "beauty", price: 29500, description: "A sample collection of skincare essentials for your daily routine." },
  { name: "Modern Smartwatch", category: "Electronics", photo: "watch", price: 55000, description: "A modern wearable concept for your everyday lifestyle." },
  { name: "Essential Smartphone", category: "Electronics", photo: "phone", price: 185000, description: "A demonstration smartphone listing for the NovaMart electronics collection." },
  { name: "Living Room Collection", category: "Home & Lifestyle", photo: "home", price: 89000, description: "A sample home collection inspired by calm, comfortable living spaces." },
];
const slides: { label: string; title: string; accent: string; description: string; photo: Photo; caption: string; category: Category }[] = [
  { label: "THE TECH EDIT", title: "Upgrade your", accent: "everyday.", description: "Discover smart devices and modern essentials that fit the way you live.", photo: "headphones", caption: "Discover electronics", category: "Electronics" },
  { label: "THE STYLE EDIT", title: "Find your", accent: "own style.", description: "Refresh your everyday wardrobe with fashion that feels like you.", photo: "sneakers", caption: "Explore fashion", category: "Fashion" },
  { label: "THE BEAUTY EDIT", title: "Make time", accent: "for yourself.", description: "Discover a little inspiration for your beauty and self-care routine.", photo: "beauty", caption: "Explore beauty", category: "Beauty" },
  { label: "THE HOME EDIT", title: "Make home", accent: "feel better.", description: "Find thoughtful inspiration for a more comfortable everyday space.", photo: "home", caption: "Discover home essentials", category: "Home & Lifestyle" },
];
const naira = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const themeEvent = "novamart-theme-change";
function subscribeTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", callback);
  return () => { media.removeEventListener("change", callback); window.removeEventListener(themeEvent, callback); window.removeEventListener("storage", callback); };
}
function readTheme() { return document.documentElement.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light");
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  function toggle() {
    const next = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("novamart-theme", next); } catch { /* The theme still works for this visit. */ }
    window.dispatchEvent(new Event(themeEvent));
  }
  return <button className="nm-icon-button nm-theme" aria-label={label} title={label} onClick={toggle} type="button"><Moon className="nm-moon" size={20} aria-hidden="true"/><Sun className="nm-sun" size={20} aria-hidden="true"/></button>;
}
function subscribeMotion(callback: () => void) { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); media.addEventListener("change", callback); return () => media.removeEventListener("change", callback); }
function useReducedMotion() { return useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true); }

function Logo() { return <a href="#top" className="nm-logo" aria-label="NovaMart home"><span className="nm-logo-mark"><ShoppingBag size={21} strokeWidth={2.1} aria-hidden="true"/></span><span>NovaMart<span className="nm-logo-dot">.</span></span></a>; }

function Hero({ onCategory }: { onCategory: (category: Category) => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const slide = slides[index];
  const playing = !paused && !hovered && !focused && !reduced;
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [playing, index]);
  function step(delta: number) { setIndex((value) => (value + delta + slides.length) % slides.length); }
  return <section className="nm-hero" aria-label="Shopping highlights" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="nm-hero-copy" key={`copy-${index}`}>
      <span className="nm-eyebrow"><span className="nm-dot"/>{slide.label}</span>
      <h1>{slide.title}<br/><span>{slide.accent}</span></h1>
      <p>{slide.description}</p>
      <div className="nm-hero-actions"><button type="button" className="nm-button nm-primary" onClick={() => onCategory(slide.category)}>Shop collection <ArrowRight size={17}/></button><a href="#categories" className="nm-text-link">Explore categories <ArrowDown size={15}/></a></div>
      <span className="nm-hero-note">One store. A world of everyday essentials.</span>
    </div>
    <div className="nm-hero-visual">
      {slides.map((item, i) => <div key={item.photo} className={`nm-slide ${i === index ? "nm-slide-active" : ""}`} aria-hidden={i !== index}><ProductImage name={item.photo} alt={item.caption} wide eager={i === 0}/></div>)}
      <div className="nm-hero-shade"/>
      <div className="nm-photo-caption"><span>THE NOVAMART COLLECTION</span><strong>{slide.caption}</strong></div>
      <div className="nm-carousel-controls"><button type="button" aria-label="Previous slide" onClick={() => step(-1)}><ChevronLeft size={19}/></button><span aria-live="off">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><button type="button" aria-label="Next slide" onClick={() => step(1)}><ChevronRight size={19}/></button></div>
    </div>
    <div className="nm-hero-pagination"><div className="nm-slide-dots" aria-label="Choose a slide">{slides.map((item, i) => <button type="button" key={item.label} className={i === index ? "active" : ""} aria-label={`Show slide ${i + 1}: ${item.label}`} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)} />)}</div>{!reduced && <button className="nm-pause" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>}</div>
  </section>;
}

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; if (dialog && !dialog.open) dialog.showModal(); return () => { if (dialog?.open) dialog.close(); }; }, []);
  return <dialog ref={ref} className="nm-dialog" aria-labelledby="nm-dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); } }}><div className="nm-dialog-header"><h2 id="nm-dialog-title">{title}</h2><button type="button" className="nm-icon-button" onClick={onClose} aria-label="Close dialog"><X size={21}/></button></div>{children}</dialog>;
}

export default function Storefront() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [sort, setSort] = useState("featured");
  const filtered = products.filter((item) => (category === "All" || item.category === category) && `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0);
  function scrollToProducts() { document.getElementById("products")?.scrollIntoView({ block: "start" }); }
  function chooseCategory(value: Category | "All") { setCategory(value); setQuery(""); setSearch(""); setMenu(false); scrollToProducts(); }
  function submitSearch(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSearch(query.trim()); setCategory("All"); setMenu(false); scrollToProducts(); }
  function clearFilters() { setCategory("All"); setQuery(""); setSearch(""); setSort("featured"); }
  return <div id="top" className="nm-store">
    <a href="#main-content" className="nm-skip">Skip to main content</a>
    <div className="nm-topline"><span><ShoppingBag size={13}/> Your everyday shopping destination</span><span className="nm-topline-right">Discover. Explore. Shop smarter.</span></div>
    <header className="nm-header">
      <div className="nm-shell nm-header-inner">
        <Logo/>
        <form className="nm-search" role="search" onSubmit={submitSearch}><Search size={19} aria-hidden="true"/><input aria-label="Search products" placeholder="Search products or categories" value={query} onChange={(event) => setQuery(event.target.value)}/>{query && <button type="button" aria-label="Clear search" onClick={clearFilters}><X size={17}/></button>}<button type="submit" className="nm-search-submit" aria-label="Submit search"><ArrowRight size={18}/></button></form>
        <div className="nm-header-actions"><ThemeToggle/><button type="button" className="nm-signin" onClick={() => setSignIn(true)}>Sign in</button><a className="nm-button nm-primary nm-start" href="#categories">Get started <ArrowUpRight size={15}/></a><button type="button" className="nm-icon-button nm-menu-button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="nm-mobile-nav" onClick={() => setMenu((value) => !value)}>{menu ? <X size={23}/> : <Menu size={23}/>}</button></div>
      </div>
      <nav className="nm-desktop-nav nm-shell" aria-label="Main navigation"><a href="#top" className="nm-nav-home">Home</a><a href="#categories"><LayoutGrid size={15}/> Categories</a><button type="button" onClick={() => chooseCategory("All")}>Shop all</button>{categories.map((item) => <button key={item.name} type="button" onClick={() => chooseCategory(item.name)}>{item.name}</button>)}<a href="#about" className="nm-nav-about">About NovaMart</a></nav>
      {menu && <nav id="nm-mobile-nav" className="nm-mobile-nav nm-shell" aria-label="Mobile navigation"><a href="#top" onClick={() => setMenu(false)}>Home</a><a href="#categories" onClick={() => setMenu(false)}>Categories</a><button type="button" onClick={() => chooseCategory("All")}>Shop all</button>{categories.map((item) => <button key={item.name} type="button" onClick={() => chooseCategory(item.name)}>{item.name}</button>)}<button type="button" onClick={() => { setMenu(false); setSignIn(true); }}>Sign in</button><a href="#categories" className="nm-button nm-primary" onClick={() => setMenu(false)}>Get started <ArrowUpRight size={15}/></a></nav>}
    </header>
    <main id="main-content" className="nm-shell nm-main">
      <Hero onCategory={chooseCategory}/>
      <div className="nm-value-strip"><div><LayoutGrid size={20}/><span>Explore four categories</span></div><div><ShoppingBag size={20}/><span>Everyday essentials</span></div><div><Sparkles size={20}/><span>Discover something new</span></div><div><Headphones size={20}/><span>Simple product browsing</span></div></div>
      <section id="categories" className="nm-section"><div className="nm-section-head"><div><span className="nm-kicker">FIND YOUR FAVOURITES</span><h2>Shop by category</h2><p>Everything you love, all in one place.</p></div><button className="nm-text-link" type="button" onClick={() => chooseCategory("All")}>Explore all <ArrowRight size={17}/></button></div>
        <div className="nm-category-grid">{categories.map((item) => { const Icon = item.icon; return <button type="button" key={item.name} className="nm-category-card" onClick={() => chooseCategory(item.name)}><div className="nm-category-image"><ProductImage name={item.photo} alt=""/><span className="nm-category-icon"><Icon size={19}/></span></div><div className="nm-category-content"><div><h3>{item.name}</h3><p>{item.description}</p></div><ArrowUpRight size={18} className="nm-category-arrow"/></div></button>; })}</div>
      </section>
      <section id="products" className="nm-section nm-products"><div className="nm-section-head"><div><span className="nm-kicker">THE NOVAMART EDIT</span><h2>Discover popular picks</h2><p>Explore our demonstration collection and sample prices.</p></div><button type="button" className="nm-text-link" onClick={clearFilters}>View all products <ArrowRight size={17}/></button></div>
        <div className="nm-filterbar"><div className="nm-filter-tabs" aria-label="Filter products">{(["All", ...categories.map((item) => item.name)] as const).map((item) => <button type="button" key={item} aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => chooseCategory(item)}>{item === "All" ? "All products" : item}</button>)}</div><label className="nm-sort"><SlidersHorizontal size={16}/><span className="nm-sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
        <p className="nm-results" aria-live="polite">{filtered.length} {filtered.length === 1 ? "product" : "products"}{search ? ` matching “${search}”` : ""}</p>
        {filtered.length ? <div className="nm-product-grid">{filtered.map((item) => <article className="nm-product-card" key={item.name}><button type="button" className="nm-product-image" onClick={() => setSelected(item)} aria-label={`Preview ${item.name}`}><ProductImage name={item.photo} alt={item.name}/></button><div className="nm-product-content"><span className="nm-product-category">{item.category}</span><h3>{item.name}</h3><strong className="nm-price">{naira.format(item.price)}</strong><button type="button" className="nm-preview" onClick={() => setSelected(item)}>View product <ArrowUpRight size={15}/></button></div></article>)}</div> : <div className="nm-empty"><Search size={34}/><h3>No matching products</h3><p>Try a different search or explore another category.</p><button className="nm-button nm-primary" type="button" onClick={clearFilters}>Browse all products</button></div>}
      </section>
      <section className="nm-promo" id="about"><div><span className="nm-kicker">A BETTER WAY TO DISCOVER</span><h2>Little finds. Big inspiration.</h2><p>From smart gadgets to everyday style, NovaMart brings your favourite categories together in one simple shopping experience.</p><a href="#categories" className="nm-button nm-primary">Find your favourites <ArrowRight size={17}/></a></div><div className="nm-promo-image"><ProductImage name="home" alt="A comfortable, contemporary living room" wide/></div></section>
    </main>
    <footer className="nm-footer"><div className="nm-shell nm-footer-inner"><div><Logo/><p>Shop smarter. Live better.</p><span className="nm-footer-note">Portfolio storefront in development. Products and prices are illustrative.</span></div><div><h3>Explore</h3><a href="#categories">Categories</a><a href="#products">Products</a><a href="#about">About us</a></div><div><h3>NovaMart</h3><button type="button" onClick={() => setSignIn(true)}>Sign in</button><a href="#top">Back to top</a></div></div><div className="nm-shell nm-footer-bottom"><span>© 2026 NovaMart.</span><span>Designed for a better everyday shopping experience.</span></div></footer>
    {signIn && <Dialog title="Welcome to NovaMart" onClose={() => setSignIn(false)}><div className="nm-dialog-body"><p>Sign-in for store administrators is coming soon. You can explore our products without an account.</p><button className="nm-button nm-primary" type="button" onClick={() => { setSignIn(false); chooseCategory("All"); }}>Continue browsing <ArrowRight size={17}/></button></div></Dialog>}
    {selected && <Dialog title={selected.name} onClose={() => setSelected(null)}><div className="nm-dialog-body"><div className="nm-dialog-image"><ProductImage name={selected.photo} alt={selected.name}/></div><span className="nm-product-category">{selected.category}</span><strong className="nm-price">{naira.format(selected.price)}</strong><p>{selected.description}</p><p className="nm-demo-note">This is a demonstration product. Ordering and checkout are not available yet.</p><button className="nm-button nm-primary" type="button" onClick={() => setSelected(null)}>Continue browsing</button></div></Dialog>}
  </div>;
}
