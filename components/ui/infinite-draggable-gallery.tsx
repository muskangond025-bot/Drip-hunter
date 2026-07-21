"use client";

import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  wrap,
  type MotionValue,
} from "framer-motion";
import {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Types
export type variants = "default" | "masonry" | "polaroid";

// Create Context
const GridVariantContext = createContext<variants | undefined>(undefined);

// Motion Variants
const rowVariants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() + 1.5,
      duration: 1.4,
      ease: cubicBezier(0.18, 0.71, 0.11, 1),
    },
  }),
};

export const DraggableContainer = ({
  className,
  children,
  variant,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: variants;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);

  const [isDragging, setIsDragging] = useState(false);
  const isUpdatingRef = useRef(false);

  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Calculate dimensions of repeated tiles (2x2 matrix)
    const updateWrap = (motionVal: MotionValue<number>, maxDimension: number) => {
      if (maxDimension <= 0 || isUpdatingRef.current) return;
      const latest = motionVal.get();
      const halfDim = maxDimension / 2;
      const wrapped = wrap(-halfDim, 0, latest);

      if (Math.abs(wrapped - latest) > 0.5) {
        isUpdatingRef.current = true;
        motionVal.set(wrapped);
        isUpdatingRef.current = false;
      }
    };

    const unsubscribeX = x.on("change", () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0) {
        updateWrap(x, rect.width);
      }
    });

    const unsubscribeY = y.on("change", () => {
      const rect = container.getBoundingClientRect();
      if (rect.height > 0) {
        updateWrap(y, rect.height);
      }
    });

    const handleWheelScroll = (event: WheelEvent) => {
      if (isDragging) return;

      const rect = container.getBoundingClientRect();
      const halfHeight = rect.height / 2;
      const halfWidth = rect.width / 2;

      if (event.deltaY !== 0) {
        const nextY = y.get() - event.deltaY * 2.7;
        animate(y, nextY, {
          type: "tween",
          duration: 1.2,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
      }

      if (event.deltaX !== 0) {
        const nextX = x.get() - event.deltaX * 2.7;
        animate(x, nextX, {
          type: "tween",
          duration: 1.2,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
      }
    };

    window.addEventListener("wheel", handleWheelScroll, { passive: true });

    return () => {
      unsubscribeX();
      unsubscribeY();
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, [x, y, isDragging]);

  return (
    <GridVariantContext.Provider value={variant}>
      <div className="h-dvh overflow-hidden bg-[#141414]">
        <motion.div className="h-dvh overflow-hidden">
          <motion.div
            className={cn(
              "grid h-fit w-fit cursor-grab grid-cols-[repeat(2,1fr)] bg-[#141414] active:cursor-grabbing will-change-transform select-none",
              className,
            )}
            drag
            dragMomentum={true}
            dragTransition={{
              timeConstant: 200,
              power: 0.28,
              restDelta: 0,
              bounceStiffness: 0,
            }}
            onMouseDown={handleIsDragging}
            onMouseUp={handleIsNotDragging}
            onMouseLeave={handleIsNotDragging}
            onTouchStart={handleIsDragging}
            onTouchEnd={handleIsNotDragging}
            style={{ x, y }}
            ref={ref}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const variant = useContext(GridVariantContext);

  const gridItemStyles = cva(
    "overflow-hidden hover:cursor-pointer w-full h-full will-change-transform",
    {
      variants: {
        variant: {
          default: "rounded-sm",
          masonry: "even:mt-[60%] rounded-sm",
          polaroid:
            "border-10 border-b-28 border-white shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[60%]",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <motion.div
      className={cn(gridItemStyles({ variant, className }))}
      variants={rowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export const GridBody = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const variant = useContext(GridVariantContext);

    const gridBodyStyles = cva("grid grid-cols-[repeat(6,1fr)] h-fit w-fit", {
      variants: {
        variant: {
          default: "gap-14 p-7 md:gap-28 md:p-14",
          masonry: "gap-x-14 px-7 md:gap-x-28 md:px-14",
          polaroid: "gap-x-14 px-7 md:gap-x-28 md:px-14",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    });

    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(gridBodyStyles({ variant, className }))}
          >
            {children}
          </div>
        ))}
      </>
    );
  },
);

GridBody.displayName = "GridBody";
