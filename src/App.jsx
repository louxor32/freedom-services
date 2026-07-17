import { useMemo, useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'

import {
  Armchair,
  CalendarDays,
  CheckCircle2,
  Droplets,
  Hammer,
  House,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PaintRoller,
  Phone,
  PlugZap,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
  X
} from 'lucide-react'

const PHONE_DISPLAY = '06 10 28 45 57'
const PHONE = '33610284557'
const EMAIL = 'delrieu.mick@gmail.com'

const services = [
  ['parquet','Pose de parquet',Ruler,'Préparation du support, pose, découpes et finitions.'],
  ['cuisine','Montage de cuisine',House,'Montage des meubles, plans de travail, réglages et finitions.'],
  ['placo','Placo',Hammer,'Cloisons, doublage, faux plafonds et réparations courantes.'],
  ['peinture','Peinture intérieure',PaintRoller,'Préparation des supports, murs, plafonds et finitions soignées.'],
  ['electricite',"Petits travaux d'électricité",PlugZap,'Remplacement de prises, luminaires et petits dépannages.'],
  ['plomberie','Petits travaux de plomberie',Droplets,'Robinetterie, siphons, joints et petites réparations.'],
  ['meubles','Montage de meubles',Armchair,'Montage, fixation et réglage de mobilier.'],
  ['divers','Petits travaux & réparations',Wrench,'Pose d’accessoires et interventions multi-services.']
]

const gallery = [
  ['292.jpg','Parquet'],['296.jpg','Parquet'],['325.jpg','Cuisine'],['326.jpg','Cuisine'],
  ['328.jpg','Cuisine'],['346.jpg','Parquet'],['352.jpg','Parquet'],['365.jpg','Parquet'],
  ['410.jpg','Salle de bain'],['413.jpg','Salle de bain'],['694.jpg','Salle de bain'],
  ['747.jpg','Salle de bain'],['1639.jpg','Structure bois'],['1642.jpg','Structure bois'],
  ['2392.jpg','Placo'],['2393.jpg','Placo']
]

function App() {
  const [menu, setMenu] = useState(false)
  const [intro, setIntro] = useState(true)
  const [selected, setSelected] = useState([])
  const [surface, setSurface] = useState(20)
  const [rdv, setRdv] = useState({date:'', period:'Matin', city:''})

  const estimate = useMemo(() => {
    const rates = {parquet:35,cuisine:650,placo:45,peinture:28,electricite:120,plomberie:120,meubles:90,divers:100}
    let base = selected.reduce((sum, id) => sum + (['parquet','placo','peinture'].includes(id) ? rates[id] * Number(surface || 0) : rates[id]), 0)
    return base ? [Math.round(base*0.85/50)*50, Math.round(base*1.2/50)*50] : [0,0]
  }, [selected, surface])

  const whatsapp = (text='Bonjour, je souhaite un devis pour des travaux.') =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`

  const sendQuote = () => {
    const labels = selected.map(id => services.find(s => s[0] === id)?.[1]).join(', ')
    window.open(whatsapp(`Bonjour, je souhaite un devis FreeDom Services.\nTravaux : ${labels || 'À préciser'}\nSurface : ${surface} m²\nEstimation indicative affichée : ${estimate[0]} € à ${estimate[1]} €.`), '_blank')
  }

  const sendRdv = () => {
    window.open(whatsapp(`Bonjour, je souhaite demander un rendez-vous pour un devis.\nDate souhaitée : ${rdv.date || 'à définir'}\nCréneau : ${rdv.period}\nVille : ${rdv.city || 'à préciser'}.`), '_blank')
  }

  return (
    <div>
      {intro && <div className="intro">
        <button className="skip" onClick={()=>setIntro(false)}>Passer</button>
        <img
  src={`${import.meta.env.BASE_URL}images/bjorn-mascotte.png`}
  alt="Bjorn, mascotte FreeDom Services"
/>
        <p className="eyebrow">BIENVENUE CHEZ</p>
        <h1>FreeDom Services</h1>
        <p>La force Viking au service de votre habitat</p>
        <button className="btn gold" onClick={()=>setIntro(false)}>Entrer sur le site</button>
      </div>}

      <header>
  <a className="brand" href="#accueil">
    <img
  src={`${import.meta.env.BASE_URL}images/logo-nav.png`}
  alt="FreeDom Services"
/>

    <div className="brand-text">
      <strong>FreeDom Services</strong>
      <small>La force Viking au service de votre habitat</small>
    </div>
  </a>

  <nav className={menu ? 'open' : ''}>
    {[
      'accueil',
      'services',
      'realisations',
      'devis',
      'rendez-vous',
      'contact'
    ].map((x) => (
      <a
        key={x}
        href={`#${x}`}
        onClick={() => setMenu(false)}
      >
        {x.replace('-', ' ')}
      </a>
    ))}
  </nav>

  <a href="#devis" className="nav-btn">
    Devis gratuit
  </a>

  <button
    className="menu"
    onClick={() => setMenu(!menu)}
    aria-label="Ouvrir le menu"
  >
    {menu ? <X /> : <Menu />}
  </button>
