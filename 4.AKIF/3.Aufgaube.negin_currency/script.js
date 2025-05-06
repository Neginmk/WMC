// تعریف لیست ارزها
const currencies = ["USD", "EUR", "CAD", "AUD", "GBP", "JPY"];
let convertedAmount = null;

// تابعی برای پر کردن منوهای کشویی ارز
function populateDropdowns(ids) {
  ids.forEach(id => {
    const select = document.getElementById(id);
    currencies.forEach(cur => {
      const opt = document.createElement("option");
      opt.value = cur;
      opt.textContent = cur;
      select.appendChild(opt);
    });
    if (id.includes("from")) select.value = "USD";
    if (id.includes("to")) select.value = "EUR";
  });
}

populateDropdowns(["from-currency", "to-currency"]);

// دکمه تبدیل ارز: عملیات تبدیل با استفاده از API رایگان
document.getElementById("convert-btn").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  
  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      convertedAmount = (amount * rate).toFixed(2);
      document.getElementById("converted-result").textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
      // اگر نیاز به نمایش دکمه PayPal دارید، این خط را فعال کنید:
      renderPayPalButton(convertedAmount);
    })
    .catch(error => console.error("Error fetching exchange rate:", error));
});

// تابع رندر دکمه پرداخت با PayPal
function renderPayPalButton(amount) {
  document.getElementById("paypal-button-container").innerHTML = "";
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: { value: amount }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  }).render('#paypal-button-container');
}

// تابع تغییر نمایش بخش‌ها (Convert یا Chart)
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
