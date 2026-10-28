import {Link} from 'react-router';

/**
 * The rich "A+" story shown below the buy box on every product page:
 * a brand banner, feature tiles, the unboxing, the personal message,
 * what's in the box, who it's for, care, specifications and the brand story.
 *
 * Wording follows the IVAARO Brand Story & Identity proposal (29 Oct 2026).
 * Items that the brand book marks as proposals (crown marking, box contents)
 * should be confirmed before launch.
 */
export function ProductStory({
  title,
  productType,
  sku,
}: {
  title: string;
  productType?: string | null;
  sku?: string | null;
}) {
  const specs: Array<[string, string]> = [
    ['Brand', 'IVAARO'],
    ['Product', title],
    ...(productType
      ? ([['Type', productType]] as Array<[string, string]>)
      : []),
    ['Finish', 'Glossy black with gold clip, centre ring and cone'],
    ['Marking', 'Small gold emblem on the crown; clean barrel'],
    ['Presentation', 'Aubergine hinged box with a fitted ivory tray'],
    ['In the box', 'Pen, ivory satin sleeve, folded story and message leaf'],
    ...(sku ? ([['SKU', sku]] as Array<[string, string]>) : []),
  ];

  return (
    <div className="iv-aplus" id="details">
      {/* 1. Brand banner */}
      <section className="iv-ap-banner" aria-labelledby="ap-banner-title">
        <div className="iv-container iv-ap-banner-inner">
          <p className="iv-ap-from">From the brand</p>
          <img
            className="iv-ap-banner-logo"
            src="/images/ivaaro-logo-stacked-gold.png"
            alt="IVAARO"
            width={160}
            height={76}
            loading="lazy"
          />
          <h2 id="ap-banner-title" className="iv-ap-banner-title">
            A quieter signature.
          </h2>
          <p className="iv-ap-banner-text">
            Glossy black and gold, marked only by a small emblem on the crown.
          </p>
        </div>
        <div className="iv-ap-pen">
          <img
            src="/images/aplus/pen-banner.jpg"
            alt="The IVAARO pen shown at full length: glossy black barrel, gold clip, centre ring and cone"
            width={1501}
            height={188}
            loading="lazy"
          />
        </div>
      </section>

      {/* 2. Feature tiles */}
      <section className="iv-ap-section" aria-labelledby="ap-features-title">
        <div className="iv-container">
          <div className="iv-ap-head">
            <p className="iv-eyebrow">The details</p>
            <h2 id="ap-features-title" className="iv-heading">
              Made to be noticed quietly
            </h2>
          </div>
          <div className="iv-ap-tiles">
            <article className="iv-ap-tile">
              <div className="iv-ap-tile-media">
                <img
                  src="/images/aplus/crown.jpg"
                  alt="Close-up of the pen's black crown with the gold IVAARO emblem"
                  width={471}
                  height={289}
                  loading="lazy"
                />
              </div>
              <h3>One deliberate mark</h3>
              <p>
                A single gold emblem on the crown. The barrel stays clean, with
                no name across it.
              </p>
            </article>
            <article className="iv-ap-tile">
              <div className="iv-ap-tile-media">
                <img
                  src="/images/aplus/pen-in-tray.jpg"
                  alt="The black and gold pen resting in its fitted ivory tray"
                  width={803}
                  height={222}
                  loading="lazy"
                />
              </div>
              <h3>Black and gold</h3>
              <p>
                A glossy black barrel with a gold clip, centre ring and cone,
                and its original decorative linework.
              </p>
            </article>
            <article className="iv-ap-tile">
              <div className="iv-ap-tile-media">
                <img
                  src="/images/aplus/sleeve-detail.jpg"
                  alt="Ivory satin sleeve with a gold IVAARO logo and aubergine cords"
                  width={260}
                  height={273}
                  loading="lazy"
                />
              </div>
              <h3>An ivory satin sleeve</h3>
              <p>
                Warm ivory satin with a champagne-gold logo and aubergine cords,
                to carry the pen day to day.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. The opening: image left, text right */}
      <section
        className="iv-ap-section iv-ap-section--ivory"
        aria-labelledby="ap-opening-title"
      >
        <div className="iv-container iv-ap-split">
          <div className="iv-ap-split-media">
            <img
              src="/images/aplus/inner-lid.jpg"
              alt="The open box: ivory inner lid with a centred gold emblem"
              width={751}
              height={418}
              loading="lazy"
            />
          </div>
          <div className="iv-ap-split-copy">
            <p className="iv-eyebrow">The presentation box</p>
            <h2 id="ap-opening-title" className="iv-heading">
              A considered opening
            </h2>
            <p>
              A plain aubergine exterior with one centred gold logo. Open it to
              an ivory inner lid, and the message comes before the pen.
            </p>
            <ol className="iv-ap-steps">
              <li>
                <span className="iv-ap-step-num">01</span>
                <span>
                  <strong>The closed box.</strong> Aubergine, with the gold
                  IVAARO logo.
                </span>
              </li>
              <li>
                <span className="iv-ap-step-num">02</span>
                <span>
                  <strong>The story leaf.</strong> Our story, and space for your
                  words.
                </span>
              </li>
              <li>
                <span className="iv-ap-step-num">03</span>
                <span>
                  <strong>The pen.</strong> Centred in a fitted ivory tray.
                </span>
              </li>
              <li>
                <span className="iv-ap-step-num">04</span>
                <span>
                  <strong>The sleeve.</strong> Light ivory satin, beneath the
                  tray.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Personal message: text left, image right */}
      <section className="iv-ap-section" aria-labelledby="ap-wish-title">
        <div className="iv-container iv-ap-split iv-ap-split--reverse">
          <div className="iv-ap-split-media iv-ap-split-media--paper">
            <img
              src="/images/message-leaf.jpg"
              alt="The folded leaf: our story on one side, and a page headed A wish for you with lines to write on"
              width={632}
              height={328}
              loading="lazy"
            />
          </div>
          <div className="iv-ap-split-copy">
            <p className="iv-eyebrow">The folded leaf</p>
            <h2 id="ap-wish-title" className="iv-heading">
              What I wish for you…
            </h2>
            <p>
              When we give something to someone we love, there is often more we
              want to say. The leaf keeps our story on one side and a generous
              space for yours on the other.
            </p>
            <p className="iv-leaf-note">
              A few words today. Something to return to.
            </p>
            <p className="iv-ap-hint">
              Add your message in the bag before checkout.
            </p>
          </div>
        </div>
      </section>

      {/* 5. What's in the box */}
      <section
        className="iv-ap-section iv-ap-section--satin"
        aria-labelledby="ap-box-title"
      >
        <div className="iv-container">
          <div className="iv-ap-head">
            <p className="iv-eyebrow">What’s in the box</p>
            <h2 id="ap-box-title" className="iv-heading">
              Everything has a purpose
            </h2>
          </div>
          <ul className="iv-ap-box">
            <li>
              <div className="iv-ap-box-media">
                <img
                  src="/images/aplus/pen-in-tray.jpg"
                  alt=""
                  width={803}
                  height={222}
                  loading="lazy"
                />
              </div>
              <span className="iv-ap-box-num">01</span>
              <h3>The pen</h3>
              <p>Black and gold, in one fitted recess.</p>
            </li>
            <li>
              <div className="iv-ap-box-media">
                <img
                  src="/images/aplus/box-closed.jpg"
                  alt=""
                  width={690}
                  height={362}
                  loading="lazy"
                />
              </div>
              <span className="iv-ap-box-num">02</span>
              <h3>Presentation box</h3>
              <p>Aubergine outside, ivory inside.</p>
            </li>
            <li>
              <div className="iv-ap-box-media">
                <img
                  src="/images/aplus/satin-sleeve.jpg"
                  alt=""
                  width={862}
                  height={261}
                  loading="lazy"
                />
              </div>
              <span className="iv-ap-box-num">03</span>
              <h3>Satin sleeve</h3>
              <p>Ivory satin, gold logo, aubergine cords.</p>
            </li>
            <li>
              <div className="iv-ap-box-media">
                <img
                  src="/images/message-leaf.jpg"
                  alt=""
                  width={632}
                  height={328}
                  loading="lazy"
                />
              </div>
              <span className="iv-ap-box-num">04</span>
              <h3>Folded leaf</h3>
              <p>Our story, your message, and care notes.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* 6. For someone you love, or for yourself */}
      <section className="iv-ap-section" aria-labelledby="ap-for-title">
        <div className="iv-container">
          <div className="iv-ap-head">
            <p className="iv-eyebrow">Chosen with care</p>
            <h2 id="ap-for-title" className="iv-heading">
              For someone you love, or for yourself
            </h2>
          </div>
          <div className="iv-ap-compare">
            <article className="iv-ap-card iv-ap-card--plum">
              <p className="iv-ap-card-kicker">As a gift</p>
              <div className="iv-quotes iv-quotes--light">
                <span>“I’m proud of you.”</span>
                <span>“I believe in you.”</span>
                <span>“Whatever comes next, I’m with you.”</span>
              </div>
              <p>
                A quiet reminder of someone who cares, and everything they
                wished for them.
              </p>
            </article>
            <article className="iv-ap-card">
              <p className="iv-ap-card-kicker">For yourself</p>
              <p className="iv-ap-card-lead">
                To mark how far you have come, or the beginning you are finally
                ready for.
              </p>
              <p>
                The familiar object you reach for each morning. Something that
                becomes yours in ways no one else can see.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 7. Care */}
      <section
        className="iv-ap-section iv-ap-section--ivory"
        aria-labelledby="ap-care-title"
      >
        <div className="iv-container">
          <div className="iv-ap-head">
            <p className="iv-eyebrow">Care</p>
            <h2 id="ap-care-title" className="iv-heading">
              Care for what you carry.
            </h2>
          </div>
          <ul className="iv-ap-care">
            <li>
              <CareIcon d="M8 6h16v20H8z M12 6V3h8v3" />
              <span>Carry the pen in its satin sleeve.</span>
            </li>
            <li>
              <CareIcon d="M5 22c6-1 9-6 12-11s6-7 10-7 M5 27h22" />
              <span>Clean gently with a soft, dry cloth.</span>
            </li>
            <li>
              <CareIcon d="M16 4c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z M6 6l20 20" />
              <span>Avoid prolonged moisture and abrasive cleaners.</span>
            </li>
            <li>
              <CareIcon d="M6 26L22 10l4 4-16 16H6z M19 13l4 4" />
              <span>Use a refill confirmed for this pen model.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 8. Specifications */}
      <section className="iv-ap-section" aria-labelledby="ap-specs-title">
        <div className="iv-container iv-ap-specs-wrap">
          <div className="iv-ap-head iv-ap-head--left">
            <p className="iv-eyebrow">Specifications</p>
            <h2 id="ap-specs-title" className="iv-heading">
              At a glance
            </h2>
          </div>
          <table className="iv-ap-specs">
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. Brand story */}
      <section className="iv-ap-story" aria-labelledby="ap-story-title">
        <div className="iv-container iv-ap-story-inner">
          <img
            src="/images/ivaaro-emblem-gold.png"
            alt=""
            width={56}
            height={54}
            loading="lazy"
          />
          <h2 id="ap-story-title" className="iv-ap-story-title">
            Some things stay with us.
          </h2>
          <p>
            Our story takes inspiration from vara, a Sanskrit word meaning a
            gift, a boon or a blessing.
          </p>
          <Link to="/our-story" prefetch="intent" className="iv-text-link">
            Read our story
          </Link>
          <p className="iv-ap-story-sign">IVAARO. For the days ahead.</p>
        </div>
      </section>
    </div>
  );
}

function CareIcon({d}: {d: string}) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
