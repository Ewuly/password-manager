const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost'  // ou l'URL de votre frontend
}));
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/passwords', passwordRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
