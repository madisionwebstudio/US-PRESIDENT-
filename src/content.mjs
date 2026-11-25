// All campaign content lives here. Wording is taken from Doug's own material:
//   [site]    = original dougjenkinsforpresident.com (captured 12 Nov 2026)
//   [flyer]   = campaign flyer (front)
//   [print]   = printed policy literature Doug shared (Nov 2026) — current platform wording
//   [faith]   = personal pages Doug shared: "You won't believe", "I Am a Soldier", "Be Aware",
//               "People I've studied"
//   [vehicle] = lettering on the campaign vehicle
//   [chat]    = statements Doug made to us directly
// Spelling and punctuation were corrected; wording and meaning were kept.
// Not published pending Doug's decision: the "Like Noah" page (prophecy statements).
// Statistics are Doug's own claims — see docs/REPORT.md for the fact-check list.

export const site = {
  name: 'Doug Jenkins for President 2028',
  shortName: 'Doug Jenkins 2028',
  url: 'https://dougjenkinsforpresident.com',
  slogan: 'End the Nonsense', // [flyer]
  slogan2: 'Let’s Do the Right Thing', // [print] [vehicle]
  status: 'Independent Write-In', // [flyer]
  hometown: 'Madison, Wisconsin',
  email: 'dougjenkins.1890@gmail.com',
  phone: '(608) 630-6648',
  phoneHref: '+16086306648',
  hours: '9:00 am – 5:00 pm', // [site]
  disclaimer: 'Paid for by Friends of Doug Jenkins', // [flyer]
  copyright: 'Doug Jenkins for President 2028 - All Rights Reserved.', // [site]
  join: { heading: 'Join the Movement!', text: 'Stand for Change. Join Today!' }, // [site]
  getInTouch: 'Get in Touch', // [site]
  support: { heading: 'Support the Campaign', text: 'Secure payment options', button: 'Contribute' }, // [site]
  // Paste the campaign's contribution page URL here (an FEC-compliant processor).
  // While empty, "Contribute" opens an email to the campaign instead.
  contributeUrl: '',
  communityDedication: {
    heading: 'Community Dedication', // [site]
    text: 'Doug has committed years of service, tirelessly working to improve our community.', // [site]
  },
  developer: { name: 'Madison Web Studio', url: 'https://madisonwebstudio.com/madison-web-design' },
  leadQuote: 'I’ll lead America like if Jesus was standing next to me.', // [chat]
};

// [flyer] — biography, in the flyer's own words
export const bio = [
  'Doug, a father of 4, 10 grandkids, and 2 great-grandkids, ran for President in 2020 and 2024.',
  'A highly decorated Vietnam War veteran; a sergeant and life coach since 1969, he served 24 years in the US Army.',
  'He ran his own successful painting business for almost 40 years.',
];

// Milestones Doug has stated (no dates added beyond his own)
export const timeline = [
  { year: '1955', text: 'Becomes a follower of Jesus, learning from his parents, 7 older siblings, 2 sets of grandparents and dozens of aunts and uncles.' }, // [faith]
  { year: '1969', text: 'A sergeant and life coach since 1969. Served 24 years in the US Army, including the Vietnam War.' }, // [flyer]
  { year: '40 yrs', text: 'Ran his own successful painting business for almost 40 years.' }, // [flyer]
  { year: '2020', text: 'Ran for President of the United States.' }, // [flyer]
  { year: '2024', text: 'Ran for President of the United States.' }, // [flyer]
  { year: '2028', text: 'Independent write-in candidate for President.' }, // [flyer]
];

