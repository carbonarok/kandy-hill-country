/* ============================================================
   Kandy & the Hill Country — full itinerary data
   Edit here to change any day. main.js renders it into the
   matching <div class="day__schedule" data-day="N"> blocks.

   item: { time, title, desc, chips?: [{type, label}], optional?,
           opt?: "extra note", img?: "images/..jpg", alt?: "..." }
   chip types -> colour: cost · time · book · dress · tip · opt
   note: { note: "text", img?, alt? }  -> inline tip box (no dot)
   A missing img degrades to a tasteful gradient block (see CSS).
   ============================================================ */
window.TRIP = {
  days: {

    1: {
      summary: [
        { k: 'Pace',  v: 'Easy evening' },
        { k: 'Start', v: 'From afternoon' },
        { k: 'Cost',  v: '~LKR 300' }
      ],
      items: [
        { time: 'Afternoon', title: 'Arrive & settle in',
          desc: 'Check in, freshen up, shake off the journey from Ella.' },
        { time: '~5:00 pm', title: 'Bahirawakanda Buddha Statue',
          desc: 'Hilltop white Buddha with panoramic sunset views over the city. Sarongs lent free.',
          chips: [{ type: 'cost', label: '~LKR 300' }], optional: true,
          opt: 'Skip if you arrive late or tired',
          img: 'images/act-bahirawakanda.jpg', alt: 'The tall white hilltop Buddha at Bahirawakanda above Kandy' },
        { time: '6:30 pm', title: 'Kandy Lake stroll',
          desc: 'An easy evening walk around the lake to get our bearings.' },
        { time: '7:30 pm', title: 'Welcome dinner',
          desc: 'A relaxed lakeside spot to kick the trip off together.' }
      ]
    },

    2: {
      summary: [
        { k: 'Pace',  v: 'Relaxed' },
        { k: 'Start', v: '9:00 am' },
        { k: 'Cost',  v: 'Small cash fees' }
      ],
      items: [
        { time: '9:00 am', title: 'Temple of the Sacred Tooth Relic',
          desc: 'Sri Dalada Maligawa — arrive for the ~9:30 morning thewawa (offering ceremony), then explore the shrine and the museum upstairs.',
          chips: [{ type: 'time', label: '1.5–2 hrs' }, { type: 'dress', label: 'Shoulders & knees · shoes off' }] },
        { time: '11:00 am', title: 'Old Kandy on foot',
          desc: 'National Museum of Kandy, the Kandyan Art Association & Cultural Centre, the central market for spices & textiles — and a gem/lapidary if anyone’s buying.' },
        { time: '1:00 pm', title: 'Lunch in town', desc: 'Refuel somewhere central.' },
        { time: '2:30 pm', title: 'Udawatta Kele Sanctuary',
          desc: 'A shady rainforest loop right behind the temple — monkeys, deer and city viewpoints.',
          chips: [{ type: 'time', label: '~1.5 hrs' }, { type: 'cost', label: 'Cash-only entry' }], optional: true,
          opt: 'Optional — easy to drop if the group wants to slow down',
          img: 'images/act-udawatta.jpg', alt: 'Giant forest lianas in the Udawattakele reserve behind the temple' },
        { time: '5:00 pm', title: 'Kandyan Cultural Dance Show',
          desc: 'At the Kandy Lake Club — drumming, costumes and a fire-walking finale. About an hour.',
          chips: [{ type: 'time', label: '~1 hr' }, { type: 'book', label: 'Book ahead' }],
          img: 'images/act-dance.jpg', alt: 'Kandyan dancers in silver costume performing under stage light' },
        { time: '7:00 pm', title: 'Dinner — keep it early',
          desc: 'There’s a 5 am start tomorrow, so we wrap the evening up in good time.' }
      ]
    },

    3: {
      summary: [
        { k: 'Pace',  v: 'Long day' },
        { k: 'Start', v: '5:00 am' },
        { k: 'Cost',  v: '~US$30 · Sigiriya' }
      ],
      items: [
        { time: '5:00 am', title: 'Depart Kandy',
          desc: 'Driver and van; breakfast boxes to go. ~90 km / 2.5–3 hrs north.',
          chips: [{ type: 'time', label: '2.5–3 hrs drive' }] },
        { time: '~7:30 am', title: 'Sigiriya Lion Rock',
          desc: 'The UNESCO sky-fortress — ~1,200 steps past the frescoes, the mirror wall and the giant lion’s paws to the summit palace. Climb to the top first, water gardens on the way down.',
          chips: [{ type: 'cost', label: '~US$30 / person' }, { type: 'time', label: '2.5–3 hrs' }, { type: 'tip', label: 'A guide adds a lot' }] },
        { time: '~11:00 am', title: 'Lunch near Sigiriya',
          desc: 'Cool off and refuel before the drive home.' },
        { time: '12:30 pm', title: 'Dambulla Cave Temple',
          desc: 'Right on the road home (~30 min south) — five caves of Buddha statues and painted ceilings.',
          chips: [{ type: 'time', label: '~1.5 hrs' }, { type: 'dress', label: 'No shorts · shoes off' }] },
        { time: '2:30 pm', title: 'Drive back to Kandy', desc: 'Settle in for the ride south.' },
        { time: '~5:00 pm', title: 'Back in Kandy',
          desc: 'A relaxed evening — you’ve earned it.' },
        { note: 'For the keen: add Pidurangala Rock (a 20–30 min scramble for the classic view of Sigiriya) — best at sunrise, but all three in a day is a serious amount. Weather hedge: if Day 4 looks clearer, swap the two — Sigiriya rewards a clear morning.',
          img: 'images/act-pidurangala.jpg', alt: 'Sigiriya rock seen across the jungle from the top of Pidurangala' }
      ]
    },

    4: {
      summary: [
        { k: 'Pace',  v: 'Gentle · bonus day' },
        { k: 'Start', v: '8:30 am' },
        { k: 'Cost',  v: 'LKR 300–1,000' }
      ],
      items: [
        { time: '8:30 am', title: 'Royal Botanic Gardens, Peradeniya',
          desc: 'With time to enjoy it properly: the palm avenue, the great orchid house, the giant Java fig and the suspension bridge. Golf-cart hire is handy for the group.',
          chips: [{ type: 'time', label: '2.5–3 hrs' }],
          img: 'images/act-orchid.jpg', alt: 'Rows of orchids inside the orchid house at Peradeniya' },
        { time: '12:00 pm', title: 'Lunch', desc: 'A break before the afternoon temple loop.' },
        { time: '1:30 pm', title: 'Gadaladeniya Raja Maha Viharaya',
          desc: '14th-century stone temple on a rock plateau, in the South-Indian Vijayanagar style.',
          img: 'images/act-gadaladeniya.jpg', alt: 'The stone temple of Gadaladeniya Viharaya on its rock plateau' },
        { time: '2:30 pm', title: 'Lankatilaka Vihara',
          desc: 'A dramatic hilltop temple with striking murals and views over rice fields and hills.',
          img: 'images/act-lankatilaka.jpg', alt: 'The whitewashed hilltop temple of Lankatilaka Vihara' },
        { time: '3:30 pm', title: 'Embekka Dewalaya',
          desc: 'World-class Kandyan wood carvings on the timber pillars — the highlight of the loop.',
          chips: [{ type: 'tip', label: 'The famous wood carvings' }],
          img: 'images/act-embekka.jpg', alt: 'Intricately carved timber pillars at Embekka Devalaya' },
        { time: '6:30 pm', title: 'Final Kandy dinner',
          desc: 'Somewhere special to finish — a rooftop, ideally.' },
        { note: 'The whole loop runs in one direction southwest of Kandy, so it flows nicely with the van. Fancy something more active instead? This is the slot to swap in a half-day Knuckles hike.' }
      ]
    },

    5: {
      summary: [
        { k: 'Pace',  v: 'Travel day' },
        { k: 'Start', v: 'Late morning' },
        { k: 'Note',  v: 'Late flight, no rush' }
      ],
      items: [
        { time: 'Morning', title: 'Slow start in Kandy',
          desc: 'A lie-in and a leisurely breakfast, a last walk around the lake or some final shopping.' },
        { time: '~11:00 am', title: 'Check out & depart Kandy',
          desc: 'The scenic drive west, with a lunch stop en route.',
          chips: [{ type: 'time', label: '~4–4.5 hrs' }] },
        { time: '~3:00 pm', title: 'Arrive Negombo',
          desc: 'Beach time, the Dutch-era canal and fort ruins, St Mary’s Church, and the lellama fish market.',
          img: 'images/act-negombo-boats.jpg', alt: 'A traditional outrigger fishing boat on the golden sand at Negombo' },
        { time: 'Evening', title: 'Seafood dinner, then the airport',
          desc: 'An early seafood dinner, then the ~20 min transfer to the airport. Keep a buffer for check-in.',
          chips: [{ type: 'time', label: '~20 min to airport' }] }
      ]
    }
  }
};
