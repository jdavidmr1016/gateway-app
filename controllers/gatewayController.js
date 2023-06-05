import { request, response } from "express";
import { v4 as uuidv4 } from "uuid";
import Gateway from "../models/gatewayModel.js";
import Device from "../models/deviceModel.js";

/* Each gateway has:
•	a unique serial number (string), 
•	human-readable name (string),
•	IPv4 address (to be validated),
•	multiple associated peripheral devices. 
 */

/* Get all gateways and 100% */
export const getGateways = async (request, response) => {
  try {
    const [count, gateways] = await Promise.all([
      Gateway.countDocuments({ active: true }),
      Gateway.find({ active: true }),
    ]);
    response.status(200).json({
      count,
      gateways,
    });
  } catch (error) {
    return response.status(404).json({ error });
  }
};
/* Get a Gateway with all devices */
export const getAGateway = async (request, response) => {
  try {
    const { serial } = request.params;
    const query = { serial, active: true };
    const gateway = await Gateway.findOne(query).populate("devices");

    return response.status(200).json({ gateway });
  } catch (error) {
    return response.status(404).json({ error });
  }
};
/* Create a Gateway 100*/
export const createGateways = async (request, response) => {
  try {
    const { name, ip, devices } = request.body;
    if (request.body.lenght === 0) {
      return response.status(404).json({ msg: "its an empty request" });
    }

    const serial = uuidv4();
    const gateway = new Gateway({
      serial,
      name,
      ip,
      devicesId: devices,
    });
    await gateway.save();
    return response.status(200).json({
      msg: "Gateway sucessfully created ",
    });
  } catch (error) {
    return response.status(404).json({ error });
  }
};
/* Delete a Gateway */
export const deleteGateways = async (request, response) => {
  try {
    const { serial } = request.params;
    const query = { serial, active: false };
    const isDeletedGateway = await Gateway.findOne(query);
    if (!isDeletedGateway) {
      /* Find the right gateway and set is active field to false to
       *maintain data-relations integrity */
      await Gateway.findOneAndUpdate({ serial }, { active: false });
      return response.status(200).json({
        msg: "Gateway deleted succesfull",
      });
    }
    return response.status(404).json({
      msg: "This Gateway was deleted far ago",
    });
  } catch (error) {
    return response.status(404).json({ error });
  }
};
