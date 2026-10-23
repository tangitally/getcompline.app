# getcompline.app

Public site for Compline (GitHub Pages apex `getcompline.app`).

Pages:
- `/` (`index.html`) — landing. Primary button says “Join the Beta” and still goes to `https://app.getcompline.app/login?mode=signup`. Footer contact: privacy@getcompline.app
- `/how-it-works/` — score, Auto-Sentry, and beta details
- `/signup.html` — retired waitlist page. Its button still says “Join the waitlist” and goes to `https://app.getcompline.app/login?mode=signup`
- `/sms.html` — SMS opt-in. Posts JSON to `https://app.getcompline.app/sms-optin` (`consent_version` `sms-2026-10-22`). Without JavaScript the form posts to that same URL.
- `/sms-thanks.html` — confirmation page for the no-JavaScript form redirect
- `/privacy.html` — privacy policy (early access; for Tesla app review)
- `/terms.html` — terms (early access; for Tesla app review)

Tesla virtual-key public key: `/.well-known/appspecific/com.tesla.3p.public-key.pem`

Brand: true black, self-hosted Inter. The homepage and `/how-it-works/` use the dashboard tokens (accent `#A78BFA`, 60% white muted text, 16px cards). Other pages keep the earlier muted purple. Homepage “Join the Beta” buttons, and the “Join the waitlist” buttons on the other pages, link to `https://app.getcompline.app/login?mode=signup`.

CNAME: `getcompline.app`. Do not change Spaceship DNS for `telemetry.getcompline.app` from this repo.
