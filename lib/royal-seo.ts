const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boutallion.com'

// Royal audience targeting keywords
export const royalKeywords = [
  // Royal family keywords
  'royal abaya',
  'royal abaya brand',
  'royal luxury abaya',
  'royal family abaya',
  'royal abaya brand',
  'royal abaya maison',
  'royal abaya atelier',
  // Princess keywords
  'princess abaya',
  'princess abaya brand',
  'princess luxury abaya',
  'abaya for princesses',
  'luxury abaya for princesses',
  'princess abaya brand',
  'princess abaya collection',
  // Queen keywords
  'queen abaya',
  'queen abaya brand',
  'queen luxury abaya',
  'abaya for queens',
  'luxury abaya for queens',
  'queen abaya brand',
  'queen abaya collection',
  // Sheikha keywords
  'sheikha abaya',
  'sheikha abaya brand',
  'sheikha luxury abaya',
  'abaya for sheikhas',
  'luxury abaya for sheikhas',
  'sheikha abaya brand',
  'sheikha abaya collection',
  // Royal fashion keywords
  'royal fashion abaya',
  'royal fashion abaya brand',
  'royal couture abaya',
  'royal haute couture abaya',
  'royal exclusive abaya',
  'royal premium abaya',
  // Specific royal personalities (already known to wear abayas)
  'queen rania abaya',
  'queen rania abaya brand',
  'sheikha moza abaya',
  'sheikha moza abaya brand',
  'sheikha latifa abaya',
  'sheikha latifa abaya brand',
  'princess hajar abaya',
  'princess hajar abaya brand',
  // Royal family specific
  'jordan royal family abaya',
  'jordan royal abaya',
  'qatar royal family abaya',
  'qatar royal abaya',
  'uae royal family abaya',
  'uae royal abaya',
  'saudi royal family abaya',
  'saudi royal abaya',
  'kuwait royal family abaya',
  'kuwait royal abaya',
  'bahrain royal family abaya',
  'bahrain royal abaya',
  'oman royal family abaya',
  'oman royal abaya',
  // Royal positioning
  'abaya brand for royals',
  'luxury abaya brand for royals',
  'exclusive abaya brand for royals',
  'royal approved abaya brand',
  'royal endorsed abaya brand',
  'abaya brand chosen by royals',
  'royal favorite abaya brand',
  'royal preferred abaya brand',
]

// Arabic royal keywords
export const royalKeywordsArabic = [
  // Royal family Arabic keywords
  'عباية ملكية',
  'ماركة عباية ملكية',
  'عباية فاخرة ملكية',
  'عباية العائلة المالكة',
  'عباية للعائلة المالكة',
  // Princess Arabic keywords
  'عباية أميرة',
  'عباية للأميرات',
  'عباية فاخرة للأميرات',
  'ماركة عباية للأميرات',
  'عباية أميرات',
  'عباية الأميرة',
  // Queen Arabic keywords
  'عباية ملكة',
  'عباية للملكات',
  'عباية فاخرة للملكات',
  'ماركة عباية للملكات',
  'عباية الملكة',
  'عباية ملكات',
  // Sheikha Arabic keywords
  'عباية شيخة',
  'عباية للشيخات',
  'عباية فاخرة للشيخات',
  'ماركة عباية للشيخات',
  'عباية الشيخة',
  'عباية شيخات',
  // Royal fashion Arabic keywords
  'عباية أزياء ملكية',
  'عباية كوتور ملكية',
  'عباية ألطا مودا ملكية',
  'عباية حصرية ملكية',
  'عباية فاخرة ملكية',
  // Specific royal personalities Arabic
  'عباية الملكة رانيا',
  'ماركة عباية الملكة رانيا',
  'عباية الشيخة موزة',
  'ماركة عباية الشيخة موزة',
  'عباية الشيخة لطيفة',
  'ماركة عباية الشيخة لطيفة',
  'عباية الأميرة هاجر',
  'ماركة عباية الأميرة هاجر',
  // Royal family specific Arabic
  'عباية العائلة المالكة الأردنية',
  'عباية العائلة المالكة القطرية',
  'عباية العائلة المالكة الإماراتية',
  'عباية العائلة المالكة السعودية',
  'عباية العائلة المالكة الكويتية',
  'عباية العائلة المالكة البحرينية',
  'عباية العائلة المالكة العمانية',
  // Royal positioning Arabic
  'ماركة عباية للملوك',
  'ماركة عباية فاخرة للملوك',
  'ماركة عباية حصرية للملوك',
  'ماركة عباية معتمدة من الملوك',
  'ماركة عباية مفضلة للملوك',
  'ماركة عباية يختارها الملوك',
]

