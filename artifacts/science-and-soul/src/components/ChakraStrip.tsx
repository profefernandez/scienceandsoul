const chakras = [
  { emoji: "🔴", bg: "#ef9a9a", color: "#b71c1c", border: "#ef9a9a", name: "Root", sanskrit: "Muladhara" },
  { emoji: "🟠", bg: "#ffcc80", color: "#e65100", border: "#ffb74d", name: "Sacral", sanskrit: "Svadhisthana" },
  { emoji: "🟡", bg: "#fff59d", color: "#c8971a", border: "#f9a825", name: "Solar Plexus", sanskrit: "Manipura" },
  { emoji: "💚", bg: "#a5d6a7", color: "#2e7d32", border: "#81c784", name: "Heart", sanskrit: "Anahata" },
  { emoji: "🔵", bg: "#b2dfdb", color: "#00695c", border: "#80cbc4", name: "Throat", sanskrit: "Vishuddha" },
  { emoji: "🔷", bg: "#c5cae9", color: "#283593", border: "#9fa8da", name: "Third Eye", sanskrit: "Ajna" },
  { emoji: "💜", bg: "#e1bee7", color: "#6a1b9a", border: "#ce93d8", name: "Crown", sanskrit: "Sahasrara" },
];

export function ChakraStrip() {
  return (
    <div className="cstrip">
      <div className="ww">
        <div className="csinner">
          {chakras.map((c) => (
            <div className="ci" key={c.name}>
              <div
                className="cidot"
                style={{ background: c.bg, color: c.color, borderColor: c.border }}
              >
                {c.emoji}
              </div>
              <div className="ciname" style={{ color: c.color }}>{c.name}</div>
              <div className="cielem">{c.sanskrit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
