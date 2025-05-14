import { 
  users, 
  type User, 
  type InsertUser, 
  contactMessages, 
  type ContactMessage, 
  type InsertContact 
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";

// Load environment variables
dotenv.config();

// Create PostgreSQL pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create drizzle connection
const db = drizzle(pool);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message methods
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

// Memory storage implementation for development/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactMessage>;
  currentUserId: number;
  currentContactId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt 
    };
    this.contacts.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contacts.values());
  }
}

// Database storage implementation using Drizzle ORM
export class DBStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(message).returning();
    return result[0];
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.id);
  }
}

// Use DB storage when DATABASE_URL is available, otherwise fallback to memory storage
export const storage = process.env.DATABASE_URL 
  ? new DBStorage() 
  : new MemStorage();
