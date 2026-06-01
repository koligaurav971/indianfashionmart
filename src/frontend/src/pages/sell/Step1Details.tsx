import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ListingCategory, ListingCondition } from "@/types";
import type { SellFormData, SellFormErrors } from "./types";

const CATEGORIES: { value: ListingCategory; label: string }[] = [
  { value: ListingCategory.sarees, label: "Sarees" },
  { value: ListingCategory.kurtis, label: "Kurtis" },
  { value: ListingCategory.lehengas, label: "Lehengas" },
  { value: ListingCategory.salwarSuits, label: "Salwar Suits" },
  { value: ListingCategory.jewelry, label: "Jewelry" },
  { value: ListingCategory.accessories, label: "Accessories" },
  { value: ListingCategory.footwear, label: "Footwear" },
  { value: ListingCategory.other, label: "Other" },
];

const CONDITIONS: { value: ListingCondition; label: string; desc: string }[] = [
  {
    value: ListingCondition.brandNew,
    label: "Brand New",
    desc: "Never used, tags on",
  },
  {
    value: ListingCondition.likeNew,
    label: "Like New",
    desc: "Barely used, no flaws",
  },
  { value: ListingCondition.good, label: "Good", desc: "Minor signs of use" },
  {
    value: ListingCondition.fair,
    label: "Fair",
    desc: "Visible wear, fully functional",
  },
  {
    value: ListingCondition.poor,
    label: "Poor",
    desc: "Heavy wear, flaws present",
  },
];

interface Props {
  data: SellFormData;
  errors: SellFormErrors;
  onChange: (field: keyof SellFormData, value: string) => void;
}

export function Step1Details({ data, errors, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <span
            className={`text-xs ${data.title.length > 100 ? "text-destructive" : "text-muted-foreground"}`}
          >
            {data.title.length}/100
          </span>
        </div>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Vintage Silk Kanjeevaram Saree, deep red, 6 yards"
          maxLength={100}
          data-ocid="sell.title_input"
        />
        {errors.title && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.title.field_error"
          >
            {errors.title}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category">
          Category <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.category}
          onValueChange={(v) => onChange("category", v)}
        >
          <SelectTrigger id="category" data-ocid="sell.category_select">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.category.field_error"
          >
            {errors.category}
          </p>
        )}
      </div>

      {/* Condition */}
      <div className="flex flex-col gap-2">
        <Label>
          Condition <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.condition}
          onValueChange={(v) => onChange("condition", v)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
          data-ocid="sell.condition_radio"
        >
          {CONDITIONS.map((c) => (
            <Label
              key={c.value}
              htmlFor={`condition-${c.value}`}
              className={[
                "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                data.condition === c.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40",
              ].join(" ")}
            >
              <RadioGroupItem
                id={`condition-${c.value}`}
                value={c.value}
                className="mt-0.5"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium">{c.label}</span>
                <span className="text-xs text-muted-foreground">{c.desc}</span>
              </div>
            </Label>
          ))}
        </RadioGroup>
        {errors.condition && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.condition.field_error"
          >
            {errors.condition}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="price">
          Price <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            ₹
          </span>
          <Input
            id="price"
            type="number"
            min="1"
            step="1"
            value={data.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="8500"
            className="pl-7"
            data-ocid="sell.price_input"
          />
        </div>
        {errors.price && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.price.field_error"
          >
            {errors.price}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <span
            className={`text-xs ${data.description.length > 3000 ? "text-destructive" : "text-muted-foreground"}`}
          >
            {data.description.length}/3000
          </span>
        </div>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe fabric, occasion, zari work, age, measurements, any flaws..."
          rows={5}
          maxLength={3000}
          data-ocid="sell.description_textarea"
        />
        {errors.description && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.description.field_error"
          >
            {errors.description}
          </p>
        )}
      </div>
    </div>
  );
}
