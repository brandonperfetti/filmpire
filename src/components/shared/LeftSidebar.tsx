"use client";

import { categories, genres } from "@/constants";

import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";

const LeftSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-dvh flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
        <div className="flex flex-1 flex-col gap-6">
          <Separator className="-mt-9" />
          <div className="mx-auto lg:mx-0">Categories</div>
          {categories.map((category) => {
            const isActive =
              (pathname.includes(category.route) &&
                category.route.length > 1) ||
              pathname === category.route;
            return (
              <Link
                to={category.route}
                key={category.label}
                className={`${
                  isActive
                    ? "primary-gradient text-light-900"
                    : "text-dark300_light900"
                }  flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark400 rounded-lg`}
              >
                <img
                  src={category.icon}
                  alt={category.label}
                  width={20}
                  height={20}
                  className={`${
                    isActive ? "" : "invert-colors"
                  } sm:mx-auto lg:mx-0`}
                />

                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {category.label}
                </p>
              </Link>
            );
          })}
          <Separator />
          <div className="mx-auto lg:mx-0">Genres</div>
          {genres.map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;

            return (
              <Link
                to={item.route}
                key={item.label}
                className={`${
                  isActive
                    ? "primary-gradient text-light-900"
                    : "text-dark300_light900"
                }  flex items-center justify-start gap-4 bg-transparent p-4 hover:background-light800_dark400 rounded-lg`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${
                    isActive ? "" : "invert-colors"
                  } sm:mx-auto lg:mx-0`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default LeftSidebar;
