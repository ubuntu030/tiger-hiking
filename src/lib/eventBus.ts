type Handler = (payload: any) => void;

class EventBus {
  private events: { [key: string]: Handler[] } = {};

  on(event: string, handler: Handler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event: string, handler: Handler): void {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((h) => h !== handler);
    }
  }

  emit(event: string, payload?: any): void {
    if (this.events[event]) {
      this.events[event].forEach((handler) => handler(payload));
    }
  }
}

export const eventBus = new EventBus();