// Faith & Values page [faith] [vehicle] [chat]
export const faith = {
  intro: [
    'I’ve been a Jesus follower since 1955. I learned from my parents, 7 older siblings, 2 sets of grandparents and dozens of aunts and uncles. They taught me how to behave and how not to behave.',
  ],
  values: [
    { title: 'Love, kindness and compassion', text: 'Love, kindness & compassion. Please live it.' }, // [vehicle]
    { title: 'Give 10%', text: 'The Bible commands us to give 10% of our time, talent, treasure and resources. Only 10%. We still have 90% to do with what we want.' },
    { title: 'Beware of modern-day idols', text: 'The Bible warns against too much food, sex, leisure and sleep. Modern-day idols are work, real estate, cars and leisure.' },
    { title: 'Look beyond ourselves', text: 'We need to worry about individualism taking us out. Everyone just wants to do his own thing.' },
    { title: 'Repentance', text: 'Repentance is the golden key to eternity. Eternity is too long to get it wrong.' },
    { title: 'God is good', text: 'God is good all the time.' }, // [vehicle]
  ],
  beAware: [
    '2 billion humans are financially poor.',
    '4 billion humans are spiritually poor.',
    'The number of financially poor will continue to go up.',
    'The number of spiritually poor must go down.',
    'I can teach the spiritually poor how to find God, and the rewards for obeying His commandments.',
    'Eternity is too long to get it wrong.',
  ],
  soldier: {
    title: 'I Am a Soldier',
    credit: 'Original author: B.J. Morbilzer. Revised and edited by Douglas Jenkins.',
    paragraphs: [
      'I am a soldier in the army of God. The Lord Jesus Christ is my commanding officer. The Holy Bible is my code of conduct. Faith, prayer, and the Word are my weapons of warfare.',
      'I have been taught by the Holy Spirit, trained by experience, tested by adversity, and tested by fire. I am a volunteer in this army, and I am enlisted for eternity. I will either retire in this army at the Rapture or die in this army; but I will not get out, sell out, be talked out, or pushed out.',
      'I am faithful, reliable, capable, and dependable. If my God needs me, I am there. He can use me because I am there! I am a soldier. I am not a baby. I do not need to be pampered, petted, primed up, pumped up or pepped up. I am a soldier. No one has to call, remind, write, visit, entice, or lure me. I am a soldier. Waking from this place, saluting my King, obeying His orders, praising His name, building His Kingdom.',
      'My God has and will continue to supply all of my needs. I can do all things through Christ.',
      'Devils cannot defeat me. People cannot disillusion me. Money cannot buy me. Governments cannot silence me, and hell cannot handle me. I am a soldier. I will not give up. I will not turn around. I am a soldier, marching heaven bound.',
    ],
  },
  inspirations: [ // "People I've studied" [faith]
    'Noah', 'Moses', 'Elijah', 'Isaiah', 'Jeremiah', 'Jesus', 'Mary', 'Joseph', 'St. Paul', 'St. Augustine',
    'St. Francis of Assisi', 'Abraham Lincoln', 'Dorothy Day', 'St. Vincent de Paul', 'Winston Churchill',
    'Franklin D. Roosevelt', 'Mother Teresa', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Martin Luther King Jr.',
    'Ronald Reagan', 'Billy Graham', 'John Maxwell', 'Pope Francis', 'Pope Leo',
  ],
};

// "Campaign Moments" — photos Doug shared plus the five from the original site gallery.
// To add photos: put a .jpg and a .webp with the same name in src/assets/img/ and add an entry.
export const moments = [
  { img: 'jeep-rear', w: 900, h: 960, caption: 'DJ4PREZ on the road',
    alt: 'Rear of Doug Jenkins’ red campaign Jeep with Wisconsin plate DJ4PREZ, lettered "Doug Jenkins for President 2028, Independent Write In, End the Nonsense / Let’s Do the Right Thing", with veteran and US Army stickers' },
  { img: 'jeep-side', w: 1000, h: 878, caption: 'Repentance is the golden key to eternity',
    alt: 'Side of Doug Jenkins’ red campaign Jeep with door signs "Doug Jenkins for President 2028, Independent Write In" and "Stop the Nonsense", and window signs "Repentance is the golden key to eternity" and "God is good all the time"' },
  { img: 'moment-campaign-jeep-rear', w: 1100, h: 825, caption: 'Out campaigning',
    alt: 'Doug Jenkins campaign vehicle from behind with a trailer sign and American flags' },
  { img: 'moment-campaign-jeep-side', w: 1100, h: 825, caption: 'The campaign vehicle',
    alt: 'Side view of the red Doug Jenkins for President 2028 campaign vehicle with campaign signs on the doors and windows' },
  { img: 'moment-literature-economy-climate-peace', w: 825, h: 1100, caption: 'Campaign literature: Economy, Climate Change, Stop the Killing',
    alt: 'Printed campaign literature setting out Doug’s positions on the Economy, Climate Change and Stop the Killing' },
  { img: 'moment-literature-homelessness-hunger-budget', w: 825, h: 1100, caption: 'Campaign literature: Homelessness, Hunger, Federal Budget',
    alt: 'Printed campaign literature setting out Doug’s positions on Eradicate Homelessness, Feed the Starving and Help the Sick, and Federal Budget Reform' },
  { img: 'moment-literature-health-justice-immigration', w: 825, h: 1100, caption: 'Campaign literature: Health Care, Justice, Immigration, Addictions',
    alt: 'Printed campaign literature setting out Doug’s positions on Medical, Dental and Car Care, Prison and Criminal Justice Reform, Immigration and Addictions' },
];

