export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const fs = require("fs");
  const path = require("path");
  const { userId } = req.body;

  const balancesPath = path.join(process.cwd(), "data/balances.json");
  const balances = JSON.parse(fs.readFileSync(balancesPath));

  if (!balances[userId]) balances[userId] = { balance: 0, wager: 0, withdraw: 0 };
  balances[userId].balance += 10;

  fs.writeFileSync(balancesPath, JSON.stringify(balances, null, 2));
  res.status(200).send("Reward granted!");
}
