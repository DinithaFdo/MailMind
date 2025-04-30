import { Button } from "@/components/ui/button";
import React from "react";

type CategoryButtonProps = {
  label: string;
  variant?: "outline" | "default" | "ghost" | "link" | "destructive";
  onClick?: () => void;
};

export default function CategoryButton({
  label,
  variant = "outline",
  onClick,
}: CategoryButtonProps) {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}


