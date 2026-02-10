
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bfhlRoutes from './src/routes/bfhlRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL = "navya3887.beai23@chitkara.edu.in";

app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
    res.json({
        is_success: true,
        official_email: EMAIL
    });
});

app.use(bfhlRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
