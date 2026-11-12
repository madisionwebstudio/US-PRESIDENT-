// All campaign content lives here. Wording is taken from the campaign's own material:
//   [site]  = dougjenkinsforpresident.com (captured 12 Nov 2026)
//   [flyer] = the campaign flyer image published on that site
// Spelling and punctuation were corrected; wording and meaning were kept.
// Do not add claims here without written campaign approval.

export const site = {
  name: 'Doug Jenkins for President 2028', // [site]
  shortName: 'Doug Jenkins 2028',
  url: 'https://dougjenkinsforpresident.com',
  slogan: 'End the Nonsense', // [flyer]
  status: 'Independent Write-In', // [flyer]
  hometown: 'Madison, Wisconsin', // client brief
  email: 'dougjenkins.1890@gmail.com', // [site] [flyer]
  phone: '(608) 630-6648', // [site] [flyer]
  phoneHref: '+16086306648',
  hours: '9:00 am – 5:00 pm', // [site]
  disclaimer: 'Paid for by Friends of Doug Jenkins', // [flyer]
  copyright: 'Doug Jenkins for President 2028 - All Rights Reserved.', // [site]
  join: { heading: 'Join the Movement!', text: 'Stand for Change. Join Today!' }, // [site]
  communityDedication: {
    heading: 'Community Dedication', // [site]
    text: 'Doug has committed years of service, tirelessly working to improve our community.', // [site]
  },
};

// [flyer] — biography, kept in the flyer's own words
export const bio = [
  'Doug, a father of 4, 10 grandkids, and 2 great-grandkids, ran for President in 2020 and 2024.',
  'A highly decorated Vietnam War veteran; a sergeant and life coach since 1969, he served 24 years in the US Army.',
  'He ran his own successful painting business for almost 40 years.',
];

// "Our Vision" [site] — headings and text as published, in the original order.
// body: array of paragraphs (string) or lists ({ list: [...] }).
export const policies = [
  {
    slug: 'economy',
    title: 'Economy',
    excerpt: 'Freeze prices for 1 year on rent, gas, groceries, medications and utilities.',
    body: [
      { list: [
        'Freeze prices for 1 year on rent, gas, groceries, medications and utilities. President Nixon did in 1973 for three months. President FDR did for over a year.',
        'Support a 10 percent flat income tax and a 5 percent grateful tax.',
      ] },
    ],
    seo: 'Doug Jenkins on the economy: freeze prices for 1 year on rent, gas, groceries, medications and utilities, and support a 10 percent flat income tax.',
  },
  {
    slug: 'climate-change',
    title: 'Climate Change',
    excerpt: 'Commit resources to collaborate with scientists and environmentalists worldwide.',
    body: [
      'Commit resources to collaborate with scientists and environmentalists worldwide.',
      'Pollution is a global crisis. 6 million people die annually from contaminated water, and 7 million from poor air quality. In the US, 100 million people suffer due to unhealthy air.',
      'Take decisive action now to protect our planet for future generations.',
    ],
    seo: 'Doug Jenkins on climate change: commit resources to collaborate with scientists and environmentalists worldwide and take decisive action on pollution.',
  },
  {
    slug: 'stop-the-killing',
    title: 'Stop the Killing!',
    excerpt: 'Establish the 16th department, called the Department of Peace.',
    body: [
      'In over one hundred wars in the past, people have killed around 100 million other people.',
      'Obey the Sixth Commandment, “Thou shall not kill.”',
      'The United States produces 40% of all military hardware and arms.',
      { list: [
        'Establish the 16th department, called the Department of Peace.',
        'Put focus on peace, and not war!',
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
      { list: ['Support a family agent in all 58,000 fire stations in America, to provide daily coaching.'] },
    ],
    seo: 'Doug Jenkins on homelessness: housing should be one of our rights as an American, with a family agent in all 58,000 fire stations.',
  },
  {
    slug: 'feed-the-starving-and-help-the-sick',
    title: 'Feed the Starving and Help the Sick',
    excerpt: 'Get our farmers, engineers and medical personnel the power to help our less fortunate brothers and sisters.',
    body: [
      'Around 50,000 starve to death and die from preventable sickness and diseases.',
      'In 2022, Americans wasted $408 billion on food. The average wasted $1,600 per year.',
      'We need to get our farmers, engineers and medical personnel the power to help our less fortunate brothers and sisters.',
      'We can’t just sit here and do nothing!',
    ],
    seo: 'Doug Jenkins: get our farmers, engineers and medical personnel the power to help our less fortunate brothers and sisters.',
  },
  {
    slug: 'federal-budget-reform',
    title: 'Federal Budget Reform',
    excerpt: 'Reduce the federal budget by 5%, by stopping careless and wasteful spending.',
    body: [
      { list: [
        'Reduce the federal budget by 5%, by stopping careless and wasteful spending.',
        'Support a 10% flat income tax.',
        'A 5% grateful tax, with incentives, from the Internal Revenue Service.',
        'Reduce the national debt by 5%.',
      ] },
    ],
    seo: 'Doug Jenkins on federal budget reform: reduce the federal budget by 5%, a 10% flat income tax, and reduce the national debt by 5%.',
  },
  {
    slug: 'medical-dental-and-car-care',
    title: 'Medical, Dental, and Car Care',
    excerpt: 'Affordable coverage for all. Medicare for all.',
    body: [
      { list: ['Affordable coverage for all.'] },
      'Estimates are, over 12% of Americans are depressed and many are taking illegal street drugs. We need coverage for mental illness and major drug reform laws.',
      { list: ['Medicare for all.', 'Car care similar to AAA coverage.'] },
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
    excerpt: 'Create a more just way to process immigrants in their home countries.',
    body: [
      { list: [
        'Create a more just way to process immigrants in their home countries.',
        'Prioritize much-needed workers.',
        'Partner with Mexico in their security and economic growth.',
        'Creating real solutions, not “not in my back yard” (NIMBY).',
      ] },
    ],
    seo: 'Doug Jenkins on immigration: process immigrants in their home countries, prioritize much-needed workers and partner with Mexico.',
  },
  {
    slug: 'addictions',
    title: 'Drug, Alcohol, Cell Phone, Pornography, Gambling, and Other Addictions',
    shortTitle: 'Addictions',
    excerpt: 'Educate those addicted on the negative effects on family and communities, with treatment options.',
    body: [
      'We need to educate those addicted on the negative effects on family and communities, with treatment options.',
    ],
    seo: 'Doug Jenkins on drug, alcohol, cell phone, pornography, gambling and other addictions: education on the effects, with treatment options.',
  },
];

// Campaign news. Only add genuine, campaign-approved updates.
// When non-empty, the build generates /news/ and /news/<slug>/ (with Article schema)
// and adds the latest updates to the home page.
// Shape: { slug, title, date: 'YYYY-MM-DD', summary, body: ['paragraph', ...] }
export const news = [];
