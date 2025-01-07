/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import Heading from "../shared/Heading";

const ImageUpload = () => {
  const [logo, setLogo] = useState<unknown>(null);
  const [logoPosition, setLogoPosition] = useState({ x: 100, y: 100 });
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const canvasRef = useRef(null);
  const tshirtRef = useRef(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (result !== null && result !== undefined) {
          setLogo(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving the final design
  const handleSave = () => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const tshirtImg = new Image();
    tshirtImg.src = "/assets/images/t-shirt.jpg";

    tshirtImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);

      // Draw logo
      if (logo && typeof logo === "string") {
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = () => {
          const { x, y } = logoPosition;
          const { width, height } = logoSize;
          ctx.drawImage(logoImg, x, y, width, height);

          // Save final image
          const finalImage = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "tshirt-design.png";
          link.href = finalImage;
          link.click();
        };
      }
    };
  };

  // Handle drag start to capture the offset of the logo
  const handleDragStart = (e: any) => {
    const offsetX = e.clientX - logoPosition.x;
    const offsetY = e.clientY - logoPosition.y;
    e.dataTransfer.setData("offsetX", offsetX);
    e.dataTransfer.setData("offsetY", offsetY);
  };

  // Handle drag over to allow dropping the logo
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  // Handle drop event to update the logo's position
  const handleDrop = (e: any) => {
    const offsetX = parseInt(e.dataTransfer.getData("offsetX"), 10);
    const offsetY = parseInt(e.dataTransfer.getData("offsetY"), 10);
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    setLogoPosition({ x, y });
  };

  // Handle resizing the logo with the mouse wheel
  const handleResize = (e: any) => {
    const newSize = Math.max(
      50,
      Math.min(200, logoSize.width + e.deltaY * -0.1)
    );
    setLogoSize({ width: newSize, height: newSize });
  };

  return (
    <>
      <Heading title="Task Two: Image Drag & Drop" />

      <div className="p-8 bg-gray-50 min-h-screen text-black rounded-lg">
        <div className="flex items-center justify-center gap-8">
          {/* T-shirt Display */}
          <div
            className="relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <img
              src="/assets/images/t-shirt.jpg"
              alt="T-Shirt"
              ref={tshirtRef}
              className="w-[300px] h-[400px] rounded-md"
            />
            {logo ? (
              <div
                style={{
                  position: "absolute",
                  left: `${logoPosition.x}px`,
                  top: `${logoPosition.y}px`,
                  width: `${logoSize.width}px`,
                  height: `${logoSize.height}px`,
                  cursor: "move",
                }}
                draggable
                onDragStart={handleDragStart}
                onWheel={handleResize}
              >
                <img
                  src={logo as string}
                  alt="Uploaded Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : null}
          </div>

          {/* Logo Upload and Save */}
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="block w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md cursor-pointer"
            />
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              Save Final Design
            </button>
          </div>
        </div>

        {/* Hidden Canvas for Saving */}
        <canvas
          ref={canvasRef}
          width={300}
          height={400}
          className="hidden"
        ></canvas>
      </div>
    </>
  );
};

export default ImageUpload;
