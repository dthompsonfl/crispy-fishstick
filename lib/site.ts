export const siteConfig = {
  name: "Vantus Systems",
  company: "Vantus Systems",
  tagline: "Engineering-grade websites & systems for small businesses.",
  description:
    "Engineering-grade websites & systems for small businesses. Math, not marketing.",
  email: "hello@vantus.systems",
  links: {
    github: "https://github.com/vantus-systems",
    linkedin: "https://linkedin.com/company/vantus-systems",
    twitter: "https://twitter.com/vantus_systems",
  },
  cta: {
    primary: {
      text: "Get a Free Mini-Audit",
      href: "/audit",
    },
    secondary: {
      text: "See Packages",
      href: "/pricing",
    },
  },
  mainNav: [
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "How it Works",
      href: "/how-it-works",
    },
    {
      title: "Trust",
      href: "/trust",
    },
    {
      title: "Resources",
      href: "/resources",
    },
  ],
  mobileNav: [
    {
      title: "Home",
      href: "/",
      icon: "Home",
    },
    {
      title: "Services",
      href: "/services",
      icon: "Layers",
    },
    {
      title: "Pricing",
      href: "/pricing",
      icon: "CreditCard",
    },
    {
      title: "Audit",
      href: "/audit",
      icon: "Activity",
    },
    {
      title: "Contact",
      href: "/contact",
      icon: "MessageSquare",
    },
  ],
  packages: [
    {
        name: "Starter",
        price: "$2,500",
        description: "Perfect for launch or refresh."
    },
    {
        name: "Growth",
        price: "$5,000",
        description: "Systems + Automation."
    },
    {
        name: "Scale",
        price: "$10,000+",
        description: "Multi-location / Advanced."
    }
  ]
};

export type SiteConfig = typeof siteConfig;
