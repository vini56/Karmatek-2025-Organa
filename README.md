
<h1 align="center">🩸 Organa: Smart Organ Donation Network & Notification System 🏥</h1>
    <p align="center"><em>Connecting donors and recipients through AI-driven precision.</em></p>

<h2>📖 Table of Contents</h2>
    <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#acknowledgments">Acknowledgments</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>

<h2 id="overview">🔍 Overview</h2>
<p>
    Organa is a platform designed to revolutionize organ and blood donation by intelligently matching donors with recipients. 
    Using a proprietary <strong>scoring algorithm</strong> and <strong>generative AI</strong>, the system analyzes medical data, urgency, 
    compatibility, and geographic factors to prioritize and optimize life-saving connections.
</p>
<h2 id="features">✨ Features</h2>
<ul>
    <li>🚀 <strong>Smart Matching Algorithm:</strong> Prioritizes matches based on medical compatibility, urgency, and logistics.</li>
    <li>🤖 <strong>Generative AI Analysis:</strong> Predicts transplant success rates and generates donor-recipient compatibility reports.</li>
    <li>🩺 <strong>Real-Time Donor-Recipient Network:</strong> Live updates for blood/organ availability and recipient needs.</li>
    <li>🔔 <strong>Automated Alerts:</strong> Notify hospitals, donors, and recipients of critical matches.</li>
    <li>📊 <strong>Analytics Dashboard:</strong> Track donation trends, success rates, and system performance.</li>
    <li>📝 <strong>Collects Data to Train Model:</strong> Organ and patient data is collected in real-time from hospitals, including details like organ type, condition, blood type, patient medical history, and urgency. This data is crucial for developing a machine learning model to improve matching accuracy.</li>
    <li>
    <strong>🌐Centralised Network:</strong>
    The system creates a centralized network that allows hospitals to share available organs with nearby hospitals if they match a patient from their list. This eliminates manual interventions and speeds up the organ-sharing process.</li>
</ul>

<h2 id="installation">⚙ Installation</h2>



```
# Clone the repository
git clone https://github.com/Subhradeep1708/Karmatek-2025-Organa
```

### Backend (Python + Fast API)

```
cd backend

# Create A Virtual Environment
python -m venv venv

# Activate The Virtual Env
./venv/Scripts/activate

# Install All the dependencies
pip install -r requirements.txt

# Run the developmen server
uvicorn app.main:app --reload
```

### Frontend (Next.js)

```
cd frontend

# Install Dependencies
bun install

# Configure .env

# Run the development Server
bun run dev
```

### Notification Service

```
cd ws

# Install Dependencies
bun install

# Configure .env

# Run the development Server
bun run dev
```

<h2 id="usage">🚀 Usage</h2>
<ol>
    <li>Register as a donor or recipient with medical credentials.</li>
    <li>The system automatically matches donors/recipients using the scoring algorithm.</li>
    <li>Generative AI analyzes compatibility and generates risk/success reports.</li>
    <li>Receive real-time alerts for matches via email/SMS.</li>
    <li>Access the dashboard to view analytics and manage donations.</li>
</ol>
<!-- <img src="screenshots/dashboard.png" alt="Dashboard Preview" width="600"> -->
<h2 id="contributing">👥 Contributing</h2>
<p>Contributions are welcome! Follow these steps:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a feature branch (<code>git checkout -b feature/AmazingFeature</code>).</li>
    <li>Commit changes (<code>git commit -m 'Add AmazingFeature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/AmazingFeature</code>).</li>
    <li>Open a Pull Request.</li>
</ol>

<h2 id="license">📜 License</h2>
<p>Distributed under the MIT License. See <code>LICENSE</code> for details.</p>
<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License Badge">
<h2 id="acknowledgments">🙏 Acknowledgments</h2>
<ul>
    <li>Generative AI Model: Gemini Flash 1.5</li>
    <!-- <li>Medical Data Libraries: FHIR, HL7</li> -->
    <li>UI Framework: React, Next.js, ShadCN</li>
</ul>
<h2 id="contact">📞 Contact</h2>
<p>
    Project Maintainers: 
    <a href="mailto:subhradeep1708@gmail.com">subhradeep1708@gmail.com</a><br>
    GitHub: <a href="https://github.com/yourusername">@Subhradeep1708</a>
</p>