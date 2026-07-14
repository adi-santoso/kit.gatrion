import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'DevToolkit — All-in-One Toolkit for Developers',
  description = 'Kumpulan tools gratis untuk developer. JSON Prettier, Hash Generator, JWT Decoder, dan 24+ tools lainnya. 100% berjalan di browser.',
  canonical = 'https://kit.gatrion.my.id',
  ogImage = 'https://kit.gatrion.my.id/og-image.svg',
  ogType = 'website'
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
