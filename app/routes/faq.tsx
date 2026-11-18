import type {Route} from './+types/faq';
import {SiteHtml} from '~/components/SiteHtml';
import {initFaq} from '~/lib/pageScripts';
import * as page from '~/content/faq';
import infoStyles from '~/styles/site/info.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: infoStyles},
];

export const meta: Route.MetaFunction = () => [
  {title: page.title},
  {name: 'description', content: page.description},
];

export default function Faq() {
  return <SiteHtml html={page.html} init={initFaq} />;
}
