"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover@1.1.6";

import { cn } from "./utils";

// Filter out Figma inspector props that start with _fg to avoid React DOM warnings
function filterFigmaProps(props: Record<string, any>) {
  const filtered: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (!key.startsWith('_fg') && !key.startsWith('_FG')) {
      filtered[key] = props[key];
    }
  });
  return filtered;
}

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root> & Record<string, any>) {
  const filteredProps = filterFigmaProps(props);
  return <PopoverPrimitive.Root data-slot="popover" {...filteredProps} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger> & Record<string, any>) {
  const filteredProps = filterFigmaProps(props);
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...filteredProps} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...filterFigmaProps(props)}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...filterFigmaProps(props)} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };