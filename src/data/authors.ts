export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  url: string;
  expertise: string[];
  /** Real public profile URLs (LinkedIn, GitHub, YouTube...). Leave empty until they exist; never invent them. */
  sameAs?: string[];
};

/** Real public brand profiles for the Organization schema. Leave empty until they exist. */
export const ORGANIZATION_SAME_AS: string[] = [];

export const authors: Record<string, Author> = {
  imranNatiq: {
    id: 'imran-natiq',
    name: 'Imran Natiq',
    role: 'Hardware Repair Engineer & Technology Writer',
    bio: 'A hands-on hardware repair engineer focused on PC and laptop troubleshooting, Windows diagnostics, gaming performance, storage health and practical technology education.',
    url: '/authors/imran-natiq',
    sameAs: [],
    expertise: [
      'PC and laptop hardware troubleshooting',
      'Windows diagnostics and recovery',
      'PC gaming performance and frame-time analysis',
      'SSD, RAM and storage health',
      'Practical hardware testing and repair methodology',
    ],
  },
};
