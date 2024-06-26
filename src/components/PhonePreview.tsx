import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  imgModel: string;
  dark?: boolean;
}

const PhonePreview = ({
  imgSrc,
  imgModel,
  className,
  ...props
}: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden rounded-3xl",
        className
      )}
      {...props}
    >
      <img
        src={imgModel}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />

      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover min-w-full min-h-full"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};

export default PhonePreview;
