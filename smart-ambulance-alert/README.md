# Smart Ambulance Alert System (SAAS)

A front-end prototype for an AI-assisted emergency traffic management platform.

## What is included

- Responsive landing page
- How-it-works section
- Technology/features section
- Municipality control dashboard
- Simulated ambulance route
- Simulated roadside warning signals
- Signal status panel
- System activity log
- Prototype municipality login modal
- No backend or real GPS/API connection yet

## Project structure

```text
smart-ambulance-alert/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## Run locally

The project is plain HTML/CSS/JavaScript, so no Node.js installation is required.

Option 1:
Open `index.html` directly in your browser.

Option 2 (recommended):
Use VS Code + Live Server and open the local server URL.

## Important prototype note

The ambulance movement, AI route behavior and signal activation are simulated in JavaScript. They are not connected to a real ambulance, GPS, municipality traffic system, database, or AI model.

For a real SaaS product, the next layer would be:
1. User authentication
2. Municipality accounts and roles
3. Backend API
4. Database
5. Real ambulance GPS ingestion
6. Traffic data integration
7. AI route/activation service
8. IoT communication with roadside signal units
9. Audit logs and monitoring
10. Secure deployment

## GitHub Pages

This static prototype can be published with GitHub Pages.

1. Create a GitHub repository, e.g. `smart-ambulance-alert`.
2. Upload the project files.
3. Go to `Settings` → `Pages`.
4. Under "Build and deployment", choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save.
6. GitHub will generate a public Pages URL.

Because this prototype is static, it can run directly on GitHub Pages.

## Suggested production architecture

```text
Ambulance GPS
     │
     ▼
Backend API ───── Traffic Data
     │
     ▼
AI Route / Alert Engine
     │
     ├──────────────► Municipality Dashboard
     │
     ▼
IoT / Communication Gateway
     │
     ▼
Roadside Warning Signals
     │
     ▼
Drivers
```
