import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ListingCategory, ListingCondition } from "@/types";
import { X } from "lucide-react";

export interface ActiveFilters {
  categories: string[];
  conditions: string[];
  minPrice: string;
  maxPrice: string;
  location: string;
}

interface FilterPanelProps {
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  [ListingCategory.sarees]: "Sarees",
  [ListingCategory.kurtis]: "Kurtis",
  [ListingCategory.lehengas]: "Lehengas",
  [ListingCategory.salwarSuits]: "Salwar Suits",
  [ListingCategory.accessories]: "Accessories",
  [ListingCategory.jewelry]: "Jewellery",
  [ListingCategory.footwear]: "Footwear",
  [ListingCategory.other]: "Other",
};

const CONDITION_LABELS: Record<string, string> = {
  [ListingCondition.brandNew]: "Brand New",
  [ListingCondition.likeNew]: "Like New",
  [ListingCondition.good]: "Good",
  [ListingCondition.fair]: "Fair",
  [ListingCondition.poor]: "Poor",
};

export const CITY_OPTIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
];

export { CATEGORY_LABELS, CONDITION_LABELS };

function toggleItem(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export function FilterPanel({
  filters,
  onChange,
  onApply,
  onReset,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.conditions.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.location !== "";

  return (
    <div className="flex flex-col gap-5" data-ocid="search.filter_panel">
      {/* Category */}
      <div>
        <p className="mb-2.5 text-sm font-semibold text-foreground">Category</p>
        <div className="flex flex-col gap-2">
          {Object.values(ListingCategory).map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={filters.categories.includes(cat)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    categories: toggleItem(filters.categories, cat),
                  })
                }
                data-ocid={`search.filter.category.${cat}`}
              />
              <Label
                htmlFor={`cat-${cat}`}
                className="cursor-pointer text-sm font-normal"
              >
                {CATEGORY_LABELS[cat]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <p className="mb-2.5 text-sm font-semibold text-foreground">
          Price Range (₹)
        </p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="h-8 text-sm"
            data-ocid="search.filter.price_min"
          />
          <span className="text-muted-foreground text-xs">–</span>
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="h-8 text-sm"
            data-ocid="search.filter.price_max"
          />
        </div>
        {(filters.minPrice !== "" || filters.maxPrice !== "") && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            ₹{filters.minPrice || "0"} – ₹{filters.maxPrice || "∞"}
          </p>
        )}
      </div>

      <Separator />

      {/* Condition */}
      <div>
        <p className="mb-2.5 text-sm font-semibold text-foreground">
          Condition
        </p>
        <div className="flex flex-col gap-2">
          {Object.values(ListingCondition).map((cond) => (
            <div key={cond} className="flex items-center gap-2">
              <Checkbox
                id={`cond-${cond}`}
                checked={filters.conditions.includes(cond)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    conditions: toggleItem(filters.conditions, cond),
                  })
                }
                data-ocid={`search.filter.condition.${cond}`}
              />
              <Label
                htmlFor={`cond-${cond}`}
                className="cursor-pointer text-sm font-normal"
              >
                {CONDITION_LABELS[cond]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <p className="mb-2.5 text-sm font-semibold text-foreground">Location</p>
        <Select
          value={filters.location}
          onValueChange={(v) => onChange({ ...filters, location: v })}
        >
          <SelectTrigger
            className="h-9 text-sm"
            data-ocid="search.filter.location_select"
          >
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All cities</SelectItem>
            {CITY_OPTIONS.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          className="flex-1"
          size="sm"
          onClick={onApply}
          data-ocid="search.filter.apply_button"
        >
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            data-ocid="search.filter.reset_button"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5">
          {filters.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1 text-xs"
              onClick={() =>
                onChange({
                  ...filters,
                  categories: filters.categories.filter((c) => c !== cat),
                })
              }
            >
              {CATEGORY_LABELS[cat]}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {filters.conditions.map((cond) => (
            <Badge
              key={cond}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1 text-xs"
              onClick={() =>
                onChange({
                  ...filters,
                  conditions: filters.conditions.filter((c) => c !== cond),
                })
              }
            >
              {CONDITION_LABELS[cond]}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
