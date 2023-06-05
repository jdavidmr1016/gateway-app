import { Schema, model } from "mongoose";

/* Each gateway has:
•	a unique serial number (string) i will use the mongo ID ok, 
•	human-readable name (string) ok,
•	IPv4 address (to be validated) ok,
•	multiple associated peripheral devices ok. 
 */

const GatewaysSchema = Schema({
  serial: {
    type: "String",
  },
  name: {
    type: "String",
  },
  ip: {
    type: "string",
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
  active: {
    type: "Boolean",
    default: true,
  },
});

GatewaysSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();
  return data;
};
export default model("Gateway", GatewaysSchema);
