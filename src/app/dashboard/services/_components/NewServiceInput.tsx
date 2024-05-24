'use client';

import Image from 'next/image';
import { startTransition, useCallback, useState } from 'react';
import { draftService } from '../_lib/actions';
import React from 'react';
import { ErrorText } from '@/lib/components';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type NewServiceInputProps = React.HTMLAttributes<HTMLDivElement> & {
  onSubmit: () => void;
}

export function NewServiceInput({ onSubmit, className }: NewServiceInputProps) {
  const router = useRouter();
  const [ newName, setNewName ] = useState("");
  const [ error, setError ] = useState("");
 
  const handleSubmit = useCallback(async () => {
    if(!newName) {
      setError("Provide name");
    }

    const [result, error ] = await draftService(newName);
  
    if(error) {      
      setError(error.message);
    } else if (!result) {
      setError("Something went wrong.");
    } else {
      startTransition(() => {
        onSubmit();
        router.refresh();
      });
    }
  }, [newName]);

  return (
    <div className={clsx("flex flex-col pl-2", className)}>
      <div className='flex w-full relative justify-center items-center'>
        <input
          autoFocus
          onChange={e => setNewName(e.currentTarget.value)}
          onKeyUp={e => e.code == "Enter" && handleSubmit()}
          className="w-full appearance-none focus:outline-none mb-1 p-2 pr-8 border-b">
        </input>
        <div
          onClick={handleSubmit}
          className="w-8 h-8 flex justify-center items-center absolute right-0 border border-cream rounded-md hover:bg-cream active:bg-creamAccent"
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
