const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.post("/deviceinfo/add", (req, res) => {
  const existDevices = getdeviceData();
  const deviceData = req.body;
  if (deviceData.type == null || deviceData.name == null) {
    return res.status(401).send({ error: true, msg: "Device info missing" });
  }
  const findExist = existDevices.find(
    (device) => device.name === deviceData.name
  );
  if (findExist) {
    return res.status(409).send({ error: true, msg: "Name is already exist" });
  }
  existDevices.push(deviceData);
  savedeviceData(existDevices);
  res.send({ success: true, msg: "device info added successfully" });
});

app.post("/connectionsdetails/add", (req, res) => {
  const existDevices = getdeviceData();
  const deviceData = req.body;
  if (deviceData.source == null || deviceData.targets == null) {
    return res.status(401).send({ error: true, msg: "No Connection available" });
  }
  const findExist = existDevices.find(
    (device) => device.source === deviceData.source
  );
  if (findExist) {
    return res
      .status(409)
      .send({ error: true, msg: "connection is already exist" });
  }
  existDevices.push(deviceData);
  savedeviceData(existDevices);
  res.send({ success: true, msg: "connection created successfully" });
});

app.get("/deviceinfo/list", (req, res) => {
  const devices = getdeviceData();
  res.send(devices);
});


app.post("/deviceinfo/add/strength", (req, res) => {
  const existDevices = getdeviceData();
  const deviceData = req.body;
  if (deviceData.value == null) {
    return res.status(401).send({ error: true, msg: "Device info missing" });
  }
  const findExist = existDevices.find(
    (device) => device.value === deviceData.value
  );
  if (findExist) {
    return res.status(409).send({ error: true, msg: "Strenght already exist" });
  }
  existDevices.push(deviceData);
  savedeviceData(existDevices);
  res.send({ success: true, msg: "device info added successfully" });
});

const savedeviceData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("devices.json", stringifyData);
};

const getdeviceData = () => {
  const jsonData = fs.readFileSync("devices.json");
  return JSON.parse(jsonData);
};

app.listen(4000, () => {
  console.log("Server runs on port 4000");
});