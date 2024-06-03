import icnCall from "./icons/icn-phone.svg";
import icnEmail from "./icons/icn-mail.svg";
import icnWhatsapp from "./icons/icn-message-circle.svg";
import icnAustraliaTours from "./icons/icn-australia-tours.svg";
import icnNewZealandTours from "./icons/icn-new-zealand-tours.svg";
import logoSpaceShips from "./icons/logo-spaceships.svg";
import logoEastCoastCarRental from "./icons/logo-eastcoast-car-rentals.svg";
import logoJucy from "./icons/logo-jucy.svg";
import logoTravellersAdventure from "./icons/logo-travellers-adventure.svg";
import logoBritz from "./icons/logo-britz.svg";
import logoApollo from "./icons/logo-apollo.svg";
import icnTag from "./icons/icn-tag.svg";
import icnDelivery from "./icons/icn-delivery.svg";
import icnHeadset from "./icons/icn-headset.svg";
import icnHotSale from "./icons/icn-hot-sale.svg";
import icnDollar from "./icons/icn-dollar.svg";
import icnSwitzerland from "./icons/icn-switzerland.svg";
import icnGermany from "./icons/icn-germany.svg";
import icnFrance from "./icons/icn-france.svg";
import icnJapan from "./icons/icn-japan.svg";
import icnItaly from "./icons/icn-italy.svg";
import icnChina from "./icons/icn-china.svg";
import icnAustraliaMap from "./icons/autralia-map.svg";
import icnNewZealandMap from "./icons/new-zealand-map.svg";
import icnAustraliaMapTravello from "./icons/autralia-map-blue.svg";
import icnNewZealandMapTravello from "./icons/new-zealand-map-blue.svg";

export const CAMPERVAN_HIRE_URL = "/campervan-hire";

export const navigationLinksMiddle = [
  {
    id: 1,
    link: "tel:1300358071",
    icon: icnCall.src,
    text: "Call Now",
  },
  {
    id: 2,

    link: "mailto:support@backpackerdeals.com",
    icon: icnEmail.src,
    text: "Email Us",
  },
  {
    id: 3,

    link: "https://wa.me/61414145966",
    icon: icnWhatsapp.src,
    text: "WhatsApp",
  },
];

export const navigationLinksRight = [
  {
    id: 1,

    link: "/australia",
    icon: icnAustraliaTours.src,
    text: "Australia Tours",
  },
  {
    id: 2,

    link: "/new-zealand",
    icon: icnNewZealandTours.src,
    text: "New Zealand Tours",
  },
];

export const partnerDatas = [
  {
    id: 1,

    logo: logoSpaceShips,
    alt: "Spaceships",
  },
  {
    id: 2,

    logo: logoJucy,
    alt: "Jucy",
  },
  {
    id: 3,

    logo: logoTravellersAdventure,
    alt: "Travellers Autobarn",
  },
  {
    id: 4,

    logo: logoBritz,
    alt: "Britz",
  },
  {
    id: 5,

    logo: logoApollo,
    alt: "Apollo",
  },
];

//* Reusing existing data from `partnerDatas` without the spaceship
export const partnerDataCarRental = [
  {
    id: 1,
    logo: logoEastCoastCarRental,
    alt: "East Coast Car Rentals",
  },
  ...partnerDatas.filter(({ id, alt }) => id !== 1 && alt !== "Spaceships"),
];

export const whyBookWithUsDatas = [
  {
    id: 1,
    icon: icnTag.src,
    title: "$50 Experience Voucher",
    description: "Get a $50 experience voucher when you book",
    display: "block",
  },
  {
    id: 2,
    icon: icnDelivery.src,
    title: "Instant Confirmation",
    description: "Enjoy live availability with [channel]",
    display: "block",
  },
  {
    id: 3,
    icon: icnHeadset.src,
    title: "5 Star support",
    description: "Travel Experts available 7 days a week",
    display: "block",
  },
  {
    id: 4,
    icon: icnHotSale.src,
    title: "Best price guarantee",
    description: "Get the best price on your campervan",
    display: "none",
  },
  {
    id: 5,
    icon: icnDollar.src,
    title: "Exclusive Deals",
    description: "Value for your money with exclusive prices",
    display: "block",
  },
];

export const countryDatas = [
  {
    id: 1,
    name: "Switzerland",
    flag: icnSwitzerland.src,
  },
  {
    id: 2,
    name: "Germany",
    flag: icnGermany.src,
  },
  {
    id: 3,
    name: "France",
    flag: icnFrance.src,
  },
  {
    id: 4,
    name: "Japan",
    flag: icnJapan.src,
  },
  {
    id: 5,
    name: "Italy",
    flag: icnItaly.src,
  },
  {
    id: 6,
    name: "China",
    flag: icnChina.src,
  },
];

