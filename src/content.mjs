// All campaign content lives here. Every statement is sourced from the
// campaign's own published material:
//   [site]  = dougjenkinsforpresident.com (captured 12 Nov 2026)
//   [flyer] = the campaign flyer image published on that site
// Typos in the source were corrected; meaning was not changed.
// Do not add claims here without written campaign approval.

export const site = {
  name: 'Doug Jenkins for President 2028',
  shortName: 'Doug Jenkins 2028',
  url: 'https://dougjenkinsforpresident.com',
  tagline: 'End the Nonsense', // [flyer]
  status: 'Independent Write-In Candidate', // [flyer]
  hometown: 'Madison, Wisconsin', // client brief
  email: 'dougjenkins.1890@gmail.com', // [site] [flyer]
  phone: '(608) 630-6648', // [site] [flyer]
  phoneHref: '+16086306648',
  hours: '9:00 am – 5:00 pm', // [site]
  disclaimer: 'Paid for by Friends of Doug Jenkins', // [flyer]
  copyright: 'Doug Jenkins for President 2028. All rights reserved.', // [site]
  communityDedication:
    'Doug has committed years of service, tirelessly working to improve our community.', // [site]
};

// [flyer] — biography
export const bio = {
  facts: [
    { figure: '24', post: 'years', label: 'Served in the U.S. Army' },
    { pre: 'Since', figure: '1969', label: 'A sergeant and life coach' },
    { pre: 'Almost', figure: '40', post: 'years', label: 'Ran his own painting business' },
    { figure: '3rd', post: 'run', label: 'For President, after 2020 and 2024' },
  ],
  paragraphs: [
    'Doug Jenkins is a highly decorated Vietnam War veteran. He has been a sergeant and life coach since 1969, and he served 24 years in the United States Army.',
    'Doug also ran his own successful painting business for almost 40 years.',
    'He is a father of four, with ten grandchildren and two great-grandchildren.',
    'Doug ran for President in 2020 and 2024. In 2028 he is running again as an independent write-in candidate, with a simple message: end the nonsense.',
  ],
  family: { children: 4, grandchildren: 10, greatGrandchildren: 2 },
  record: [
    { year: '2020', text: 'Ran for President of the United States.' },
    { year: '2024', text: 'Ran for President of the United States.' },
    { year: '2028', text: 'Running as an independent write-in candidate for President.' },
  ],
};

// Documented statements by Doug / the campaign [site]
export const quotes = [
  { text: 'Put focus on peace, and not war!', policy: 'department-of-peace' },
  { text: 'Housing should be one of our rights as an American.', policy: 'homelessness' },
  { text: 'We can’t just sit here and do nothing!', policy: 'hunger-and-health' },
  { text: 'Our current prison system is financially and morally unsustainable.', policy: 'criminal-justice-reform' },
];

// Headline proposals for the "Plan at a glance" band — all verbatim proposals [site]
export const highlights = [
  { figure: '1 year', label: 'Price freeze on rent, gas, groceries, medications and utilities', policy: 'economy' },
  { figure: '10%', label: 'Flat income tax', policy: 'federal-budget' },
  { figure: '5%', label: 'Cut to the federal budget by stopping careless and wasteful spending', policy: 'federal-budget' },
  { figure: '5%', label: 'Reduction in the national debt', policy: 'federal-budget' },
  { figure: '16th', label: 'Federal department: the Department of Peace', policy: 'department-of-peace' },
  { figure: '58,000', label: 'Fire stations, each with a family agent providing daily coaching', policy: 'homelessness' },
];

