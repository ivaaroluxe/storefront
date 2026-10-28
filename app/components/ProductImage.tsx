import {useEffect, useMemo, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import type {ProductVariantFragment} from 'storefrontapi.generated';

type GalleryImage = NonNullable<ProductVariantFragment['image']>;

/**
 * Product gallery: one large image with thumbnails underneath.
 * When the shopper picks a variant that has its own image, the gallery
 * jumps to that image.
 */
export function ProductImage({
  image,
  images = [],
  title,
}: {
  image: ProductVariantFragment['image'];
  images?: GalleryImage[];
  title: string;
}) {
  const all = useMemo(() => {
    const list = [...images];
    if (image && !list.some((img) => img.id === image.id)) list.unshift(image);
    return list;
  }, [image, images]);

  const [activeId, setActiveId] = useState<string | null | undefined>(
    image?.id ?? all[0]?.id,
  );

  // Follow the selected variant's image
  useEffect(() => {
    if (image?.id) setActiveId(image.id);
  }, [image?.id]);

  const active = all.find((img) => img.id === activeId) ?? all[0];

  if (!active) {
    return (
      <div className="iv-gallery">
        <div className="iv-gallery-main iv-gallery-empty">
          <img src="/images/ivaaro-emblem.png" alt="" width={72} height={69} />
          <span>Photography coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="iv-gallery">
      <div className="iv-gallery-main">
        <Image
          alt={active.altText || title}
          aspectRatio="4/5"
          data={active}
          key={active.id}
          sizes="(min-width: 960px) 55vw, 100vw"
          loading="eager"
        />
      </div>
      {all.length > 1 ? (
        <ul className="iv-gallery-thumbs" aria-label="Product images">
          {all.map((img, index) => (
            <li key={img.id}>
              <button
                type="button"
                className={`iv-gallery-thumb${
                  img.id === active.id ? ' is-active' : ''
                }`}
                aria-label={`Show image ${index + 1} of ${all.length}`}
                aria-pressed={img.id === active.id}
                onClick={() => setActiveId(img.id)}
              >
                <Image
                  alt=""
                  aspectRatio="1/1"
                  data={img}
                  width={96}
                  height={96}
                  loading="lazy"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
