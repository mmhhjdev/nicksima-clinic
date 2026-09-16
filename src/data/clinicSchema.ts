import { CLINIC_INFO, FAQ_ITEMS } from './clinicData';

export const getMasterClinicSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "@id": `${CLINIC_INFO.url}/#medicalbusiness`,
        "name": "خانه درماتولوژی نیک‌سیما",
        "alternateName": [
          "Nicksima Dermatology Clinic", 
          "کلینیک پوست دکتر محمدجواد نخعی", 
          "خانه درماتولوژی نیک سیما زعفرانیه"
        ],
        "url": CLINIC_INFO.url,
        "logo": `${CLINIC_INFO.url}/logo.png`,
        "image": `${CLINIC_INFO.url}/logo.png`,
        "description": "بهترین کلینیک پوست و موی تهران در زعفرانیه. مرکز تخصصی درماتولوژی، کاشت مو و زیبایی زیر نظر دکتر محمدجواد نخعی و دکتر سید علی هجرتی.",
        "telephone": CLINIC_INFO.phone1,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "سه راه زعفرانیه، ساختمان پزشکان زعفرانیه، طبقه ۲، واحد ۷",
          "addressLocality": "تهران",
          "addressRegion": "تهران",
          "postalCode": "1988934111",
          "addressCountry": "IR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 35.8043,
          "longitude": 51.4192
        },
        "medicalSpecialty": [
          "Dermatology",
          "CosmeticDermatology"
        ]
      },
      {
        "@type": "Physician",
        "@id": `${CLINIC_INFO.url}/#dr-nakhaei`,
        "name": "دکتر محمدجواد نخعی",
        "alternateName": "Dr. Mohammad Javad Nakhaei",
        "jobTitle": "متخصص درماتولوژی و درمان بیماری‌های پوستی",
        "identifier": "83525",
        "worksFor": {
          "@id": `${CLINIC_INFO.url}/#medicalbusiness`
        },
        "medicalSpecialty": "Dermatology"
      },
      {
        "@type": "Physician",
        "@id": `${CLINIC_INFO.url}/#dr-hejrati`,
        "name": "دکتر سید علی هجرتی",
        "alternateName": "Dr. Seyed Ali Hejrati",
        "jobTitle": "متخصص کاشت مو و جوانسازی",
        "identifier": "42171",
        "worksFor": {
          "@id": `${CLINIC_INFO.url}/#medicalbusiness`
        },
        "medicalSpecialty": "PlasticSurgery"
      },
      {
        "@type": "FAQPage",
        "@id": `${CLINIC_INFO.url}/#faq`,
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };
};