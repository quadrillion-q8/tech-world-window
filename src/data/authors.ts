export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  url: string;
};

export const authors: Record<string, Author> = {
  imranNatiq: {
    id: 'imran-natiq',
    name: 'Imran Natiq',
    role: 'Hardware Repair Engineer & Technology Writer',
    bio: 'A hands-on hardware repair engineer focused on PC and laptop troubleshooting, Windows diagnostics, gaming performance, storage health and practical technology education.',
    url: '/authors/imran-natiq',
  },
};
