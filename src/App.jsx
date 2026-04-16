import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── TRADUCTIONS ────────────────────────────────────────────────────────────
const LANG = {
  fr: {
    nav: {
      services: 'Services',
      galerie: 'Galerie',
      avis: 'Avis',
      contact: 'Contact',
    },
    hero: {
      tag: '🇮🇹 Le Design Italien en France 🇫🇷',
      title: 'Menuiseries\nd\'exception',
      sub: 'De la prise de mesures à la pose — solutions esthétiques, durables et performantes pour vos projets de rénovation ou construction.',
      cta1: 'Demander un devis',
      cta2: 'Nos services',
    },
    about: {
      title: 'Qui sommes-nous ?',
      text: 'Stile Serramenti, c\'est l\'expertise italienne de la menuiserie extérieure au service de vos projets en France. Fondée par Dario Vano depuis Isola del Liri (FR), notre entreprise propose des produits de qualité supérieure — fenêtres, portes blindées, volets, pergolas — sélectionnés pour leur esthétique et leurs performances thermiques et acoustiques. Nous accompagnons chaque client de la conception à la pose, avec étude personnalisée et prix attractifs.',
      highlights: ['Étude personnalisée', 'Produits de qualité', 'Accompagnement professionnel', 'Prix attractifs'],
    },
    services: {
      title: 'Nos services',
      sub: 'Des solutions complètes pour tous vos projets de menuiserie extérieure',
      items: [
        { icon: '🪟', title: 'Infissi Legno / Alu / PVC', desc: 'Fenêtres et portes-fenêtres en bois, aluminium ou PVC — blanc ou couleur, sur mesure pour chaque ouverture.' },
        { icon: '🔒', title: 'Portes blindées', desc: 'Portoni blindati haute sécurité, design contemporain ou classique, avec serrures certifiées.' },
        { icon: '🌿', title: 'Pergolas bioclimatiques', desc: 'Pergolas à lames orientables pour profiter de votre extérieur toute l\'année, en toute sérénité.' },
        { icon: '🏠', title: 'Volets & Moustiquaires', desc: 'Volets roulants et battants, moustiquaires sur mesure — confort et protection garantis.' },
      ],
    },
    galerie: {
      title: 'Nos réalisations',
      sub: 'Quelques exemples de notre savoir-faire',
      titleTech: 'Atelier & Technique',
      subTech: 'Notre outil de production et notre savoir-faire artisanal',
    },
    avis: {
      title: 'Avis clients',
      sub: 'Ce que nos clients disent de nous sur Google',
      cta: 'Voir tous les avis',
    },
    contact: {
      title: 'Nous contacter',
      sub: 'Demandez votre étude personnalisée — réponse sous 24h',
      name: 'Votre nom',
      phone: 'Votre téléphone',
      email: 'Votre email',
      message: 'Votre message / projet',
      send: 'Envoyer la demande',
      sending: 'Envoi en cours…',
      success: '✅ Message envoyé ! Nous vous répondons sous 24h.',
      error: '❌ Erreur — réessayez ou appelez directement.',
      contactFR: 'Contact France',
      contactIT: 'Contact Italie',
    },
    footer: {
      rights: '© 2026 Stile Serramenti — Dario Vano · Tous droits réservés',
      address: 'Via Vado Capone, 104 — 03036 Isola del Liri (FR) Italie',
      legal: 'Mentions légales',
    },
  },
  it: {
    nav: {
      services: 'Servizi',
      galerie: 'Galleria',
      avis: 'Recensioni',
      contact: 'Contatti',
    },
    hero: {
      tag: '🇮🇹 Il Design Italiano in Francia 🇫🇷',
      title: 'Serramenti\nd\'eccellenza',
      sub: 'Dal sopralluogo alla posa — soluzioni estetiche, durevoli e performanti per i tuoi progetti di ristrutturazione o costruzione.',
      cta1: 'Richiedi un preventivo',
      cta2: 'I nostri servizi',
    },
    about: {
      title: 'Chi siamo',
      text: 'Stile Serramenti porta in Francia l\'eccellenza artigianale italiana nel settore dei serramenti. Fondata da Dario Vano da Isola del Liri (FR), la nostra azienda propone prodotti di alta qualità — finestre, portoni blindati, avvolgibili, pergole — selezionati per la loro estetica e le loro prestazioni termiche e acustiche. Seguiamo ogni cliente dalla progettazione alla posa, con studio personalizzato e prezzi competitivi.',
      highlights: ['Studio personalizzato', 'Prodotti di qualità', 'Assistenza professionale', 'Prezzi competitivi'],
    },
    services: {
      title: 'I nostri servizi',
      sub: 'Soluzioni complete per tutti i tuoi progetti di serramentistica',
      items: [
        { icon: '🪟', title: 'Infissi Legno / Alluminio / PVC', desc: 'Finestre e portefinestre in legno, alluminio o PVC — bianco o colore, su misura per ogni apertura.' },
        { icon: '🔒', title: 'Portoni blindati', desc: 'Portoni blindati alta sicurezza, design contemporaneo o classico, con serrature certificate.' },
        { icon: '🌿', title: 'Pergole bioclimatiche', desc: 'Pergole a lamelle orientabili per godere degli spazi esterni tutto l\'anno, in totale serenità.' },
        { icon: '🏠', title: 'Avvolgibili & Zanzariere', desc: 'Avvolgibili e persiane, zanzariere su misura — comfort e protezione garantiti.' },
      ],
    },
    galerie: {
      title: 'Le nostre realizzazioni',
      sub: 'Alcuni esempi del nostro savoir-faire',
      titleTech: 'Atelier & Tecnica',
      subTech: 'Il nostro strumento di produzione e il nostro savoir-faire artigianale',
    },
    avis: {
      title: 'Recensioni clienti',
      sub: 'Cosa dicono i nostri clienti su Google',
      cta: 'Vedi tutte le recensioni',
    },
    contact: {
      title: 'Contattaci',
      sub: 'Richiedi il tuo studio personalizzato — risposta entro 24h',
      name: 'Il tuo nome',
      phone: 'Il tuo telefono',
      email: 'La tua email',
      message: 'Il tuo messaggio / progetto',
      send: 'Invia richiesta',
      sending: 'Invio in corso…',
      success: '✅ Messaggio inviato! Ti risponderemo entro 24h.',
      error: '❌ Errore — riprova o chiama direttamente.',
      contactFR: 'Contatto Francia',
      contactIT: 'Contatto Italia',
    },
    footer: {
      rights: '© 2026 Stile Serramenti — Dario Vano · Tutti i diritti riservati',
      address: 'Via Vado Capone, 104 — 03036 Isola del Liri (FR) Italia',
      legal: 'Note legali',
    },
  },
}

