
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

const ipoCard = document.querySelector(".ipo-card");
const ipoScreen = document.querySelector(".ipo-screen");
const ipoFinger = document.querySelector(".ipo-finger");

const ipoFrames = [
    document.querySelector(".ipo-frame-1"),
    document.querySelector(".ipo-frame-2"),
    document.querySelector(".ipo-frame-3"),
    document.querySelector(".ipo-frame-4")
].filter(Boolean);

let ipoSyncTimer = null;
let ipoStartTime = 0;
let ipoAnimationFrame = null;

function showIpoFrame(index) {
    ipoFrames.forEach((frame, i) => {
        frame.style.display = i === index ? "block" : "none";
    });
}

function moveIpoFinger(target) {
    if (!target || !ipoFinger || !ipoScreen) return;

    const screenRect = ipoScreen.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const x = targetRect.left + targetRect.width / 2 - screenRect.left;
    const y = targetRect.top + targetRect.height / 2 - screenRect.top;

    ipoFinger.style.transition =
        "left 1s ease-in-out, top 1s ease-in-out, opacity 0.2s";

    ipoFinger.style.left = `${x}px`;
    ipoFinger.style.top = `${y}px`;
    ipoFinger.style.opacity = "1";
}

function runIpoAnimation() {
    const elapsed = (performance.now() - ipoStartTime) / 1000;
    const cycleTime = elapsed % 16;
    const frameIndex = Math.min(3, Math.floor(cycleTime / 4));

    showIpoFrame(frameIndex);

    if (frameIndex === 0) {
        const aravalliButton = document.querySelector(
            ".ipo-frame-1 .ipo-item button"
        );
        moveIpoFinger(aravalliButton);
    } else if (frameIndex === 1) {
        moveIpoFinger(
            document.querySelector(".ipo-frame-2 .ipo-apply-button")
        );
    } else {
        ipoFinger.style.left = "80%";
        ipoFinger.style.top = "92%";
        ipoFinger.style.opacity = "1";
    }

    ipoAnimationFrame = requestAnimationFrame(runIpoAnimation);
}

function startIpoAnimation() {
    cancelAnimationFrame(ipoAnimationFrame);
    clearInterval(ipoSyncTimer);

    ipoStartTime = performance.now();
    runIpoAnimation();
}

function stopIpoAnimation() {
    cancelAnimationFrame(ipoAnimationFrame);
    clearInterval(ipoSyncTimer);

    showIpoFrame(0);

    if (ipoFinger) {
        ipoFinger.style.opacity = "0";
    }
}

if (ipoCard && ipoScreen && ipoFinger && ipoFrames.length === 4) {
    showIpoFrame(0);

    ipoCard.addEventListener("mouseenter", startIpoAnimation);
    ipoCard.addEventListener("mouseleave", stopIpoAnimation);
}

function showIpoBubble() {
    if (!ipoFinger || !ipoScreen) return;

    const bubble = document.createElement("div");
    bubble.className = "ipo-click-bubble";

    bubble.style.left = ipoFinger.style.left;
    bubble.style.top = ipoFinger.style.top;

    ipoScreen.appendChild(bubble);

    setTimeout(() => bubble.remove(), 500);
} 

//footer tab active state


