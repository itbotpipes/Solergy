export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rajesh Malhotra',
    role: 'Residential customer',
    rating: 5,
    quote:
      'The team at Solergy explained everything clearly before we signed anything — no confusing jargon, just straight answers. Our electricity bill dropped noticeably within the first billing cycle itself.',
  },
  {
    name: 'Anjali Sharma',
    role: 'Residential customer',
    rating: 5,
    quote:
      "We'd been putting off solar for years thinking it would be a hassle. The installation at our place in Sunview was done in a few days with zero mess, and the savings have been exactly what they estimated.",
  },
  {
    name: 'Vikram Chopra',
    role: 'Industrial customer, Pushpanjali, Delhi',
    rating: 5,
    quote:
      'Our unit in Pushpanjali runs machinery through most of the day, so daytime power costs were a real drain. Since the solar plant went live, our grid dependency has dropped significantly — and the ROI is tracking ahead of what we expected.',
  },
  {
    name: 'Sanjay Bansal',
    role: 'Industrial customer, South City 1, Gurgaon',
    rating: 5,
    quote:
      'Professional from the first site visit to final commissioning. The Solergy team sized the system around our actual production load in South City 1, not just the available rooftop space — that attention to detail made all the difference.',
  },
  {
    name: 'Harpreet Singh',
    role: 'Industrial customer, Janpath, Ludhiana',
    rating: 5,
    quote:
      "Being in the hosiery business, our machines run long hours daily. The solar system installed at our Janpath unit has meaningfully cut our monthly power costs, and Solergy's team has stayed responsive even months after installation.",
  },
];

export default TESTIMONIALS;
