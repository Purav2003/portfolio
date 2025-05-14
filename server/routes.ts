import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get EmailJS credentials
  app.get('/api/emailjs-config', (req, res) => {
    res.json({
      publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
      serviceId: process.env.EMAILJS_SERVICE_ID || '',
      templateId: process.env.EMAILJS_TEMPLATE_ID || '',
    });
  });
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate input
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required" 
        });
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email format" 
        });
      }
      
      try {
        // Parse and validate using zod schema
        const contactData = insertContactSchema.parse({
          name,
          email,
          subject,
          message
        });
        
        // Store in the database
        const savedMessage = await storage.createContactMessage(contactData);
        
        return res.status(200).json({ 
          success: true, 
          message: "Message received successfully",
          data: savedMessage
        });
      } catch (validationError) {
        console.error("Validation error:", validationError);
        return res.status(400).json({
          success: false,
          message: "Invalid form data"
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Endpoint to get all contact messages (admin use only)
  app.get("/api/contact/messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contact messages"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