/* ========================================
   DTRADE FOOTER JAVASCRIPT
   Nine Interactive Categories
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".footer-tab");
    const content = document.getElementById("footerCategoryContent");

    // Stop safely if the footer HTML is not on this page.
    if (!content || tabs.length === 0) {
        return;
    }

    // Footer links grouped into five columns per category.
    const footerCategories = {

        share: [
            [
                "Top Gainers Stocks",
                "52 Weeks High Stocks",
                "Tata Motors",
                "NHPC",
                "ITC",
                "Wipro"
            ],
            [
                "Top Losers Stocks",
                "52 Weeks Low Stocks",
                "IREDA",
                "State Bank of India",
                "Adani Power",
                "CDSL"
            ],
            [
                "Most Traded Stocks",
                "Stocks Market Calendar",
                "Tata Steel",
                "Tata Power",
                "Bharat Heavy Electricals",
                "Indian Oil Corporation"
            ],
            [
                "Stocks Feed",
                "Suzlon Energy",
                "Zomato (Eternal)",
                "Yes Bank",
                "Infosys",
                "NBCC"
            ],
            [
                "FII DII Activity",
                "IRFC",
                "Bharat Electronics",
                "HDFC Bank",
                "Vedanta",
                "Reliance Power"
            ]
        ],

        indices: [
            [
                "NIFTY 50",
                "NIFTY Midcap 100",
                "NIFTY 100",
                "US Tech 100",
                "NIFTY Realty",
                "Nikkei Index"
            ],
            [
                "SENSEX",
                "NIFTY Smallcap 100",
                "NIFTY Auto",
                "Dow Jones Futures",
                "NIFTY PSU Bank",
                "NIFTY FMCG"
            ],
            [
                "NIFTY BANK",
                "NIFTY MIDCAP 150",
                "KOSPI Index",
                "Dow Jones Index",
                "Gift Nifty",
                "BSE BANKEX"
            ],
            [
                "India VIX",
                "NIFTY Pharma",
                "HANG SENG Index",
                "BSE 100",
                "FTSE 100 Index",
                "S&P 500"
            ],
            [
                "NIFTY NEXT 50",
                "NIFTY Metal",
                "DAX Index",
                "NIFTY Fin Service",
                "CAC Index",
                "Nifty Pvt Bank"
            ]
        ],

        fo: [
            [
                "NIFTY Bank Options",
                "SBI Options",
                "Bajaj Finance Options",
                "Axis Bank Options",
                "Hindustan Unilever Options",
                "NIFTY Bank Futures"
            ],
            [
                "NIFTY 50 Options",
                "HDFC Bank Options",
                "Wipro Options",
                "DLF Options",
                "REC Options",
                "Yes Bank Futures"
            ],
            [
                "BSE Sensex Options",
                "Tata Steel Options",
                "NTPC Options",
                "Bajaj Auto Options",
                "IndusInd Bank Options",
                "Tata Motors Futures"
            ],
            [
                "Finnifty Options",
                "Infosys Options",
                "Asian Paints Options",
                "Coal India Options",
                "Ashok Leyland Options",
                "Tata Steel Futures"
            ],
            [
                "Tata Motors Options",
                "ITC Options",
                "ICICI Bank Options",
                "Adani Enterprises Options",
                "NIFTY 50 Futures",
                "Coal India Futures"
            ]
        ],

        mutual: [
            [
                "MF Screener",
                "Debt Mutual Funds",
                "Best Multicap Mutual Funds",
                "Best Contra Mutual Funds",
                "Best Conservative Hybrid Funds",
                "SBI Contra Fund"
            ],
            [
                "Compare Mutual Funds",
                "Best Debt Mutual Funds",
                "Best Large Cap Mutual Funds",
                "Best Value Oriented Funds",
                "Parag Parikh Flexi Cap Fund",
                "HDFC Mid Cap Opportunities Fund"
            ],
            [
                "MF Knowledge Centre",
                "Best Equity Mutual Funds",
                "Best Small Cap Mutual Funds",
                "Best Arbitrage Mutual Funds",
                "Motilal Oswal Midcap Fund",
                "SBI Small Cap Fund"
            ],
            [
                "Mutual Fund Houses",
                "Best Hybrid Mutual Funds",
                "Best ELSS Mutual Funds",
                "Best Dividend Yield Funds",
                "Nippon India Small Cap Fund",
                "HDFC Flexi Cap Fund"
            ],
            [
                "Mutual Fund Categories",
                "Best MidCap Mutual Funds",
                "Best Sectoral Mutual Funds",
                "Best Aggressive Hybrid Funds",
                "Quant Small Cap Fund",
                "SBI Magnum Children's Benefit Fund"
            ]
        ],

        etfs: [
            [
                "International ETFs",
                "Silver ETFs",
                "Midcap ETFs",
                "Liquid ETFs"
            ],
            [
                "Debt ETFs",
                "Index ETFs",
                "Bank Nifty ETFs",
                "Nifty IT ETFs"
            ],
            [
                "Equity ETFs",
                "Nifty 50 ETFs",
                "Nifty Metal ETFs",
                "Nifty Auto ETFs"
            ],
            [
                "Commodity ETFs",
                "Nifty Next 50 ETFs",
                "Healthcare ETFs",
                "DTrade ETFs"
            ],
            [
                "Gold ETFs",
                "Sensex ETFs",
                "Defence ETFs"
            ]
        ],

        funds: [
            [
                "DTrade Arbitrage Fund",
                "DTrade ELSS Tax Saver Fund",
                "DTrade Banking & Financial Fund",
                "DTrade Gold ETF FOF",
                "DTrade Gold ETF"
            ],
            [
                "DTrade Short Duration Fund",
                "DTrade Aggressive Hybrid Fund",
                "DTrade Nifty Smallcap Index",
                "DTrade Multicap Fund",
                "DTrade Defence ETF"
            ],
            [
                "DTrade Liquid Fund",
                "DTrade Dynamic Bond Fund",
                "DTrade Non Cyclical Fund",
                "DTrade Railways ETF"
            ],
            [
                "DTrade Large Cap Fund",
                "DTrade Overnight Fund",
                "DTrade EV & New Age Fund",
                "DTrade 200 ETF FoF"
            ],
            [
                "DTrade Value Fund",
                "DTrade Total Market Index",
                "DTrade Silver ETF"
            ]
        ],

        calculators: [
            [
                "SIP Calculator",
                "Brokerage Calculator",
                "RD Calculator",
                "HRA Calculator",
                "Home Loan EMI Calculator"
            ],
            [
                "Lumpsum Calculator",
                "Margin Calculator",
                "FD Calculator",
                "Salary Calculator",
                "ROI Calculator"
            ],
            [
                "SWP Calculator",
                "Stock Average Calculator",
                "EPF Calculator",
                "TDS Calculator"
            ],
            [
                "MF Calculator",
                "SSY Calculator",
                "Income Tax Calculator",
                "EMI Calculator"
            ],
            [
                "Step-Up SIP Calculator",
                "PPF Calculator",
                "GST Calculator",
                "Car Loan EMI Calculator"
            ]
        ],

        ipo: [
            [
                "What is IPO?",
                "How to Apply for an IPO"
            ],
            [
                "Open IPOs",
                "What is Grey Market Premium?"
            ],
            [
                "Upcoming IPOs",
                "Mainboard IPOs"
            ],
            [
                "Closed IPOs",
                "SME IPOs"
            ],
            [
                "IPO Subscription Status",
                "IPO Allotment Status"
            ]
        ],

        misc: [
            [
                "NFO",
                "Pricing",
                "Trust & Safety",
                "DTrade Digest",
                "Minor Demat Account"
            ],
            [
                "Intraday",
                "Blog",
                "Investor Relations",
                "Invest in Gold"
            ],
            [
                "Corporate Bonds",
                "Gold Rates",
                "Invest in Silver"
            ],
            [
                "HUF Demat Account",
                "Careers",
                "Silver Rates",
                "Sitemap"
            ],
            [
                "About Us",
                "Help & Support",
                "Glossary",
                "NRI Demat Account"
            ]
        ]
    };

    // Convert a link label into a simple URL-friendly slug.
    // These are placeholder paths until your real pages exist.
    function createLink(label) {
        const link = document.createElement("a");

        link.textContent = label;

        const slug = label
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        link.href = "#";
        link.dataset.page = slug;

        return link;
    }

    // Render the selected category.
    function showCategory(category) {
        const columns = footerCategories[category];

        if (!columns) {
            return;
        }

        const fragment = document.createDocumentFragment();

        columns.forEach(function (items) {
            const column = document.createElement("div");

            items.forEach(function (item) {
                column.appendChild(createLink(item));
            });

            fragment.appendChild(column);
        });

        content.replaceChildren(fragment);

        // Update the selected tab.
        tabs.forEach(function (tab) {
            const isActive = tab.dataset.category === category;

            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-pressed", String(isActive));
        });
    }

    // Handle tab clicks.
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            showCategory(tab.dataset.category);
        });
    });

    // Show Share Market links when the page loads.
    showCategory("share");

});
