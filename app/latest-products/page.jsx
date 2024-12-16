"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import tunoimage from "@/public/tunobd.jpg";
import Link from "next/link";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_URL_DATA || "")
      .then((response) => {
        const fetchedProducts = response.data.store.products;

        // Sort products by timestamp (most recent first)
        const sortedProducts = fetchedProducts.sort((a, b) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateB - dateA; // Descending order
        });

        // Limit to the top 5 latest products
        setProducts(sortedProducts.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-4 border rounded-lg shadow-lg">
              <Image
                src={tunoimage}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover object-center w-full h-48 rounded-t-lg"
              />
              <div className="mt-4">
                <CardTitle className="font-bold">{product.name}</CardTitle>
                <CardDescription className="text-sm pt-2">
                  {product.category}
                </CardDescription>
                <CardTitle className="mt-2 font-medium">
                  ${product.price}
                </CardTitle>
                <Link href={`/latest-products/${product.id}`}>
                  <Button className="mt-4 w-full">Add to Cart</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
