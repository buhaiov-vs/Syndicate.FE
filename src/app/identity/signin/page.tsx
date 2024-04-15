'use client';

import Consts from '@/lib/consts';
import Routes from '@/lib/routes'
import ErrorText from '@/components/ErrorText';
import { useLocalStorage } from '@/lib/utils/localStorage';
import Link from 'next/link'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signin } from '../actions';
import SigninResponse from './types/signinResponse';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type SigninFormState = {
  username: string,
  password: string
}

const schema = yup
  .object({
    username: yup.string().required(Consts.ValidationMessages.required),
    password: yup.string().required(Consts.ValidationMessages.required),
  })
.required()

export default function SignIn() {
  const router = useRouter();
  const [_, setUserId] = useLocalStorage<string>(Consts.LocalStorageKeys.userId);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm<SigninFormState>({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SigninFormState> = async (data) => {
    const response: SigninResponse = await signin(data);
    
    if(response.error)
    {
      setErrorMessage(response.error.message);
      return;
    }

    setUserId(response.data!.userId);
    router.push(Routes.dashboard);
  }
  
  return (
    <div className="flex flex-col items-center min-h-screen pt-9">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl flex flex-col items-center w-1/2 p-14 pb-10">
        <div className='text-base'>sign in to</div>
        <div className='text-4xl mb-12'>SYNDICATE</div>
      
        <div className="w-1/3 mb-8 flex flex-col">
          <input className="appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4" id="username" type="text" placeholder="username" {...register("username", { required: true })} />
          <ErrorText condition={errors.username} placeholder='&nbsp;'>{errors.username?.message}</ErrorText>
        </div>
        <div className="w-1/3 mb-8 flex flex-col">
          <input className="appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4" id="password" type="password" placeholder="password" {...register("password", { required: true })} />
          <ErrorText condition={errors.password} placeholder='&nbsp;'>{errors.password?.message}</ErrorText>
        </div>
        
        <button className="ripple w-full text-primary hover:bg-creamLight rounded-md border-2 border-primary py-2.5" type="submit">
          LOG IN
        </button>
        <Link href={Routes.signUp} className='text-base mt-4 hover:underline cursor-pointer px-5 pt-2 pb-5'>Don&apos;t have account? Create!</Link>
        <ErrorText condition={errorMessage} placeholder='&nbsp;'>{errorMessage}</ErrorText>
      </form>
    </div>
  )
}