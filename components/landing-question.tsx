"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

const options = [
  {
    text: "Learn more about me",
    href: "/about",
  },
  {
    text: "See my technical work",
    href: "/portfolio",
  },
  {
    text: "Read my thoughts on life",
    href: "/meditations",
  },
  {
    text: "Get in touch",
    href: "/contact",
  },
];

export function LandingQuestion() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-5xl mx-auto space-y-16">
        <h1 className="animate-fade-in font-serif text-center text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          What brings you here?
        </h1>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          {options.map((option, index) => (
            <Link
              key={option.href}
              href={option.href}
              style={{
                animationDelay: `${(index + 1) * 150}ms`
              }}
              className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
            >
              <Card className="group cursor-pointer border-2 p-10 text-center transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.98] hover:border-foreground/20 hover:shadow-xl">
                <p className="text-2xl font-medium transition-transform duration-300 ease-out group-hover:translate-x-3 sm:text-3xl md:text-4xl">
                  {option.text}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
