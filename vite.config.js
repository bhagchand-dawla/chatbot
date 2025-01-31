import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    host: '0.0.0.0',  // Ensures it binds to all network interfaces
    port: 5173,       // Port for the dev server, ensure it's consistent with your Render setup
  },
  preview: {
    allowedHosts: ['chatbot-yrmi.onrender.com', 'localhost'], // Add the Render domain here
  },
});
