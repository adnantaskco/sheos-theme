// app/product/[slug]/page.tsx
import React, { Suspense } from "react";
import ProductDetailsClient from "./ProductDetailsClient"; 
export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading product...</div>}>
      <ProductDetailsClient />
    </Suspense>
  );
}