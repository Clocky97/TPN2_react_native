import React, { createContext, useContext, useState } from 'react';
import { Pila } from '../estructuras/Pila';
import { Cola } from '../estructuras/Cola';
import { Plato } from '../data/platos';

export interface Pedido {
  numero: number;
  items: { plato: Plato; cantidad: number }[];
  nota: string;
  total: number;
  fecha: Date;
}

interface AppContextType {
  usuario: { nombre: string } | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  carrito: { plato: Plato; cantidad: number }[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerCarrito: () => void;
  puedeDeshacer: boolean;
  totalCarrito: number;
  nota: string;
  setNota: (n: string) => void;
  confirmarPedido: () => number;
  colaPedidos: Cola<Pedido>;
  pilaAtendidos: Pila<Pedido>;
  atenderSiguientePedido: () => Pedido | undefined;
  pedidosVersion: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null);
  const [carrito, setCarrito] = useState<{ plato: Plato; cantidad: number }[]>([]);
  const [pilaDeshacer] = useState<Pila<Plato>>(new Pila<Plato>());
  const [nota, setNota] = useState<string>('');
  const [colaPedidos] = useState<Cola<Pedido>>(new Cola<Pedido>());
  const [pilaAtendidos] = useState<Pila<Pedido>>(new Pila<Pedido>());
  const [contadorTurnos, setContadorTurnos] = useState<number>(101);
  const [pedidosVersion, setPedidosVersion] = useState<number>(0);

  const login = (u: string, p: string) => {
    if (u === 'cocina' && p === '1234') {
      setUsuario({ nombre: 'Personal de Cocina' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
  };

  const agregarAlCarrito = (plato: Plato) => {
    pilaDeshacer.push(plato);
    setCarrito((prev) => {
      const idx = prev.findIndex((item) => item.plato.id === plato.id);
      if (idx >= 0) {
        const copia = [...prev];
        copia[idx] = { ...copia[idx], cantidad: copia[idx].cantidad + 1 };
        return copia;
      }
      return [...prev, { plato, cantidad: 1 }];
    });
  };

  const deshacerCarrito = () => {
    const ultimoPlato = pilaDeshacer.pop();
    if (!ultimoPlato) return;

    setCarrito((prev) => {
      const idx = prev.findIndex((item) => item.plato.id === ultimoPlato.id);
      if (idx === -1) return prev;
      const copia = [...prev];
      if (copia[idx].cantidad > 1) {
        copia[idx] = { ...copia[idx], cantidad: copia[idx].cantidad - 1 };
      } else {
        copia.splice(idx, 1);
      }
      return copia;
    });
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.plato.precio * item.cantidad, 0);

  const confirmarPedido = () => {
    if (carrito.length === 0) return 0;
    const numTurno = contadorTurnos;
    setContadorTurnos((prev) => prev + 1);

    const nuevoPedido: Pedido = {
      numero: numTurno,
      items: [...carrito],
      nota,
      total: totalCarrito,
      fecha: new Date(),
    };

    colaPedidos.encolar(nuevoPedido);
    setPedidosVersion((prev) => prev + 1);
    setCarrito([]);
    while (!pilaDeshacer.vacia) {
      pilaDeshacer.pop();
    }
    setNota('');
    return numTurno;
  };

  const atenderSiguientePedido = () => {
    const pedido = colaPedidos.desencolar();
    if (pedido) {
      pilaAtendidos.push(pedido);
      setPedidosVersion((prev) => prev + 1);
    }
    return pedido;
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        login,
        logout,
        carrito,
        agregarAlCarrito,
        deshacerCarrito,
        puedeDeshacer: !pilaDeshacer.vacia,
        totalCarrito,
        nota,
        setNota,
        confirmarPedido,
        colaPedidos,
        pilaAtendidos,
        atenderSiguientePedido,
        pedidosVersion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
}