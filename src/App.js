// App.js
import React, { useState, useEffect } from "react";
import StickerCanvas from "./components/StickerCanvas";
import { ITEMS } from "./data/items";

export default function App() {
  const [unlockedItems, setUnlockedItems] = useState(() => {
    return JSON.parse(localStorage.getItem("unlocked-items")) || [];
  });

  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem("user-points")) || 100;
  });

  const unlockItem = (id, cost) => {
    if (points >= cost && !unlockedItems.includes(id)) {
      const updated = [...unlockedItems, id];
      setUnlockedItems(updated);
      localStorage.setItem("unlocked-items", JSON.stringify(updated));
      const newPoints = points - cost;
      setPoints(newPoints);
      localStorage.setItem("user-points", newPoints);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Times New Roman', serif" }}>
      <h1>🌿 Garden Shop 🌸</h1>
      <p>Points: {points}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {ITEMS.map((item) => (
          <div key={item.id} style={{ textAlign: "center", width: 120 }}>
            <img src={item.image} alt={item.name} style={{ width: "100%" }} />
            <p>{item.name}</p>
            <p>{item.cost} pts</p>
            <button
              onClick={() => unlockItem(item.id, item.cost)}
              disabled={unlockedItems.includes(item.id)}
            >
              {unlockedItems.includes(item.id) ? "Unlocked" : "Unlock"}
            </button>
          </div>
        ))}
      </div>
      <hr style={{ margin: "40px 0" }} />
      <StickerCanvas unlockedItems={unlockedItems} />
    </div>
 // StickerCanvas.js
import React, { useRef, useEffect, useState } from "react";

export default function StickerCanvas({ items }) {
  const canvasRef = useRef(null);
  const [stickers, setStickers] = useState(() => {
    return JSON.parse(localStorage.getItem("placed-stickers") || "[]");
  });

  useEffect(() => {
    drawCanvas();
  }, [stickers]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stickers.forEach((sticker) => {
      const img = new Image();
      img.src = sticker.src;
      img.onload = () => {
        ctx.drawImage(img, sticker.x, sticker.y, 100, 100);
      };
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("sticker-src");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSticker = { src, x, y };
    const updatedStickers = [...stickers, newSticker];
    setStickers(updatedStickers);
    localStorage.setItem("placed-stickers", JSON.stringify(updatedStickers));
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: "2px dashed #91a17c", backgroundColor: "#fff7f9" }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    />
    import React from "react";

const stickers = [
  {
    id: "flower1",
    name: "Flower 1",
    url:
      "https://i-p.rmcdn.net/67f18a5b2157852deeb4f9da/5428837/image-ab17c715-6051-4961-a0bc-b148eaf4b1c1.png?w=294&e=webp&nll=true&cX=708&cY=92&cW=476&cH=896"
  },
  {
    id: "tree1",
    name: "Tree 1",
    url:
      "https://i-p.rmcdn.net/67f18a5b2157852deeb4f9da/5428837/image-0d20f072-2f57-4420-b3e7-4f11517b2446.png?w=1025&e=webp&nll=true&cX=190&cY=0&cW=1050&cH=1057"
  },
  {
    id: "bench1",
    name: "Seating 1",
    url:
      "https://i-p.rmcdn.net/67f18a5b2157852deeb4f9da/5428837/image-1461cafa-765f-428d-ac66-f838f51b0980.png?w=909&e=webp&nll=true&cX=380&cY=15&cW=944&cH=1051"
  }
];

function StickerPanel({ onStickerClick }) {
  return (
    <div className="sticker-panel p-4 border-r border-gray-300 h-full overflow-y-auto bg-pink-50">
      <h2 className="text-lg font-bold text-green-800 mb-2">🌿 Stickers 🌸</h2>
      <div className="grid grid-cols-2 gap-3">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="cursor-pointer border border-pink-200 rounded-lg p-1 hover:shadow-lg"
            onClick={() => onStickerClick(sticker.url)}
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-full h-auto rounded"
            />
            <p className="text-xs text-center mt-1 text-green-700">
              {sticker.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerPanel;
  );
}
