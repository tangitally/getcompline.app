# getcompline.app

Public site for Compline (GitHub Pages apex `getcompline.app`).

Pages:
- `/` (`index.html`) — landing + how it works. Footer contact: privacy@getcompline.app
- `/signup.html` — retired waitlist page. Its button goes to `https://app.getcompline.app/login?mode=signup`
- `/sms.html` — SMS opt-in. Posts JSON to `https://app.getcompline.app/sms-optin` (`consent_version` `sms-2026-10-22`). Without JavaScript the form posts to that same URL.
- `/sms-thanks.html` — confirmation page for the no-JavaScript form redirect
- `/privacy.html` — privacy policy (early access; for Tesla app review)
- `/terms.html` — terms (early access; for Tesla app review)

Tesla virtual-key public key: `/.well-known/appspecific/com.tesla.3p.public-key.pem`

Brand: true black, self-hosted Inter, light numerals, hairline dividers, muted purple accent. "Join the waitlist" buttons link to `https://app.getcompline.app/login?mode=signup`.

CNAME: `getcompline.app`. Do not change Spaceship DNS for `telemetry.getcompline.app` from this repo.
