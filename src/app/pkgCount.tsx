"use client";

import { useState, useEffect } from "react";
import { Countdown } from "~/components/ui/countdown";

export const PackageCount = ({ count }: { count: number }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const i = setTimeout(() => setVal(count), 1);
    return () => clearTimeout(i);
  }, []);

  return (
    <div className="flex h-24 w-24 flex-col items-start rounded bg-primary p-2 font-title text-primary-foreground">
      <Countdown count={val} minDigits={count.toString().length} />
      <h2 className="text-lg">Packages</h2>
    </div>
  );
};
