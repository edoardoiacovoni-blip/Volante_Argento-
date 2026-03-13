let budget = 67.0;
let reserveAsset = 0.0;
const reserveName = "GOLD_RESERVE";

self.onmessage = function(e) {
    if (e.data === 'START') {
        setInterval(() => {
            let profit = (budget * 0.1) * (Math.random() * 0.008);
            reserveAsset += profit;
            self.postMessage({
                budget: budget.toFixed(2),
                reserve: reserveAsset.toFixed(6),
                timestamp: new Date().toLocaleTimeString()
            });
        }, 2000);
    }
};