</header>

      <main>
        <section id="accueil" className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={18}/> MULTI-SERVICES À LÉGUEVIN</p>
            <h1>
  Vos travaux réalisés avec sérieux,
  <br />
  <span>force et précision.</span>
</h1>
            <p className="lead">
  FreeDom Services vous accompagne pour vos travaux intérieurs :
  parquet, cuisine, placo, peinture, petits travaux d’électricité,
  plomberie, montage de meubles et réparations diverses autour de Léguevin.
</p>
            <div className="actions">
              <a className="btn gold" href="#devis">Demander un devis gratuit</a>
              <a className="btn outline" href="#realisations">Voir les réalisations</a>
            </div>
            <div className="trust">
              <span><CheckCircle2/> Intervention rapide</span>
              <span><CheckCircle2/> Travail soigné</span>
              <span><CheckCircle2/> Devis gratuit</span>
            </div>
          </div>
          <div className="hero-art"><img src="/images/bjorn-mascotte.png" alt="Bjorn le Bâtisseur"/></div>
        </section>

        <section id="services" className="section">
          <p className="eyebrow">LES SERVICES FREEDOM</p>
<h2>Des solutions pratiques pour améliorer votre habitat</h2>
<p className="lead">
  Un interlocuteur unique pour vos petits et moyens travaux,
  avec des prestations adaptées à votre logement et à votre budget.
