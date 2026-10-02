export class Cola<T> {
  #items: T[] = [];
  #inicio: number = 0;

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const item = this.#items[this.#inicio];
    this.#inicio++;
    if (this.#inicio > 100 && this.#inicio * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#inicio);
      this.#inicio = 0;
    }
    return item;
  }

  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#inicio];
  }

  get vacia(): boolean {
    return this.#inicio >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#inicio;
  }

  aArray(): T[] {
    return this.#items.slice(this.#inicio);
  }
}