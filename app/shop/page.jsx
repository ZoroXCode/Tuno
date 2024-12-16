"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import tunoimage from "@/public/tunobd.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_URL_DATA || "")
      .then((response) => setProducts(response.data.store.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
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
                <Link href={`/shop/${product.id}`}>
                  <Button className="mt-4 w-full text-white py-2 rounded">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
