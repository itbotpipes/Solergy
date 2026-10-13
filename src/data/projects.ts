import whySolergyHouse from "../assets/why-solergy-house.jpg";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import heroHouse from "../assets/hero-house.png";
import heroHouseNew from "../assets/hero-house-new.webp";

/* ===== LEGACY PROJECTS DATA (Surat/Ahmedabad/Rajkot/Gandhinagar/Ankleshwar examples) =====
   Kept for future reference. Replaced with the 12 real projects below.

const PROJECTS_LEGACY = [
  {
    id: "family-rooftop-surat",
    title: "Family Rooftop, Surat",
    category: "Residential",
    city: "Surat",
    size: "5 kW",
    date: "May 2024",
    systemType: "On-Grid Solar",
    image: whySolergyHouse,
    gallery: [whySolergyHouse, service1, heroHouse, service2, service3],
    description:
      "On-grid system for a family home, cutting monthly bills significantly.",
    story: [
      "This family in Surat was tired of watching their electricity bill climb every summer as the AC load crept up. They came to us wanting a system that would cover their daytime usage without overhauling their neat, tiled rooftop.",
      "We designed a compact 5 kW on-grid array laid out around their existing water tank and TV antenna, keeping the roofline clean while maximising south-facing sun exposure. Installation was completed in under two days, with net metering approved within three weeks.",
      "Today the system covers close to 80% of the household's daytime consumption, and the family tracks their generation from a simple app on their phone.",
    ],
    specs: [
      { label: "System Size", value: "5 kW" },
      { label: "Panels Installed", value: "12 x 445W Mono PERC" },
      { label: "Inverter", value: "5 kW String Inverter" },
      { label: "Annual Generation", value: "~7,800 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹6,200" },
      { label: "Estimated Payback", value: "~4.5 years" },
    ],
    overview: {
      heading: "A Rooftop That Was Ready to Work Harder.",
      paragraphs: [
        "This family in Surat had a clean, unobstructed rooftop and a summer electricity bill that kept climbing as the AC load crept up. The opportunity was obvious. The challenge was designing a system that fit neatly around an existing water tank and TV antenna.",
        "Solergy studied the household's daily usage pattern, available roof area, and appliance load before designing a system around the family — not simply around the available roof.",
        "The result was a 5 kW rooftop solar system built to quietly cover most of the home's daytime electricity needs.",
      ],
    },
    challenge: {
      heading: "The Summer Bill Was Getting Harder to Ignore.",
      intro: [
        "With the AC running through peak afternoon hours, electricity had become one of the household's biggest recurring expenses.",
        "The rooftop also had to work around an existing water tank and antenna without a messy, oversized installation.",
      ],
      points: [
        {
          title: "Rising Summer Consumption",
          description:
            "AC usage during peak sun hours was driving the household's electricity bill higher every year.",
        },
        {
          title: "A Compact, Shared Rooftop",
          description:
            "Existing fixtures like the water tank and antenna limited the usable panel area.",
        },
        {
          title: "A Simple, Fast Installation",
          description:
            "The family wanted the switch to solar done quickly, without weeks of disruption at home.",
        },
      ],
    },
    solution: {
      heading: "5 kW. Designed Around the Family.",
      intro: [
        "Solergy designed a 5 kW on-grid rooftop system based on the household's actual daytime usage and available roof space.",
        "Our team handled everything from layout and equipment procurement to installation, electrical integration, testing, and net metering approval.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a large share of the home's daytime electricity consumption.",
        },
        {
          title: "Clean Rooftop Layout",
          description:
            "Panels were laid out carefully around existing fixtures to keep the roofline tidy.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Every component was chosen for reliable, long-term operation with minimal upkeep.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "5 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~7,800 kWh" },
      { label: "Annual Savings", value: "~₹0.74 Lakhs" },
      { label: "Estimated Payback", value: "~4.5 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 7,800 kWh of clean electricity every year, helping this Surat household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹0.74 Lakhs, the installation is expected to recover its initial investment in approximately 4.5 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the family's electricity costs under control.",
      ],
      cumulativeSavings: "~₹18.5 Lakhs+ over 25 years",
      paybackYear: 4.5,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~7,800 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹0.74 Lakhs",
        },
        {
          label: "Estimated investment payback period.",
          value: "~4.5 Years",
        },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 0,
    seo: {
      title: "Family Rooftop, Surat | 5 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 5 kW rooftop solar system for a family home in Surat, cutting monthly electricity bills.",
    },
  },
  {
    id: "corporate-office-ahmedabad",
    title: "Corporate Office Rooftop",
    category: "Commercial",
    city: "Ahmedabad",
    size: "50 kW",
    date: "July 2024",
    systemType: "On-Grid Solar",
    image: service1,
    gallery: [service1, service2, whySolergyHouse, heroHouseNew, service3],
    description:
      "Commercial on-grid installation reducing daytime operating costs.",
    story: [
      "A growing corporate office in Ahmedabad wanted to offset its heavy daytime load from server rooms and centralised air conditioning, without disrupting operations during installation.",
      "We phased the rollout across two weekends, mounting a 50 kW array across the flat terrace using a lightweight ballasted structure that required no roof penetration. Cabling was routed through existing service ducts to keep the install clean and low-maintenance.",
      "The system now supplies a large share of the office's daytime power draw, and the facilities team has visibility into real-time generation through a dashboard we set up alongside the install.",
    ],
    specs: [
      { label: "System Size", value: "50 kW" },
      { label: "Panels Installed", value: "112 x 445W Mono PERC" },
      { label: "Inverter", value: "50 kW Three-Phase String Inverter" },
      { label: "Annual Generation", value: "~76,000 units" },
      { label: "Monthly Savings", value: "Up to ₹58,000" },
      { label: "Estimated Payback", value: "~4 years" },
    ],
    overview: {
      heading: "An Office Running on Borrowed Power",
      paragraphs: [
        "A growing corporate office in Ahmedabad had a wide flat terrace, a heavy daytime load from server rooms and centralised AC, and an operations team that couldn't afford installation downtime.",
        "Solergy studied the office's power draw, terrace layout, and working hours before designing a system around the business — not simply around the available roof.",
        "The result was a 50 kW rooftop solar system built to quietly absorb a large share of the office's daytime power draw.",
      ],
    },
    challenge: {
      heading: "The Daytime Load Was Only Getting Heavier.",
      intro: [
        "Server rooms and centralised air conditioning kept the office's electricity demand high through every working hour.",
        "The terrace also needed to stay fully usable during installation, with zero disruption to daily operations.",
      ],
      points: [
        {
          title: "High Daytime Consumption",
          description:
            "Server rooms and AC systems drew significant power throughout office hours.",
        },
        {
          title: "Rising Energy Costs",
          description:
            "Commercial tariffs were adding up fast against a steady, predictable load.",
        },
        {
          title: "Zero-Downtime Installation",
          description:
            "The rollout had to happen without interrupting day-to-day office operations.",
        },
      ],
    },
    solution: {
      heading: "50 kW. Designed Around the Business.",
      intro: [
        "Solergy designed a 50 kW on-grid rooftop system phased across two weekends to avoid any disruption to office hours.",
        "Our team handled ballasted mounting, cabling through existing service ducts, electrical integration, testing, and commissioning — end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a significant portion of the office's daytime electricity consumption.",
        },
        {
          title: "No Roof Penetration",
          description:
            "A lightweight ballasted structure kept the terrace's waterproofing fully intact.",
        },
        {
          title: "Live Monitoring",
          description:
            "A generation dashboard gives the facilities team real-time visibility into the system.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "50 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~76,000 kWh" },
      { label: "Annual Savings", value: "~₹6.96 Lakhs" },
      { label: "Estimated Payback", value: "~4 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 76,000 kWh of clean electricity every year, helping this Ahmedabad office reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹6.96 Lakhs, the installation is expected to recover its initial investment in approximately 4 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and helping the business keep its electricity costs under control.",
      ],
      cumulativeSavings: "~₹1.74 Cr+ over 25 years",
      paybackYear: 4,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~76,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹6.96 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 1,
    seo: {
      title: "Corporate Office Rooftop | 50 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 50 kW rooftop solar system for a corporate office in Ahmedabad, reducing daytime operating costs.",
    },
  },
  {
    id: "sunrise-textiles-surat",
    title: "Sunrise Textiles",
    category: "Commercial",
    city: "Surat",
    size: "150 kW",
    date: "September 2024",
    systemType: "On-Grid Solar",
    image: service2,
    gallery: [service2, service3, heroHouseNew, whySolergyHouse, service1],
    description:
      "A smarter way to power a growing textile business — designed to reduce electricity costs and turn an unused rooftop into a long-term energy asset.",
    story: [
      "Sunrise Textiles had a large rooftop, a growing electricity bill, and plenty of daytime energy consumption. The opportunity was obvious. The challenge was getting the system right.",
      "Solergy studied the facility's energy usage, available rooftop area, and operational requirements before designing a solar system around the business — not simply around the available roof.",
      "The result was a 150 kW rooftop solar system built to generate clean energy and reduce the company's dependence on grid electricity.",
    ],
    specs: [
      { label: "System Size", value: "150 kW" },
      { label: "Panels Installed", value: "336 x 445W Mono PERC" },
      { label: "Inverter", value: "150 kW Three-Phase Inverter" },
      { label: "Annual Generation", value: "~2,10,000 units" },
      { label: "Monthly Savings", value: "Up to ₹1.54 lakh" },
      { label: "Estimated Payback", value: "~4.2 years" },
    ],
    overview: {
      heading: "A Rooftop With More Potential.",
      paragraphs: [
        "Sunrise Textiles had a large rooftop, a growing electricity bill, and plenty of daytime energy consumption.",
        "The opportunity was obvious. The challenge was getting the system right.",
        "Solergy studied the facility's energy usage, available rooftop area, and operational requirements before designing a solar system around the business — not simply around the available roof. The result was a 150 kW rooftop solar system built to generate clean energy and reduce the company's dependence on grid electricity.",
      ],
    },
    challenge: {
      heading: "The Electricity Bill Was Getting Harder to Ignore.",
      intro: [
        "With production running through most of the day, electricity was one of Sunrise Textiles' significant recurring operating expenses.",
        "And as electricity costs continued to rise, so did the pressure on the business.",
        "The site also had to make the most of its existing rooftop without affecting day-to-day operations. The challenge was simple: generate more of their own electricity without disrupting the way they work.",
      ],
      points: [
        {
          title: "High Daytime Consumption",
          description:
            "The facility consumed a significant amount of electricity during solar generation hours.",
        },
        {
          title: "Rising Energy Costs",
          description:
            "Increasing grid electricity costs were making long-term planning harder.",
        },
        {
          title: "Limited Installation Window",
          description:
            "The system needed to be installed efficiently without disrupting production.",
        },
      ],
    },
    solution: {
      heading: "150 kW. Designed Around the Business.",
      intro: [
        "Solergy designed a 150 kW on-grid rooftop solar system based on Sunrise Textiles' actual energy requirements and site conditions.",
        "Rather than treating the project as a standard installation, our team worked through the entire process — from system design and equipment procurement to installation, electrical integration, testing, and commissioning. The result was a solar system that fits naturally into the facility's existing energy usage.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a significant portion of the facility's daytime electricity consumption.",
        },
        {
          title: "Efficient Rooftop Use",
          description:
            "The available rooftop area was planned carefully to make the most of the installation space.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Every part of the system was selected and installed with reliable, long-term operation in mind.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "150 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~2,10,000 kWh" },
      { label: "Annual Savings", value: "~₹18.5 Lakhs" },
      { label: "Estimated Payback", value: "~4.2 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 2,10,000 kWh of clean electricity every year, helping Sunrise Textiles reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹18.5 Lakhs, the solar installation is expected to recover its initial investment in approximately 4.2 years.",
        "And that's only the beginning. Over its expected 25+ year operating life, the system can continue generating clean energy and helping the business keep its electricity costs under control.",
      ],
      cumulativeSavings: "~₹4.6 Cr+ over 25 years",
      paybackYear: 4.2,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~2,10,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹18.5 Lakhs",
        },
        {
          label: "Estimated investment payback period.",
          value: "~4.2 Years",
        },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 2,
    seo: {
      title: "Sunrise Textiles | 150 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 150 kW rooftop solar system for Sunrise Textiles in Surat, helping reduce electricity costs and generate clean energy.",
    },
  },
  {
    id: "villa-rooftop-rajkot",
    title: "Villa Rooftop System",
    category: "Residential",
    city: "Rajkot",
    size: "3 kW",
    date: "March 2024",
    systemType: "On-Grid Solar",
    image: service3,
    gallery: [service3, whySolergyHouse, heroHouse, service1, heroHouseNew],
    description: "Compact on-grid setup for a low-consumption household.",
    story: [
      "A retired couple in Rajkot wanted a simple, low-maintenance system to bring down a modest but steady electricity bill, without dealing with a large or complex installation.",
      "We recommended a compact 3 kW array — enough to comfortably cover their daytime needs without over-building. The entire installation, from site visit to switch-on, was wrapped up in a single day.",
      "They now generate more power than they use most afternoons, banking the surplus through net metering for the evening hours.",
    ],
    specs: [
      { label: "System Size", value: "3 kW" },
      { label: "Panels Installed", value: "7 x 445W Mono PERC" },
      { label: "Inverter", value: "3 kW String Inverter" },
      { label: "Annual Generation", value: "~4,700 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹3,800" },
      { label: "Estimated Payback", value: "~4.7 years" },
    ],
    overview: {
      heading: "A Simple Setup for a Simple Life.",
      paragraphs: [
        "A retired couple in Rajkot had a modest but steady electricity bill and no interest in a large, complicated installation.",
        "Solergy studied the household's daytime usage and available roof space before designing a system sized to the couple's actual needs — not oversized for the sake of it.",
        "The result was a compact 3 kW rooftop solar system built to comfortably cover their daytime electricity use.",
      ],
    },
    challenge: {
      heading: "A Steady Bill With No Room for Complexity.",
      intro: [
        "The couple's electricity usage was modest but consistent, and any long, disruptive installation was out of the question.",
        "The goal was a low-maintenance system that could be installed and forgotten about.",
      ],
      points: [
        {
          title: "Low, Steady Consumption",
          description:
            "A modest daily usage pattern meant the system had to be right-sized, not oversized.",
        },
        {
          title: "Minimal Maintenance Tolerance",
          description:
            "The household wanted a system that required little to no ongoing upkeep.",
        },
        {
          title: "A Single-Day Installation",
          description:
            "The entire switch-on had to happen with minimal disruption to daily routine.",
        },
      ],
    },
    solution: {
      heading: "3 kW. Sized Right, Not Oversized.",
      intro: [
        "Solergy designed a compact 3 kW on-grid rooftop system matched precisely to the household's daytime consumption.",
        "Our team handled the full installation — from site visit to switch-on — in a single day.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to comfortably cover the household's daytime electricity needs.",
        },
        {
          title: "Net-Metered Surplus",
          description:
            "Excess afternoon generation is banked through net metering for evening use.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Reliable components chosen for years of low-maintenance operation.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "3 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~4,700 kWh" },
      { label: "Annual Savings", value: "~₹0.46 Lakhs" },
      { label: "Estimated Payback", value: "~4.7 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 4,700 kWh of clean electricity every year, helping this Rajkot household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹0.46 Lakhs, the installation is expected to recover its initial investment in approximately 4.7 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the couple's electricity costs under control.",
      ],
      cumulativeSavings: "~₹11.5 Lakhs+ over 25 years",
      paybackYear: 4.7,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~4,700 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹0.46 Lakhs",
        },
        {
          label: "Estimated investment payback period.",
          value: "~4.7 Years",
        },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 3,
    seo: {
      title:
        "Villa Rooftop System, Rajkot | 3 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a compact 3 kW on-grid rooftop solar system for a villa in Rajkot.",
    },
  },
  {
    id: "boutique-hotel-gandhinagar",
    title: "Boutique Hotel Rooftop",
    category: "Commercial",
    city: "Gandhinagar",
    size: "35 kW",
    date: "November 2024",
    systemType: "Hybrid-Ready Solar",
    image: heroHouse,
    gallery: [heroHouse, service1, service2, service3, whySolergyHouse],
    description:
      "Hybrid-ready installation cutting daytime energy costs for a hospitality client.",
    story: [
      "A boutique hotel in Gandhinagar was looking to trim its energy costs during peak occupancy months while keeping an option open for battery backup down the line.",
      "We designed a 35 kW hybrid-ready system — wired and structured so a battery bank can be added later without any rework — and mounted it discreetly behind the rooftop parapet wall to keep the property's street-facing view untouched.",
      "The hotel now runs its daytime laundry and HVAC load largely on solar, and guests occasionally ask about the panels during property tours.",
    ],
    specs: [
      { label: "System Size", value: "35 kW" },
      { label: "Panels Installed", value: "78 x 445W Mono PERC" },
      { label: "Inverter", value: "35 kW Hybrid-Ready Inverter" },
      { label: "Annual Generation", value: "~53,000 units" },
      { label: "Monthly Savings", value: "Up to ₹41,000" },
      { label: "Estimated Payback", value: "~4.2 years" },
    ],
    overview: {
      heading: "A Rooftop That Had to Stay Out of Sight.",
      paragraphs: [
        "A boutique hotel in Gandhinagar wanted to cut energy costs during peak occupancy months, without touching the property's street-facing view or ruling out battery backup later.",
        "Solergy studied the hotel's laundry and HVAC load, rooftop layout, and future backup plans before designing a system around the business — not simply around the available roof.",
        "The result was a 35 kW hybrid-ready rooftop solar system, mounted discreetly and built for what comes next.",
      ],
    },
    challenge: {
      heading: "Peak Season Was Pushing Costs Higher.",
      intro: [
        "Daytime laundry and HVAC load spiked during peak occupancy months, driving up the hotel's energy bill.",
        "The rooftop also had to remain visually unobtrusive, with room to add battery backup down the line.",
      ],
      points: [
        {
          title: "Seasonal Load Spikes",
          description:
            "Laundry and HVAC demand rose sharply during peak occupancy periods.",
        },
        {
          title: "A Visible Rooftop",
          description:
            "The installation needed to stay discreet and not affect the property's street-facing view.",
        },
        {
          title: "Future Battery Plans",
          description:
            "The system had to be ready for a battery bank addition without any future rework.",
        },
      ],
    },
    solution: {
      heading: "35 kW. Hybrid-Ready From Day One.",
      intro: [
        "Solergy designed a 35 kW hybrid-ready rooftop system, wired and structured so a battery bank can be added later without rework.",
        "Our team mounted the array discreetly behind the parapet wall and handled procurement, installation, testing, and commissioning end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to run a large share of the hotel's daytime laundry and HVAC load on solar.",
        },
        {
          title: "Discreet Rooftop Placement",
          description:
            "Panels sit behind the parapet wall, keeping the property's street view unchanged.",
        },
        {
          title: "Built for Battery Backup",
          description:
            "Hybrid-ready wiring means backup power can be added without touching the existing system.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "35 kW" },
      { label: "System Type", value: "Hybrid-Ready" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~53,000 kWh" },
      { label: "Annual Savings", value: "~₹4.92 Lakhs" },
      { label: "Estimated Payback", value: "~4.2 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 53,000 kWh of clean electricity every year, helping this Gandhinagar hotel reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹4.92 Lakhs, the installation is expected to recover its initial investment in approximately 4.2 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the hotel's electricity costs under control.",
      ],
      cumulativeSavings: "~₹1.23 Cr+ over 25 years",
      paybackYear: 4.2,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~53,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹4.92 Lakhs",
        },
        {
          label: "Estimated investment payback period.",
          value: "~4.2 Years",
        },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 4,
    seo: {
      title:
        "Boutique Hotel Rooftop, Gandhinagar | 35 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 35 kW hybrid-ready rooftop solar system for a boutique hotel in Gandhinagar.",
    },
  },
  {
    id: "chemical-facility-ankleshwar",
    title: "Chemical Processing Facility",
    category: "Industrial",
    city: "Ankleshwar",
    size: "500 kW",
    date: "January 2025",
    systemType: "On-Grid Solar",
    image: heroHouseNew,
    gallery: [heroHouseNew, service3, service1, service2, heroHouse],
    description:
      "Large-scale rooftop plant reducing production costs for a chemical manufacturer.",
    story: [
      "A chemical processing facility in Ankleshwar was facing some of the highest industrial power tariffs in the region, with continuous process loads running through the day.",
      "We deployed a 500 kW rooftop plant across the facility's main production shed, working closely with the client's safety team to meet all fire and electrical clearance requirements specific to a chemical plant environment.",
      "Since commissioning, the plant has become one of our largest offset generators, and the client cites it as a key part of meeting their sustainability targets for the year.",
    ],
    specs: [
      { label: "System Size", value: "500 kW" },
      { label: "Panels Installed", value: "1,120 x 445W Mono PERC" },
      { label: "Inverter", value: "500 kW Central Inverter" },
      { label: "Annual Generation", value: "~7,60,000 units" },
      { label: "Monthly Savings", value: "Up to ₹5.8 lakh" },
      { label: "Estimated Payback", value: "~3.6 years" },
    ],
    overview: {
      heading: "A Production Shed Built to Do More.",
      paragraphs: [
        "A chemical processing facility in Ankleshwar was facing some of the highest industrial power tariffs in the region, with continuous process loads running through the day.",
        "Solergy studied the facility's process loads, safety requirements, and shed layout before designing a system around the plant — not simply around the available roof.",
        "The result was a 500 kW rooftop solar plant built to meet strict safety clearances while generating clean power at scale.",
      ],
    },
    challenge: {
      heading: "Round-the-Clock Loads, Round-the-Clock Costs.",
      intro: [
        "Continuous process loads meant electricity was consumed at high volumes throughout the day, at some of the highest industrial tariffs in the region.",
        "The installation also had to clear strict fire and electrical safety requirements specific to a chemical plant environment.",
      ],
      points: [
        {
          title: "High Continuous Load",
          description:
            "Round-the-clock process equipment kept industrial power demand consistently high.",
        },
        {
          title: "Strict Safety Clearances",
          description:
            "Fire and electrical safety requirements specific to a chemical facility had to be met in full.",
        },
        {
          title: "Large-Scale Rooftop Coordination",
          description:
            "A plant of this size needed careful sequencing to avoid disrupting production.",
        },
      ],
    },
    solution: {
      heading: "500 kW. Engineered for Industrial Scale.",
      intro: [
        "Solergy designed a 500 kW on-grid rooftop plant across the facility's main production shed, engineered for continuous industrial loads.",
        "Our team worked closely with the client's safety team throughout procurement, installation, electrical integration, testing, and commissioning.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a large share of the facility's continuous daytime power draw.",
        },
        {
          title: "Safety-First Installation",
          description:
            "Every stage was carried out to meet fire and electrical clearances for a chemical plant.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Industrial-grade components selected for reliable operation at full plant scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "500 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~7,60,000 kWh" },
      { label: "Annual Savings", value: "~₹69.6 Lakhs" },
      { label: "Estimated Payback", value: "~3.6 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 7,60,000 kWh of clean electricity every year, helping this Ankleshwar facility reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹69.6 Lakhs, the installation is expected to recover its initial investment in approximately 3.6 years.",
        "Over its expected 25+ year operating life, the plant can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹17.4 Cr+ over 25 years",
      paybackYear: 3.6,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~7,60,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹69.6 Lakhs",
        },
        {
          label: "Estimated investment payback period.",
          value: "~3.6 Years",
        },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 5,
    seo: {
      title:
        "Chemical Processing Facility, Ankleshwar | 500 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 500 kW industrial rooftop solar plant for a chemical processing facility in Ankleshwar.",
    },
  },
];
===== END LEGACY ===== */

