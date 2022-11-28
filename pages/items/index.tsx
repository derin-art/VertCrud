import { useState, useEffect } from "react";
import ImageTest from "@/components/ImageTest";

export default function Items() {
  return (
    <div className="w-screen p-8">
      <div className="mt-10 font-Poppins text-5xl -ml-4 border-b border-black">
        No Items Created.
      </div>
      <div>
        <ImageTest></ImageTest>
      </div>
    </div>
  );
}
