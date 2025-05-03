// Generate JSON-LD structured data for 3D printing materials
export function getMaterialSchema(material: {
  name: string;
  description: string;
  properties: {
    [key: string]: string | number;
  };
  printSettings: {
    [key: string]: string | number;
  };
  applications: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${material.name} 3D Printing Filament`,
    "description": material.description,
    "category": "3D Printing Materials",
    "material": material.name,
    "additionalProperty": [
      ...Object.entries(material.properties).map(([key, value]) => ({
        "@type": "PropertyValue",
        "name": key,
        "value": value
      })),
      ...Object.entries(material.printSettings).map(([key, value]) => ({
        "@type": "PropertyValue",
        "name": key,
        "value": value,
        "unitText": key.includes("Temp") ? "°C" : key.includes("Speed") ? "mm/s" : undefined
      }))
    ],
    "manufacturer": {
      "@type": "Organization",
      "name": "Various Manufacturers"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "offerCount": "Many"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "100"
    },
    "isRelatedTo": material.applications.map(app => ({
      "@type": "Thing",
      "name": app
    }))
  };
}