const PROJECTS = [
  {
    id: "res-janpath-ludhiana",
    title: "Janpath Rooftop System",
    category: "Residential",
    city: "Ludhiana",
    state: "Punjab",
    size: "60 kW",
    date: "February 2025",
    systemType: "On-Grid Solar",
    image: whySolergyHouse,
    gallery: [whySolergyHouse, service1, heroHouse, service2, service3],
    description:
      "A large on-grid rooftop system covering a sizeable share of this Janpath household's daytime electricity needs.",
    story: [
      "This household in Janpath, Ludhiana had a spacious rooftop and a steadily rising electricity bill driven by a large daytime load. They wanted a system substantial enough to make a real dent in that bill, without an overly complex installation.",
      "We designed a 60 kW on-grid array across the available roof area, sequencing the installation to keep disruption to a minimum.",
      "The system now covers a significant share of the household's daytime consumption, with savings visible from the very first billing cycle.",
    ],
    specs: [
      { label: "System Size", value: "60 kW" },
      { label: "Panels Installed", value: "135 x 445W Mono PERC" },
      { label: "Inverter", value: "60 kW Three-Phase String Inverter" },
      { label: "Annual Generation", value: "~90,000 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹63,750" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Rooftop Built to Carry a Big Load.",
      paragraphs: [
        "This Janpath household had a large rooftop and an equally large daytime electricity load. The opportunity to offset it meaningfully was clear.",
        "Solergy studied the household's usage pattern and available roof area before sizing a system to match the actual load — not just the available space.",
        "The result was a 60 kW rooftop solar system built to carry a large share of the home's daytime demand.",
      ],
    },
    challenge: {
      heading: "A Big Bill Needed a Big Enough System.",
      intro: [
        "A large daytime load meant a modest system wouldn't move the needle — the household needed a system sized to match real consumption.",
        "The installation also had to be sequenced carefully across a large rooftop without disrupting daily routines.",
      ],
      points: [
        {
          title: "High Daytime Load",
          description:
            "A sizeable daytime electricity draw required a system large enough to offset it meaningfully.",
        },
        {
          title: "Large Rooftop Coordination",
          description:
            "A bigger roof area meant more careful planning to maximise panel layout and sun exposure.",
        },
        {
          title: "Minimal Disruption",
          description:
            "The household wanted the switch to solar completed with as little day-to-day disruption as possible.",
        },
      ],
    },
    solution: {
      heading: "60 kW. Sized for the Real Load.",
      intro: [
        "Solergy designed a 60 kW on-grid rooftop system matched to the household's actual daytime consumption.",
        "Our team handled layout, procurement, installation, electrical integration, testing, and net metering approval end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a large share of the household's daytime electricity consumption.",
        },
        {
          title: "Efficient Rooftop Layout",
          description:
            "Panels were laid out to make the most of the available roof area and sun exposure.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Components selected for reliable, low-maintenance operation over the long term.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "60 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~90,000 kWh" },
      { label: "Annual Savings", value: "~₹7.65 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 90,000 kWh of clean electricity every year, helping this Janpath household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹7.65 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the household's electricity costs under control.",
      ],
      cumulativeSavings: "~₹1.58 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~90,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹7.65 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 0,
    seo: {
      title:
        "Janpath Rooftop System, Ludhiana | 60 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 60 kW on-grid rooftop solar system for a home in Janpath, Ludhiana.",
    },
  },
  {
    id: "res-sunview-ludhiana",
    title: "Sunview Rooftop System",
    category: "Residential",
    city: "Ludhiana",
    state: "Punjab",
    size: "15 kW",
    date: "March 2025",
    systemType: "On-Grid Solar",
    image: service1,
    gallery: [service1, whySolergyHouse, service2, service3, heroHouse],
    description:
      "A mid-sized on-grid rooftop system designed to comfortably cover a growing household's daytime usage.",
    story: [
      "A household in Sunview, Ludhiana had a steadily growing electricity bill and a rooftop that was sitting unused. They wanted a system that could comfortably absorb their daytime load without overbuilding.",
      "We designed a 15 kW on-grid system, laid out efficiently across the available roof space, with the full installation completed within a few days.",
      "The family now sees a noticeable drop in their monthly bill, with surplus daytime generation banked through net metering.",
    ],
    specs: [
      { label: "System Size", value: "15 kW" },
      { label: "Panels Installed", value: "34 x 445W Mono PERC" },
      { label: "Inverter", value: "15 kW Three-Phase String Inverter" },
      { label: "Annual Generation", value: "~22,500 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹15,900" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Rooftop Ready to Pay Its Way.",
      paragraphs: [
        "This Sunview household had a steadily growing electricity bill and an unused rooftop with good sun exposure.",
        "Solergy studied the household's daytime usage pattern before sizing a system that comfortably covers it, without excess capacity.",
        "The result was a 15 kW rooftop solar system built to quietly take on a meaningful share of the home's daily power needs.",
      ],
    },
    challenge: {
      heading: "A Growing Bill, With No Room for Guesswork.",
      intro: [
        "Rising daytime consumption meant the household's electricity bill kept climbing year over year.",
        "The family wanted a system sized correctly the first time, without over- or under-building.",
      ],
      points: [
        {
          title: "Rising Daytime Usage",
          description:
            "A steady increase in daytime consumption was driving the household's electricity costs higher.",
        },
        {
          title: "Right-Sizing the System",
          description:
            "The system needed to be sized accurately to the household's actual usage pattern.",
        },
        {
          title: "A Fast, Clean Installation",
          description:
            "The family wanted the switch to solar completed quickly and without mess.",
        },
      ],
    },
    solution: {
      heading: "15 kW. Matched to the Household.",
      intro: [
        "Solergy designed a 15 kW on-grid rooftop system sized to the household's actual daytime consumption pattern.",
        "Our team completed layout, procurement, installation, electrical integration, testing, and net metering approval within a few days.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to comfortably cover a large share of the household's daytime electricity use.",
        },
        {
          title: "Efficient Roof Use",
          description:
            "Panels were laid out to make the most of the available roof space.",
        },
        {
          title: "Net-Metered Surplus",
          description:
            "Excess daytime generation is banked through net metering for later use.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "15 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~22,500 kWh" },
      { label: "Annual Savings", value: "~₹1.91 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 22,500 kWh of clean electricity every year, helping this Sunview household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹1.91 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the household's electricity costs under control.",
      ],
      cumulativeSavings: "~₹39.6 Lakhs+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~22,500 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹1.91 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 1,
    seo: {
      title:
        "Sunview Rooftop System, Ludhiana | 15 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 15 kW on-grid rooftop solar system for a home in Sunview, Ludhiana.",
    },
  },
  {
    id: "res-ferozepur-road-ludhiana",
    title: "Ferozepur Road Rooftop System",
    category: "Residential",
    city: "Ludhiana",
    state: "Punjab",
    size: "80 kW",
    date: "April 2025",
    systemType: "On-Grid Solar",
    image: service2,
    gallery: [service2, heroHouseNew, service3, whySolergyHouse, service1],
    description:
      "A large on-grid rooftop system built to significantly reduce a high-consumption household's electricity costs.",
    story: [
      "A household on Ferozepur Road, Ludhiana had a wide rooftop and a consistently high electricity bill. They wanted a system substantial enough to make a real difference, installed without disrupting the household's day-to-day routine.",
      "We designed an 80 kW on-grid array, carefully laid out across the available roof area to maximise generation.",
      "The system now offsets a large share of the household's daytime consumption, with the family already seeing the difference in their monthly bills.",
    ],
    specs: [
      { label: "System Size", value: "80 kW" },
      { label: "Panels Installed", value: "180 x 445W Mono PERC" },
      { label: "Inverter", value: "80 kW Three-Phase String Inverter" },
      { label: "Annual Generation", value: "~1,20,000 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹85,000" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A High Bill Met With an Equally Serious System.",
      paragraphs: [
        "This Ferozepur Road household had a wide rooftop and an electricity bill that had been climbing for years.",
        "Solergy studied the household's usage and roof area before sizing a system built to make a real, measurable difference.",
        "The result was an 80 kW rooftop solar system designed to offset a large share of the home's daytime demand.",
      ],
    },
    challenge: {
      heading: "A Bill That Needed a Serious Response.",
      intro: [
        "A consistently high daytime load meant the household's electricity costs had become a significant recurring expense.",
        "The large rooftop also needed careful planning to maximise usable panel area.",
      ],
      points: [
        {
          title: "Consistently High Load",
          description:
            "The household's daytime electricity consumption had been climbing steadily year over year.",
        },
        {
          title: "Maximising a Large Rooftop",
          description:
            "A wide roof area needed careful layout planning to make the most of available sun exposure.",
        },
        {
          title: "A Smooth Installation",
          description:
            "The family wanted the system up and running with minimal disruption to the household.",
        },
      ],
    },
    solution: {
      heading: "80 kW. Built to Make a Real Difference.",
      intro: [
        "Solergy designed an 80 kW on-grid rooftop system sized to meaningfully offset the household's high daytime consumption.",
        "Our team handled layout, procurement, installation, electrical integration, testing, and net metering approval end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a large share of the household's daytime electricity consumption.",
        },
        {
          title: "Maximised Roof Layout",
          description:
            "Panels were arranged to make full use of the available roof area and sun exposure.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Components selected for reliable, long-term operation with minimal upkeep.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "80 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~1,20,000 kWh" },
      { label: "Annual Savings", value: "~₹10.2 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 1,20,000 kWh of clean electricity every year, helping this Ferozepur Road household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹10.2 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the household's electricity costs under control.",
      ],
      cumulativeSavings: "~₹2.11 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~1,20,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹10.2 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 2,
    seo: {
      title:
        "Ferozepur Road Rooftop System, Ludhiana | 80 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed an 80 kW on-grid rooftop solar system for a home on Ferozepur Road, Ludhiana.",
    },
  },
  {
    id: "res-pushpanjali-delhi",
    title: "Pushpanjali Rooftop System",
    category: "Residential",
    city: "Delhi",
    state: "Delhi",
    size: "90 kW",
    date: "May 2025",
    systemType: "On-Grid Solar",
    image: service3,
    gallery: [service3, service1, whySolergyHouse, heroHouse, service2],
    description:
      "One of our largest residential installations, built to substantially cut a Pushpanjali household's electricity costs.",
    story: [
      "A household in Pushpanjali, Delhi had a large rooftop and an electricity bill to match. They wanted a system ambitious enough to make a serious dent in their costs.",
      "We designed a 90 kW on-grid system, among our largest residential installations to date, laid out across the full available roof area.",
      "The system now generates a substantial share of the household's daytime power needs, with the family tracking generation closely from day one.",
    ],
    specs: [
      { label: "System Size", value: "90 kW" },
      { label: "Panels Installed", value: "202 x 445W Mono PERC" },
      { label: "Inverter", value: "90 kW Three-Phase String Inverter" },
      { label: "Annual Generation", value: "~1,35,000 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹95,625" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "One of Our Largest Homes Yet.",
      paragraphs: [
        "This Pushpanjali household had a large rooftop and an electricity bill that called for an equally serious system.",
        "Solergy studied the household's usage pattern and full roof area before designing one of our largest residential systems to date.",
        "The result was a 90 kW rooftop solar system built to substantially offset the home's daytime power needs.",
      ],
    },
    challenge: {
      heading: "A Large Home, A Larger Opportunity.",
      intro: [
        "A high daytime load meant the household stood to gain significantly from a larger-than-usual residential system.",
        "Coordinating a system of this scale on a residential rooftop required careful planning.",
      ],
      points: [
        {
          title: "High Daytime Load",
          description:
            "A substantial daytime electricity draw meant a larger system would deliver meaningfully larger savings.",
        },
        {
          title: "Large-Scale Residential Layout",
          description:
            "Fitting a 90 kW system on a residential roof required precise layout planning.",
        },
        {
          title: "Reliable, Long-Term Operation",
          description:
            "A system of this size needed components built for sustained, dependable performance.",
        },
      ],
    },
    solution: {
      heading: "90 kW. One of Our Biggest Homes.",
      intro: [
        "Solergy designed a 90 kW on-grid rooftop system, one of our largest residential installations, matched to the household's full daytime load.",
        "Our team handled layout, procurement, installation, electrical integration, testing, and net metering approval end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a substantial share of the household's daytime electricity consumption.",
        },
        {
          title: "Full Rooftop Utilisation",
          description:
            "Panels were laid out across the full available roof area to maximise generation.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Premium components selected for reliable operation at this scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "90 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~1,35,000 kWh" },
      { label: "Annual Savings", value: "~₹11.48 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 1,35,000 kWh of clean electricity every year, helping this Pushpanjali household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹11.48 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the household's electricity costs under control.",
      ],
      cumulativeSavings: "~₹2.37 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~1,35,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹11.48 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 3,
    seo: {
      title:
        "Pushpanjali Rooftop System, Delhi | 90 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 90 kW on-grid rooftop solar system for a home in Pushpanjali, Delhi.",
    },
  },
  {
    id: "res-paschim-vihar-delhi",
    title: "Paschim Vihar Rooftop System",
    category: "Residential",
    city: "Delhi",
    state: "Delhi",
    size: "10 kW",
    date: "June 2025",
    systemType: "On-Grid Solar",
    image: heroHouse,
    gallery: [heroHouse, service2, service3, service1, whySolergyHouse],
    description:
      "A right-sized on-grid rooftop system for a Paschim Vihar household looking to cut its daytime electricity costs.",
    story: [
      "A household in Paschim Vihar, Delhi wanted a straightforward system to bring down a steady electricity bill, without a large or complex rooftop project.",
      "We designed a 10 kW on-grid system, sized to the household's actual daytime usage, with installation completed in a couple of days.",
      "The family now covers a healthy share of its daytime consumption from the rooftop, with the rest banked through net metering.",
    ],
    specs: [
      { label: "System Size", value: "10 kW" },
      { label: "Panels Installed", value: "22 x 445W Mono PERC" },
      { label: "Inverter", value: "10 kW String Inverter" },
      { label: "Annual Generation", value: "~15,000 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹10,625" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Straightforward System for a Steady Bill.",
      paragraphs: [
        "This Paschim Vihar household had a steady electricity bill and wanted a simple, right-sized solar system.",
        "Solergy studied the household's daytime usage before sizing a 10 kW system matched to actual consumption.",
        "The result was a compact rooftop solar system built to comfortably cover the home's daytime electricity needs.",
      ],
    },
    challenge: {
      heading: "A Steady Bill, A Simple Ask.",
      intro: [
        "The household's electricity usage was steady, and the family wanted a system sized correctly without excess capacity.",
        "The installation also needed to be quick and low-disruption.",
      ],
      points: [
        {
          title: "Steady Daytime Usage",
          description:
            "A consistent daily consumption pattern meant the system needed to be sized accurately.",
        },
        {
          title: "A Simple, Fast Installation",
          description:
            "The family wanted the switch to solar completed quickly and without hassle.",
        },
        {
          title: "Reliable Long-Term Operation",
          description:
            "The system needed to run reliably with minimal ongoing maintenance.",
        },
      ],
    },
    solution: {
      heading: "10 kW. Right-Sized and Reliable.",
      intro: [
        "Solergy designed a 10 kW on-grid rooftop system sized to the household's actual daytime consumption.",
        "Our team completed layout, procurement, installation, electrical integration, testing, and net metering approval within a couple of days.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to comfortably cover the household's daytime electricity needs.",
        },
        {
          title: "Net-Metered Surplus",
          description:
            "Excess generation is banked through net metering for later use.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Reliable components chosen for years of low-maintenance operation.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "10 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~15,000 kWh" },
      { label: "Annual Savings", value: "~₹1.28 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 15,000 kWh of clean electricity every year, helping this Paschim Vihar household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹1.28 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the household's electricity costs under control.",
      ],
      cumulativeSavings: "~₹26.4 Lakhs+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~15,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹1.28 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 4,
    seo: {
      title:
        "Paschim Vihar Rooftop System, Delhi | 10 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 10 kW on-grid rooftop solar system for a home in Paschim Vihar, Delhi.",
    },
  },
  {
    id: "res-south-city-gurgaon",
    title: "South City 1 Rooftop System",
    category: "Residential",
    city: "Gurgaon",
    state: "Haryana",
    size: "10 kW",
    date: "July 2025",
    systemType: "On-Grid Solar",
    image: whySolergyHouse,
    gallery: [whySolergyHouse, service3, heroHouseNew, service2, service1],
    description:
      "A compact on-grid rooftop system for a South City 1 household looking to reduce monthly electricity costs.",
    story: [
      "A household in South City 1, Gurgaon wanted a reliable, right-sized solar system to lower a steady monthly electricity bill.",
      "We designed a 10 kW on-grid system laid out across the available roof area, with installation wrapped up in a couple of days.",
      "The household now generates a meaningful share of its daytime power needs on-site, with surplus banked through net metering.",
    ],
    specs: [
      { label: "System Size", value: "10 kW" },
      { label: "Panels Installed", value: "22 x 445W Mono PERC" },
      { label: "Inverter", value: "10 kW String Inverter" },
      { label: "Annual Generation", value: "~15,000 units" },
      { label: "Monthly Bill Savings", value: "Up to ₹10,625" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Reliable System for a Growing Suburb Home.",
      paragraphs: [
        "This South City 1 household wanted a dependable solar system to bring its monthly electricity costs under control.",
        "Solergy studied the household's daytime usage and roof area before sizing a 10 kW system matched to actual consumption.",
        "The result was a compact rooftop solar system built to reliably cover a meaningful share of the home's power needs.",
      ],
    },
    challenge: {
      heading: "A Steady Bill, A Reliable Fix.",
      intro: [
        "The household's electricity usage was steady, and the family wanted a dependable, correctly sized system.",
        "The installation also needed to be completed quickly, without disrupting the household.",
      ],
      points: [
        {
          title: "Steady Daytime Usage",
          description:
            "Consistent daily consumption meant the system needed to be sized accurately for real savings.",
        },
        {
          title: "A Quick, Clean Installation",
          description:
            "The family wanted the system up and running with minimal disruption.",
        },
        {
          title: "Long-Term Reliability",
          description:
            "The system needed to run dependably with minimal ongoing upkeep.",
        },
      ],
    },
    solution: {
      heading: "10 kW. Dependable From Day One.",
      intro: [
        "Solergy designed a 10 kW on-grid rooftop system sized to the household's actual daytime consumption.",
        "Our team handled layout, procurement, installation, electrical integration, testing, and net metering approval within a couple of days.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to reliably cover a meaningful share of the household's daytime electricity needs.",
        },
        {
          title: "Net-Metered Surplus",
          description:
            "Excess generation is banked through net metering for later use.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Reliable components chosen for years of low-maintenance operation.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "10 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~15,000 kWh" },
      { label: "Annual Savings", value: "~₹1.28 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 15,000 kWh of clean electricity every year, helping this South City 1 household reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹1.28 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and keeping the household's electricity costs under control.",
      ],
      cumulativeSavings: "~₹26.4 Lakhs+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~15,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹1.28 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 0,
    seo: {
      title:
        "South City 1 Rooftop System, Gurgaon | 10 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 10 kW on-grid rooftop solar system for a home in South City 1, Gurgaon.",
    },
  },
  {
    id: "ci-dharwad-shakunt-enterprises",
    title: "Shakunt Enterprises Rooftop Plant",
    category: "Commercial/Industrial",
    city: "Dharwad",
    state: "Karnataka",
    size: "900 kW",
    date: "January 2025",
    systemType: "On-Grid Solar",
    image: service1,
    gallery: [service1, heroHouseNew, service2, service3, whySolergyHouse],
    description:
      "A large-scale rooftop plant cutting daytime power costs for Shakunt Enterprises' Dharwad facility.",
    story: [
      "Shakunt Enterprises' Dharwad facility was facing steadily rising industrial power costs, driven by heavy daytime equipment load.",
      "We deployed a 900 kW rooftop plant across the facility's main shed, sequencing the installation to avoid disrupting production.",
      "Since commissioning, the plant has become a key part of the facility's effort to control operating costs and meet sustainability goals.",
    ],
    specs: [
      { label: "System Size", value: "900 kW" },
      { label: "Panels Installed", value: "2,023 x 445W Mono PERC" },
      { label: "Inverter", value: "900 kW Central Inverter" },
      { label: "Annual Generation", value: "~13,50,000 units" },
      { label: "Monthly Savings", value: "Up to ₹9.56 lakh" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Facility Built to Run on Its Own Power.",
      paragraphs: [
        "Shakunt Enterprises' Dharwad facility had heavy daytime equipment load and rising industrial power tariffs.",
        "Solergy studied the facility's process load, shed layout, and operating hours before designing a system around the plant — not simply around the available roof.",
        "The result was a 900 kW rooftop solar plant built to meaningfully offset the facility's daytime power draw.",
      ],
    },
    challenge: {
      heading: "Rising Tariffs, Round-the-Clock Operations.",
      intro: [
        "Heavy daytime equipment load meant electricity was a significant and growing operating cost.",
        "The installation also had to be sequenced carefully to avoid disrupting ongoing production.",
      ],
      points: [
        {
          title: "High Daytime Load",
          description:
            "Continuous equipment operation kept the facility's daytime power demand consistently high.",
        },
        {
          title: "Rising Industrial Tariffs",
          description:
            "Increasing commercial power costs were adding pressure to operating margins.",
        },
        {
          title: "Zero-Disruption Installation",
          description:
            "The rollout had to be phased to avoid interrupting day-to-day production.",
        },
      ],
    },
    solution: {
      heading: "900 kW. Engineered for the Plant.",
      intro: [
        "Solergy designed a 900 kW on-grid rooftop plant across the facility's main shed, engineered for continuous industrial load.",
        "Our team handled procurement, installation, electrical integration, testing, and commissioning end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a large share of the facility's continuous daytime power draw.",
        },
        {
          title: "Phased, Safe Installation",
          description:
            "The rollout was sequenced to keep production running throughout.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Industrial-grade components selected for reliable operation at full plant scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "900 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~13,50,000 kWh" },
      { label: "Annual Savings", value: "~₹1.15 Cr" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed plant now generates approximately 13,50,000 kWh of clean electricity every year, helping Shakunt Enterprises reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹1.15 Cr, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the plant can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹23.74 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~13,50,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹1.15 Cr",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 1,
    seo: {
      title:
        "Shakunt Enterprises Rooftop Plant, Dharwad | 900 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 900 kW on-grid rooftop solar plant for Shakunt Enterprises in Dharwad, Karnataka.",
    },
  },
  {
    id: "ci-bhopal-deepak-fasteners",
    title: "Deepak Fasteners Solar Plant",
    category: "Commercial/Industrial",
    city: "Bhopal",
    state: "Madhya Pradesh",
    size: "3 MW",
    date: "August 2024",
    systemType: "On-Grid Solar",
    image: service2,
    gallery: [service2, service1, heroHouse, service3, whySolergyHouse],
    description:
      "A 3 MW rooftop and shed-mounted solar plant built to significantly lower Deepak Fasteners' manufacturing power costs.",
    story: [
      "Deepak Fasteners' Bhopal manufacturing unit ran continuous process equipment through the day, driving some of the highest power costs on their books.",
      "We deployed a 3 MW solar plant across the facility's production sheds, coordinating closely with the plant's engineering team to keep operations running throughout the build.",
      "The plant is now one of our largest commissioned systems, offsetting a substantial share of the facility's daytime power draw.",
    ],
    specs: [
      { label: "System Size", value: "3 MW" },
      { label: "Panels Installed", value: "6,742 x 445W Mono PERC" },
      { label: "Inverter", value: "3 MW Central Inverter" },
      { label: "Annual Generation", value: "~45,00,000 units" },
      { label: "Monthly Savings", value: "Up to ₹31.88 lakh" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Manufacturing Unit Scaled Up to Match.",
      paragraphs: [
        "Deepak Fasteners' Bhopal unit ran continuous process equipment, with power costs climbing to match.",
        "Solergy studied the facility's load profile and shed layout before designing a plant at a scale that matched real consumption.",
        "The result was a 3 MW solar plant built to substantially offset the facility's daytime power draw.",
      ],
    },
    challenge: {
      heading: "Continuous Production, Continuous Costs.",
      intro: [
        "Round-the-clock process equipment kept power demand — and costs — consistently high.",
        "A plant at this scale needed careful phasing to avoid any disruption to manufacturing.",
      ],
      points: [
        {
          title: "High Continuous Load",
          description:
            "Continuous process equipment kept the facility's daytime power demand consistently high.",
        },
        {
          title: "Significant Operating Costs",
          description:
            "Rising industrial tariffs were adding real pressure to manufacturing margins.",
        },
        {
          title: "Large-Scale Phased Rollout",
          description:
            "A 3 MW installation required careful sequencing to keep production uninterrupted.",
        },
      ],
    },
    solution: {
      heading: "3 MW. Built for Continuous Production.",
      intro: [
        "Solergy designed a 3 MW on-grid solar plant across the facility's production sheds, engineered for continuous industrial loads.",
        "Our team coordinated procurement, installation, electrical integration, testing, and commissioning with the plant's engineering team throughout.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a substantial share of the facility's continuous daytime power draw.",
        },
        {
          title: "Coordinated, Phased Build",
          description:
            "The rollout was sequenced closely with the plant's engineering team to avoid disruption.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Industrial-grade components selected for reliable operation at full plant scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "3 MW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop & Shed-Mounted" },
      { label: "Annual Generation", value: "~45,00,000 kWh" },
      { label: "Annual Savings", value: "~₹3.83 Cr" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed plant now generates approximately 45,00,000 kWh of clean electricity every year, helping Deepak Fasteners reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹3.83 Cr, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the plant can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹79.13 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~45,00,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹3.83 Cr",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 2,
    seo: {
      title:
        "Deepak Fasteners Solar Plant, Bhopal | 3 MW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 3 MW on-grid solar plant for Deepak Fasteners in Bhopal, Madhya Pradesh.",
    },
  },
  {
    id: "ci-indore-ralson-tyres",
    title: "Ralson Tyres Solar Plant",
    category: "Commercial/Industrial",
    city: "Indore",
    state: "Madhya Pradesh",
    size: "4.5 MW",
    date: "October 2024",
    systemType: "On-Grid Solar",
    image: service3,
    gallery: [service3, heroHouseNew, service1, service2, whySolergyHouse],
    description:
      "One of our largest industrial installations — a 4.5 MW plant cutting production costs for Ralson Tyres' Indore facility.",
    story: [
      "Ralson Tyres' Indore manufacturing facility ran heavy, continuous machinery, putting it among the highest power consumers in our client base.",
      "We deployed a 4.5 MW solar plant across the facility's rooftops and shed structures — one of our largest installations — engineered specifically for heavy industrial load.",
      "The plant now offsets a major share of the facility's daytime power draw, significantly easing the pressure of industrial tariffs on production costs.",
    ],
    specs: [
      { label: "System Size", value: "4.5 MW" },
      { label: "Panels Installed", value: "10,112 x 445W Mono PERC" },
      { label: "Inverter", value: "4.5 MW Central Inverter" },
      { label: "Annual Generation", value: "~67,50,000 units" },
      { label: "Monthly Savings", value: "Up to ₹47.81 lakh" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "Heavy Industry, Matched by a Heavy-Duty Plant.",
      paragraphs: [
        "Ralson Tyres' Indore facility ran heavy, continuous manufacturing machinery, with power costs to match.",
        "Solergy studied the facility's load profile, rooftop and shed structures before engineering a plant built specifically for heavy industrial load.",
        "The result was a 4.5 MW solar plant — one of our largest installations — built to offset a major share of the facility's daytime power draw.",
      ],
    },
    challenge: {
      heading: "A Heavy Load Demanded a Heavy-Duty Response.",
      intro: [
        "Continuous, heavy manufacturing machinery kept power demand among the highest in our client base.",
        "A plant at this scale required careful engineering across multiple rooftop and shed structures.",
      ],
      points: [
        {
          title: "Very High Continuous Load",
          description:
            "Heavy manufacturing machinery kept daytime power demand consistently high around the clock.",
        },
        {
          title: "Significant Tariff Pressure",
          description:
            "Industrial power tariffs were placing real pressure on production costs.",
        },
        {
          title: "Multi-Structure Engineering",
          description:
            "The installation spanned multiple rooftop and shed structures requiring careful integration.",
        },
      ],
    },
    solution: {
      heading: "4.5 MW. Engineered for Heavy Industry.",
      intro: [
        "Solergy designed a 4.5 MW on-grid solar plant across the facility's rooftop and shed structures, engineered specifically for heavy industrial load.",
        "Our team managed procurement, installation, electrical integration, testing, and commissioning across the full site.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a major share of the facility's continuous daytime power draw.",
        },
        {
          title: "Multi-Structure Integration",
          description:
            "The plant was engineered across multiple rooftop and shed structures for maximum output.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Heavy-duty, industrial-grade components selected for reliable operation at full plant scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "4.5 MW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop & Shed-Mounted" },
      { label: "Annual Generation", value: "~67,50,000 kWh" },
      { label: "Annual Savings", value: "~₹5.74 Cr" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed plant now generates approximately 67,50,000 kWh of clean electricity every year, helping Ralson Tyres reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹5.74 Cr, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the plant can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹118.69 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~67,50,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹5.74 Cr",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 3,
    seo: {
      title:
        "Ralson Tyres Solar Plant, Indore | 4.5 MW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 4.5 MW on-grid solar plant for Ralson Tyres in Indore, Madhya Pradesh.",
    },
  },
  {
    id: "ci-sonipat-bonn-nutrients",
    title: "Bonn Nutrients Rooftop Plant",
    category: "Commercial/Industrial",
    city: "Sonipat",
    state: "Haryana",
    size: "800 kW",
    date: "December 2024",
    systemType: "On-Grid Solar",
    image: heroHouse,
    gallery: [heroHouse, service3, service2, whySolergyHouse, service1],
    description:
      "An 800 kW rooftop plant reducing daytime power costs for Bonn Nutrients' Sonipat production facility.",
    story: [
      "Bonn Nutrients' Sonipat facility ran continuous production equipment, with industrial power tariffs becoming a growing line item on their books.",
      "We deployed an 800 kW rooftop plant across the facility's shed roofs, phasing the installation to keep production running without interruption.",
      "The plant now offsets a significant share of the facility's daytime load, and has become part of the company's broader sustainability push.",
    ],
    specs: [
      { label: "System Size", value: "800 kW" },
      { label: "Panels Installed", value: "1,798 x 445W Mono PERC" },
      { label: "Inverter", value: "800 kW Central Inverter" },
      { label: "Annual Generation", value: "~12,00,000 units" },
      { label: "Monthly Savings", value: "Up to ₹8.5 lakh" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Production Line Built to Offset Its Own Costs.",
      paragraphs: [
        "Bonn Nutrients' Sonipat facility ran continuous production equipment, with industrial tariffs growing year over year.",
        "Solergy studied the facility's load profile and shed roof layout before designing a plant sized to the facility's real daytime draw.",
        "The result was an 800 kW rooftop solar plant built to significantly offset the facility's power costs.",
      ],
    },
    challenge: {
      heading: "Growing Tariffs on a Steady Production Line.",
      intro: [
        "Continuous production equipment kept daytime power demand consistently high.",
        "The installation needed to be phased carefully to keep production uninterrupted.",
      ],
      points: [
        {
          title: "Continuous Production Load",
          description:
            "Round-the-clock production equipment kept power demand consistently high.",
        },
        {
          title: "Growing Tariff Pressure",
          description:
            "Rising industrial power costs were becoming a larger line item for the business.",
        },
        {
          title: "Phased, Safe Installation",
          description:
            "The rollout had to be sequenced to avoid disrupting ongoing production.",
        },
      ],
    },
    solution: {
      heading: "800 kW. Phased Around Production.",
      intro: [
        "Solergy designed an 800 kW on-grid rooftop plant across the facility's shed roofs, phased to keep production running throughout.",
        "Our team handled procurement, installation, electrical integration, testing, and commissioning end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a significant share of the facility's continuous daytime power draw.",
        },
        {
          title: "Zero-Disruption Rollout",
          description:
            "The installation was phased carefully to keep the production line running throughout.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Industrial-grade components selected for reliable operation at full plant scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "800 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~12,00,000 kWh" },
      { label: "Annual Savings", value: "~₹1.02 Cr" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed plant now generates approximately 12,00,000 kWh of clean electricity every year, helping Bonn Nutrients reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹1.02 Cr, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the plant can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹21.1 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~12,00,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹1.02 Cr",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 4,
    seo: {
      title:
        "Bonn Nutrients Rooftop Plant, Sonipat | 800 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed an 800 kW on-grid rooftop solar plant for Bonn Nutrients in Sonipat, Haryana.",
    },
  },
  {
    id: "ci-ludhiana-garg-acrylics",
    title: "Garg Acrylics Solar Plant",
    category: "Commercial/Industrial",
    city: "Ludhiana",
    state: "Punjab",
    size: "8 MW",
    date: "September 2024",
    systemType: "On-Grid Solar",
    image: heroHouseNew,
    gallery: [heroHouseNew, service1, service3, service2, whySolergyHouse],
    description:
      "Our largest installation to date — an 8 MW solar plant engineered for Garg Acrylics' heavy industrial power demand in Ludhiana.",
    story: [
      "Garg Acrylics' Ludhiana manufacturing operation ran some of the heaviest continuous industrial load across our client base, with power costs to match.",
      "We engineered an 8 MW solar plant across the facility's extensive shed and rooftop structures — our largest project to date — built specifically to handle sustained heavy industrial draw.",
      "The plant is now a cornerstone of the facility's cost structure, offsetting a major share of its daytime power consumption.",
    ],
    specs: [
      { label: "System Size", value: "8 MW" },
      { label: "Panels Installed", value: "17,978 x 445W Mono PERC" },
      { label: "Inverter", value: "8 MW Central Inverter" },
      { label: "Annual Generation", value: "~1,20,00,000 units" },
      { label: "Monthly Savings", value: "Up to ₹85 lakh" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "Our Largest Plant, Built for Our Heaviest Load.",
      paragraphs: [
        "Garg Acrylics' Ludhiana facility ran some of the heaviest continuous industrial load in our client base.",
        "Solergy studied the facility's extensive shed and rooftop structures before engineering our largest solar plant to date, purpose-built for sustained heavy industrial draw.",
        "The result was an 8 MW solar plant built to offset a major share of the facility's daytime power consumption.",
      ],
    },
    challenge: {
      heading: "A Scale That Demanded Our Largest Response.",
      intro: [
        "Sustained, heavy industrial load meant power costs were among the highest in our client base.",
        "A plant at 8 MW scale required engineering across extensive shed and rooftop structures.",
      ],
      points: [
        {
          title: "Heaviest Continuous Load",
          description:
            "Sustained heavy manufacturing load kept daytime power demand consistently at its highest.",
        },
        {
          title: "Major Tariff Exposure",
          description:
            "Industrial power costs at this scale represented a major recurring operating expense.",
        },
        {
          title: "Large-Scale, Multi-Structure Build",
          description:
            "The installation spanned extensive shed and rooftop structures requiring careful engineering.",
        },
      ],
    },
    solution: {
      heading: "8 MW. Our Largest Plant to Date.",
      intro: [
        "Solergy engineered an 8 MW on-grid solar plant across the facility's shed and rooftop structures, purpose-built for sustained heavy industrial load.",
        "Our team managed procurement, installation, electrical integration, testing, and commissioning across the full site.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a major share of the facility's continuous daytime power draw.",
        },
        {
          title: "Large-Scale Integration",
          description:
            "The plant was engineered across extensive shed and rooftop structures for maximum output.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Heavy-duty, industrial-grade components selected for reliable operation at full plant scale.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "8 MW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop & Shed-Mounted" },
      { label: "Annual Generation", value: "~1,20,00,000 kWh" },
      { label: "Annual Savings", value: "~₹10.2 Cr" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed plant now generates approximately 1,20,00,000 kWh of clean electricity every year, helping Garg Acrylics reduce its dependence on conventional grid power.",
        "With an estimated annual saving of around ₹10.2 Cr, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the plant can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹211 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~1,20,00,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹10.2 Cr",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 0,
    seo: {
      title:
        "Garg Acrylics Solar Plant, Ludhiana | 8 MW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed an 8 MW on-grid solar plant for Garg Acrylics in Ludhiana, Punjab.",
    },
  },
  {
    id: "ci-vadodara-shakunt-enterprises",
    title: "Shakunt Enterprises Rooftop System",
    category: "Commercial/Industrial",
    city: "Vadodara",
    state: "Gujarat",
    size: "250 kW",
    date: "November 2024",
    systemType: "On-Grid Solar",
    image: service1,
    gallery: [service1, whySolergyHouse, service3, heroHouse, service2],
    description:
      "A 250 kW rooftop system cutting daytime power costs for Shakunt Enterprises' Vadodara facility.",
    story: [
      "Shakunt Enterprises' Vadodara facility wanted to replicate the success of their Dharwad installation, looking to bring down daytime power costs at this site too.",
      "We deployed a 250 kW rooftop system across the facility's available shed roof, completing the installation efficiently with minimal disruption.",
      "The system now offsets a meaningful share of the facility's daytime load, adding to the company's growing solar footprint.",
    ],
    specs: [
      { label: "System Size", value: "250 kW" },
      { label: "Panels Installed", value: "562 x 445W Mono PERC" },
      { label: "Inverter", value: "250 kW Central Inverter" },
      { label: "Annual Generation", value: "~3,75,000 units" },
      { label: "Monthly Savings", value: "Up to ₹2.66 lakh" },
      { label: "Estimated Payback", value: "~4.3 years" },
    ],
    overview: {
      heading: "A Second Site, A Growing Solar Footprint.",
      paragraphs: [
        "Shakunt Enterprises wanted to extend their solar investment to their Vadodara facility, following success at another site.",
        "Solergy studied the facility's load profile and shed roof layout before sizing a 250 kW system matched to actual daytime draw.",
        "The result was a rooftop solar system built to meaningfully offset the facility's daytime power costs.",
      ],
    },
    challenge: {
      heading: "Replicating Results at a New Site.",
      intro: [
        "The facility's daytime equipment load meant a correctly sized system could deliver real, measurable savings.",
        "The installation needed to be completed efficiently, without disrupting ongoing operations.",
      ],
      points: [
        {
          title: "Steady Daytime Load",
          description:
            "A consistent daytime equipment load meant a right-sized system would deliver meaningful savings.",
        },
        {
          title: "Efficient Rooftop Use",
          description:
            "The available shed roof needed to be used efficiently to maximise system output.",
        },
        {
          title: "Minimal-Disruption Installation",
          description:
            "The rollout needed to be completed without interrupting day-to-day operations.",
        },
      ],
    },
    solution: {
      heading: "250 kW. Efficient and Effective.",
      intro: [
        "Solergy designed a 250 kW on-grid rooftop system sized to the facility's actual daytime power draw.",
        "Our team handled procurement, installation, electrical integration, testing, and commissioning end to end.",
      ],
      points: [
        {
          title: "Daytime Generation",
          description:
            "Designed to offset a meaningful share of the facility's daytime electricity consumption.",
        },
        {
          title: "Efficient Rooftop Layout",
          description:
            "Panels were laid out to make the most of the available shed roof area.",
        },
        {
          title: "Long-Term Performance",
          description:
            "Components selected for reliable, long-term operation with minimal upkeep.",
        },
      ],
    },
    glance: [
      { label: "System Capacity", value: "250 kW" },
      { label: "System Type", value: "On-Grid" },
      { label: "Installation", value: "Rooftop" },
      { label: "Annual Generation", value: "~3,75,000 kWh" },
      { label: "Annual Savings", value: "~₹31.88 Lakhs" },
      { label: "Estimated Payback", value: "~4.3 Years" },
      { label: "System Life", value: "25+ Years" },
    ],
    impact: {
      paragraphs: [
        "The completed system now generates approximately 3,75,000 kWh of clean electricity every year, helping Shakunt Enterprises reduce its dependence on conventional grid power at this site.",
        "With an estimated annual saving of around ₹31.88 Lakhs, the installation is expected to recover its initial investment in approximately 4.3 years.",
        "Over its expected 25+ year operating life, the system can continue generating clean energy and supporting the facility's sustainability targets.",
      ],
      cumulativeSavings: "~₹6.59 Cr+ over 25 years",
      paybackYear: 4.3,
      stats: [
        {
          label: "Estimated clean energy generated every year.",
          value: "~3,75,000 kWh",
        },
        {
          label: "Estimated annual electricity savings.",
          value: "~₹31.88 Lakhs",
        },
        { label: "Estimated investment payback period.", value: "~4.3 Years" },
        { label: "Expected useful system life.", value: "25+ Years" },
      ],
    },
    testimonialIndex: 1,
    seo: {
      title:
        "Shakunt Enterprises Rooftop System, Vadodara | 250 kW Solar Project | Solergy India",
      description:
        "See how Solergy India designed and installed a 250 kW on-grid rooftop solar system for Shakunt Enterprises in Vadodara, Gujarat.",
    },
  },
];

export const FEATURED_PROJECT_IDS = [
  "res-pushpanjali-delhi",
  "ci-ludhiana-garg-acrylics",
  "res-janpath-ludhiana",
];

export function getAllProjects(): typeof PROJECTS {
  return PROJECTS;
}

export function getProjectById(id: string) {
  return PROJECTS.find((project) => project.id === id);
}

export default PROJECTS;

