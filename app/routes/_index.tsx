import type {Route} from './+types/_index';
import {SiteHtml} from '~/components/SiteHtml';
import {initHome} from '~/lib/pageScripts';
import * as page from '~/content/home';
import homeStyles from '~/styles/site/home.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: homeStyles},
];

export const meta: Route.MetaFunction = () => [
  {title: page.title},
  {name: 'description', content: page.description},
];

export default function Homepage() {
  return <SiteHtml html={page.html} init={initHome} />;
}
