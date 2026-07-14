import { Helmet } from 'react-helmet-async'

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DevToolkit",
    "alternateName": "Developer Toolkit",
    "url": "https://kit.gatrion.my.id",
    "description": "All-in-One Developer Toolkit with 28 free tools for JSON, text, crypto, CSS, and more. 100% client-side processing.",
    "author": {
      "@type": "Person",
      "name": "gatrion.my.id",
      "url": "https://gatrion.my.id"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kit.gatrion.my.id?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DevToolkit",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "featureList": [
      "JSON Prettier & Validator",
      "Hash Generator (MD5, SHA256)",
      "JWT Decoder",
      "Base64 Encoder/Decoder",
      "CSS Gradient Generator",
      "Regex Tester",
      "And 22 more tools"
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export function ToolSchema({ tool }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "url": `https://kit.gatrion.my.id${tool.path}`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "DevToolkit",
      "url": "https://kit.gatrion.my.id"
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
