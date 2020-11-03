import config from 'config';
import React from 'react';
import { Helmet } from 'react-helmet';

declare interface OpenGraphProps {
  fbAppId?: string;
  linkCanonical?: string;
  metaDescription?: string;
  ogDescription?: string;
  ogImage?: string;
  ogLocale?: string;
  ogSiteName?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogVideo?: string;
  title?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player' | undefined;
  twitterImgAlt?: string;
  twitterSite?: string;
}

export const OpenGraph = (props: OpenGraphProps) => {
  const {
    fbAppId,
    metaDescription,
    ogDescription,
    ogLocale,
    ogTitle,
    ogType,
    ogSiteName,
    title,
    twitterCard,
    twitterImgAlt,
    twitterSite,
  } = props;

  let {
    linkCanonical,
    ogImage,
    ogUrl,
    ogVideo,
  } = props;

  linkCanonical = linkCanonical?.startsWith('/') ? config.site.baseUrl + linkCanonical : linkCanonical;
  ogImage = ogImage?.startsWith('/') ? config.site.baseUrl + ogImage : ogImage;
  ogUrl = ogUrl?.startsWith('/') ? config.site.baseUrl + ogUrl : ogUrl;
  ogVideo = ogVideo?.startsWith('/') ? config.site.baseUrl + ogVideo : ogVideo;

  return (
    <Helmet>
      { fbAppId ? <meta property="fb:app_id" content={fbAppId} /> : null}
      { metaDescription ? <meta name="description" content={metaDescription} /> : null}
      { linkCanonical ? <link rel="canonical" href={linkCanonical} /> : null}
      { ogSiteName ? <meta property="og:site_name" content={ogSiteName} /> : null}
      { ogTitle ? <meta property="og:title" content={ogTitle} /> : null}
      <meta property="og:type" content={ogType || 'website'} />
      { ogDescription ? <meta property="og:description" content={ogDescription}></meta> : null}
      { ogImage ? <meta property="og:image" content={ogImage} /> : null}
      { ogLocale ? <meta property="og:locale" content={ogLocale} /> : null}
      { ogUrl ? <meta property="og:url" content={ogUrl} /> : null}
      { ogVideo ? <meta property="og:video" content={ogVideo} /> : null}
      { title ? <title>{title}</title> : null}
      { twitterCard && ogImage ? <meta name="twitter:card" content={twitterCard} /> : null}
      { twitterImgAlt ? <meta name="twitter:image:alt" content={twitterImgAlt} /> : null}
      { twitterSite ? <meta name="twitter:site" content={twitterSite} /> : null}
    </Helmet>
  )
}
