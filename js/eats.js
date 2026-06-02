/* ============================================================
   Kandy & the Hill Country — where we eat
   A shortlist of TripAdvisor-loved spots, mapped to the trip's
   meal moments. main.js renders these into #eatCards.

   option: {
     id, name, kind (controls tag colour), vibe (tag label),
     cuisine, tier:'£|££|£££', area, meal (when on the trip),
     why, url (TripAdvisor), splurge?:true
   }
   ============================================================ */
window.EATS = {
  note: 'A few TripAdvisor favourites, lined up with the meals in the plan — ' +
        'from cheap-and-local to one proper blow-out on the last night.',
  options: [
    {
      id: 'slightlychilled', name: 'Slightly Chilled Lounge', kind: 'rooftop', vibe: 'Rooftop',
      cuisine: 'Chinese & Western', tier: '££', area: 'Above the lake', meal: 'Welcome-night sundowners',
      why: 'Rooftop terrace with lake and city views — the spot for a first-night drink as the fruit bats stream out at dusk.',
      url: 'https://www.tripadvisor.com/Search?q=Slightly%20Chilled%20Kandy'
    },
    {
      id: 'empire', name: 'The Empire Cafe', kind: 'cafe', vibe: 'Café',
      cuisine: 'Sri Lankan & Western café', tier: '££', area: 'By the Temple of the Tooth', meal: 'Easy lunch or coffee',
      why: 'A relaxed all-day cafe right by the temple — curries, pastas, salads and good coffee. Ideal for a midday breather (4.7★, top-10 in Kandy).',
      url: 'https://www.tripadvisor.com/Restaurant_Review-g304138-d25284755-Reviews-The_Empire_Cafe-Kandy_Kandy_District_Central_Province.html'
    },
    {
      id: 'muslimhotel', name: 'Kandyan Muslim Hotel', kind: 'local', vibe: 'Local',
      cuisine: 'Sri Lankan Muslim', tier: '£', area: 'Town centre', meal: 'Cheap & local',
      why: 'A bustling local institution — koththu roti, plate-sized naan and properly spicy curries. Cheap, busy and the real thing.',
      url: 'https://www.tripadvisor.com/Search?q=Kandyan%20Muslim%20Hotel%20Kandy'
    },
    {
      id: 'ricecurry', name: 'Kandyan Rice and Curry', kind: 'experience', vibe: 'Experience',
      cuisine: 'Home-style rice & curry', tier: '££', area: 'Polgolla · ~10 min', meal: 'A hands-on dinner',
      why: 'A family cooks seven different curries with you over a traditional clay oven, by the Polgolla Dam — a meal and an evening rolled into one.',
      url: 'https://www.tripadvisor.com/Restaurant_Review-g304138-d15838578-Reviews-Kandyan_Rice_and_Curry-Kandy_Kandy_District_Central_Province.html'
    },
    {
      id: 'theva', name: 'Theva Cuisine', kind: 'fine', vibe: 'Fine dining', splurge: true,
      cuisine: 'Sri Lankan & European fusion', tier: '£££', area: 'Hantana hills', meal: 'Final-night feast',
      why: 'Kandy’s standout fine dining, with panoramic mountain views — save this one for the last celebratory dinner.',
      url: 'https://www.tripadvisor.com/Search?q=Theva%20Cuisine%20Kandy'
    },
    {
      id: 'thecrab', name: 'The Crab Seafood Restaurant', kind: 'coast', vibe: 'Coast',
      cuisine: 'Fresh seafood', tier: '££', area: 'Negombo · Day 5', meal: 'The send-off',
      why: 'Lagoon-side seafood on the coast — grilled fish, prawns and whole crab picked fresh from the market. A fitting last supper before the airport.',
      url: 'https://www.tripadvisor.com/Search?q=The%20Crab%20Seafood%20Restaurant%20Negombo'
    }
  ]
};
