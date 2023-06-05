import { Schema, model } from "mongoose";

/* Each peripheral device has:
•	a UID (number) ok,
•	vendor (string) ok,
•	date created ok,
•	status - online/offline ok
 */
const DevicesSchema = Schema({
  uid: {
    type: "Number",
  },
  vendor: {
    type: "String",
  },
  created: { type: Date, default: Date.now },
  status: {
    type: "String",
  },
});

DevicesSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};
export default model("Device", DevicesSchema);
