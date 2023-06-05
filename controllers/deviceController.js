import { request, response } from "express";
import Device from "../models/deviceModel.js";
import Gateway from "../models/gatewayModel.js";

/* Each peripheral device has:
•	a UID (number),
•	vendor (string),
•	date created,
•	status - online/offline.
 */

/* Create a Device 100%*/
export const createDevices = async (request, response) => {
  try {
    /* Find the right gateway */
    const { serial } = request.params;

    const gateway = await Gateway.findOne({ serial });
    if (gateway) {
      const { devices } = await Gateway.findOne({ serial }).populate("devices");

      /* Has this Gateway 9 or less devices if true create and  insert the new device */
      if (devices.length <= 9) {
        const { vendor, status } = request.body;
        const uid = Date.now();
        const newDevice = new Device({ uid, vendor, status });

        const { _id } = await newDevice.save();

        const deviceId = _id.toString();
        devices.push(deviceId);

        await Gateway.findOneAndUpdate(
          { serial },
          {
            devices,
          }
        );
        return response.status(200).json({ msg: "Device added well" });
      }
      /* If the gateway already have 10 devices send the errror msg  */
      return response.status(404).json({
        msg: "This gateway already reached the max amount of devices",
      });
    }
    return response.status(404).json({
      msg: "This gateway isn't in the DB",
    });
  } catch (error) {
    return response.status(404).json({ error });
  }
};
/* delete a Device 100%*/
export const deleteDevices = async (request, response) => {
  try {
    const { id } = request.body;
    const { serial } = request.params;
    /* Delete the selected device from DB */
    await Device.findByIdAndDelete({ _id: id });
    /* Find the reference in the Gateway and remove */
    const { devices } = await Gateway.findOne({ serial }).populate("devices");
    const newDevices = devices.pull(id);
    await Gateway.findOneAndUpdate({ serial }, { devices: newDevices });
    /* Return response  */
    return response.status(200).json({ msg: "Device removed succesfully" });
  } catch (error) {
    return response.status(404).json({ error });
  }
};
