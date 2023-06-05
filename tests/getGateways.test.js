const dotenv = require("dotenv");
dotenv.config();

const url = process.env.BASE_URL;
const options = {
  method: "GET",
  headers: { "Content-type": "application/json" },
};

it("Fetch all gateways", async () => {
  const resp = await fetch(`${url}gateways`, options);
  const data = await resp.json();
  const { count, gateways } = data;
  if (!count && !gateways) {
    throw new Error("There isn't any count or gateways in  the response ");
  }
});
it("Fetch a gateway ", async () => {
  const resp = await fetch(`${url}gateways`, options);
  const data = await resp.json();
  const { count, gateways } = data;
  const [item] = gateways;
  const { serial } = item;
  /* Fetch a gateway with his SN */
  const response = await fetch(`${url}gateways/${serial}`, options);
  const { gateway } = await response.json();
  if (!gateway) {
    throw new Error("There isn't any  gateways in the response ");
  }
});
