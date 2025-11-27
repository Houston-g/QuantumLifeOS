import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Event, InsertEvent, SystemMetrics } from "@shared/schema";

async function fetchEvents(limit: number = 10): Promise<Event[]> {
  const response = await fetch(`/api/events?limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}

async function createEvent(event: InsertEvent): Promise<Event> {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Failed to create event");
  return response.json();
}

async function searchEvents(query: string): Promise<Event[]> {
  const response = await fetch(`/api/events/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search events");
  return response.json();
}

async function fetchMetrics(): Promise<SystemMetrics> {
  const response = await fetch("/api/metrics");
  if (!response.ok) throw new Error("Failed to fetch metrics");
  return response.json();
}

export function useEvents(limit?: number) {
  return useQuery({
    queryKey: ["events", limit],
    queryFn: () => fetchEvents(limit),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
    },
  });
}

export function useSearchEvents(query: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["events", "search", query],
    queryFn: () => searchEvents(query),
    enabled: enabled && query.length > 0,
  });
}

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
