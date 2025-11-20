import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ProductAttributesProps {
  attributes?: Record<string, string>;
}

const DEFAULT_SIZES = {
  "Default Size": [
    "One size - default in the photo"
  ],
  "Clothing": [
    "Women - XXS", "Women - XS", "Women - S", "Women - M", "Women - L", "Women - XL", "Women - XXL",
    "------",
    "Men - XS", "Men - S", "Men - M", "Men - L", "Men - XL", "Men - XXL"
  ],
  "Shoes": [
    "Men - US 5/EU 37.5/UK 4.5", "Men - US 5.5/EU 38/UK 5", "Men - US 6/EU 38.5/UK 5.5",
    "Men - US 6.5/EU 39/UK 6", "Men - US 7/EU 40/UK 6", "Men - US 7.5/EU 40.5/UK 6.5",
    "Men - US 8/EU 41/UK 7", "Men - US 8.5/EU 42/UK 7.5", "Men - US 9/EU 42.5/UK 8",
    "Men - US 9.5/EU 43/UK 8.5", "Men - US 10/EU 44/UK 9", "Men - US 10.5/EU 44.5/UK 9.5",
    "Men - US 11/EU 45/UK 10", "Men - US 11.5/EU 45.5/UK 10.5", "Men - US 12/EU 46/UK 11",
    "Men - US 13/EU 47.5/UK 12", "Men - US 14/EU 48.5/UK 13", "Men - US 15/EU 49.5/UK 14",
    "Men - US 16/EU 50.5/UK 15", "Men - US 17/EU 51.5/UK 16", "Men - US 18/EU 52.5/UK 17",
    "------",
    "Women - US 5/EU 35.5/UK 2.5", "Women - US 5.5/EU 36/UK 3", "Women - US 6/EU 36.5/UK 3.5",
    "Women - US 6.5/EU 37.5/UK 4", "Women - US 7/EU 38/UK 4.5", "Women - US 7.5/EU 38.5/UK 5",
    "Women - US 8/EU 39/UK 5.5", "Women - US 8.5/EU 40/UK 6", "Women - US 9/EU 40.5/UK 6.5",
    "Women - US 9.5/EU 41/UK 7", "Women - US 10/EU 42/UK 7.5", "Women - US 10.5/EU 42.5/UK 8",
    "Women - US 11/EU 43/UK 8.5", "Women - US 12/EU 44.5/UK 9.5"
  ],
  "Kid": [
    "Kid - US 9C/EU 26/UK 8.5", "Kid - US 10C/EU 27/UK 9.5", "Kid - US 11C/EU 28/UK 10.5",
    "Kid - US 12C/EU 29.5/UK 11.5", "Kid - US 12.5C/EU 30/UK 12", "Kid - US 13C/EU 31/UK 12.5",
    "Kid - US 1Y/EU 32/UK 13.5", "Kid - US 1.5Y/EU 33/UK 1", "Kid - US 2Y/EU 33.5/UK 1.5",
    "Kid - US 2.5Y/EU 34/UK 2", "Kid - US 3Y/EU 35/UK 2.5", "Kid - US 3.5Y/EU 35.5/UK 3",
    "Kid - US 4Y/EU 36/UK 3.5", "Kid - US 4.5Y/EU 36.5/UK 4", "Kid - US 5Y/EU 37.5/UK 4.5",
    "Kid - US 5.5Y/EU 38/UK 5", "Kid - US 6Y/EU 38.5/UK 5.5", "Kid - US 6.5Y/EU 39/UK 6",
    "Kid - US 7Y/EU 40/UK 6"
  ]
};

export const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("One size - default in the photo");
  const hasCustomAttributes = attributes && Object.keys(attributes).length > 0;

  if (hasCustomAttributes) {
    // Display custom attributes
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Label className="text-base font-semibold">Product Specifications</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(attributes).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground">{key}:</span>
              <Badge variant="secondary" className="font-medium">{value}</Badge>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Display default size selector if no attributes
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Label htmlFor="size-select" className="text-base font-semibold">
        Attributes
      </Label>
      <Select value={selectedSize} onValueChange={setSelectedSize}>
        <SelectTrigger
          id="size-select"
          className="w-full h-12 text-base hover:border-primary transition-colors"
        >
          <SelectValue placeholder="Choose Size" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Object.entries(DEFAULT_SIZES).map(([category, sizes]) => (
            <SelectGroup key={category}>
              <SelectLabel className="font-semibold text-primary">{category}</SelectLabel>
              {sizes.map((size) => (
                size === "------" ? (
                  <div key={size} className="h-px bg-border my-1" />
                ) : (
                  <SelectItem
                    key={size}
                    value={size}
                    className="cursor-pointer hover:bg-secondary"
                  >
                    {size}
                  </SelectItem>
                )
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {selectedSize && (
        <div className="text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
          Selected: <span className="font-medium text-foreground">{selectedSize}</span>
        </div>
      )}
    </div>
  );
};
