interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function StepProgress({
  currentStep,
  totalSteps,
  stepLabels,
}: StepProgressProps) {
  return (
    <div className="mb-8" data-ocid="sell.step_progress">
      <div className="flex items-center justify-between mb-3">
        {stepLabels.map((label, idx) => {
          const step = idx + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          return (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 flex-1"
            >
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-label="Completed"
                    role="img"
                  >
                    <title>Completed</title>
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={[
                  "text-xs font-medium text-center hidden sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 sm:hidden text-center">
        Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
      </p>
    </div>
  );
}
