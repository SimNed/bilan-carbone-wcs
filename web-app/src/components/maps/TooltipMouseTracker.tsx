import { Box, Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";

interface MouseTrackerProps {
  children: React.ReactNode;
}

const MouseTracker = ({ children }: MouseTrackerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(false);
    const handleMouseMove = (e: MouseEvent) => {
      const positionX = e.clientX;
      const positionY = e.clientY;

      const windowWidth = window.innerWidth;
      let tooltipWidth = tooltipRef.current
        ? tooltipRef.current.getBoundingClientRect().width
        : 0;

      setPosition({
        x:
          positionX + tooltipWidth > windowWidth
            ? positionX - tooltipWidth
            : positionX,
        y: positionY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, [position]);

  return (
    <Box
      ref={tooltipRef}
      position="fixed"
      top={position.y}
      left={position.x}
      display={isVisible ? "block" : "none"}
      p={4}
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      sx={{
        background: "#f6f6f6",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      <Typography paragraph>{children}</Typography>
    </Box>
  );
};

export default MouseTracker;
