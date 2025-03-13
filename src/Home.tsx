import { JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSystemInfo } from "./redux/slices/systeminfo";
import type { AppDispatch, RootState } from "./redux/store";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Memory,
  Storage,
  Computer,
  Battery90,
  Videocam,
  Dashboard,
  Engineering,
  People,
  DeviceHub,
  Info,
  Search,
  Launch,
  Hardware,
} from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector((state: RootState) => state.systemInfo.loading);
  const systemInformation = useSelector(
    (state: RootState) => state.systemInfo.systemInfo
  );

  useEffect(() => {
    dispatch(fetchSystemInfo());
  }, [dispatch]);

  const getSearchUrl = (type: string, value: string) => {
    let searchTerm = "";

    switch (type) {
      case "cpu": {
        const cpuMatch = RegExp(
          /(intel|amd)\s+(core\s+i[3579]-\d+|ryzen\s+\d+)\S*/i
        ).exec(value);
        searchTerm = cpuMatch
          ? cpuMatch[0]
          : "CPU " + value.split(" ").slice(0, 3).join(" ");
        break;
      }
      case "gpu": {
        const gpuMatch = RegExp(
          /(nvidia|amd|intel)\s+(geforce|radeon|iris|hd)\s+\S+/i
        ).exec(value);
        searchTerm = gpuMatch
          ? gpuMatch[0]
          : value.split(" ").slice(0, 3).join(" ");
        break;
      }
      case "os":
        searchTerm = value.split(" ").slice(0, 3).join(" ");
        break;
      case "memory": {
        const memMatch = RegExp(/(\d+GB|\d+\s+GB)\s+(DDR\d+)?/i).exec(value);
        searchTerm = memMatch ? memMatch[0] + " RAM" : value;
        break;
      }
      default:
        searchTerm = value.split(" ").slice(0, 3).join(" ");
    }

    const encodedSearch = encodeURIComponent(searchTerm.trim());

    return {
      google: `https://www.google.com/search?q=${encodedSearch}`,
      amazon: `https://www.amazon.com/s?k=${encodedSearch}`,
    };
  };

  const extractCpuChips = (cpuString: string) => {
    const chips = [];
    if (cpuString.includes("Intel")) chips.push("Intel");
    if (cpuString.includes("AMD")) chips.push("AMD");
    if (cpuString.includes("Core i7")) chips.push("Core i7");
    if (cpuString.includes("Core i5")) chips.push("Core i5");
    if (cpuString.includes("Core i9")) chips.push("Core i9");
    if (cpuString.includes("Ryzen")) chips.push("Ryzen");

    const ghzMatch = RegExp(/(\d+\.\d+)GHz/).exec(cpuString);
    if (ghzMatch) chips.push(`${ghzMatch[1]} GHz`);

    return chips.length ? chips : ["CPU"];
  };

  const extractOsChips = (osString: string | string[]) => {
    const chips = [];
    if (osString.includes("Windows")) chips.push("Windows");
    if (osString.includes("Linux")) chips.push("Linux");
    if (osString.includes("macOS")) chips.push("macOS");
    if (osString.includes("10")) chips.push("10");
    if (osString.includes("11")) chips.push("11");
    return chips.length ? chips : ["OS"];
  };

  const extractGraphicsChips = (graphicsString: string | string[]) => {
    const chips = [];
    if (graphicsString.includes("NVIDIA")) chips.push("NVIDIA");
    if (graphicsString.includes("AMD")) chips.push("AMD");
    if (graphicsString.includes("Intel")) chips.push("Intel HD");
    if (graphicsString.includes("RTX")) chips.push("RTX");
    if (graphicsString.includes("GTX")) chips.push("GTX");
    return chips.length ? chips : ["GPU"];
  };

  const InfoCard = ({
    title,
    icon,
    content,
    type,
    value,
    chips = [],
  }: {
    title: string;
    icon: JSX.Element;
    content: JSX.Element;
    type: string;
    value: string;
    chips?: string[];
  }) => {
    const searchUrls = getSearchUrl(type, value);

    return (
      <Card
        elevation={3}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box sx={{ mr: 1 }}>{icon}</Box>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
          </Box>

          {chips.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
              {chips.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />
          {content}
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
          <Tooltip title="Search on Google">
            <Button
              size="small"
              href={searchUrls.google}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Search fontSize="small" />}
            >
              Google
            </Button>
          </Tooltip>

          <Tooltip title="Find on Amazon">
            <Button
              size="small"
              href={searchUrls.amazon}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Launch fontSize="small" />}
            >
              Amazon
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 4,
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          System Information Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "white", opacity: 0.9 }}>
          View detailed hardware and system metrics
        </Typography>
      </Paper>

      {isLoading ? (
        <Box sx={{ width: "100%", mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Gathering system information...
          </Typography>
          <LinearProgress color="primary" sx={{ height: 8, borderRadius: 4 }} />
        </Box>
      ) : systemInformation ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoCard
              title="CPU"
              icon={<Memory color="primary" />}
              content={<Typography>{systemInformation.cpu}</Typography>}
              type="cpu"
              value={systemInformation.cpu}
              chips={extractCpuChips(systemInformation.cpu)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Memory"
              icon={<Storage color="primary" />}
              content={<Typography>{systemInformation.memory}</Typography>}
              type="memory"
              value={systemInformation.memory}
              chips={[
                systemInformation.memory.includes("GB")
                  ? systemInformation.memory.split(" ")[0] + "GB"
                  : "RAM",
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Operating System"
              icon={<Computer color="primary" />}
              content={<Typography>{systemInformation.os}</Typography>}
              type="os"
              value={systemInformation.os}
              chips={extractOsChips(systemInformation.os)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Battery"
              icon={<Battery90 color="primary" />}
              content={<Typography>{systemInformation.battery}</Typography>}
              type="battery"
              value={systemInformation.battery}
              chips={
                systemInformation.battery.includes("%")
                  ? [systemInformation.battery.match(/(\d+)%/)?.[1] + "%"]
                  : ["Battery"]
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              title="Bios"
              icon={<Computer color="primary" />}
              content={
                <Typography>
                  {systemInformation.all.bios.version} <br />
                  {systemInformation.all.bios.releaseDate}
                </Typography>
              }
              type="bios"
              value={systemInformation.all.bios.version}
              chips={["Version: " + systemInformation.all.bios.version]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              title="Mainboard"
              icon={<Hardware color="primary" />}
              content={
                <Typography>
                  {systemInformation.all.baseboard.model} <br />
                </Typography>
              }
              type="bios"
              value={systemInformation.all.baseboard.model}
              chips={[systemInformation.all.baseboard.manufacturer]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard
              title="Graphics"
              icon={<Videocam color="primary" />}
              content={
                <Typography>
                  {systemInformation.all.graphics.controllers
                    .map((controller: { model: string }) => controller.model)
                    .join(", ")}
                </Typography>
              }
              type="gpu"
              value={systemInformation.graphics}
              chips={extractGraphicsChips(systemInformation.graphics)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Processes"
              icon={<Dashboard color="primary" />}
              content={<Typography>{systemInformation.processes}</Typography>}
              type="processes"
              value={systemInformation.processes}
              chips={[
                systemInformation.processes.match(/(\d+)/)?.[1] || "Processes",
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Services"
              icon={<Engineering color="primary" />}
              content={<Typography>{systemInformation.services}</Typography>}
              type="services"
              value={systemInformation.services}
              chips={[
                systemInformation.services.match(/(\d+)/)?.[1] || "Services",
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Users"
              icon={<People color="primary" />}
              content={<Typography>{systemInformation.users}</Typography>}
              type="users"
              value={systemInformation.users}
              chips={[systemInformation.users.match(/(\d+)/)?.[1] || "Users"]}
            />
          </Grid>

          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ mr: 1 }}>
                    <DeviceHub color="primary" />
                  </Box>
                  <Typography variant="h6" color="primary">
                    Disk Layout
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}
                >
                  <Chip label="Storage" size="small" variant="outlined" />
                  <Chip label="Disk" size="small" variant="outlined" />
                </Box>

                <Divider sx={{ mb: 2 }} />

                <List dense>
                  {systemInformation.diskLayout.map((disk, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Storage fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={disk}
                        primaryTypographyProps={{
                          sx: { wordBreak: "break-word" },
                        }}
                      />
                      <Button
                        size="small"
                        startIcon={<Search fontSize="small" />}
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          disk.split(" ").slice(0, 3).join(" ")
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Search
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No system information available
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Info color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              This could be due to insufficient permissions or an issue with the
              system information service OR you are not running the local
              backend using the commands: <br /> cd ./backend <br /> node
              server.js
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Home;
