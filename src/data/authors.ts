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
    role: 'Hardware Repair Engineer',
    bio: 'A hands-on technician focused on PC and laptop hardware, practical troubleshooting, and explaining complex technology clearly.',
    url: '/authors/imran-natiq',
  },
};