// ─── PHOTOS GALERIE ─────────────────────────────────────────────────────────
const GALERIE_REALIZZAZIONI = [
  { src: '/galerie/realizzazione_salon_moderne.jpg', alt: 'Salon moderne — grandes fenêtres' },
  { src: '/galerie/isola_del_liri_serramenti_in_legno_alluminio.jpg', alt: 'Serramenti legno-alluminio' },
  { src: '/galerie/isola_del_liri_serramenti_in_legno.jpg', alt: 'Serramenti in legno' },
  { src: '/galerie/serramenti_a_isola_del_liri_jpg.jpg', alt: 'Serramenti Isola del Liri' },
  { src: '/galerie/serramenti_in_pvc_a_isola_del_liri_.jpg', alt: 'Serramenti PVC' },
  { src: '/galerie/zanzariere_vue_mer.jpg', alt: 'Zanzariere vue mer' },
  { src: '/galerie/pose_reelle_fenetre_legno.jpg', alt: 'Pose réelle — fenêtres bois' },
]

const GALERIE_TECNICA = [
  { src: '/galerie/atelier_vue_large.jpg', alt: 'Atelier — vue générale' },
  { src: '/galerie/atelier_stockage_profiles.jpg', alt: 'Stockage profilés' },
  { src: '/galerie/atelier_machine_cisaille.jpg', alt: 'Machine de découpe' },
  { src: '/galerie/atelier_machines_vue.jpg', alt: 'Atelier — machines' },
  { src: '/galerie/atelier_machine_usinage.jpg', alt: 'Machine d\'usinage' },
  { src: '/galerie/atelier_machine_circulaire.jpg', alt: 'Machine circulaire' },
  { src: '/galerie/profil_legno_alluminio_coupe.jpg', alt: 'Coupe profilé legno-alluminio' },
  { src: '/galerie/detail_ferrure_legno.webp', alt: 'Ferrure fenêtre bois' },
  { src: '/galerie/detail_poignee_alu.jpg', alt: 'Poignée aluminium' },
  { src: '/galerie/detail_serrure_pvc.jpg', alt: 'Serrure PVC' },
]

// ─── AVIS FICTIFS placeholder ─────────────────────────────────────────────
const AVIS = [
  { name: 'Marco R.', note: 5, texte: 'Qualità eccellente, installazione impeccabile. Professionisti veri!', date: 'mars 2025' },
  { name: 'Sophie D.', note: 5, texte: 'Très professionnel, Nathalie super réactive. Fenêtres magnifiques et bien isolées.', date: 'janvier 2025' },
  { name: 'Giuseppe T.', note: 5, texte: 'Prezzi competitivi e materiali di alta gamma. Consiglio vivamente!', date: 'novembre 2024' },
  { name: 'Isabelle M.', note: 5, texte: 'Pergola bioclimatique posée en 2 jours, travail soigné. Très satisfaite.', date: 'octobre 2024' },
]

