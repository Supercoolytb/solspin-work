const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

app.post("/work/confirm", (req, res) => {
    const { userId } = req.body;

    const balancesPath = path.join(__dirname, "data/balances.json");
    const balances = JSON.parse(fs.readFileSync(balancesPath));

    if (!balances[userId]) {
        balances[userId] = { balance: 0, wager: 0, withdraw: 0 };
    }

    // Ajouter la récompense
    balances[userId].balance += 10;

    fs.writeFileSync(balancesPath, JSON.stringify(balances, null, 2));

    res.send("Reward granted!");
});

app.listen(3000, () => console.log("API running on port 3000"));
