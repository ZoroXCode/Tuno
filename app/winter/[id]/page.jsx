"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import tunoimage from "@/public/tunobd.jpg";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_URL_DATA || "")
      .then((response) => setProducts(response.data.store.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    if (id) {
      setProductId(parseInt(id, 10));
    }
  }, []);

  const product = products.find((product) => product.id === productId);

  return (
    <section className="container px-5 py-24 mx-auto">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <Image
              src={tunoimage}
              alt={product?.name ?? "Product Image"}
              width={400}
              height={400}
              className="object-cover object-center w-full h-full rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <CardTitle className="text-2xl font-bold">
              {product?.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-2">
              {product?.category}
            </CardDescription>
            <p className="mt-4 text-lg text-gray-800">{product?.description}</p>
            <p className="mt-4 font-medium text-xl">${product?.price}</p>

            {/* Size Selector */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Select Size:</h3>
              <div className="mt-2 space-x-2">
                {["S", "M", "L", "XL"].map((sizeOption) => (
                  <Button
                    key={sizeOption}
                    variant={size === sizeOption ? "default" : "outline"}
                    onClick={() => setSize(sizeOption)}
                  >
                    {sizeOption}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Select Quantity:</h3>
              <div className="flex items-center mt-2 space-x-2">
                <Button
                  variant="outline"
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </Button>
                <span className="font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button className="mt-6 w-full text-white py-3 rounded">
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Page;
