const dotenv = require("dotenv");
dotenv.config();

const url = process.env.BASE_URL;
const options = {
  method: "GET",
  headers: { "Content-type": "application/json" },
};

const setParams = (id, method = "GET") => {
  return {
    method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(id),
  };
};

it("Delete a device inside a Gateway ", async () => {
  const resp = await fetch(`${url}gateways`, options);
  const data = await resp.json();
  const { gateways } = data;
  const [item] = gateways;
  const { serial } = item;
  /* Fetch a gateway with his SN */
  const response = await fetch(`${url}gateways/${serial}`, options);
  const { gateway } = await response.json();

  if (gateway.devices.lenght >= 1) {
    throw new Error(
      "Please create more devices in the first 3 gateways to run this test"
    );
  }
  const [{ _id }] = gateway.devices;
  const newRes = await fetch(
    `${url}gateway/${serial}`,
    setParams({ id: _id }, "DELETE")
  );
  const { msg } = await newRes.json();
  expect(msg).toBe("Device removed succesfully");
});
