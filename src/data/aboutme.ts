export interface CareerEntry {
  role: string;
  company: string;
  years: string;
  link?: string;
}

export interface EducationEntry {
  title: string;
  subtitle: string;
}

export interface AboutMeData {
  bio: string;
  career: CareerEntry[];
  education: EducationEntry[];
}

export const ABOUT_ME: AboutMeData = {
  bio: "Hi, I’m Fabio, an Italian Design Leader with 10+ years of experience shaping and scaling digital products for global companies. I thrive at the intersection of design, strategy, and AI—building high-performing teams, streamlining processes, and crafting scalable design systems that accelerate impact and innovation.",
  career: [
    {
      role: "Head DDIT Exp Design",
      company: "Novartis",
      years: "Present",
      link: "https://www.novartis.com/"
    },
    {
      role: "Head of Design",
      company: "Brainly",
      years: "2021 – 2025",
      link: "https://brainly.com"
    },
    {
      role: "Staff Product Designer",
      company: "BCA",
      years: "2019 – 2021",
      link: "https://www.bca.co.uk/"
    },
    {
      role: "Staff Product Designer",
      company: "EE & BT",
      years: "2015 – 2019",
      link: "https://ee.co.uk/"
    },
    {
      role: "Lead UX & Developer Manager",
      company: "Hertz",
      years: "2014 – 2015",
      link: "https://www.hertz.com/rentacar/reservation/"
    },
    {
      role: "Lead UX",
      company: "The Big Now",
      years: "2011 – 2014",
      link: "https://www.dentsucreative.com/?utm_medium=referral_profile&utm_source=clutch.co"
    },
    {
      role: "UX Strategist",
      company: "Logotel",
      years: "2010 – 2011",
      link: "https://www.logotel.it/en/"
    },
    {
      role: "Web Team Lead",
      company: "Sky Italy",
      years: "2005 – 2009",
      link: "https://www.sky.it/"
    }
  ],
  education: [
    {
      title: "Master of Web & Multimedia Design",
      subtitle: "Scuola Politecnica di Design (SPD), Milan"
    },
    {
      title: "Bachelor of Political Science",
      subtitle: "University of Italy"
    },
    {
      title: "Diploma in Information Technology",
      subtitle: "Italy Institute"
    }
  ]
};
