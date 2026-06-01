# Kandy & the Hill Country

A self-contained, interactive one-page site pitching a five-day group trip to
**Kandy, Sri Lanka** (2–6 November 2026). Built to scroll like a travel feature —
parallax hero, scroll-reveal sections, count-up stats, and two interactive Leaflet
maps (the trip route, and an accommodation comparison).

## View it

No build step. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8099   # then visit http://localhost:8099
```

(The maps and Google Fonts load from CDNs, so the first view needs internet.)

## Structure

```
index.html        # markup for every section
css/styles.css    # the full design system (Sri Lankan jade + temple gold)
js/
  itinerary.js    # the day-by-day schedule data — edit here to change days
  stays.js        # accommodation options + map pins — edit here to change stays
  main.js         # interactions: nav, reveals, parallax, counters, both maps
images/           # photos; a missing file degrades to a tasteful gradient block
```

## Editing content

- **Itinerary**: edit `js/itinerary.js` (times, activities, cost/booking chips, photos).
- **Accommodation**: edit `js/stays.js` (price, location, pros/cons, Booking links).
- **Images**: drop a file into `images/` matching the referenced name; any missing
  image falls back to a coloured gradient so the layout never breaks.

## Notes

- Fully responsive, mobile-first.
- Honours `prefers-reduced-motion` (disables parallax/counters).
- Includes a print stylesheet so it can be saved as a PDF.
