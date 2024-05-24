"use client";

import React, { useCallback, useState } from 'react';
import { useController, Control, FieldValues } from 'react-hook-form';
import { IconButton } from '@/lib/components';
import { Symbols } from '@/lib/consts';
import clsx from 'clsx';

interface TagsInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  title: string;
  className?: string;
  tagMinLength?: number;
  tagMaxLength?: number;
  maxTagsCount?: number;
}

export const TagsInput = ({ control, title, className, maxTagsCount = 10, tagMaxLength = 25, tagMinLength = 1 }: TagsInputProps<any>) => {
  const [ error, setError ] = useState("");
  const [ flying, makeFly ] = useState(false);
  const controllerName = title.toLowerCase();
  const {
    field: { value, onChange, ref, onBlur },
    fieldState: { error: formError }
  } = useController({
    name: controllerName,
    control
  });

  const [tags, setTags] = useState<string[]>(value || []);

  const addTag = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
      event.preventDefault();

      const newTag = event.currentTarget.value
        .replaceAll("#", "")
        .trim();

      if(newTag.length <= tagMinLength) {
        setError(`Tag name length should be at least ${tagMinLength+1}`);
        return;
      }

      if (!tags.includes(newTag))
      {
        if(tags.length == maxTagsCount) {
          setError(`Max number of tags is ${maxTagsCount}`);
          return;
        }
        setError("");
        tags.push(newTag);
        setTags(tags);
        onChange(tags);

        event.currentTarget.value = '';
      } else {
        setError("Tag already exists");
      }
    }
  }, [tags, maxTagsCount, tagMinLength, tagMaxLength]);

  const removeTag = useCallback((indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    
    setTags(updatedTags);
    onChange(updatedTags);
  }, [tags, onChange]);

  const removeAll = useCallback(() => {
    setTags([]);
    onChange([]);
    blurHandler();
  }, [onChange]);

  const focusHandler = () => {
    makeFly(true);
  };

  const blurHandler = () => {
    onBlur();
    makeFly(false);
  };

  return (
    <>
    <div className={clsx("flex flex-col border border-creamAccent rounded-md flyable",
      {
        "flying": flying
      },
      className
      )}>
      <div className='relative flex items-center'>
        <input
          type="text"
          onKeyDown={addTag}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={() => setError("")}
          ref={ref}
          className="flex-1 rounded-md py-2.5 px-4"
          maxLength={tagMaxLength}
          placeholder=' '
        />
        <label className='py-2.5 px-4 pointer-events-none flyable'>{title}</label>
        <div className='absolute right-0'>
          <IconButton 
            className='py-1 px-2 rounded-md hover:bg-cream active:bg-creamAccent border-0'
            icon="/images/clear-all 1.svg"
            w={32}
            h={32}
            alt='clear'
            onClick={removeAll}/>
        </div>
      </div>
      {!!tags.length && <div className='flex flex-row flex-wrap pt-1 pb-2.5 px-2'>
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center border border-cream rounded pl-2 ml-2 mt-2">
            {tag}
            <button type="button" onClick={() => removeTag(index)} className="px-2">x</button>
          </div>
        ))}
      </div>}
    </div>
    <span className="text-errorText">{error || formError?.message || Symbols.nbsp }</span>
    </>
  );
};
