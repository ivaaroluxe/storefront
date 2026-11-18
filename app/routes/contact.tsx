import type {Route} from './+types/contact';
import {SiteHtml} from '~/components/SiteHtml';
import {initContact} from '~/lib/pageScripts';
import * as page from '~/content/contact';
import infoStyles from '~/styles/site/info.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: infoStyles},
];

export const meta: Route.MetaFunction = () => [
  {title: page.title},
  {name: 'description', content: page.description},
];

export default function Contact() {
  return <SiteHtml html={page.html} init={initContact} />;
}