export const experienceList = [
  {
    id: 1,
    label: `Dive into the turquoise waters of the <a href="/australia/great-barrier-reef" target="_blank" rel="noopener noreferrer">Great Barrier Reef</a>.`,
  },
  {
    id: 2,
    label: `Conquer the peaks of <a href="new-zealand/fox-glacier" target="_blank" rel="noopener noreferrer">New Zealand’s Southern Alps</a>.`,
  },
  {
    id: 3,
    label: `Cruise along the <a href="/australia/sydney" target="_blank" rel="noopener noreferrer">Sydney Harbour</a> and catch glimpses of the Opera House and Harbour Bridge.`,
  },
  {
    id: 4,
    label: `Indulge in the <a href="/wine-tasting" target="_blank" rel="noopener noreferrer">world - renowned wineries</a> of both countries, sampling exquisite vintages that capture the essence of the regions.`,
  },
  {
    id: 5,
    label: `Immerse yourself in the rich Maori and Aboriginal cultures, as <a href="/cultural-tours" target="_blank" rel="noopener noreferrer">guided experiences</a> unveil ancient stories and traditions.`,
  },
  {
    id: 6,
    label: `Embark on a <a href="/kayaking" target="_blank" rel="noopener noreferrer">kayaking adventure</a> through pristine fjords, serene lakes, and winding rivers.`,
  },
];

export const experienceImageList = [
  {
    id: 1,
    image: "https://assets.backpackerdeals.com/uploads/content/voucher-01.jpg",
    alt: "Voucher 1",
  },
  {
    id: 2,
    image: "https://assets.backpackerdeals.com/uploads/content/voucher-02.jpg",
    alt: "Voucher 2",
  },
  {
    id: 3,
    image: "https://assets.backpackerdeals.com/uploads/content/voucher-03.jpg",
    alt: "Voucher 3",
  },
  {
    id: 4,
    image: "https://assets.backpackerdeals.com/uploads/content/voucher-04.jpg",
    alt: "Voucher 4",
  },
];

export const popularRoadTripDatas = [
  {
    id: 1,
    country: "Australia",
    channel: [
      {
        id: 1,
        name: "backpackerdeals",
        map: icnAustraliaMap.src,
      },
      {
        id: 2,
        name: "travello",
        map: icnAustraliaMapTravello.src,
      },
    ],
    destinations: [
      {
        id: 1,
        destination: "Cairns to Sydney",
        description:
          "This route is one of the most well-travelled in Australia. Embrace the coastal lifestyle and experience world-class beaches.",
        link: "https://drive.google.com/file/d/1PvSicMU2Ls8pyI09g0B3PFNfcKJVjFW_/view?usp=sharing",
      },
      {
        id: 2,
        destination: "Melbourne to Airlie Beach",
        description:
          "For those passionate about exploring the cultural center of Australia before witnessing the Great Barrier Reef.",
        link: "https://drive.google.com/file/d/1sul5PIcorrHuYhOHaAjlZIMovhbTttTH/view?usp=sharing",
      },
      {
        id: 3,
        destination: "Darwin to Darwin",
        description: "Discover Uluru, debatably Australia's most famous landmark.",
        link: "https://drive.google.com/file/d/1HeMAEFZyEWPRPU43TaeMZXGnzhffsjKO/view?usp=sharing",
      },
      {
        id: 4,
        destination: "Perth to Broome",
        description:
          "Discover incredible beaches further off the beaten track, and some incredible Australian animals.",
        link: "https://drive.google.com/file/d/1kYpTqrXBIbewURCFkbjDnpaMRsR2vrxu/view?usp=sharing",
      },
      {
        id: 5,
        destination: "Hobart to Hobart",
        description:
          "Tasmania is a place of rugged but stunning terrain. If you are a nature lover who would like to go hiking and spot Australian wildlife, this road trip would be perfect.",
        link: "https://drive.google.com/file/d/1vQ-7hccoNOLfFOhrIJP7qwXDFk2YR_w1/view?usp=sharing",
      },
    ],
  },
  {
    id: 2,
    country: "New Zealand",
    channel: [
      {
        id: 1,
        name: "backpackerdeals",
        map: icnNewZealandMap.src,
      },
      {
        id: 2,
        name: "travello",
        map: icnNewZealandMapTravello.src,
      },
    ],
    destinations: [
      {
        id: 1,
        destination: "Queenstown to Christchurch",
        description:
          "On this 21 hour road trip you will start in the adrenaline capital of the world! From there discover the famous Franz Josef Glacier. Explore the Milford Sound and pass through quaint towns.",
        link: "https://drive.google.com/file/d/1xR0dwoKoVW5sFASEBOg5lc67EKWchdvd/view?usp=sharing",
      },
      {
        id: 2,
        destination: "Queenstown to Franz Josef Glacier to Queenstown",
        description:
          "This road trip is shorter, around 10 hours of driving. Which is perfect to discover Queenstown and the Franz Josef Glacier as well as Fox Glacier.",
        link: "https://drive.google.com/file/d/1exezTOi_KlQcYlpdHUDZ2Sa0c-WxJ9CV/view?usp=sharing",
      },
      {
        id: 3,
        destination: "Auckland to Auckland",
        description:
          "This is an action packed road trip in the North island of New Zealand. Only 9 hours long but with plenty to explore along the way! Check out the Hobbiton movie set in Matamata and the glow worm caves in Waitomo.",
        link: "https://drive.google.com/file/d/13QtdmhMxv32lUGwfgleLpmGLOq-6xniu/view?usp=sharing",
      },
    ],
  },
];