</p>
          <div className="cards">
            {services.map(([id,title,Icon,text]) => <article className="card" key={id}>
              <Icon/><h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>
        </section>

        <section className="why">
  <div>
    <ShieldCheck />
    <h3>Travail soigné</h3>
    <p>
      Chaque chantier est réalisé avec précision et dans le respect de votre logement.
    </p>
  </div>

  <div>
    <Hammer />
    <h3>Polyvalence</h3>
    <p>
      Un seul artisan pour plusieurs types de travaux, sans multiplier les intervenants.
    </p>
  </div>

  <div>
    <CheckCircle2 />
    <h3>Devis gratuit</h3>
    <p>
      Une estimation claire avant toute intervention, sans engagement.
    </p>
  </div>

  <div>
    <MapPin />
    <h3>Proximité</h3>
    <p>
      Basé à Léguevin avec des interventions dans un rayon de 30 km.
    </p>
  </div>

  <div>
    <MessageCircle />
    <h3>Réactivité</h3>
    <p>
      Réponse rapide par téléphone, e-mail ou WhatsApp.
    </p>
  </div>

  <div>
    <Sparkles />
    <h3>Finitions de qualité</h3>
    <p>
      Parce que les détails font toute la différence.
    </p>
  </div>
</section>

        <section id="realisations" className="section">
          <p className="eyebrow">CHANTIERS RÉALISÉS</p>
          <h2>Quelques réalisations</h2>
          <div className="gallery">
            {gallery.map(([file,label]) => <figure key={file}>
              <img
  loading="lazy"
  src={`${import.meta.env.BASE_URL}images/realisations/${file}`}
  alt={`${label} réalisé par FreeDom Services`}
/>
              <figcaption>{label}</figcaption>
            </figure>)}
          </div>
        </section>

        <section id="devis" className="section quote">
          <div>
            <p className="eyebrow">ESTIMATEUR INDICATIF</p>
            <h2>Préparez votre demande de devis</h2>
            <p>L’estimation sert uniquement à préparer votre projet. Le prix final sera confirmé après échange ou visite.</p>
          </div>
          <div className="wizard">
            <h3>1. Sélectionnez vos travaux</h3>
            <div className="checks">
              {services.map(([id,title]) => <label key={id}>
                <input type="checkbox" checked={selected.includes(id)}
                  onChange={()=>setSelected(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])}/>
                <span>{title}</span>
              </label>)}
            </div>
            <label className="field">Surface approximative (m²)
              <input type="number" min="1" value={surface} onChange={e=>setSurface(e.target.value)}/>
            </label>
            <div className="estimate">
              <span>Estimation indicative</span>
              <strong>{estimate[0] ? `${estimate[0].toLocaleString('fr-FR')} € à ${estimate[1].toLocaleString('fr-FR')} €` : 'Sélectionnez une prestation'}</strong>
            </div>
            <button className="btn gold full" onClick={sendQuote}>Continuer sur WhatsApp</button>
          </div>
        </section>

        <section id="rendez-vous" className="section appointment">
          <div>
            <p className="eyebrow">PRISE DE RENDEZ-VOUS</p>
            <h2>Demandez une visite pour votre devis</h2>
            <p>Choisissez une date et un créneau souhaités. La disponibilité sera ensuite confirmée avec vous.</p>
          </div>
          <div className="form">
            <label>Date souhaitée<input type="date" value={rdv.date} onChange={e=>setRdv({...rdv,date:e.target.value})}/></label>
            <label>Créneau<select value={rdv.period} onChange={e=>setRdv({...rdv,period:e.target.value})}><option>Matin</option><option>Après-midi</option></select></label>
            <label>Ville du chantier<input value={rdv.city} onChange={e=>setRdv({...rdv,city:e.target.value})} placeholder="Ex. Léguevin"/></label>
            <button className="btn gold" onClick={sendRdv}><CalendarDays/> Envoyer la demande</button>
          </div>
        </section>

        <section className="comic section">
          <div><p className="eyebrow">LES AVENTURES DE BJORN</p><h2>Une communication qui ne ressemble à aucune autre</h2></div>
          <img src="/images/bd-bjorn.png" alt="BD publicitaire Bjorn à la rescousse"/>
        </section>

        <section id="contact" className="contact section">
          <div><p className="eyebrow">CONTACT</p><h2>Parlons de votre projet</h2></div>
          <div className="contact-grid">
            <a href={`tel:+${PHONE}`}><Phone/> <span><b>{PHONE_DISPLAY}</b><small>Appeler maintenant</small></span></a>
            <a href={`mailto:${EMAIL}`}><Mail/> <span><b>{EMAIL}</b><small>Écrire un e-mail</small></span></a>
            <a
  href="https://www.facebook.com/MickaFreedomServices/"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaFacebookF />

  <span>
    <b>Facebook</b>
    <small>Voir la page FreeDom Services</small>
  </span>
</a>
            <a href={whatsapp()} target="_blank" rel="noreferrer"><MessageCircle/> <span><b>WhatsApp</b><small>Message direct</small></span></a>
            <div><MapPin/> <span><b>Léguevin + 30 km</b><small>Du lundi au vendredi, 8 h–18 h</small></span></div>
          </div>
        </section>
      </main>

      <footer>
        <div><strong>FreeDom Services</strong><p>La force Viking au service de votre habitat.</p></div>
        <div><p>SIRET : 883 183 766 00020</p><p>Paiement : espèces ou virement</p></div>
        <div><p>TVA non applicable, art. 293 B du CGI</p><p>© {new Date().getFullYear()} FreeDom Services</p></div>
      </footer>

      <a className="float whatsapp" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Contacter sur WhatsApp"><MessageCircle/></a>
      <a className="float call" href={`tel:+${PHONE}`} aria-label="Appeler FreeDom Services"><Phone/></a>
    </div>
  )
}
export default App
