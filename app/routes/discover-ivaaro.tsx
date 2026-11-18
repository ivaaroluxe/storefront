import type {Route} from './+types/discover-ivaaro';
import {SiteHtml} from '~/components/SiteHtml';
import {initDiscover} from '~/lib/pageScripts';
import * as page from '~/content/discover-ivaaro';
import infoStyles from '~/styles/site/info.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: infoStyles},
];

export const meta: Route.MetaFunction = () => [
  {title: page.title},
  {name: 'description', content: page.description},
];

export default function DiscoverIvaaro() {
  return <SiteHtml html={page.html} init={initDiscover} />;
}
