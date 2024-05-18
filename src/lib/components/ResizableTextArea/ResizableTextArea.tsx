import React, { useEffect, useState } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { ErrorText } from '..';

interface ResizableTextAreaProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    maxHeight: string;
    maxLength: number;
    className?: string;
    textareaClassName?: string;
    title: string;
}

export const ResizableTextArea = ({
  control,
  title,
  maxHeight,
  maxLength,
  className,
  textareaClassName
}: ResizableTextAreaProps<any>) => {
  const controllerName = title.toLowerCase();
  const [ flying, makeFly ] = useState(false);
  const { 
    field,
    fieldState: { error } 
  } = useController({ 
    name: controllerName,
    control,
    defaultValue: "",
  });

  useEffect(() => {
    makeFly(!!field.value);
  }, [field.value])

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = 'auto'; // Reset the height
    if (textarea.scrollHeight < parseInt(maxHeight, 10)) {
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height equal to scroll height
    } else {
        textarea.style.height = maxHeight; // Set to max height when limit is reached
    }
  }

  const focusHandler = () => {
    makeFly(true);
  };

  const blurHandler = () => {
    field.onBlur();
    
    if(!field.value)
    {
      makeFly(false);
    }
  };

  return (
    <div className={className + " flex flex-col relative flyable " + (flying ? "flying" : "")}>
      <textarea
          {...field}
          placeholder=' '
          onFocus={focusHandler}
          onBlur={blurHandler}
          maxLength={maxLength}
          className={textareaClassName + " overflow-hidden"}
          ref={field.ref}
          style={{ maxHeight, resize: 'none' }}
          onInput={handleInput}
      />
      <label className="py-2.5 px-4 pointer-events-none flyable">{title}</label>
      <div className='flex flex-row'>
        <ErrorText className='flex flex-1'>
            {error?.message}
        </ErrorText>
        <p className='ml-2 text-creamAccent'>{field.value?.length || 0}/{maxLength}</p>
      </div>
    </div>
  );
};