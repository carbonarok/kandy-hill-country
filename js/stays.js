/* ============================================================
   Kandy & the Hill Country — accommodation options
   Edit here to change any stay. main.js renders the cards and
   drops a pin per option onto the #staymap (plus the reference
   points below). All coords are real (OpenStreetMap geocoded);
   prices are INDICATIVE — confirm live on Booking for the dates.

   option: {
     id, name, host, url, kind:'central'|'quieter', tier:'£|££|£££',
     coords:[lat,lng], within:true|false (inside the £500–900 target),
     price, priceNote, capacity, drive, lean, type,
     pros:[...], cons:[...]
   }
   ============================================================ */
window.STAYS = {
  budgetNote: 'Target ~£500–900 for the whole group of 6 · 4 nights (2–6 Nov) — roughly £85–150 each, ' +
              'with a little wiggle room. Totals below are estimates from current rates; every link opens ' +
              'on our exact dates so you can check the live price.',
  center: [7.2880, 80.6395],
  zoom: 14,

  refs: [
    { name: 'Temple of the Tooth', coords: [7.2936, 80.6413] },
    { name: 'Kandy Lake',          coords: [7.2895, 80.6420] },
    { name: 'Kandy town & station',coords: [7.2906, 80.6337] }
  ],

  options: [
    {
      id: 'mcleod', name: 'McLeod Inn', host: 'Booking.com',
      url: 'https://www.booking.com/hotel/lk/mcleod-inn.html?checkin=2026-11-02&checkout=2026-11-06&group_adults=6&no_rooms=3&group_children=0',
      kind: 'central', tier: '£', within: true, coords: [7.2872461, 80.6427823],
      nightly: 78,
      type: 'Budget homestay rooms', capacity: '6 in ≈3 rooms · 4 nights',
      price: '~£260–360 for the group', perPerson: '≈ £45–60pp', priceNote: 'the cheapest of the lot',
      drive: '~5 min · walkable', lean: 'Cheapest',
      pros: ['Famous elevated city & lake views', 'Friendly, long-running homestay', 'Central — straight down to the lake'],
      cons: ['Basic, no-frills rooms', 'A walk uphill back from town']
    },
    {
      id: 'lakewood', name: 'Lakewood Residence', host: 'Booking.com',
      url: 'https://www.booking.com/hotel/lk/lakewood-residence.html?checkin=2026-11-02&checkout=2026-11-06&group_adults=6&no_rooms=3&group_children=0',
      kind: 'central', tier: '££', within: true, coords: [7.2893897, 80.6375658],
      nightly: 130,
      type: '4★ rooms · swimming pool', capacity: '6 in ≈3 rooms · 4 nights',
      price: '~£420–620 for the group', perPerson: '≈ £70–100pp', priceNote: 'comfort for the money',
      drive: '~5 min · walkable', lean: 'Best value',
      pros: ['A pool and proper, well-kept rooms', 'Minutes from the lake and centre', 'Comfortable without blowing the budget'],
      cons: ['Separate rooms, not a whole place', 'Books up fast for November']
    },
    {
      id: 'candyvilla', name: 'Villa Kandy', host: 'Booking.com',
      url: 'https://www.booking.com/hotel/lk/villa-kandy-kandy1.html?checkin=2026-11-02&checkout=2026-11-06&group_adults=6&no_rooms=1&group_children=0',
      kind: 'central', tier: '££', within: true, coords: [7.3006167, 80.6322308],
      nightly: 128,
      type: 'Whole 3-bed villa · private pool', capacity: 'Sleeps 6 · 3 bed / 3 bath',
      price: '~£420–600 for the group', perPerson: '≈ £70–100pp', priceNote: 'the whole villa, just us',
      drive: '~5 min to town', lean: 'Best balance',
      pros: ['A whole villa to ourselves — pool, hot tub, kitchen', 'Central but tucked off the main drag', 'Most space and privacy for the price'],
      cons: ['Not right on the lake', 'Popular — books up early for Nov']
    },
    {
      id: 'thilanka', name: 'Thilanka Hotel', host: 'Booking.com',
      url: 'https://www.booking.com/hotel/lk/thilanka.html?checkin=2026-11-02&checkout=2026-11-06&group_adults=6&no_rooms=3&group_children=0',
      kind: 'central', tier: '££', within: true, coords: [7.29264, 80.64979],
      nightly: 155,
      type: 'Hotel · infinity pool & lake views', capacity: '6 in ≈3 rooms · 4 nights',
      price: '~£500–750 for the group', perPerson: '≈ £85–125pp', priceNote: 'a pool and views, still in budget',
      drive: '~5 min to town', lean: 'Pool & views',
      pros: ['Infinity pool and balconies over the lake & forest', 'Does interconnecting rooms for groups', 'Real hotel comforts without overspending'],
      cons: ['A bigger hotel — less intimate than a villa', 'Tops the budget once it’s three rooms']
    },
    {
      id: 'theva', name: 'Theva Residency', host: 'Booking.com',
      url: 'https://www.booking.com/hotel/lk/the-theva-residency-kandy.html?checkin=2026-11-02&checkout=2026-11-06&group_adults=6&no_rooms=3&group_children=0',
      kind: 'quieter', tier: '£££', within: false, coords: [7.2760806, 80.6355011],
      nightly: 300,
      type: '5★ boutique hotel · infinity pool', capacity: '6 in ≈3 rooms · 4 nights',
      price: '~£1,200 for the group', perPerson: '≈ £200pp', priceNote: 'the splurge — over our target',
      drive: '~10 min up the hill', lean: 'The view',
      pros: ['Stunning infinity pool over the valley', 'Quiet, design-led, properly 5-star', 'The wow-factor option'],
      cons: ['Well above the £500–900 target', 'Up in the Hantana hills, not walkable']
    },
    {
      id: 'elephant', name: 'Elephant Stables', host: 'Booking.com',
      url: 'https://www.booking.com/hotel/lk/the-elephant-stables.html?checkin=2026-11-02&checkout=2026-11-06&group_adults=6&no_rooms=3&group_children=0',
      kind: 'quieter', tier: '£££', within: false, coords: [7.2957825, 80.6410471],
      nightly: 850,
      type: 'Colonial boutique villa · exclusive-use', capacity: 'Whole house (≈6 rooms)',
      price: '~£3,400 for the group', perPerson: '≈ £565pp', priceNote: 'the big splurge — ~£850/night',
      drive: '~5 min to town', lean: 'Character',
      pros: ['A gorgeous restored colonial mansion', 'Central yet leafy and private', 'Can take the whole house for the group'],
      cons: ['Premium — well over budget', 'Boutique, so books out early']
    }
  ]
};
