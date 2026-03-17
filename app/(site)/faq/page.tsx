import { AccordionItem } from "@/components/ui/kinetic/accordion";

export default function FAQPage() {
  const faqs = [
    {
      q: "How much does a website actually cost?",
      a: "Our packages start at $2,500. Custom projects typically range from $5k to $20k. We give you a fixed price upfront, so there are no surprises."
    },
    {
      q: "Do I own the code?",
      a: "Yes. 100%. Upon final payment, we transfer the Git repository and all accounts to you. We do not believe in holding code hostage."
    },
    {
      q: "What happens if I need changes later?",
      a: "We offer monthly maintenance plans for small updates. For larger features, we scope them as new project sprints. You are also free to hire another developer since you own the code."
    },
    {
      q: "How long does it take?",
      a: "A standard marketing site takes 4-6 weeks. More complex systems can take 8-12 weeks. We provide a timeline during the audit phase."
    },
    {
      q: "Do you handle hosting?",
      a: "We set up hosting on your behalf (typically Vercel or Netlify) but the account is yours. You pay the hosting provider directly (usually $0-$20/mo for standard sites)."
    },
    {
      q: "What if my site goes down?",
      a: "If you are on a Maintenance Plan, we receive an alert and fix it immediately. If not, we charge an emergency hourly rate to investigate."
    }
  ];

  return (
    <div className="container py-12 md:py-24 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Honest answers to the questions agencies usually avoid.
        </p>
      </div>

      <div className="space-y-1">
        {faqs.map((faq, i) => (
            <AccordionItem key={i} title={faq.q}>
                {faq.a}
            </AccordionItem>
        ))}
      </div>
    </div>
  );
}
