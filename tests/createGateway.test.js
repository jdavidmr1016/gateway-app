const dotenv = require("dotenv");
dotenv.config();

const url = process.env.BASE_URL;
const fakeData = {
  name: "Net Guard",
  ip: "1.1.1.1",
  devices: [],
};
const options = {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify(fakeData),
};

it("Create a gateway", async () => {
  const resp = await fetch(`${url}gateways`, options);
  const { msg } = await resp.json();
  expect(msg).toBe("Gateway sucessfully created ");
});
const wrongData = {
  name: "Net Guard",
  ip: "1.1.1.500",
  devices: [],
};
const params = {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify(wrongData),
};

it("Create a gateway not passing the IP Validation", async () => {
  const resp = await fetch(`${url}gateways`, params);
  const { errors } = await resp.json();
  const [{ msg, param }] = errors;
  expect(msg).toBe("This is not a valid IPv4 address");
  expect(param).toBe("ip");
});
