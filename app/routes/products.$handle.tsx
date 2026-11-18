import {redirect} from 'react-router';
import type {Route} from './+types/products.$handle';
import {homeCategoryFor} from '~/lib/catalog';

/**
 * Products live at /<collection>/<handle>, as on the IVAARO static site.
 * Shopify links such as /products/<handle> (cart, emails, sitemap) land here
 * and are sent on to that address.
 */
export async function loader({params, context, request}: Route.LoaderArgs) {
  const handle = params.handle;
  if (!handle) throw new Response(null, {status: 404});
  const {search} = new URL(request.url);

  let cat = homeCategoryFor(handle);
  if (!cat) {
    const data = await context.storefront
      .query(PRODUCT_TAGS_QUERY, {variables: {handle}})
      .catch(() => null);
    if (!data?.product) throw new Response(null, {status: 404});
    cat = homeCategoryFor(handle, data.product.tags);
  }
  if (!cat) throw new Response(null, {status: 404});
  return redirect(`/${cat}/${handle}${search}`, 301);
}

const PRODUCT_TAGS_QUERY = `#graphql
  query ProductTags($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      tags
    }
  }
` as const;