// Policy pages. `original` = heading on the original site.
export const policies = [
  {
    slug: 'economy',
    original: 'Economy',
    title: 'Economy & Cost of Living',
    short: 'A one-year price freeze on rent, gas, groceries, medications and utilities.',
    icon: 'tag',
    lead: 'Doug proposes relief for American households: freeze the prices families depend on every day for one full year.',
    proposals: [
      'Freeze prices for one year on rent, gas, groceries, medications and utilities.',
      'Support a 10 percent flat income tax.',
      'Support a 5 percent “grateful tax.”',
    ],
    context: [
      'The campaign points to precedent for a price freeze: President Nixon froze prices in 1973 for three months, and President Franklin D. Roosevelt did so for over a year.',
    ],
    figures: [
      { figure: '1 year', label: 'Proposed price freeze' },
      { figure: '10%', label: 'Proposed flat income tax' },
      { figure: '5%', label: 'Proposed “grateful tax”' },
    ],
    figuresAreProposals: true,
    related: ['federal-budget', 'health-care', 'homelessness'],
    seo: 'Doug Jenkins proposes a one-year price freeze on rent, gas, groceries, medications and utilities, plus a 10% flat income tax.',
  },
  {
    slug: 'federal-budget',
    original: 'Federal Budget Reform',
    title: 'Federal Budget Reform',
    short: 'Cut the federal budget and the national debt by 5% each, with a 10% flat income tax.',
    icon: 'ledger',
    lead: 'Doug’s budget plan targets careless and wasteful spending, a simpler tax code and a smaller national debt.',
    proposals: [
      'Reduce the federal budget by 5% by stopping careless and wasteful spending.',
      'Support a 10% flat income tax.',
      'Create a 5% “grateful tax,” with incentives, through the Internal Revenue Service.',
      'Reduce the national debt by 5%.',
    ],
    context: [],
    figures: [
      { figure: '5%', label: 'Federal budget reduction' },
      { figure: '10%', label: 'Flat income tax' },
      { figure: '5%', label: '“Grateful tax,” with incentives' },
      { figure: '5%', label: 'National debt reduction' },
    ],
    figuresAreProposals: true,
    related: ['economy', 'criminal-justice-reform', 'department-of-peace'],
    seo: 'Doug Jenkins’ federal budget plan: cut the budget 5% by ending wasteful spending, a 10% flat income tax and a 5% reduction in the national debt.',
  },
  {
    slug: 'department-of-peace',
    original: 'Stop the Killing!',
    title: 'Stop the Killing',
    short: 'Establish a 16th federal department, the Department of Peace.',
    icon: 'dove',
    lead: 'Doug calls on the United States to put its focus on peace, not war, and to make that commitment permanent with a new Department of Peace.',
    proposals: [
      'Establish the 16th federal department: the Department of Peace.',
      'Put the nation’s focus on peace, and not war.',
      'Obey the Sixth Commandment: “Thou shall not kill.”',
    ],
    context: [
      'According to the campaign, there have been over one hundred wars in the past, in which people have killed around 100 million other people, and the United States produces 40% of all military hardware and arms.',
    ],
    figures: [
      { figure: '100+', label: 'Wars in the past' },
      { figure: '100M', label: 'People killed in those wars' },
      { figure: '40%', label: 'Share of the world’s military hardware and arms produced by the U.S.' },
    ],
    quote: 'Put focus on peace, and not war!',
    related: ['hunger-and-health', 'immigration', 'federal-budget'],
    seo: 'Stop the Killing: Doug Jenkins proposes a 16th federal department, the Department of Peace, and a national focus on peace, not war.',
  },
  {
    slug: 'homelessness',
    original: 'Eradicate Homelessness',
    title: 'Eradicate Homelessness',
    short: 'Housing as a right, and a family agent in all 58,000 fire stations.',
    icon: 'house',
    lead: 'Doug believes housing should be one of our rights as Americans, and that ending homelessness is both the right thing to do and a saving for taxpayers.',
    proposals: [
      'Recognize housing as one of our rights as Americans.',
      'Place a family agent in all 58,000 fire stations in America to provide daily coaching.',
    ],
    context: [
      'The campaign estimates that 10 to 12 million people are homeless, 7 million of them children, and that eradicating homelessness would save taxpayers over $25 billion a year.',
    ],
    figures: [
      { figure: '10–12M', label: 'People experiencing homelessness' },
      { figure: '7M', label: 'Of them children' },
      { figure: '$25B+', label: 'Annual taxpayer savings from eradicating homelessness' },
    ],
    quote: 'Housing should be one of our rights as an American.',
    related: ['economy', 'addiction', 'hunger-and-health'],
    seo: 'Doug Jenkins’ plan to eradicate homelessness: housing as a right and a family agent in all 58,000 U.S. fire stations providing daily coaching.',
  },
  {
    slug: 'hunger-and-health',
    original: 'Feed the Starving and Help the Sick',
    title: 'Feed the Starving and Help the Sick',
    short: 'Give farmers, engineers and medical personnel the power to help those in need.',
    icon: 'wheat',
    lead: 'Doug wants to give America’s farmers, engineers and medical personnel the power to help our less fortunate brothers and sisters.',
    proposals: [
      'Empower farmers, engineers and medical personnel to help our less fortunate brothers and sisters.',
      'Act on hunger and preventable disease instead of standing by.',
    ],
    context: [
      'The campaign notes that around 50,000 people starve to death or die from preventable sickness and disease, while Americans wasted $408 billion on food in 2022, an average of $1,600 per person each year.',
    ],
    figures: [
      { figure: '50,000', label: 'People who starve or die from preventable sickness and disease' },
      { figure: '$408B', label: 'Food wasted by Americans in 2022' },
      { figure: '$1,600', label: 'Average wasted per year' },
    ],
    quote: 'We can’t just sit here and do nothing!',
    related: ['health-care', 'department-of-peace', 'homelessness'],
    seo: 'Feed the Starving and Help the Sick: Doug Jenkins would empower farmers, engineers and medical personnel to fight hunger and preventable disease.',
  },
  {
    slug: 'health-care',
    original: 'Medical, Dental, and Car Care',
    title: 'Medical, Dental and Car Care',
    short: 'Affordable coverage for all, Medicare for all, and car care similar to AAA.',
    icon: 'cross',
    lead: 'Doug supports affordable coverage for all Americans, from medical and dental care to mental health and even car care.',
    proposals: [
      'Affordable coverage for all.',
      'Medicare for all.',
      'Coverage for mental illness.',
      'Major drug reform laws.',
      'Car care similar to AAA coverage.',
    ],
    context: [
      'The campaign cites estimates that over 12% of Americans are depressed, and that many are taking illegal street drugs.',
    ],
    figures: [
      { figure: '12%+', label: 'Of Americans estimated to be depressed' },
    ],
    related: ['addiction', 'hunger-and-health', 'economy'],
    seo: 'Doug Jenkins supports affordable coverage for all: Medicare for all, mental health coverage, drug reform, and car care similar to AAA.',
  },
  {
    slug: 'criminal-justice-reform',
    original: 'Prison and Criminal Justice Reform',
    title: 'Prison and Criminal Justice Reform',
    short: 'Rehabilitation and education, with a plan to save taxpayers over $40 billion a year.',
    icon: 'scales',
    lead: 'With around 4 million people incarcerated, Doug would refocus the system on rehabilitation and education, so they become more productive citizens.',
    proposals: [
      'Focus on rehabilitation and education for incarcerated people, so they become more productive citizens.',
      'Reform a prison system that is financially and morally unsustainable.',
      'Save taxpayers over $40 billion annually while creating safer and more just communities.',
    ],
    context: [],
    figures: [
      { figure: '4M', label: 'People incarcerated' },
      { figure: '$40B+', label: 'Annual taxpayer savings under Doug’s reform plan' },
    ],
    quote: 'My reform plan can save taxpayers over $40 billion annually while creating safer and more just communities.',
    related: ['addiction', 'federal-budget', 'homelessness'],
    seo: 'Doug Jenkins’ prison and criminal justice reform plan focuses on rehabilitation and education and aims to save taxpayers over $40 billion a year.',
  },
  {
    slug: 'immigration',
    original: 'Immigration',
    title: 'Immigration',
    short: 'Process immigrants in their home countries, prioritize much-needed workers, and partner with Mexico.',
    icon: 'handshake',
    lead: 'Doug calls for a more just immigration system built on real solutions, not “not in my back yard.”',
    proposals: [
      'Create a more just way to process immigrants in their home countries.',
      'Prioritize much-needed workers.',
      'Partner with Mexico in its security and economic growth.',
      'Create real solutions instead of NIMBY (“not in my back yard”) politics.',
    ],
    context: [],
    figures: [],
    related: ['department-of-peace', 'economy', 'criminal-justice-reform'],
    seo: 'Doug Jenkins on immigration: process immigrants in their home countries, prioritize much-needed workers and partner with Mexico on security and growth.',
  },
  {
    slug: 'climate',
    original: 'Climate Change',
    title: 'Climate Change',
    short: 'Commit resources to work with scientists and environmentalists worldwide.',
    icon: 'leaf',
    lead: 'Pollution is a global crisis. Doug would commit resources to collaborate with scientists and environmentalists worldwide.',
    proposals: [
      'Commit resources to collaborate with scientists and environmentalists worldwide.',
      'Take decisive action now to protect our planet for future generations.',
    ],
    context: [
      'The campaign notes that 6 million people die annually from contaminated water and 7 million from poor air quality, and that in the United States 100 million people suffer due to unhealthy air.',
    ],
    figures: [
      { figure: '6M', label: 'Deaths each year from contaminated water' },
      { figure: '7M', label: 'Deaths each year from poor air quality' },
      { figure: '100M', label: 'People in the U.S. suffering due to unhealthy air' },
    ],
    related: ['hunger-and-health', 'health-care', 'department-of-peace'],
    seo: 'Doug Jenkins on climate change: commit resources to collaborate with scientists and environmentalists worldwide to fight pollution.',
  },
  {
    slug: 'addiction',
    original: 'Drug, Alcohol, Cell Phone, Pornography, Gambling, and other Addictions',
    title: 'Addiction',
    fullTitle: 'Drug, Alcohol, Cell Phone, Pornography, Gambling and Other Addictions',
    short: 'Education about the effects of addiction, with real treatment options.',
    icon: 'hands',
    lead: 'Doug would address drug, alcohol, cell phone, pornography, gambling and other addictions through education and treatment.',
    proposals: [
      'Educate those who are addicted about the negative effects on family and communities.',
      'Provide treatment options.',
    ],
    context: [],
    figures: [],
    related: ['health-care', 'criminal-justice-reform', 'homelessness'],
    seo: 'Doug Jenkins on drug, alcohol, cell phone, pornography, gambling and other addictions: education about their effects, with treatment options.',
  },
];

// Campaign news. Only add genuine, campaign-approved updates.
// When this array is non-empty the build generates /news/ and /news/<slug>/
// pages (with Article schema) and a "Latest updates" section on the home page.
// Shape: { slug, title, date: 'YYYY-MM-DD', summary, body: ['paragraph', ...] }
export const news = [];
