"use client";

import { useState, useEffect } from "react";

interface Calculation { name: string; gasPrice: number; kmPerLiter: number; multiplier: number; distance: number; costPerKm: number; totalCost: number; }

export default function Home() { const [gasPrice, setGasPrice] = useState(26); const [kmPerLiter, setKmPerLiter] = useState(15.1); const [multiplier, setMultiplier] = useState(1); const [distance, setDistance] = useState(0); const [name, setName] = useState(""); const [history, setHistory] = useState<Calculation[]>([]);

useEffect(() => { if (typeof window !== "undefined") { const stored = localStorage.getItem("costHistory"); if (stored) { setHistory(JSON.parse(stored)); } } }, []);

const costPerKm = (gasPrice / kmPerLiter) * multiplier; const totalCost = costPerKm * distance;

const saveCalculation = () => { if (!name.trim()) return; const newCalc: Calculation = { name, gasPrice, kmPerLiter, multiplier, distance, costPerKm, totalCost, }; const updated = [newCalc, ...history]; setHistory(updated); localStorage.setItem("costHistory", JSON.stringify(updated)); setName(""); };

return ( <main className="min-h-screen bg-gradient-to-br from-neutral-900 to-black text-white flex flex-col items-center p-4"> <div className="bg-white/5 backdrop-blur shadow-2xl rounded-3xl p-8 max-w-md w-full space-y-6 border border-white/10"> <h1 className="text-3xl font-bold text-center text-white"> 🚗 Calculadora de Costo por Kilómetro </h1>

<div className="space-y-4">
      <label className="block">
        <span className="text-sm text-white/70">Precio por litro (MXN)</span>
        <input
          type="number"
          placeholder="Precio por litro"
          value={gasPrice}
          onChange={(e) => setGasPrice(+e.target.value)}
          className="input-style mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm text-white/70">Rendimiento del auto (km/L)</span>
        <input
          type="number"
          placeholder="Km por litro"
          value={kmPerLiter}
          onChange={(e) => setKmPerLiter(+e.target.value)}
          className="input-style mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm text-white/70">Multiplicador</span>
        <input
          type="number"
          step="0.1"
          placeholder="Multiplicador"
          value={multiplier}
          onChange={(e) => setMultiplier(+e.target.value)}
          className="input-style mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm text-white/70">Distancia del viaje (km)</span>
        <input
          type="number"
          placeholder="Distancia en km"
          value={distance}
          onChange={(e) => setDistance(+e.target.value)}
          className="input-style mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm text-white/70">Nombre para guardar</span>
        <input
          type="text"
          placeholder="Ej. Viaje a Puebla"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-style mt-1"
        />
      </label>

      <button
        onClick={saveCalculation}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition"
      >
        Guardar cálculo 💾
      </button>
    </div>

    <div className="text-center space-y-2 pt-2 border-t border-white/10">
      <p className="text-lg font-semibold text-white">
        💸 Costo por km: <span className="text-blue-400">${costPerKm.toFixed(2)}</span>
      </p>
      <p className="text-lg font-semibold text-white">
        🧾 Total por {distance} km: <span className="text-green-400">${totalCost.toFixed(2)}</span>
      </p>
    </div>
  </div>

  {history.length > 0 && (
    <div className="mt-10 w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold text-white">📚 Historial</h2>
      {history.map((item, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur shadow-md rounded-xl p-4 border border-white/10"
        >
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-sm text-white/80">
            {item.distance} km → ${item.totalCost.toFixed(2)} MXN ({item.costPerKm.toFixed(2)} por km)
          </p>
        </div>
      ))}
    </div>
  )}
</main>

); }