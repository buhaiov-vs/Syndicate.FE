'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { deleteService, draftService } from '../actions';
import ErrorText from '@/components/ErrorText';
import React from 'react';
import { Service } from '../types/service';
import { ResponseErrorType } from '@/lib/types/response';
import Loader from '@/components/Loader/loader';

type ServiceDeleteProps = {
    service: Service,
    onApprove: () => void,
    onDecline: () => void
}

export default function ServiceDeletePrompt({ service, onApprove, onDecline }: ServiceDeleteProps) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState("");

  const handleApprove = useCallback(async () => {
    setIsLoading(true);
    try {
        const [, error ] = await deleteService(service);
    
        if(error) {      
          if(error.type == ResponseErrorType.network) {
            setError("Sorry, was not able to delete service. Try again later.");  
          } else {
            setError(error.message);
          }
        } else {
          onApprove();
        }
    } finally {
        setIsLoading(false);
    }
  }, []);

  return isLoading ? (
      <Loader text='Deleting in progress...' />
    ) : (
      <div className="flex flex-col pl-2 justify-center py-4">
        <div className='flex justify-center items-center text-center'>
          Are you sure deleting "{service.name}" service?
        </div>
        <div className='flex flex-row justify-evenly mt-2'>
          <div
            onClick={handleApprove}
            className='w-1/3 cursor-pointer border border-error px-2 py-1 rounded-md hover:bg-error hover:text-white text-center'
          >
            Yes, delete
          </div>
          <div
            onClick={onDecline}
            className='w-1/3 cursor-pointer border border-cream px-2 py-1 rounded-md hover:bg-creamAccent text-center'
          >
            Cancel
          </div>
        </div>
        <ErrorText condition={error} className='pl-2'>{error}</ErrorText>
      </div>
    );
}
