'use client';

import Image from 'next/image';
import React from 'react';
import { ErrorText } from '@/lib/components';
import clsx from 'clsx';

type NewItemInputProps = {
  className?: string;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => any;
}

export function NewItemInput({ onSubmit, value, onChange, className, error }: NewItemInputProps) {
  return (
    <div className={clsx("flex flex-col pl-2 py-2", className)}>
      <div className='flex w-full relative justify-end items-end'>
        <input
          autoFocus
          value={value}
          onChange={onChange}
          onKeyUp={e => e.code == "Enter" && onSubmit()}
          className="w-full appearance-none focus:outline-none p-2 pb-1 border-b">
        </input>
        <div
          onClick={onSubmit}
          className="ml-2 w-10 h-8 flex justify-center items-center border border-cream rounded-md hover:bg-cream active:bg-creamAccent"
        >
          <Image
            src="/images/check.svg"
            alt='Add'
            width={25}
            height={25}
          />
        </div>
      </div>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}
