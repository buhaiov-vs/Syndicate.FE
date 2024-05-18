import { Dropdown, ErrorText } from "@/lib/components";
import { ValidationRules } from "@/lib/consts";
import { zeroPad } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";

export type DropdownProps<TFieldValues extends FieldValues> = {
  title: string;
  hoursItems?: number;
  minutesItems?: number;
  hoursStep?: number;
  minutesStep?: number;
  className?: string | null;
  control: Control<TFieldValues>;
}

export const TimespanPicker = ({
  title,
  control,
  minutesStep = ValidationRules.Service.Duration.step,
}: DropdownProps<any>) => {
  const controllerName = title.toLowerCase();
  const {
    field: { ref, onChange, value },
    fieldState: { error }
  } = useController({
    name: controllerName,
    control
  });

  const [hours, setHours] = useState<number | null>(value ? Math.floor(value / 60) : null);
  const [minutes, setMinutes] = useState<number | null>(value ? value % 60 : null);
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = (state?: boolean) => {
    setIsOpen(state !== undefined ? state : !isOpen);
  }

  useEffect(() => {
    if (hours || minutes) {
      onChange((hours ?? 0) * 60 + (minutes ?? 0));

      setIsOpen(false);
    }
  }, [hours, minutes, onChange])

  const resultValue = (hours && hours > 0 || minutes && minutes > 0) ? `${hours ?? 0}h ${zeroPad(minutes ?? 0, 2)}m` : null;

  return (
    <>
      <Dropdown
        className="w-56"
        title={title}
        value={resultValue}
        isOpen={isOpen}
        onToggle={onToggle}>
        <div className="absolute top-10 right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          <div className="flex flex-col py-1 flex-1">
            <div className="flex flex-row">
              <span className="flex flex-1 justify-center">hours</span>
              <span className="flex flex-1 justify-center">minutes</span>
            </div>
            <div className="flex flex-row flex-1">
              <ul className="flex flex-col flex-1">
                {Array
                  .from({ length: 11 }, (v, k) => (k+1) * 1)
                  .map((v) => {
                    return <li
                      key={`timespanpicker_h_${v}`}
                      className={"flex justify-center hover:bg-cream" + (v == hours ? " bg-cream" : "")}
                      onClick={() => setHours(v)}>
                        {v}
                      </li>;
                  })}
              </ul>
              <ul className="flex flex-col flex-1">
                {Array
                  .from({ length: 11 }, (v, k) => (k+1) * minutesStep)
                  .map((v) => {
                    return <li 
                      key={`timespanpicker_m_${v}`}
                      className={"flex justify-center hover:bg-creamAccent" + (v == minutes ? " bg-cream" : "")} 
                      onClick={() => setMinutes(v)}>
                        {v}
                      </li>;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </Dropdown>
      <input ref={ref} type="hidden" />
      <ErrorText>{error?.message}</ErrorText>
    </>
  );
}
