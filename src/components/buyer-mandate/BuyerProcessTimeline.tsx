import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  title: string;
  description: string;
}

interface BuyerProcessTimelineProps {
  steps: TimelineStep[];
}

const BuyerProcessTimeline = ({ steps }: BuyerProcessTimelineProps) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="rounded-[2rem] border border-border bg-card p-4 shadow-sm md:p-8">
      <div className="grid gap-3 lg:grid-cols-6">
        {steps.map((step, index) => {
          const isActive = index === activeStep;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              className={cn(
                "group relative overflow-hidden rounded-[1.5rem] border px-4 py-5 text-left transition-all duration-300",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-lg"
                  : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm",
              )}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                    isActive
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "bg-secondary text-foreground",
                  )}
                >
                  {index + 1}
                </span>
                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isActive ? "translate-x-0 text-primary-foreground" : "text-muted-foreground group-hover:translate-x-1",
                  )}
                />
              </div>
              <p className={cn("text-sm font-semibold leading-snug", isActive ? "text-primary-foreground" : "text-foreground")}>
                {step.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-border bg-secondary/60 p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center"
          >
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Étape {activeStep + 1}
              </span>
              <h3 className="font-sans-modern text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {steps[activeStep].title}
              </h3>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-background p-5 md:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {steps[activeStep].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuyerProcessTimeline;
