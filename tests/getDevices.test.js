const dotenv = require("dotenv");
dotenv.config();

const url = process.env.BASE_URL;
const options = {
  method: "GET",
  headers: { "Content-type": "application/json" },
};
it("Fetch devices inside a Gateway ", async () => {
  const resp = await fetch(`${url}gateways`, options);
  const data = await resp.json();
  const { gateways } = data;
  const [item] = gateways;
  const { serial } = item;
  /* Fetch a gateway with his SN */
  const response = await fetch(`${url}gateways/${serial}`, options);
  const { gateway } = await response.json();
  const { devices } = gateway;
  if (!devices) {
    throw new Error("There isn't any  device in the response ");
  }
});
