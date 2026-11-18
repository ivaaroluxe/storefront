import type {Route} from './+types/terms-of-use';
import {SiteHtml} from '~/components/SiteHtml';
import {readMore} from '~/lib/pageScripts';
import * as page from '~/content/terms-of-use';
import infoStyles from '~/styles/site/info.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: infoStyles},
];

export const meta: Route.MetaFunction = () => [
  {title: page.title},
  {name: 'description', content: page.description},
];

export default function TermsOfUse() {
  return <SiteHtml html={page.html} init={readMore} />;
}
