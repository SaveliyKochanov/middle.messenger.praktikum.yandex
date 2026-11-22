import { merge, set, type Indexed } from "../utils";

type Listener = () => void;

class Store {
  private state: Indexed = {};

  private listeners: Set<Listener> = new Set();

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = merge(this.state, set({}, path, value) as Indexed);

    this.emit();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    [...this.listeners].forEach((listener) => listener());
  }
}

export const store = new Store();
