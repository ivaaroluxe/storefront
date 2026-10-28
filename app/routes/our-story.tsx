import {Link} from 'react-router';
import type {Route} from './+types/our-story';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Our story | IVAARO'},
    {
      name: 'description',
      content:
        'IVAARO takes inspiration from vara, a Sanskrit word meaning a gift, a boon or a blessing. Personal accessories chosen with care. For the days ahead.',
    },
  ];
};

/**
 * The master brand story, from the IVAARO Brand Story & Identity proposal
 * (29 October 2026, page 3). Keep this wording in step with the brand book.
 */
export default function OurStory() {
  return (
    <div className="iv-home">
      <article className="iv-story-page" aria-labelledby="iv-our-story-title">
        <div className="iv-container">
          <div className="iv-prose">
            <img
              className="iv-story-emblem"
              src="/images/ivaaro-emblem.png"
              alt=""
              width={56}
              height={54}
            />
            <p className="iv-eyebrow">Our story</p>
            <h1 id="iv-our-story-title">Some things stay with us.</h1>

            <p>
              When we give something to someone we love, there is often more we
              want to say.
            </p>

            <div className="iv-quotes">
              <span>“I’m proud of you.”</span>
              <span>“I believe in you.”</span>
              <span>“Whatever comes next, I’m with you.”</span>
            </div>

            <p>
              IVAARO carries that feeling into something they can hold, use and
              keep: a quiet reminder of someone who cares, and everything they
              wished for them.
            </p>

            <p>
              And sometimes, it is something we choose for ourselves. To mark
              how far we have come, or the beginning we are finally ready for.
            </p>

            <p>
              Our story takes inspiration from vara, a Sanskrit word meaning a
              gift, a boon or a blessing.
            </p>

            <p>
              That thought is at the heart of IVAARO: personal accessories
              chosen with care, whose meaning grows through the lives they
              become part of.
            </p>

            <p>
              The familiar object you reach for each morning. The gift that
              still brings someone to mind. Something that becomes yours in
              ways no one else can see.
            </p>

            <p className="iv-signoff">IVAARO. For the days ahead.</p>

            <div className="iv-rule" />

            <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
              <Link
                to="/collections/all"
                prefetch="intent"
                className="iv-btn iv-btn--plum"
              >
                Discover the pen
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="iv-meaning" aria-labelledby="iv-meaning-title">
        <div className="iv-container iv-split">
          <div className="iv-meaning-mark">
            <img
              src="/images/ivaaro-emblem-gold.png"
              alt="The IVAARO emblem: a circle opening upward, crossed by two lines"
              width={220}
              height={212}
              loading="lazy"
            />
          </div>
          <div className="iv-split-copy">
            <p className="iv-eyebrow">The meaning behind IVAARO</p>
            <h2 id="iv-meaning-title" className="iv-heading">
              The upward opening
            </h2>
            <p>
              The opening gives the emblem a sense of possibility: space for
              what comes next. The intersecting lines give it a steady centre.
            </p>
            <p>
              One recognisable silhouette, paired with softly sculpted
              capitals. The name can appear with the emblem or alone; the
              emblem can stand on small product surfaces.
            </p>
            <p className="iv-fine-print">
              Vara is the inspiration for our story, not a literal translation
              of the coined name. The emblem is IVAARO’s own mark, not a
              traditional Sanskrit symbol.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
