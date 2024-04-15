'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { draftService } from '../actions';
import ErrorText from '@/components/ErrorText';
import React from 'react';
import { Service } from '../types/service';

type NewServiceInputProps = {
    onSubmit: (newService: Service) => void
}

export default function NewServiceInput({ onSubmit }: NewServiceInputProps) {
  const [ newName, setNewName ] = useState("");
  const [ error, setError ] = useState("");

  const handleSubmit = useCallback(async() => {
    if(!newName) {
      setError("Provide name");
    }

    const [result, error ] = await draftService(newName);
  
    if(error) {      
      setError(error.message);
    } else if (!result) {
      setError("Something went wrong.");
      //log
    } else {
      onSubmit(result);
    }
  }, [newName]);

  return (
    <div className="flex flex-col pl-2">
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
      <ErrorText condition={error}>{error}</ErrorText>
    </div>
  );
}
