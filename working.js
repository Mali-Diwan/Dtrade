
// for logo animation
const logo = document.querySelector(".hero-image .logo");

let glow = 20;
let increasing = true;

setInterval(() => {
    if (increasing) {
        glow += 2;
        if (glow >=  45)  increasing = false;
    } else {
        glow -= 2;
        if (glow <= 25) increasing = true;
    }

    logo.style.filter = `
        drop-shadow(0 0 ${glow}px #B7D77A)
        drop-shadow(0 0 ${glow * 2}px #B7D77A88)
    `;
}, 50);
 

// for stock card animation 

const stockCard = document.querySelector(".stock-card");
const price = document.querySelector("#stock-price");
const profit = document.querySelector("#stock-profit");
const chart = document.querySelector(".chart-line");

let animation;
let startTime;

stockCard.addEventListener("mouseenter", () => {

    // Stop previous animation
    clearInterval(animation);

    // Reset everything
    price.textContent = "₹792.52";
    profit.textContent = "+2.24%";

    chart.style.animation = "none";
    chart.offsetHeight; // reset animation
    chart.style.animation = "drawChart 15s linear forwards";

    startTime = performance.now();

    animation = setInterval(() => {

        let elapsed = performance.now() - startTime;
        let progress = Math.min(elapsed / 15000, 1);

        let currentPrice =
            792.52 + (800 - 792.52) * progress;

        let currentPercent =
            2.24 + (5 - 2.24) * progress;

        price.textContent =
            `₹${currentPrice.toFixed(2)}`;

        profit.textContent =
            `+${currentPercent.toFixed(2)}%`;

        if (progress >= 1) {
            clearInterval(animation);
        }

    }, 50);
});


stockCard.addEventListener("mouseleave", () => {

    // Stop current animation
    clearInterval(animation);

    // Reset values
    price.textContent = "₹792.52";
    profit.textContent = "+2.24%";

    // Reset chart
    chart.style.animation = "none";
});


// for ipo video

