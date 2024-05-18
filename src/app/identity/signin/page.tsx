'use client';

import Routes from '@/lib/routes'
import { useLocalStorage } from '@/lib/utils/localStorage';
import Link from 'next/link'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signin } from '../actions';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledInput, ErrorText } from '@/lib/components';
import { ValidationMessages, LocalStorageKeys } from '@/lib/consts';

export type SigninFormState = {
  username: string,
  password: string
}

const schema = yup
  .object({
    username: yup.string().required(ValidationMessages.required),
    password: yup.string().required(ValidationMessages.required),
  })
.required()

export default function SignIn() {
  const router = useRouter();
  const [_, setUserId] = useLocalStorage<string>(LocalStorageKeys.userId);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { handleSubmit, control } = useForm<SigninFormState>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),

  });

  const onSubmit: SubmitHandler<SigninFormState> = async (form) => {
    const [ data, error ] = await signin(form);
    
    if(error)
    {
      setErrorMessage(error.message);
      return;
    }

    setUserId(data!.userId);
    router.push(Routes.dashboard);
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-9">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl flex flex-col items-center w-1/2 p-14 pb-10">
        <div className='text-base'>sign in to</div>
        <div className='text-4xl mb-12'>SYNDICATE</div>      
        <ControlledInput
          title='username'
          className='w-1/3 mb-8'
          control={control}
        />
        <ControlledInput
          title='password'
          className='w-1/3 mb-8'
          control={control}
          type='password'
        />
        <button className="ripple w-full text-primary hover:bg-creamLight rounded-md border-2 border-primary py-2.5" type="submit">
          LOG IN
        </button>
        <Link href={Routes.signUp} className='text-base mt-4 hover:underline cursor-pointer px-5 pt-2 pb-5'>Don&apos;t have account? Create!</Link>
        <ErrorText>{errorMessage}</ErrorText>
      </form>
    </div>
  )
}