// ─── COMPOSANT ÉTOILES ───────────────────────────────────────────────────
function Stars({ n }) {
  return <span style={{ color: '#f0b429', fontSize: '1.1rem' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

// ─── WHATSAPP ICON ───────────────────────────────────────────────────────────
function WaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ─── COMPOSANT GALERIE CAROUSEL ──────────────────────────────────────────────
function GalerieCarousel({ photos }) {
  const [idx, setIdx] = useState(0)
  const touchStartX = useRef(null)

  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length)
  const next = () => setIdx(i => (i + 1) % photos.length)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -40) next()
    else if (dx > 40) prev()
    touchStartX.current = null
  }

  return (
    <>
      {/* Desktop: grid */}
      <div className="galerie__grid galerie__grid--desktop">
        {photos.map((img, i) => (
          <div key={i} className="galerie__item">
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="galerie__overlay"><span>{img.alt}</span></div>
          </div>
        ))}
      </div>
      {/* Mobile: carousel */}
      <div
        className="galerie__carousel"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="galerie__carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {photos.map((img, i) => (
            <div key={i} className="galerie__carousel-slide">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="galerie__overlay"><span>{img.alt}</span></div>
            </div>
          ))}
        </div>
        <button className="galerie__carousel-btn galerie__carousel-btn--prev" onClick={prev}>‹</button>
        <button className="galerie__carousel-btn galerie__carousel-btn--next" onClick={next}>›</button>
        <div className="galerie__carousel-dots">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`galerie__dot${i === idx ? ' galerie__dot--active' : ''}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('it')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [formMsg, setFormMsg] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const t = LANG[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSend = async () => {
    if (!formData.name || !formData.message) return
    setSending(true)
    setFormMsg('')
    try {
      const res = await fetch('https://formspree.io/f/mbdqdaze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          nom: formData.name,
          email: formData.email,
          telephone: formData.phone,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setFormMsg(t.contact.success)
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        setFormMsg(t.contact.error)
      }
    } catch {
      setFormMsg(t.contact.error)
    } finally {
      setSending(false)
    }
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <div className="nav__logo" onClick={() => scrollTo('hero')}>
            <span className="nav__logo-stile">Stile</span>
            <span className="nav__logo-serra"> Serramenti</span>
          </div>

          <div className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
            {['services','galerie','avis','contact'].map(s => (
              <button key={s} className="nav__link" onClick={() => scrollTo(s)}>
                {t.nav[s]}
              </button>
            ))}
          </div>

          <div className="nav__lang">
            <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
            <span>|</span>
            <button className={lang === 'it' ? 'active' : ''} onClick={() => setLang('it')}>IT</button>
          </div>

          <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section id="hero" className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <div className="hero__tag animate-up">{t.hero.tag}</div>
          <h1 className="hero__title animate-up" style={{ animationDelay: '0.1s' }}>
            {t.hero.title.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h1>
          <p className="hero__sub animate-up" style={{ animationDelay: '0.2s' }}>{t.hero.sub}</p>
          <div className="hero__ctas animate-up" style={{ animationDelay: '0.3s' }}>
            <button className="btn btn--primary" onClick={() => scrollTo('contact')}>{t.hero.cta1}</button>
            <button className="btn btn--ghost" onClick={() => scrollTo('services')}>{t.hero.cta2}</button>
          </div>
        </div>
        <div className="hero__scroll-hint" onClick={() => scrollTo('about')}>
          <span />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="about">
        <div className="section-wrap about__inner">
          <div className="about__text">
            <div className="gold-line" style={{ margin: '0 0 16px' }} />
            <h2 className="section-title" style={{ textAlign: 'left' }}>{t.about.title}</h2>
            <p className="about__para">{t.about.text}</p>
            <div className="about__highlights">
              {t.about.highlights.map((h, i) => (
                <div key={i} className="about__badge">
                  <span className="about__badge-dot" />
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="about__visual">
            <div className="about__flag-card">
              <div className="about__flag-line">🇮🇹 Design &amp; Fabrication</div>
              <div className="about__flag-sep" />
              <div className="about__flag-line">🇫🇷 Pose &amp; Service</div>
              <div className="about__flag-contact">
                <a href="tel:+393275670003">📞 +39 327 567 0003</a>
                <a href="tel:+33631354105">📞 +33 6 31 35 41 05</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section id="services" className="services">
        <div className="section-wrap">
          <div className="gold-line" />
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.sub}</p>
          <div className="services__grid">
            {t.services.items.map((s, i) => (
              <div key={i} className="service-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIE REALIZZAZIONI ────────────────────────────────── */}
      <section id="galerie" className="galerie">
        <div className="section-wrap">
          <div className="gold-line" />
          <h2 className="section-title">{t.galerie.title}</h2>
          <p className="section-subtitle">{t.galerie.sub}</p>
          <GalerieCarousel photos={GALERIE_REALIZZAZIONI} />
        </div>
      </section>

      {/* ── GALERIE TECNICA ──────────────────────────────────────── */}
      <section id="galerie-tecnica" className="galerie galerie--tecnica">
        <div className="section-wrap">
          <div className="gold-line" />
          <h2 className="section-title">{t.galerie.titleTech}</h2>
          <p className="section-subtitle">{t.galerie.subTech}</p>
          <GalerieCarousel photos={GALERIE_TECNICA} />
        </div>
      </section>

      {/* ── AVIS ─────────────────────────────────────────────────── */}
      <section id="avis" className="avis">
        <div className="section-wrap">
          <div className="gold-line" />
          <h2 className="section-title">{t.avis.title}</h2>
          <p className="section-subtitle">{t.avis.sub}</p>
          <div className="avis__grid">
            {AVIS.map((a, i) => (
              <div key={i} className="avis-card">
                <div className="avis-card__header">
                  <div className="avis-card__avatar">{a.name[0]}</div>
                  <div>
                    <div className="avis-card__name">{a.name}</div>
                    <div className="avis-card__date">{a.date}</div>
                  </div>
                  <Stars n={a.note} />
                </div>
                <p className="avis-card__text">"{a.texte}"</p>
              </div>
            ))}
          </div>
          <div className="avis__cta">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Stile+Serramenti+Isola+del+Liri"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              {t.avis.cta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="contact">
        <div className="section-wrap contact__inner">
          <div className="contact__info">
            <div className="gold-line" style={{ margin: '0 0 16px' }} />
            <h2 className="section-title" style={{ textAlign: 'left' }}>{t.contact.title}</h2>
            <p className="contact__sub">{t.contact.sub}</p>

            <div className="contact__block">
              <div className="contact__block-label">{t.contact.contactFR}</div>
              <div className="contact__block-name">Nathalie</div>
              <a href="tel:+33631354105" className="contact__tel">+33 6 31 35 41 05</a>
            </div>

            <div className="contact__block">
              <div className="contact__block-label">{t.contact.contactIT}</div>
              <div className="contact__block-name">Dario Vano</div>
              <a href="tel:+393275670003" className="contact__tel">+39 327 567 0003</a>
              <a href="mailto:stileserramenti@libero.it" className="contact__mail">stileserramenti@libero.it</a>
            </div>

            <div className="contact__address">
              📍 Via Vado Capone, 104<br />
              03036 Isola del Liri (FR) — Italia
            </div>
          </div>

          <div className="contact__form">
            <input
              type="text"
              placeholder={t.contact.name}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
            <input
              type="tel"
              placeholder={t.contact.phone}
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
            />
            <input
              type="email"
              placeholder={t.contact.email}
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder={t.contact.message}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="form-input form-textarea"
              rows={5}
            />
            <button
              className="btn btn--primary btn--full"
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? t.contact.sending : t.contact.send}
            </button>
            {formMsg && <p className="form-msg">{formMsg}</p>}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="section-wrap footer__inner">
          <div className="footer__logo">
            <span className="nav__logo-stile">Stile</span>
            <span className="nav__logo-serra"> Serramenti</span>
          </div>
          <div className="footer__info">
            <p>{t.footer.address}</p>
            <p>
              <a href="mailto:stileserramenti@libero.it">stileserramenti@libero.it</a>
            </p>
          </div>
          <p className="footer__rights">{t.footer.rights}</p>
          <p className="footer__credit">
            Site créé par <a href="https://orchestrateur-ai.fr/" target="_blank" rel="noopener noreferrer">Olivier Scafi — Orchestrateur IA</a>
          </p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTTANTS ────────────────────────────────── */}
      <div className="wa-float">
        <a
          href="https://wa.me/393275670003"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn wa-btn--it"
          title="WhatsApp Italie — Dario"
        >
          <WaIcon />
          <span className="wa-label">🇮🇹 Dario</span>
        </a>
        <a
          href="https://wa.me/33631354105"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn wa-btn--fr"
          title="WhatsApp France — Nathalie"
        >
          <WaIcon />
          <span className="wa-label">🇫🇷 Nathalie</span>
        </a>
      </div>

    </div>
  )
}
