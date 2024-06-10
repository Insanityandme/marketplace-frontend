import Image from "next/image";
import React from "react";
import { ProductColor, ProductCondition } from "@/utils/api-call-types";
export default function Page({
  files,
  name,
  price,
  category,
  condition,
  description,
  color,
  year,
}: {
  readonly files: File[] | undefined;
  readonly name: string;
  readonly price: number;
  readonly category: string;
  readonly condition: number;
  readonly description: string;
  readonly color: number;
  readonly year: number;
}) {
  const renderFiles = () => {
    if (files && files.length > 0) {
      return files.map((file: File) => {
        const objectUrl = URL.createObjectURL(file);
        return (
          <div key={file.name} className="mx-auto h-72 w-full shrink-0 pr-2">
            <Image
              src={objectUrl}
              alt={file.name}
              className="size-full rounded object-cover"
              width={100}
              height={100}
              onLoad={() => URL.revokeObjectURL(objectUrl)}
            />
          </div>
        );
      });
    }

    return (
      <div className="mx-auto flex h-72 w-full cursor-default items-center justify-center rounded border-2 border-dotted border-gray-300 bg-white">
        <span className="text-gray-500">No pics :(</span>
      </div>
    );
  };

  return (
    <div className="absolute top-full mt-5 w-full rounded-xl bg-white p-2 lg:left-full lg:top-1/3 lg:ml-5 lg:w-3/4">
      <div className=" mx-auto flex w-11/12 overflow-x-auto">
        {renderFiles()}
      </div>

      <div className="w-full">
        <h1
          className={` mx-auto mt-3 w-10/12 cursor-default text-2xl font-bold ${name ? "" : "text-gray-300"}`}
        >
          {name === "" ? "No name" : name}
        </h1>
      </div>

      <div className="w-full">
        <h1
          className={`mx-auto w-10/12 cursor-default text-sm text-gray-400 ${category ? "" : "text-gray-300"}`}
        >
          {category ? "Category: " + category : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-10/12 cursor-default text-sm text-gray-400">
          {condition ? "Condition: " + ProductCondition[condition] : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-10/12 cursor-default text-sm text-gray-400">
          {color ? "Color: " + ProductColor[color] : ""}
        </h1>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-10/12 cursor-default text-sm text-gray-400">
          {year ? "Production year: " + year : ""}
        </h1>
      </div>

      <div className="w-full">
        <p
          className={`mx-auto my-3 w-10/12 cursor-default text-xl ${price ? "" : "text-gray-300"}`}
        >
          {price ? price + " kr" : "No price"}
        </p>
      </div>

      <div className="w-full">
        <h1 className="mx-auto w-11/12 cursor-default text-sm">
          {description ? "Description: " : ""}
        </h1>
        <p className="mx-auto w-11/12 truncate text-pretty hover:text-clip">
          {description ? description : ""}
        </p>
      </div>
    </div>
  );
}
