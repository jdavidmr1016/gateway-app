const dotenv = require("dotenv");
dotenv.config();

const url = process.env.BASE_URL;
const options = {
  method: "GET",
  headers: { "Content-type": "application/json" },
};

const params = {
  method: "DELETE",
  headers: { "Content-type": "application/json" },
};

it("Fetch a gateway ", async () => {
  const resp = await fetch(`${url}gateways`, options);
  const data = await resp.json();
  const { gateways } = data;
  const [item] = gateways;
  const { serial } = item;

  /* Delete a gateway with his SN */
  const response = await fetch(`${url}gateways/${serial}`, params);
  const { msg } = await response.json();
  expect(msg).toBe("Gateway deleted succesfull");
});
