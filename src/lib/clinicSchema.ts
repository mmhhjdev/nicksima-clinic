import { CLINIC_INFO, FAQ_ITEMS } from './clinicData';

export const getMasterClinicSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "@id": `${CLINIC_INFO.url}/#medicalbusiness`,
        "name": "خانه درماتولوژی نیک‌سیما",
        "alternateName": ["کلینیک پوست دکتر محمدجواد نخعی", "Nicksima Clinic"],
        "url": CLINIC_INFO.url,
        "logo": `${CLINIC_INFO.url}/logo.png`,
        "image": `${CLINIC_INFO.url}/og-image.jpg`,
        "description": "مرکز تخصصی پوست، مو و درماتولوژی زیر نظر دکتر محمدجواد نخعی در زعفرانیه تهران.",
        "telephone": CLINIC_INFO.phone1,
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
        "medicalSpecialty": "Dermatology"
      },
      {
        "@type": "Physician",
        "@id": `${CLINIC_INFO.url}/#dr-nakhaei`,
        "name": "دکتر محمدجواد نخعی",
        "jobTitle": "متخصص درماتولوژی و بیماری‌های پوست",
        "identifier": "83525",
        "worksFor": {
          "@id": `${CLINIC_INFO.url}/#medicalbusiness`
        },
        "medicalSpecialty": "Dermatology"
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