export const accordionFaqDatas = [
  {
    id: "what-is-a-campervan",
    question: "What is a campervan?",
    answer:
      "A campervan is a self-contained vehicle that combines transportation and accommodation. It typically includes sleeping quarters, a small kitchenette, and sometimes bathroom facilities. It allows you to travel and camp in one vehicle.",
  },
  {
    id: "what-is-a-motorhome",
    question: "What is a motorhome?",
    answer:
      "A motorhome is more like a recreational vehicle (RV). It is larger and more spacious compared to a campervan. Motorhomes are built on a truck or bus chassis and usually have a separate driving compartment or cab. They offer various amenities and features such as a sleeping area, kitchenette, dining area, bathroom facilities, and storage space.",
  },
  {
    id: "what-is-a-4wd-camper",
    question: "What is a 4WD Camper?",
    answer:
      "A 4WD camper is designed for off-road travel and camping adventures. It combines the capabilities of a 4WD vehicle with the convenience of a camper. A 4WD camper is equipped with a four-wheel drive system, allowing it to navigate challenging terrains, such as dirt roads, gravel tracks, and uneven surfaces.",
  },
  {
    id: "what-are-the-benefits-of-hiring-a-campervan-motorhome-or-4wd-camper",
    question: "What are the benefits of hiring a campervan, motorhome or 4WD camper?",
    answer:
      "Some benefits of hiring a campervan include flexibility in travel plans, the ability to explore various destinations at your own pace, cost-effectiveness by combining transportation and accommodation, and the opportunity to experience the freedom of camping in different locations around Australia and New Zealand!",
  },
  {
    id: "what-are-the-different-types-of-campervans-motorhomes-and-4wd-campers",
    question: "What discounts can I get when hiring a campervan, motorhome or 4WD camper?",
    answer:
      "Our offerings are already heavily discounted, which means we do not use cashback & discount codes, nor do you earn cashback from booking a campervan, motorhome or 4WD camper. However, as a thank you, we do offer you a $50 experience voucher* if you book a campervan through us!    ",
  },
  {
    id: "what-discounts-can-i-get-when-hiring-a-campervan-motorhome-or-4wd-camper",
    question: "The Backpacker Deals Bonus",
    answer: `Each campervan rental company, and each van, is slightly different. When you book your van you will receive detailed information from the operator on how to use your van and it's facilities, such as the Crib guide from Jucy. Alternatively, for a quick summary, check out Cruisin' YouTube page <a href="https://www.youtube.com/@CruisinMotorhomes" target="_blank" rel="noopener noreferrer">https://www.youtube.com/@CruisinMotorhomes</a> .`,
  },
];

