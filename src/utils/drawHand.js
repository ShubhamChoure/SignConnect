export const drawHand = (ctx, hand) => {
    const keypoints = hand.keypoints || hand.landmarks;
  
    // Draw connections
    const connections = hand.connections || [];
    connections.forEach(([startIdx, endIdx]) => {
      const start = keypoints[startIdx];
      const end = keypoints[endIdx];
      if (start && end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  
    // Draw landmarks
    keypoints.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });
  };
  