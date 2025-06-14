//This is a js file for creating a currency converter that fetches the current data from an api online
const api = "https://v6.exchangerate-api.com/v6/6d876d66a69cec3c6e235ffb/pair/";

const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};
const currency_from_select = document.querySelector("#from");
const currency_to_select = document.querySelector("#to");
const amount_input = document.querySelector("#amount");
const msg = document.querySelector(".msg");
const button = document.querySelector("#submit");
const fromFlag = document.querySelector("#flag-from");
const toFlag = document.querySelector("#flag-to");
function populateSelectOptions(selectElement,already){
    for(let currencyCode in countryList){
        if(currencyCode != already){const option = document.createElement("option");
        option.value = currencyCode;
        option.textContent = currencyCode;
        selectElement.appendChild(option);}
        
    }
}

populateSelectOptions(currency_from_select,"USD");

populateSelectOptions(currency_to_select,"INR")
button.addEventListener("click", execution);
currency_from_select.addEventListener("change", () => {
  updateFlag(currency_from_select, fromFlag);
});

currency_to_select.addEventListener("change", () => {
  updateFlag(currency_to_select, toFlag);
});


//Update flag based on selected currency

function updateFlag(selectElement,flagElement){
    const currencyCode = selectElement.value;
    const countrycode = countryList[currencyCode];
    if(countrycode){
        flagElement.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    }
}//here selectelement is the is select option from where currency is to be selected and flagelement is the flag img to be change
async function get_conversion_rate(from, to) {
  const response = await fetch(`${api}${from}/${to}`);
  if (!response.ok) throw new Error("Failed to fetch conversion rate");
  const data = await response.json();
  return data.conversion_rate;
}

async function execution() {
  const currency_from = currency_from_select.value;
  const currency_to = currency_to_select.value;
  const amount = parseFloat(amount_input.value) || 1;
  // Disable button and show loading text
  button.disabled = true;
  button.textContent = "Loading...";
  try {
    const conversion_rate = await get_conversion_rate(
      currency_from,
      currency_to
    );
    const final_amount = parseFloat((conversion_rate * amount).toFixed(2));

   msg.innerHTML = `1 ${currency_from} = ${conversion_rate} ${currency_to}<br>${amount} ${currency_from} = ${final_amount} ${currency_to}`;

  } catch (err) {
    console.error("Error fetching rate:", err);
    msg.textContent = "Failed to fetch exchange rate. Try again.";
  }
  finally {//This is executed when the try part is done
    // Re-enable button and restore text
    button.disabled = false;
    button.textContent = "Get Exchange Rate";
  }

}
