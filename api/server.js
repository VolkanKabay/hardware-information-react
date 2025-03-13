import express from "express";
import si from "systeminformation";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to your System-Monitor!</h1>");
});

app.get("/systeminfo", async (req, res) => {
  try {
    const cpu = await si.cpu();
    const memory = await si.mem();
    const os = await si.osInfo();
    const diskLayout = await si.diskLayout();
    const battery = await si.battery();
    const graphics = await si.graphics();
    const processes = await si.processes();
    const services = await si.services();
    const users = await si.users();
    const all = await si.getAllData();

    res.json({
      cpu: `${cpu.manufacturer} ${cpu.brand} @ ${cpu.speed}GHz`,
      memory: `${(memory.used / 1024 / 1024 / 1024).toFixed(2)} GB / ${(
        memory.total /
        1024 /
        1024 /
        1024
      ).toFixed(2)} GB`,
      os: `${os.distro} (${os.arch})`,
      diskLayout: diskLayout.map((disk) => disk.name),
      battery: `${battery.percent}%`,
      graphics: `${graphics.controllers[0].model}`,
      processes: `${processes.all}`,
      services: `${services.length}`,
      users: `${users.length}`,
      all: all,
    });
  } catch (error) {
    res.status(500).json({ error: "Systeminformationen failed to load" });
  }
});

// Export the app for serverless
export default app;
