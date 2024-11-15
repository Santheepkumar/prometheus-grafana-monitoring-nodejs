const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Default metrics (memory, CPU, etc.)
client.collectDefaultMetrics({ register });

// Custom metrics
const requestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"]
});
register.registerMetric(requestCounter);

app.use((req, res, next) => {
    res.on("finish", () => {
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status: res.statusCode
        });
    });
    next();
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.send(await register.metrics());
});

// Basic endpoint
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
