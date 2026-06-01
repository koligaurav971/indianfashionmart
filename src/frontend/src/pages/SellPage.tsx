import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import type { ListingCategory, ListingCondition } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Step1Details } from "./sell/Step1Details";
import { Step2Location } from "./sell/Step2Location";
import { Step3Images } from "./sell/Step3Images";
import { Step4Review } from "./sell/Step4Review";
import { StepProgress } from "./sell/StepProgress";
import {
  INITIAL_FORM_DATA,
  SELL_STEPS,
  type SellFormData,
  type SellFormErrors,
  type UploadedImage,
} from "./sell/types";

function validateStep(step: number, data: SellFormData): SellFormErrors {
  const errors: SellFormErrors = {};
  if (step === 1) {
    if (!data.title || data.title.trim().length < 5)
      errors.title = "Title must be at least 5 characters";
    else if (data.title.length > 100)
      errors.title = "Title must be 100 characters or less";
    if (!data.category) errors.category = "Please select a category";
    if (!data.condition) errors.condition = "Please select a condition";
    if (!data.price || Number(data.price) <= 0)
      errors.price = "Price must be greater than ₹0";
    if (!data.description || data.description.trim().length < 20)
      errors.description = "Description must be at least 20 characters";
    else if (data.description.length > 3000)
      errors.description = "Description is too long (max 3000 chars)";
  }
  if (step === 2) {
    if (!data.location.trim()) errors.location = "City is required";
    if (!data.phone || !/^[6-9]\d{9}$/.test(data.phone))
      errors.phone = "Enter a valid 10-digit Indian mobile number";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Enter a valid email address";
  }
  return errors;
}

export function SellPage() {
  const { actor } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const qc = useQueryClient();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SellFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<SellFormErrors>({});
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [submittedListingId, setSubmittedListingId] = useState<string | null>(
    null,
  );

  const handleFieldChange = useCallback(
    (field: keyof SellFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleImagesChange = useCallback(
    (
      updater: UploadedImage[] | ((prev: UploadedImage[]) => UploadedImage[]),
    ) => {
      setImages((prev) =>
        typeof updater === "function" ? updater(prev) : updater,
      );
    },
    [],
  );

  const goToStep = (target: number) => {
    setErrors({});
    setStep(target);
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const readyImages = images
        .filter((img) => img.blob !== null)
        .map((img) => img.blob!);
      return actor.createListing({
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: BigInt(Math.round(Number(formData.price))),
        location: formData.location.trim(),
        category: formData.category as ListingCategory,
        condition: formData.condition as ListingCondition,
        images: readyImages,
      });
    },
    onSuccess: (listing) => {
      qc.invalidateQueries({ queryKey: ["featured-listings"] });
      toast.success("Listing posted!");
      setSubmittedListingId(String(listing.id));
    },
    onError: () => toast.error("Failed to post listing. Please try again."),
  });

  const handlePostAnother = () => {
    setFormData(INITIAL_FORM_DATA);
    setImages([]);
    setErrors({});
    setStep(1);
    setSubmittedListingId(null);
  };

  // Auth gate
  if (!isAuthenticated) {
    return (
      <div
        className="mx-auto max-w-screen-sm px-4 py-16 text-center"
        data-ocid="sell.auth_required"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Login to Post a Listing
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
          Sign in with Internet Identity to start selling your pre-loved items.
        </p>
        <Button onClick={login} size="lg" data-ocid="sell.login_button">
          Login with Internet Identity
        </Button>
      </div>
    );
  }

  const isStepValid = Object.keys(validateStep(step, formData)).length === 0;

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-8" data-ocid="sell.page">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Post a Listing
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Share your item with thousands of buyers
        </p>
      </div>

      <StepProgress
        currentStep={submittedListingId ? SELL_STEPS.length + 1 : step}
        totalSteps={SELL_STEPS.length}
        stepLabels={[...SELL_STEPS]}
      />

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
        {step === 1 && (
          <Step1Details
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
        )}
        {step === 2 && (
          <Step2Location
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
        )}
        {step === 3 && (
          <Step3Images images={images} onImagesChange={handleImagesChange} />
        )}
        {step === 4 && (
          <Step4Review
            data={formData}
            images={images}
            onGoToStep={goToStep}
            onSubmit={() => mutation.mutate()}
            isSubmitting={mutation.isPending}
            submittedListingId={submittedListingId}
            onPostAnother={handlePostAnother}
          />
        )}

        {/* Navigation buttons (not on step 4 or success) */}
        {step < 4 && !submittedListingId && (
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                data-ocid="sell.back_button"
              >
                ← Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              type="button"
              onClick={handleNext}
              disabled={step <= 2 && !isStepValid}
              data-ocid="sell.next_button"
            >
              {step === 3 ? "Review →" : "Next →"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
