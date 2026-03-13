// Volante_Oro_Worker.js
let budget = 67.0;
let reserveAsset = 0.0; // ORO (PAXG) o BTC
const reserveName = "GOLD_RESERVE";

// I 18 Punti e le entità da monitorare (BCE, PBoC, BlackRock)
const strategy = {
    points: 18,
    entities: ["BCE", "PBoC", "BlackRock"],
    targetProfit: [0.003, 0.008], // 0.3% - 0.8%
    jumperActive: true
};

self.onmessage = function(e) {
    if (e.data === 'START') {
        runFlyingWheel();
    }
};

async function runFlyingWheel() {
    console.log("Sistema Volante Avviato su Worker. Budget: " + budget);

    while (true) {
        try {
            // 1. Monitoraggio Macro (Punti 4, 5, 6)
            // Qui il sistema "ascolta" i segnali simulati di BCE/BlackRock
            let marketSignal = Math.random() > 0.3; 

            if (marketSignal) {
                // 2. Logica Jumper (Punto 17): Salto su coin volatile
                let tradeAmount = budget * 0.10; // Micro-operazione
                let profitRate = (Math.random() * (0.008 - 0.003) + 0.003);
                let microGain = tradeAmount * profitRate;

                // 3. Conversione immediata in RISERVA (Punto 10 & 08-02)
                reserveAsset += microGain;
                
                // Aggiornamento budget operativo
                console.log(`Operazione conclusa. Guadagno: ${microGain.toFixed(4)} convertito in ${reserveName}`);
            }

            // 4. Controllo rifornimento (Punto 06-03)
            if (budget < 10 && reserveAsset > 0) {
                let refill = reserveAsset * 0.5;
                reserveAsset -= refill;
                budget += refill;
                console.log("RIFORNIMENTO: Preso 50% dalla riserva per continuare.");
            }

            // Invio dati all'interfaccia principale (Punto 19)
            self.postMessage({
                budget: budget.toFixed(2),
                reserve: reserveAsset.toFixed(6),
                status: "OPERATIVO"
            });

            // Punto 14: Latenza ultra-bassa per non bloccare il thread
            await new Promise(r => setTimeout(r, 100)); 

        } catch (error) {
            // Punto 20: Auto-update/Reset in caso di errore
            console.error("Errore sistema, riavvio in corso...");
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}
