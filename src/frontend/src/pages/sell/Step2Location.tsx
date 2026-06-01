import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SellFormData, SellFormErrors } from "./types";

const MAJOR_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
  "Lucknow",
  "Kochi",
];

interface Props {
  data: SellFormData;
  errors: SellFormErrors;
  onChange: (field: keyof SellFormData, value: string) => void;
}

export function Step2Location({ data, errors, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="location">
          City / Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="Enter your city"
          data-ocid="sell.location_input"
        />
        {errors.location && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.location.field_error"
          >
            {errors.location}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          {MAJOR_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onChange("location", city)}
              className={[
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                data.location === city
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
              ].join(" ")}
              data-ocid={`sell.city_chip.${city.toLowerCase()}`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">
          Contact Phone <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
            +91
          </span>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) =>
              onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="9876543210"
            className="pl-12"
            inputMode="numeric"
            data-ocid="sell.phone_input"
          />
        </div>
        {errors.phone && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.phone.field_error"
          >
            {errors.phone}
          </p>
        )}
      </div>

      {/* Email (optional) */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">
          Contact Email{" "}
          <span className="text-muted-foreground text-xs font-normal">
            (optional)
          </span>
        </Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="you@example.com"
          data-ocid="sell.email_input"
        />
        {errors.email && (
          <p
            className="text-xs text-destructive"
            data-ocid="sell.email.field_error"
          >
            {errors.email}
          </p>
        )}
      </div>
    </div>
  );
}
