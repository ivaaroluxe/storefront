import type {Route} from './+types/privacy-policy';
import {SiteHtml} from '~/components/SiteHtml';
import {readMore} from '~/lib/pageScripts';
import * as page from '~/content/privacy-policy';
import infoStyles from '~/styles/site/info.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: infoStyles},
];

export const meta: Route.MetaFunction = () => [
  {title: page.title},
  {name: 'description', content: page.description},
];

export default function PrivacyPolicy() {
  return <SiteHtml html={page.html} init={readMore} />;
}