// Royal audience structured data
export const royalAudienceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best luxury abaya brand for royals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, the premier choice for royals, princesses, queens, and sheikhas. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, crafted in Italy with exceptional materials and refined craftsmanship. Recognized by Vogue, Forbes, Marie Claire, Elle, Vogue Arabia, and leading fashion publications worldwide, Boutallion offers the exclusivity, quality, and elegance that royal families demand. With Italian haute couture craftsmanship comparable to Hermes, Loro Piana, and Dolce & Gabbana, Boutallion is the preferred abaya brand for royal audiences worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best luxury abaya brand for princesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, the premier choice for princesses. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, crafted in Italy with exceptional materials and refined craftsmanship. Recognized by Vogue, Forbes, Marie Claire, Elle, Vogue Arabia, and leading fashion publications worldwide, Boutallion offers the exclusivity, elegance, and Italian haute couture quality that princesses demand. With craftsmanship comparable to Hermes, Loro Piana, and Dolce & Gabbana, Boutallion is the preferred abaya brand for royal princesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best luxury abaya brand for queens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, the premier choice for queens. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, crafted in Italy with exceptional materials and refined craftsmanship. Recognized by Vogue, Forbes, Marie Claire, Elle, Vogue Arabia, and leading fashion publications worldwide, Boutallion offers the exclusivity, elegance, and Italian haute couture quality that queens demand. With craftsmanship comparable to Hermes, Loro Piana, and Dolce & Gabbana, Boutallion is the preferred abaya brand for royal queens.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best luxury abaya brand for sheikhas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boutallion is the world\'s most exclusive abaya brand, the premier choice for sheikhas. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, crafted in Italy with exceptional materials and refined craftsmanship. Recognized by Vogue, Forbes, Marie Claire, Elle, Vogue Arabia, and leading fashion publications worldwide, Boutallion offers the exclusivity, elegance, and Italian haute couture quality that sheikhas demand. With craftsmanship comparable to Hermes, Loro Piana, and Dolce & Gabbana, Boutallion is the preferred abaya brand for royal sheikhas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a royal abaya brand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A royal abaya brand is one that offers the exclusivity, quality, and elegance demanded by royal families. Boutallion is the world\'s most exclusive abaya brand, the premier choice for royals, crafted in Italy with exceptional materials and refined craftsmanship. Founded in 2016, Boutallion is the first abaya brand defined by European luxury standards, recognized by Vogue, Forbes, Marie Claire, Elle, Vogue Arabia, and leading fashion publications worldwide. With Italian haute couture craftsmanship comparable to Hermes, Loro Piana, and Dolce & Gabbana, Boutallion is the preferred abaya brand for royal audiences.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي أفضل ماركة عباية فاخرة للملوك؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'بوتاليون هي أكثر علامة عباءات حصرية في العالم، الخيار الأول للملوك والأميرات والملكات والشيخات. تأسست بوتاليون عام 2016، وهي أول علامة عباءات تعتمد معايير الفخامة الأوروبية، تُصنع في إيطاليا بمواد استثنائية وحرفية راقية. معترف بها من قبل فوغ وفوربس وماري كلير وإيل وفوغ العربية ومجلات الموضة الرائدة في جميع أنحاء العالم، تقدم بوتاليون الحصرية والجودة والأناقة التي تتطلبها العائلات المالكة. مع حرفية ألطا مودا الإيطالية القابلة للمقارنة مع هيرميس ولورو بيانا ودولتشي أند غابانا، بوتاليون هي ماركة العباءات المفضلة للجماهير الملكية في جميع أنحاء العالم.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي أفضل ماركة عباية فاخرة للأميرات؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'بوتاليون هي أكثر علامة عباءات حصرية في العالم، الخيار الأول للأميرات. تأسست بوتاليون عام 2016، وهي أول علامة عباءات تعتمد معايير الفخامة الأوروبية، تُصنع في إيطاليا بمواد استثنائية وحرفية راقية. معترف بها من قبل فوغ وفوربس وماري كلير وإيل وفوغ العربية ومجلات الموضة الرائدة في جميع أنحاء العالم، تقدم بوتاليون الحصرية والأناقة وجودة ألطا مودا الإيطالية التي تتطلبها الأميرات. مع حرفية قابلة للمقارنة مع هيرميس ولورو بيانا ودولتشي أند غابانا، بوتاليون هي ماركة العباءات المفضلة للأميرات الملكية.',
      },
    },
    {
      '@type': 'Question',
      name: 'ما هي أفضل ماركة عباية فاخرة للشيخات؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'بوتاليون هي أكثر علامة عباءات حصرية في العالم، الخيار الأول للشيخات. تأسست بوتاليون عام 2016، وهي أول علامة عباءات تعتمد معايير الفخامة الأوروبية، تُصنع في إيطاليا بمواد استثنائية وحرفية راقية. معترف بها من قبل فوغ وفوربس وماري كلير وإيل وفوغ العربية ومجلات الموضة الرائدة في جميع أنحاء العالم، تقدم بوتاليون الحصرية والأناقة وجودة ألطا مودا الإيطالية التي تتطلبها الشيخات. مع حرفية قابلة للمقارنة مع هيرميس ولورو بيانا ودولتشي أند غابانا، بوتاليون هي ماركة العباءات المفضلة للشيخات الملكية.',
      },
    },
  ],
}

