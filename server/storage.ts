import { type User, type InsertUser, type Event, type InsertEvent, type SystemMetrics, users, events, systemMetrics } from "@shared/schema";
import { db } from "../db";
import { desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEvent(event: InsertEvent): Promise<Event>;
  getRecentEvents(limit?: number): Promise<Event[]>;
  getEventsByType(type: string): Promise<Event[]>;
  searchEvents(query: string): Promise<Event[]>;
  
  getSystemMetrics(): Promise<SystemMetrics>;
  incrementEventsToday(): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(sql`${users.id} = ${id}`);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(sql`${users.username} = ${username}`);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    await this.incrementEventsToday();
    return newEvent;
  }

  async getRecentEvents(limit: number = 10): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.timestamp)).limit(limit);
  }

  async getEventsByType(type: string): Promise<Event[]> {
    return await db.select().from(events).where(sql`${events.type} = ${type}`).orderBy(desc(events.timestamp));
  }

  async searchEvents(query: string): Promise<Event[]> {
    return await db.select().from(events).where(
      sql`${events.title} ILIKE ${`%${query}%`} OR ${events.description} ILIKE ${`%${query}%`}`
    ).orderBy(desc(events.timestamp));
  }

  async getSystemMetrics(): Promise<SystemMetrics> {
    let [metrics] = await db.select().from(systemMetrics).limit(1);
    
    if (!metrics) {
      [metrics] = await db.insert(systemMetrics).values({
        storageUsedTb: 14,
        storagePercentage: 82,
        eventsToday: 0,
      }).returning();
    }
    
    return metrics;
  }

  async incrementEventsToday(): Promise<void> {
    const metrics = await this.getSystemMetrics();
    await db.update(systemMetrics)
      .set({ 
        eventsToday: metrics.eventsToday + 1,
        lastUpdated: new Date()
      })
      .where(sql`${systemMetrics.id} = ${metrics.id}`);
  }
}

export const storage = new DbStorage();
