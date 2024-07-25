import { useEffect, useRef, useState } from "react";

const BlueZone = () => {
  const canvasRef = useRef(null);
  const [dataPoints, setDataPoints] = useState([
    { x: 0, y: 150 },
    { x: 400, y: 150 },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawBlueZone = (points) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.lineTo(points[points.length - 1].x, canvas.height); // Bottom right corner
      ctx.lineTo(points[0].x, canvas.height); // Bottom left corner
      ctx.closePath();

      ctx.fillStyle = "cyan";
      ctx.fill();
      ctx.stroke();
    };

    drawBlueZone(dataPoints);
  }, [dataPoints]);

  // Example function to dynamically update the zone
  const updateDataPoints = () => {
    setDataPoints([
      { x: 0, y: 200 },
      { x: 400, y: 200 },
    ]);
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        width="800"
        height="400"
        style={{ border: "1px solid black" }}
      ></canvas>
      {/* <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" />

        <circle cx="150" cy="50" r="40" fill-opacity="0.7" />

        <circle cx="250" cy="50" r="40" fill-opacity="50%" />

        <circle cx="350" cy="50" r="40" style="fill-opacity: .25;" />
      </svg> */}
      <div style={{ position: "absolute" }}></div>
    </div>
  );
};

export default BlueZone;
