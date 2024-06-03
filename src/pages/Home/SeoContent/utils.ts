const tabTitle = ["Top attractions", "Top destinations", "Top countries to visit", "Top attraction categories"];

const topAttractionTitle = [
  "Kaikoura whale watching",
  "white water rafting rotorua",
  "koala sanctuary brisbane",
  "camira whitsundays",
  "whitsundays tour",
  "franz josef heli hike",
  "noosa everglades",
  "moreton island day trip",
  "skydiving taupo",
  "avatar whitsundays",
  "ocean rafting airlie beach",
  "doubtful sound cruise",
  "hot air balloon hunter valley",
  "te anau glowworm caves",
  "cairns tours",
  "airlie beach skydive",
];

const topAttractionLink = [
  "/new-zealand/kaikoura/whale-watching-tour-kaikoura",
  "/new-zealand/rotorua/rotorua-rafting",
  "/australia/brisbane/koala-sanctuary-day-tour",
  "/australia/airlie-beach-whitsundays/camira-day-sailing-adventure",
  "/australia/airlie-beach-whitsundays",
  "/new-zealand/franz-josef/franz-josef-glacier-heli-hike",
  "/australia/noosa/noosa-everglades-serenity-cruise",
  "/australia/brisbane/1-day-moreton-island-tour-from-brisbane",
  "/new-zealand/taupo/skydiving",
  "/australia/airlie-beach-whitsundays/avatar-whitsundays-charter",
  "/australia/airlie-beach-whitsundays/airlie-beach-ocean-rafting",
  "/new-zealand/fiordland/doubtful-sound-cruise",
  "/australia/hunter-valley/hunter-valley-sunrise-hot-air-balloon-flight",
  "/new-zealand/te-anau/te-anau-glowworm-caves",
  "/australia/cairns",
  "/australia/airlie-beach/skydive-airlie-beach-discount",
];

const topAttractionLinks = [];
for (let i = 0; i < topAttractionTitle.length; i++) {
  topAttractionLinks.push({
    id: i,
    title: topAttractionTitle[i],
    href: topAttractionLink[i],
  });
}

const topDestinationLinks = [];
const topCountriesLinks = [];
const topAttractionCategoriesLinks = [];

const tabs = [];
for (let i = 0; i < tabTitle.length; i++) {
  const hrefs = [];

  switch (tabTitle[i]) {
    case "Top attractions":
      hrefs.push(...topAttractionLinks);
      break;
    case "Top destinations":
      hrefs.push(...topDestinationLinks);
      break;
    case "Top countries to visit":
      hrefs.push(...topCountriesLinks);
      break;
    case "Top attraction categories":
      hrefs.push(...topAttractionCategoriesLinks);
      break;
    default:
      break;
  }

  tabs.push({
    id: i,
    title: tabTitle[i],
    hrefs,
  });
}

export default tabs;
