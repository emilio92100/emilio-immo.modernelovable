import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MentionsLegales = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="pt-28 pb-12 bg-primary">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">Mentions légales</h1>
        <div className="w-16 h-0.5 bg-accent mx-auto" />
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-6 max-w-3xl font-body text-base text-muted-foreground leading-relaxed space-y-8">

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Éditeur du site</h2>
          <p>
            Le site <strong className="text-foreground">emilio-immo.com</strong> est édité par la société Emilio Immobilier,
            société par actions simplifiée au capital variable.
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Siège social : Paris & Hauts-de-Seine (92)</li>
            <li>Directeur de la publication : <strong className="text-foreground">Alexandre ROGELET</strong></li>
            <li>Téléphone : 01 84 80 14 00</li>
            <li>E-mail : agence@emilio-immo.com</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Activité réglementée</h2>
          <p>
            Emilio Immobilier est titulaire de la carte professionnelle de transaction sur immeubles et fonds de commerce (Carte T),
            délivrée par la Chambre de Commerce et d'Industrie conformément à la loi n° 70-9 du 2 janvier 1970 (loi Hoguet) 
            et au décret n° 72-678 du 20 juillet 1972.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Assurance Responsabilité Civile Professionnelle</h2>
          <p>
            Emilio Immobilier bénéficie d'une assurance de responsabilité civile professionnelle souscrite auprès de :
          </p>
          <p className="mt-2">
            <strong className="text-foreground">MMA — Agence de Boulogne</strong><br />
            85, Route de la Reine<br />
            92100 Boulogne-Billancourt
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Garantie financière</h2>
          <p>
            Conformément à la réglementation en vigueur, Emilio Immobilier justifie d'une garantie financière 
            suffisante pour couvrir les fonds qu'elle est amenée à détenir pour le compte de ses clients, 
            si applicable.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Hébergement</h2>
          <p>
            Ce site est hébergé par Lovable (https://lovable.dev).
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, logos, éléments graphiques) est protégé par le droit 
            d'auteur et le droit des marques. Toute reproduction, représentation, modification, publication ou 
            adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
            est interdite sans l'autorisation écrite préalable d'Emilio Immobilier.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Protection des données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
            vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles 
            vous concernant. Pour exercer ces droits, vous pouvez nous contacter à l'adresse : agence@emilio-immo.com.
          </p>
          <p className="mt-3">
            Les données collectées via les formulaires de contact et d'estimation sont utilisées exclusivement dans le 
            cadre de votre projet immobilier et ne sont en aucun cas cédées à des tiers sans votre consentement.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Médiation</h2>
          <p>
            Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, Emilio Immobilier propose 
            un dispositif de médiation de la consommation. Le médiateur retenu est accessible via le site 
            de la Médiation de la consommation ou par courrier.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-foreground mb-3">Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. 
            Aucun cookie publicitaire ou de traçage n'est utilisé sans votre consentement préalable.
          </p>
        </div>

      </div>
    </section>

    <Footer />
  </div>
);

export default MentionsLegales;
