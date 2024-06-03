const countriesList = ["Australia", "New Zealand"];
const regionAustralia = [
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];
const regionNewZealand = ["North Island", "South Island"];
const placeNewSouthWales = [
  "Sydney",
  "Byron Bay",
  "Hunter Valley",
  "Blue Mountains",
  "Newcastle",
  "Port Stephens",
  "Canberra",
  "Jervis Bay",
  "Tweed Heads",
];
const placeNorthenTerriroty = [
  "Uluru",
  "Darwin",
  "Ayers Rock",
  "Alice Springs",
  "Kakadu",
  "Litchfield",
  "Katherine",
];
const placeQueenland = [
  "Airlie Beach Whitsundays",
  "Cairns",
  "Fraser Island",
  "Brisbane",
  "Gold Coast",
  "Great Barrier Reef",
  "Port Douglas",
  "Hervey Bay",
  "Mooloolaba",
  "Noosa",
  "Rainbow Beach",
  "Hamilton Island",
  "Kuranda",
  "Cape Tribulation",
  "Mission Beach",
  "Magnetic Island",
];
const placeSouthAustralia = [
  "Kangaroo Island",
  "Barossa Valley",
  "Adelaide",
  "Vivonne Bay",
  "Kingscote",
  "McLaren Vale",
  "Port Lincoln",
];
const placeTasmania = [
  "Tasmania",
  "Hobart",
  "Coles Bay",
  "Bruny Island",
  "Port Arthur",
  "Launceston",
];
const placeVictoria = [
  "Melbourne",
  "Great Ocean Road",
  "Phillip Island",
  "Yarra Valley",
  "Mornington Peninsula",
  "Sorrento",
];
const placeWestAustralia = [
  "Exmouth",
  "Broome",
  "Perth",
  "Margaret River",
  "Kimberley",
  "Rottnest Island",
  "Coral Bay",
  "Cable Beach",
  "Fremantle",
  "Augusta",
  "Albany",
];
const placeNorthIsland = [
  "Rotorua",
  "Auckland",
  "Waitomo",
  "Taupo",
  "Waiheke Island",
  "Bay of Islands",
  "Paihia",
  "Coromandel",
  "Napier",
  "Tauranga",
  "Wellington",
];
const placeSouthIsland = [
  "Queenstown",
  "Milford Sound",
  "Franz Josef",
  "Mount Cook",
  "Fox Glacier",
  "Te Anau",
  "Wanaka",
  "Kaikoura",
  "Akaroa",
  "Christchurch",
  "Abel Tasman",
];

const placeOfAutsralia = [
  placeNewSouthWales,
  placeNorthenTerriroty,
  placeQueenland,
  placeSouthAustralia,
  placeTasmania,
  placeVictoria,
  placeWestAustralia,
];
const placeOfNewZealand = [placeNorthIsland, placeSouthIsland];
const countriesListMenu = [];

for (let i = 0; i < countriesList.length; i++) {
  const countryObject = {
    id: i + 1,
    country: countriesList[i],
    url: "/" + countriesList[i].toLowerCase().replace(" ", "-"),
    clicked: countriesList[i].replace(" ", "") + "Click",
    cities: [],
  };

  if (countriesList[i] === "Australia") {
    for (let j = 0; j < regionAustralia.length; j++) {
      const regionObject = {
        id: j + 1,
        region: regionAustralia[j],
        clicked: regionAustralia[j].replace(" ", "") + "Click",
        placeList: [],
      };

      for (let k = 0; k < placeOfAutsralia[j].length; k++) {
        const placeObject = {
          id: k + 1,
          place: placeOfAutsralia[j][k],
          url: "/" + placeOfAutsralia[j][k].replace(/\s+/g, "-").toLowerCase(),
        };

        regionObject.placeList.push(placeObject);
      }

      countryObject.cities.push(regionObject);
    }

    countriesListMenu.push(countryObject);
  }

  if (countriesList[i] === "New Zealand") {
    for (let j = 0; j < regionNewZealand.length; j++) {
      const regionObject = {
        id: j + 1,
        region: regionNewZealand[j],
        clicked: regionNewZealand[j].replace(" ", "") + "Click",
        placeList: [],
      };

      for (let k = 0; k < placeOfNewZealand[j].length; k++) {
        if (placeOfNewZealand[j][k] === "Mount Cook") {
          const placeObject = {
            id: k + 1,
            place: placeOfNewZealand[j][k],
            url:
              "/" + placeOfNewZealand[j][k].replace(/\s+/g, "").toLowerCase(),
          };
          regionObject.placeList.push(placeObject);
        } else {
          const placeObject = {
            id: k + 1,
            place: placeOfNewZealand[j][k],
            url:
              "/" + placeOfNewZealand[j][k].replace(/\s+/g, "-").toLowerCase(),
          };

          regionObject.placeList.push(placeObject);
        }
      }

      countryObject.cities.push(regionObject);
    }

    countriesListMenu.push(countryObject);
  }
}

export default countriesListMenu;