export const roadTripPlanDatas = [
  {
    id: 1,
    country: "Australia",
    blogs: [
      {
        id: 1,
        title: "Melbourne to Brisbane Road Trip Itinerary",
        author: "Helen Wright",
        date: "Apr 5, 2023",
        url: "https://www.backpackerdeals.com/blog/melbourne-brisbane-roadtrip-itinerary",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2018/06/martin-kallur-ig-mkallur-l4m_o4aFOn8-unsplash-1.jpg",
        avatar: "",
      },
      {
        id: 2,
        title: "Your Guide to Campervan Hire in Tasmania",
        author: "Chyna Hayden",
        date: "Oct 25, 2023",
        url: "https://www.backpackerdeals.com/blog/campervan-hire-tasmania-guide/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/10/Screen-Shot-2023-10-25-at-12.39.26-pm.png",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
      {
        id: 3,
        title: "Exclusive Australia Campervan Hire Deal",
        author: "Chyna Hayden",
        date: "Oct 18, 2023",
        url: "https://www.backpackerdeals.com/blog/explore-australia-campervan-hire-deal/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/10/Screen-Shot-2023-10-11-at-3.23.53-pm.png",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
      {
        id: 4,
        title: "Queensland's Best Camping Spots",
        author: "Chyna Hayden",
        date: "Oct 9, 2023",
        url: "https://www.backpackerdeals.com/blog/qld-best-national-parks-for-camping/",
        image: "https://www.backpackerdeals.com/blog/wp-content/uploads/2018/08/Pyndan-Camel-Tracks.jpg",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
      {
        id: 5,
        title: "Sydney to Cairns Road Trip Itinerary | East Coast Reefs and Beaches Tour",
        author: "Chyna Hayden",
        date: "Sep 23, 2023",
        url: "https://www.backpackerdeals.com/blog/east-coast-itinerary/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/09/Screen-Shot-2023-09-29-at-2.29.51-pm-1-1024x685.png",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
    ],
  },
  {
    id: 2,
    country: "New Zealand",
    blogs: [
      {
        id: 1,
        title: "Christchurch to Nelson Road Trip",
        author: "Chyna Hayden",
        date: "Sep 17, 2023",
        url: "https://www.backpackerdeals.com/blog/christchurch-to-nelson-itinerary/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/10/Screen-Shot-2023-10-02-at-7.48.40-pm.png",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
      {
        id: 2,
        title: "Campervan Hire in Australia and New Zealand: Your Ultimate Guide",
        author: "Chyna Hayden",
        date: "Sep 11, 2023",
        url: "https://www.backpackerdeals.com/blog/campervan-hire-in-australia-and-new-zealand/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/09/Screen-Shot-2023-09-11-at-3.16.38-pm.png",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
      {
        id: 3,
        title: "Unleash Your Adventurous Spirit: Explore New Zealand with a Campervan",
        author: "Stella Teys",
        date: "Jul 23, 2023",
        url: "https://www.backpackerdeals.com/blog/unleash-your-adventurous-spirit-explore-new-zealand-with-a-campervan/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/09/B97AD5D7-450D-4A92-B20B-527853F6C237_1_105_c.jpeg",
        avatar:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/nsl_avatars/5ce8ba3fc79fd05c0ecb0f2d5506ddea.png",
      },
      {
        id: 4,
        title: "Central New Zealand Itinerary: 6 Days",
        author: "Chyna Hayden",
        date: "Jul 16, 2023",
        url: "https://www.backpackerdeals.com/blog/central-nz-itinerary/",
        image:
          "https://www.backpackerdeals.com/blog/wp-content/uploads/2023/10/Screen-Shot-2023-10-02-at-11.29.34-pm-1024x579.png",
        avatar: "https://secure.gravatar.com/avatar/852c8da69b46678de105ec1589d8449e?s=120&d=mm&r=g",
      },
    ],
  },
];

export interface WidgetRoaverProps {
  src: string;
}

export const instagramContents = [
  {
    id: 1,
    src: "https://www.instagram.com/p/CyveXNWspRA/",
    alt: "our sign to visit the Great Barrier Reef",
    img: "https://assets.backpackerdeals.com/uploads/content/instagram-01.jpg",
  },
  {
    id: 2,
    src: "https://www.instagram.com/p/Cy2lVmgssMM/",
    alt: "Unreal experience",
    img: "https://assets.backpackerdeals.com/uploads/content/instagram-02.jpg",
  },
  {
    id: 3,
    src: "https://www.instagram.com/reel/CtLidcBAxf2/?hl=en",
    alt: "Would you spend the day exploring Moreton Island? ",
    img: "https://assets.backpackerdeals.com/uploads/content/instagram-03.jpg",
  },
  {
    id: 4,
    src: "https://www.instagram.com/reel/Cv6lhlRAm3-/",
    alt: "the Sydney Harbour like never before!",
    img: "https://assets.backpackerdeals.com/uploads/content/instagram-04.jpg",
  },
  {
    id: 5,
    src: "https://www.instagram.com/reel/Cs73BCMgKgB/",
    alt: "Can’t make it to Europe? Why not try the Atlantic Clipper",
    img: "https://assets.backpackerdeals.com/uploads/content/instagram-05.jpg",
  },
];

export type PartnersProps = {
  isCarRental?: boolean;
};