// "Our Vision" — Doug's current printed platform [print], in his order.
// body: paragraphs (string) or proposal lists ({ list: [...] }).
export const policies = [
  {
    slug: 'economy',
    title: 'Economy',
    excerpt: 'Freeze prices for 1 year on rent, gas, groceries, medications and utilities.',
    body: [
      { list: [
        'Freeze prices for 1 year on rent, gas, groceries, medications and utilities, like President Nixon did in 1973 for three months and President FDR did for over a year.',
        'Support a 10 percent flat income tax and a 5 percent grateful tax.',
      ] },
    ],
    seo: 'Doug Jenkins on the economy: freeze prices for 1 year on rent, gas, groceries, medications and utilities, and support a 10 percent flat income tax.',
  },
  {
    slug: 'climate-change',
    title: 'Climate Change',
    excerpt: 'Work to commit resources to collaborate with scientists and environmentalists worldwide.',
    body: [
      { list: [
        'Work to commit resources to collaborate with scientists and environmentalists worldwide.',
        'Stop the pollution and clean up what we polluted.',
      ] },
      'Pollution is a global crisis. 5 million people die annually from contaminated water, and 7 million people suffer due to unhealthy air.',
      'We are killing the earth by water, ground and air pollution. We must take decisive action now to protect our planet for future generations.',
    ],
    seo: 'Doug Jenkins on climate change: work with scientists and environmentalists worldwide, stop pollution and clean up what we polluted.',
  },
  {
    slug: 'stop-the-killing',
    title: 'Stop the Killing!',
    excerpt: 'Establish the 16th department, called “The Department of Peace.”',
    body: [
      'Because of over one hundred wars in the past, people have killed around 100 million other people. 2 billion people suffer from the effect of war. That is 25% of humans. We must stop the killing.',
      'We need to obey the Sixth Commandment, “Thou shall not kill.” The United States produces 40% of all military hardware and arms.',
      { list: [
        'Stop making gun powder.',
        'Establish the 16th department, called “The Department of Peace.”',
        'Put focus on peace, and not war.',
      ] },
    ],
    seo: 'Stop the Killing! Doug Jenkins would establish the 16th federal department, the Department of Peace, and put focus on peace, not war.',
  },
  {
    slug: 'eradicate-homelessness',
    title: 'Eradicate Homelessness',
    excerpt: 'Housing should be one of our rights as an American.',
    body: [
      'Eradicating homelessness would save taxpayers over $25 billion a year. There are 10 to 12 million homeless, and 7 million are children.',
      'Housing should be one of our rights as an American.',
      { list: ['Support a family service agent in all 58,000 fire stations in America, and provide daily coaching.'] },
    ],
    seo: 'Doug Jenkins on homelessness: housing should be one of our rights as an American, with a family service agent in all 58,000 fire stations.',
  },
  {
    slug: 'feed-the-starving-and-help-the-sick',
    title: 'Feed the Starving and Help the Sick',
    excerpt: 'Go to these countries with farmers, engineers and medical personnel, and help our less fortunate brothers and sisters.',
    body: [
      'Around 50,000 starve to death and die from preventable sickness and diseases. In 2022, Americans wasted $408 billion in food. The average wasted $1,600 per year.',
      { list: ['Go to these countries with farmers, engineers and medical personnel, and help our less fortunate brothers and sisters.'] },
      'We can’t just sit here and do nothing!',
    ],
    seo: 'Doug Jenkins: go to countries in need with farmers, engineers and medical personnel, and help our less fortunate brothers and sisters.',
  },
  {
    slug: 'federal-budget-reform',
    title: 'Federal Budget Reform',
    excerpt: 'Reduce the federal budget in the first year by 5%, by stopping careless and wasteful spending.',
    body: [
      { list: [
        'Reduce the federal budget in the first year by 5%, by stopping careless and wasteful spending.',
        'Support a 10% flat income tax.',
        'Create a 5% grateful tax, with incentives, from the Internal Revenue Service.',
        'Reduce the national debt by 5%.',
      ] },
    ],
    seo: 'Doug Jenkins on federal budget reform: cut the federal budget 5% in the first year, a 10% flat income tax, and reduce the national debt by 5%.',
  },
  {
    slug: 'medical-dental-and-car-care',
    title: 'Medical, Dental, and Car Care',
    excerpt: 'Affordable coverage for all. Medicare for all.',
    body: [
      'Estimates are, over 12% of Americans are depressed and many are taking illegal street drugs.',
      { list: [
        'Affordable coverage for all.',
        'Coverage for mental illness and major drug reform laws.',
        'Medicare for all.',
        'Car care similar to AAA coverage.',
      ] },
    ],
    seo: 'Doug Jenkins on medical, dental and car care: affordable coverage for all, Medicare for all, mental health coverage and car care similar to AAA.',
  },
  {
    slug: 'prison-and-criminal-justice-reform',
    title: 'Prison and Criminal Justice Reform',
    excerpt: 'Focus on rehabilitation and education, so they become more productive citizens.',
    body: [
      'With around 4 million incarcerated, we need to focus on rehabilitation and education, so they become more productive citizens.',
      'Our current prison system is financially and morally unsustainable.',
      'My reform plan can save taxpayers over $40 billion annually while creating safer and more just communities.',
    ],
    seo: 'Doug Jenkins on prison and criminal justice reform: focus on rehabilitation and education, saving taxpayers over $40 billion annually.',
  },
  {
    slug: 'immigration',
    title: 'Immigration',
    excerpt: 'Finish securing our southern border.',
    body: [
      { list: [
        'Finish securing our southern border.',
        'Pull our 35,000 troops out of South Korea.',
        'Take most troops out of Germany and the Middle East as well.',
        'Use these troops to help on our southern borders.',
      ] },
      'We need to get organization down there.',
    ],
    seo: 'Doug Jenkins on immigration: finish securing the southern border, bring troops home from South Korea, Germany and the Middle East to help there.',
  },
  {
    slug: 'addictions',
    title: 'Drug, Alcohol, Cell Phone, Pornography, Gambling, and Individualism Addictions',
    shortTitle: 'Addictions',
    excerpt: 'Educate those addicted on the negative effects on family and friends, with treatment options.',
    body: [
      'Millions are addicted to drugs, legal and illegal, alcohol, gambling, pornography and cell phones. Addiction ruins a lot of families.',
      { list: [
        'Educate those addicted on the negative effects on family and friends.',
        'Provide treatment options.',
        'Reduce these addictions by removing the source.',
      ] },
      'Many people and families will benefit.',
    ],
    seo: 'Doug Jenkins on drug, alcohol, cell phone, pornography, gambling and individualism addictions: education, treatment and removing the source.',
  },
];

// Campaign news. Only add genuine, campaign-approved updates.
// Shape: { slug, title, date: 'YYYY-MM-DD', summary, body: ['paragraph', ...] }
export const news = [];
