import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle settings (Full screen 3D distribution)
    const particleCount = 85;
    const particles = [];

    // Initialize particles distributed in a large 3D box spanning the viewport
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        // 3D coordinates relative to screen center
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 500 - 250, // depth from -250 to 250
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseTimer: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? "cyan" : "violet",
        px: 0, py: 0, // Projected 2D coordinates
        projectedZ: 0 // Rotated depth
      });
    }

    // Data pulse signals
    const signalCount = 6;
    const signals = Array.from({ length: signalCount }, () => ({
      fromNode: -1,
      toNode: -1,
      progress: 1.0,
      speed: 0.01
    }));

    // Handle mouse events
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Resize canvas
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      // Clear transparently
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const time = Date.now() * 0.001;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle mouse spotlight glow in the background
      if (mouse.active) {
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          width * 0.35
        );
        if (isLight) {
          spotlight.addColorStop(0, "rgba(99, 102, 241, 0.04)");
          spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          spotlight.addColorStop(0, "rgba(99, 102, 241, 0.1)");
          spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");
        }
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // Calculate camera tilt based on mouse position
      const targetRotX = mouse.active ? (mouse.y - height / 2) * 0.0006 : 0;
      const targetRotY = mouse.active ? (mouse.x - width / 2) * 0.0006 : 0;
      
      let rotX = targetRotX;
      let rotY = targetRotY;

      // Add a slow continuous drift rotation
      const rx = rotX + time * 0.012;
      const ry = rotY + time * 0.018;

      const cosRx = Math.cos(rx);
      const sinRx = Math.sin(rx);
      const cosRy = Math.cos(ry);
      const sinRy = Math.sin(ry);

      // Camera parameters
      const fov = 550;
      const distance = 680;
      const cx = width / 2;
      const cy = height / 2;

      // Update particle physics and project to screen space
      particles.forEach((p) => {
        // Slow continuous organic drifting movement in 3D
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Pulse size
        p.pulseTimer += p.pulseSpeed;

        // 3D rotation math
        // Yaw (around Y axis)
        const rx1 = p.x * cosRy - p.z * sinRy;
        const rz1 = p.x * sinRy + p.z * cosRy;
        const ry1 = p.y;

        // Pitch (around X axis)
        const ry2 = ry1 * cosRx - rz1 * sinRx;
        const rz2 = ry1 * sinRx + rz1 * cosRx;

        p.projectedZ = rz2;

        // Perspective projection
        const scale = fov / (rz2 + distance);
        p.px = cx + rx1 * scale;
        p.py = cy + ry2 * scale;

        // Boundary wrap checks in 3D box coordinates
        const boxX = width / 2 + 80;
        const boxY = height / 2 + 80;
        
        if (p.x < -boxX) p.x = boxX;
        if (p.x > boxX) p.x = -boxX;
        if (p.y < -boxY) p.y = boxY;
        if (p.y > boxY) p.y = -boxY;
        if (p.z < -250) p.z = 250;
        if (p.z > 250) p.z = -250;
      });

      // Draw connection lines between neighboring particles in 3D
      ctx.lineWidth = 0.65;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.sqrt(dx*dx + dy*dy + dz*dz);

          // Connect neighbors that are mathematically close in 3D space
          if (dist3D < 165) {
            const avgZ = (p1.projectedZ + p2.projectedZ) / 2;
            
            // Normalize depth to [0, 1] range (0 = closest, 1 = furthest)
            let depthRatio = (avgZ + 250) / 500;
            depthRatio = Math.max(0, Math.min(1, depthRatio));
            const closeRatio = 1 - depthRatio;

            // Fade lines based on depth to create volumetric 3D network cues
            const alpha = (1 - dist3D / 165) * 0.12 * (0.3 + closeRatio * 0.7);

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);

            if (isLight) {
              ctx.strokeStyle = `rgba(30, 41, 59, ${alpha * 0.6})`;
            } else {
              // Color transitions dynamically based on particle colors
              if (p1.color === "cyan" && p2.color === "cyan") {
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              } else if (p1.color === "violet" && p2.color === "violet") {
                ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              } else {
                ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`; // Mixed indigo
              }
            }
            ctx.stroke();
          }
        }
      }

      // Draw interactive connections from mouse to nearby projected particle nodes
      if (mouse.active) {
        particles.forEach((p) => {
          const dx = mouse.x - p.px;
          const dy = mouse.y - p.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 185) {
            const alpha = (1 - dist / 185) * 0.22;
            const grad = ctx.createLinearGradient(mouse.x, mouse.y, p.px, p.py);
            
            if (isLight) {
              grad.addColorStop(0, `rgba(79, 70, 229, ${alpha})`);
              grad.addColorStop(1, `rgba(15, 23, 42, ${alpha * 0.5})`);
            } else {
              grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
              grad.addColorStop(0.3, `rgba(99, 102, 241, ${alpha})`);
              grad.addColorStop(1, p.color === "cyan" ? `rgba(6, 182, 212, ${alpha * 0.4})` : `rgba(139, 92, 246, ${alpha * 0.4})`);
            }

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.px, p.py);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        });
      }

      // Draw data flow pulses traveling along lines
      signals.forEach((s) => {
        // If a signal completed its path, find a new path
        if (s.progress >= 1.0) {
          const fromIdx = Math.floor(Math.random() * particles.length);
          const neighbors = [];
          
          // Find connected neighbors in 3D
          for (let j = 0; j < particles.length; j++) {
            if (fromIdx === j) continue;
            const dx = particles[fromIdx].x - particles[j].x;
            const dy = particles[fromIdx].y - particles[j].y;
            const dz = particles[fromIdx].z - particles[j].z;
            const dist3D = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist3D < 165) {
              neighbors.push(j);
            }
          }

          if (neighbors.length > 0) {
            s.fromNode = fromIdx;
            s.toNode = neighbors[Math.floor(Math.random() * neighbors.length)];
            s.progress = 0.0;
            s.speed = 0.008 + Math.random() * 0.014;
          }
        }

        // Draw and update active signal
        if (s.progress < 1.0 && s.fromNode !== -1 && s.toNode !== -1) {
          s.progress += s.speed;
          
          const p1 = particles[s.fromNode];
          const p2 = particles[s.toNode];
          
          // Interpolated 3D position
          const sx = p1.x + (p2.x - p1.x) * s.progress;
          const sy = p1.y + (p2.y - p1.y) * s.progress;
          const sz = p1.z + (p2.z - p1.z) * s.progress;

          // Project signal to 2D
          // Yaw
          const rx1 = sx * cosRy - sz * sinRy;
          const rz1 = sx * sinRy + sz * cosRy;
          const ry1 = sy;

          // Pitch
          const ry2 = ry1 * cosRx - rz1 * sinRx;
          const rz2 = ry1 * sinRx + rz1 * cosRx;

          const scale = fov / (rz2 + distance);
          const spx = cx + rx1 * scale;
          const spy = cy + ry2 * scale;

          // Draw small glowing signal pulse
          ctx.beginPath();
          ctx.arc(spx, spy, 2.0, 0, Math.PI * 2);
          
          if (isLight) {
            ctx.fillStyle = "rgba(79, 70, 229, 0.85)";
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 6;
          }
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow blur immediately
        }
      });

      // Draw particle nodes on top
      particles.forEach((p) => {
        const pulseRadius = p.radius * (1.0 + Math.sin(p.pulseTimer) * 0.12);
        
        let depthRatio = (p.projectedZ + 250) / 500;
        depthRatio = Math.max(0, Math.min(1, depthRatio));
        const closeRatio = 1 - depthRatio;

        // Size & opacity based on 3D depth coordinate
        const finalSize = pulseRadius * (0.5 + closeRatio * 1.0);
        const opacity = p.alpha * (0.3 + closeRatio * 0.7);

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.4, finalSize), 0, Math.PI * 2);

        let fillStyle;
        if (isLight) {
          fillStyle = p.color === "cyan" ? `rgba(8, 145, 178, ${opacity * 0.75})` : `rgba(109, 40, 217, ${opacity * 0.75})`;
        } else {
          // Dynamic drop shadow for nodes to give depth
          ctx.shadowColor = p.color === "cyan" ? "#06b6d4" : "#8b5cf6";
          ctx.shadowBlur = 4 * closeRatio;
          fillStyle = p.color === "cyan" ? `rgba(103, 232, 249, ${opacity})` : `rgba(196, 181, 253, ${opacity})`;
        }

        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow blur immediately
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-all duration-300"
    />
  );
}
