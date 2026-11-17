# Screenshots needed for the screenshot run (task 170)

Output: `assets/screenshots/{locale}/{folder}/NN.webp`, one set per locale (all 25 folders, including en-AU/CA/GB/IN/SG, in that locale's app language and seeded data). Same look as existing sets: phone frame on transparent background, portrait 512×768 for a single phone, 768×768 for a two-phone collage (as in `social-sports-group/03.webp`). Re-use the seeded cast from existing sets (Jackie Jones as admin, Billie Moore, Francis Moore, Alex Miller, etc.) so pages feel consistent.

## A. `youth-sports/` (new folder, 4 images)

| File | Slot on page | Screen / state to capture | Needs in app / seed data | Replaces placeholder |
|---|---|---|---|---|
| 01.webp | Hero | Event details for a junior team (e.g. "Under-10s Football"): members row, age group chip (e.g. 8–10), upcoming training sessions with confirm/decline | Event with age group set, recurring weekly training, ~8 members | `social-sports-group/01` |
| 02.webp | Row 1 "Guardian accounts" | Guardian's minors screen: a child added under the guardian's account, showing "Primary Guardian" and the child's event memberships. Two-phone collage is fine (minors list + child's membership toggle) | Guardian user with 1–2 minors (use child-friendly names), minor added to the event | `social-sports-group/03` (invite/QR — wrong content) |
| 03.webp | Row 2 "Approval workflows" | Event edit → Privacy and Security: Private event ON, join restrictions set to Invitations or Code | Same event, private | `social-sports-group/02` (currently Private OFF) |
| 04.webp | Row 3 "Training day" | Recurring schedule (weekly, set day/time) or the activity list with capacity/waitlist and team colours assigned | Recurring weekly schedule, capacity set, team colours on | `social-sports-group/04` |

## B. `fill-the-last-spot/` (new folder, 4 images)

| File | Slot on page | Screen / state to capture | Needs in app / seed data | Replaces placeholder |
|---|---|---|---|---|
| 01.webp | Hero | Upcoming activity with open spots (e.g. 9/10) and confirm/decline buttons | 5-a-side or volleyball event, activity 9/10 confirmed | `run-club/01` |
| 02.webp | Row 1 "Smart activity alerts" | Event settings → Activity alerts: "Need one more player", "Last-minute replacements" and "Reminders" toggles ON, with hours-before values | Admin user, alerts enabled | `run-club/04` (members list with Send Reminder) |
| 03.webp | Row 2 "Reach nearby players" | Same screen scrolled to "Who can be alerted": Members only / Anyone, "Members alerted first, then nearby players who match sport, level and availability" | Event public (the "Anyone" option is disabled for private events) | `run-club/03` (Schedule session sheet) |
| 04.webp | Row 3 "Waitlists & reliability" | Two-phone collage: activity members list showing a waitlisted player, and a player profile Reliability summary (punctuality, friendliness, attended vs no-show) | Activity at capacity with 1–2 waitlisted; a profile with reliability data | `run-club/02` |

Optional: capture the "Activity members" list with Confirmed and Pending users and the Send Reminder button (this is what `run-club/04` shows) as `fill-the-last-spot/05.webp` if we want to keep it as a supporting image.

## C. Extras (already wired into the site; each image is hidden until its file exists)

- `safe-group-runs/05.webp`: "Share your live location?" sheet with audience options (Confirmed participants / Safety contacts) plus the "Live location shared" state, to back the updated FAQ.
- `home/05–07.webp`: Chat list/thread (Chat card), Reliability profile (Reliability card), Activity alerts settings (Fill Every Spot card). Mapping: `home/05` chat → Chat card, `home/06` reliability profile → Reliability card, `home/07` activity alerts → Fill Every Spot card.

## Hooking them up (my side, once files land)

1. Point `_includes/use-cases/youth-sports-body.html` and `fill-the-last-spot-body.html` hero and row images at the new folders (`youth-sports/01–04`, `fill-the-last-spot/01–04`) and remove the `TODO` comment.
2. Update alt keys `alt1–4` in `en` defaults and via the translator agent in `_data/use_cases.yml` (alt1–4 under `youth_sports` / `fill_the_last_spot`) so they describe the real screens.
