export interface Article {
  id: string;
  tag: string;
  category: 'society' | 'education' | 'policy';
  title: string;
  shortTitle: string;
  subtitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  featured?: boolean;
}

export const ARTICLES: Article[] = [
  {
    id: 'post-movement',
    tag: 'Society & Human Rights',
    category: 'society',
    title: 'The Country Half Its People Cannot Freely Move Through: Patriarchy, Harassment, and the Family Travel Trap',
    shortTitle: 'The Country Half Its People Cannot Freely Move Through',
    subtitle: 'Patriarchy, Sexual Violence, and the Retreat from Public Space in Bangladesh',
    date: 'October 5, 2026',
    readTime: '12 min read',
    featured: true,
    excerpt: 'In the streets, villages, and even homes of Bangladesh in 2026, women and children live in perpetual fear. No neighbourhood feels safe. No hour of the day guarantees security. Almost daily, reports emerge of rape, gang rape, sexual assault, and murders following these violations. This is not a sporadic crisis; it is a national emergency that exposes the hollow promises of governance.'
  },
  {
    id: 'post-period',
    tag: 'Society & Health',
    category: 'society',
    title: "Why Does Half the Population Bleed in Silence? The Period Chapter Bangladesh's Classrooms Forgot to Teach — And Every Brother, Father, Son, Husband, and Boyfriend Needs to Read",
    shortTitle: 'Why Does Half the Population Bleed in Silence?',
    subtitle: 'Every single month, roughly half the people in Bangladesh and South Asia who are of reproductive age go through something that is completely normal, biologically unremarkable, and utterly essential to human continuation — and yet, somehow, it remains one of the most unspeakable subjects in the region. Not a disease. Not a disorder. A period.',
    date: 'September 9, 2026',
    readTime: '8 min read',
    excerpt: 'Every single month, roughly half the people in Bangladesh and South Asia who are of reproductive age go through something that is completely normal, biologically unremarkable, and utterly essential to human continuation — and yet, somehow, it remains one of the most unspeakable subjects in the region.'
  },
  {
    id: 'post-tabs',
    tag: 'Technology & Policy',
    category: 'policy',
    title: 'Free Tabs for SSC Toppers: A Good Idea Bangladesh Has Failed to Execute Before — Will 2026 Be Different?',
    shortTitle: 'Free Tabs for SSC Toppers',
    subtitle: "A look at the newly announced device giveaway for SSC 2026's GPA-5 achievers, read against the country's track record with the Doel laptop and its unresolved e-waste crisis.",
    date: 'September 9, 2026',
    readTime: '6 min read',
    excerpt: "A look at the newly announced device giveaway for SSC 2026's GPA-5 achievers, read against the country's track record with the Doel laptop and its unresolved e-waste crisis."
  },
  {
    id: 'post-collapse',
    tag: 'Education & Reform',
    category: 'education',
    title: 'The Silent Collapse',
    shortTitle: 'The Silent Collapse',
    subtitle: 'How the HSC Exam Debacle Exposed the Broken Foundation of Bangladesh’s Education System',
    date: 'July 9, 2026',
    readTime: '9 min read',
    excerpt: 'For decades, we have comforted ourselves with a comforting illusion: that a rising pass rate and an explosion of GPA-5 achievements in our public examinations meant our youth were marching toward a brighter, more competitive future. That illusion has shattered.'
  }
];
