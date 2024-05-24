"use client";

import React, { useEffect, useState } from 'react';
import { useController, Control, FieldValues } from 'react-hook-form';
import { ErrorText } from '@/lib/components';
import { IMaskInput } from 'react-imask';

export interface ControlledInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name?: string;
  className?: string;
  title: string;
  type?: React.HTMLInputTypeAttribute,
  mask?: any,
  inputClassName?: string;
  disabled?: boolean;
}

export const ControlledInput = ({
  control,
  title,
  className = "",
  type = "text",
  mask,
  inputClassName,
  disabled = false
}: ControlledInputProps<any>) => {
  const [ flying, makeFly ] = useState(false);
  const controllerName = title.toLowerCase();
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error }
  } = useController({
    name: controllerName,
    control
  });

  useEffect(() => {
    makeFly(!!value);
  }, [value])

  const focusHandler = () => {
    makeFly(true);
  };

  const blurHandler = () => {
    onBlur();
    
    if(!value)
    {
      makeFly(false);
    }
  };

  return <div className={"flex flex-col relative " + className}>
    <div className={"relative flex w-full flyable " + (flying ? "flying" : "")}>
      {mask ? (<IMaskInput
        {...mask}
        value={value?.toString()}
        inputRef={ref}
        onAccept={onChange}
        onBlur={blurHandler}
        onFocus={focusHandler}
        name={controllerName}
        autoComplete={controllerName}
        className={"appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4 w-full " + inputClassName}
        id={controllerName}
        type={type}
        placeholder=' '
      />) : (
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={blurHandler}
          onFocus={focusHandler}
          name={controllerName}
          autoComplete={controllerName}
          className={"appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4 w-full " + inputClassName}
          id={controllerName}
          type={type}
          placeholder=' '
        />
      )}
      <label className={"py-2.5 px-4 pointer-events-none flyable"}>{title}</label>
    </div>
    <ErrorText>{error?.message}</ErrorText>
  </div>;
};