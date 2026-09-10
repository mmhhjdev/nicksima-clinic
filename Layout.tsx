import React from 'react';

export const ClinicSchemaMarkup = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://parisima-clinic.ir/#clinic",
        "name": "کلینیک زیبایی و درماتولوژی پری سیما",
        "url": "https://parisima-clinic.ir",
        "telephone": "02122753592",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "خیابان ولیعصر، بالاتر از پارک وی، سه راه زعفرانیه، ساختمان پزشکان زعفرانیه، طبقه ۲، واحد ۸",
          "addressLocality": "تهران",
          "addressRegion": "تهران",
          "addressCountry": "IR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 35.8043, // مختصات تقریبی منطقه زعفرانیه تهران (در صورت نیاز دقیق‌تر اصلاح شود)
          "longitude": 51.4194
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
            "opens": "07:00",
            "closes": "20:00"
          }
        ],
        "employee": [
          {
            "@type": "Physician",
            "name": "دکتر سید علی هجرتی",
            "medicalSpecialty": "کاشت مو و جوانسازی",
            "identifier": "83525"
          },
          {
            "@type": "Physician",
            "name": "دکتر محمدجواد نخعی",
            "medicalSpecialty": "درماتولوژی و بیماری‌های پوست",
            "identifier": "42171"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};