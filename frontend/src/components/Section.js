import React from "react";
import { Link } from "react-router-dom";

export function Section() {
  return (
    <section>
      <div className="px-4 py-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-4xl">
          Try something really different right now.
        </h2>
        <p className="mt-4 block max-w-4xl text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse iure
          tenetur commodi ipsam error voluptate magni. Adipisci repudiandae
          ullam commodi iusto reprehenderit suscipit facere voluptatem, eaque
          maiores minima. Neque, officiis.
        </p>
        <div className="mt-6">
          <Link
            to="/editor"
            className="mt-4 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white shadow transition-colors duration-300 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:mx-2 sm:mt-0 sm:w-auto"
          >
            <span className="mx-2">Try Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
