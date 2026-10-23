/* Default parked hours: 14. Risky hours stay at 4.
   The numbers in how-it-works/index.html match this file at 14.
   300 W = 7.2 kWh / 24 h, the owner figure Electrek cited on 22 Feb 2024.
   $0.1816/kWh = EIA Table 5.3 residential, August 2026.
   0.25 kWh/mi and 89.25 kWh = EPA 2026 Model Y Long Range RWD
   (25 kWh/100 mi, 357 miles). 89.25 is rated energy, not a pack size.
   250 kW = Tesla's published V3 Supercharger peak. */
(function () {
  var parkedInput = document.getElementById("parked-hours");
  if (!parkedInput) return;

  var DRAW_W = 300;
  var HOME_USD = 0.1816;
  var KWH_PER_MI = 0.25;
  var PEAK_KW = 250;
  var EPA_KWH = 89.25;
  var RISKY_H = 4;

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function grouped(n, digits) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
  }

  function money(n) {
    var cents = Math.round((n + Number.EPSILON) * 100) / 100;
    return cents.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

  function rawUsd(n) {
    var four = Math.round((n + Number.EPSILON) * 10000) / 10000;
    return "$" + four.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  }

  function render() {
    var parked = Number(parkedInput.value);
    if (!isFinite(parked)) return;
    var savedH = Math.max(0, parked - RISKY_H);
    var kwhDay = savedH * DRAW_W / 1000;
    var kwhMonth = kwhDay * 30;
    var kwhYear = kwhDay * 365;
    var usdDay = kwhDay * HOME_USD;
    var usdMonth = kwhMonth * HOME_USD;
    var usdYear = kwhYear * HOME_USD;
    var miDay = kwhDay / KWH_PER_MI;
    var miMonth = kwhMonth / KWH_PER_MI;
    var miYear = kwhYear / KWH_PER_MI;
    var minDay = kwhDay / PEAK_KW * 60;
    var minMonth = kwhMonth / PEAK_KW * 60;
    var minYear = kwhYear / PEAK_KW * 60;
    var pctDay = kwhDay / EPA_KWH * 100;

    var kwhDayText = grouped(kwhDay, 2);
    var kwhMonthText = grouped(kwhMonth, kwhMonth % 1 === 0 ? 0 : 2);
    var kwhYearText = grouped(kwhYear, kwhYear % 1 === 0 ? 0 : 2);
    var miDayText = grouped(miDay, miDay % 1 === 0 ? 0 : 2);
    var miMonthText = grouped(miMonth, miMonth % 1 === 0 ? 0 : 2);
    var miYearText = grouped(miYear, miYear % 1 === 0 ? 0 : 2);

    setText("est-readout", parked + " hours parked. 4 of them are treated as risky. Sentry stays off for " + savedH + (savedH === 1 ? " hour." : " hours."));
    setText("est-kwh-day", kwhDayText);
    setText("est-kwh-month", kwhMonthText);
    setText("est-kwh-year", kwhYearText);
    setText("est-pct-day", grouped(pctDay, 2));
    setText("est-usd-day", money(usdDay));
    setText("est-usd-month", money(usdMonth));
    setText("est-usd-year", money(usdYear));
    setText("est-mi-day", miDayText);
    setText("est-mi-month", miMonthText);
    setText("est-mi-year", miYearText);
    setText("est-min-day", grouped(minDay, 2));
    setText("est-min-month", grouped(minMonth, 1));
    setText("est-min-year", grouped(minYear, 1));

    var math = document.getElementById("est-math");
    if (!math) return;
    var lines = [
      kwhDayText + " kWh/day = " + savedH + " hours × 300 W ÷ 1,000",
      grouped(kwhMonth, 2) + " kWh/month = " + kwhDayText + " × 30. " + grouped(kwhYear, 2) + " kWh/year = " + kwhDayText + " × 365",
      money(usdDay) + "/day from " + kwhDayText + " × $0.1816 = " + rawUsd(usdDay) + ". " + money(usdMonth) + "/month from " + grouped(kwhMonth, 2) + " × $0.1816 = " + rawUsd(usdMonth) + ". " + money(usdYear) + "/year from " + grouped(kwhYear, 2) + " × $0.1816 = " + rawUsd(usdYear),
      miDayText + " miles/day = " + kwhDayText + " ÷ 0.25. " + miMonthText + " miles/month = " + grouped(kwhMonth, 2) + " ÷ 0.25. " + miYearText + " miles/year = " + grouped(kwhYear, 2) + " ÷ 0.25",
      grouped(minDay, 2) + " minutes/day = " + kwhDayText + " ÷ 250 × 60. " + grouped(minMonth, 1) + " minutes/month = " + grouped(kwhMonth, 2) + " ÷ 250 × 60. " + grouped(minYear, 1) + " minutes/year = " + grouped(kwhYear, 2) + " ÷ 250 × 60",
      grouped(pctDay, 2) + "% a day = " + kwhDayText + " ÷ 89.25"
    ];
    var nodes = math.querySelectorAll("p");
    for (var i = 0; i < nodes.length && i < lines.length; i++) {
      nodes[i].textContent = lines[i];
    }
  }

  parkedInput.addEventListener("input", render);
})();
