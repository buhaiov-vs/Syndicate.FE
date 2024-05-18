'use client';

import Routes from '@/lib/routes'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signup } from '../actions';
import { useLocalStorage } from '@/lib/utils/localStorage';
import Consts from '@/lib/consts';
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { ControlledInput, ErrorText } from '@/lib/components';
 
export type SignupFormState = {
  name: string,
  username: string,
  password: string,
  email: string
}

const schema = yup
  .object({
    name: yup.string().required(Consts.ValidationMessages.required),
    username: yup.string().required(Consts.ValidationMessages.required),
    password: yup.string().required(Consts.ValidationMessages.required),
    email: yup.string().required(Consts.ValidationMessages.required).matches(Consts.Regexs.email, Consts.ValidationMessages.email)
  })
.required()

export default function SignUp() {
  const router = useRouter();
  const [_, setUserId] = useLocalStorage<string>(Consts.LocalStorageKeys.userId);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, control } = useForm<SignupFormState>({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SignupFormState> = async (form) => {
    const [ data, error] = await signup(form);
    
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
        <div className='text-base'>welcome to</div>
        <div className="text-4xl mb-12">SYNDICATE</div>
          <ControlledInput
            className="w-1/3 mb-8 flex flex-col relative"
            title='Name'
            control={control}
          />
          <ControlledInput
            className="w-1/3 mb-8 flex flex-col relative"
            title='Username'
            control={control}
          />
          <ControlledInput
            className="w-1/3 mb-8 flex flex-col relative"
            title='Password'
            control={control}
            type='password'
          />
          <ControlledInput
            className="w-1/3 mb-8 flex flex-col relative"
            title='Email'
            control={control}
          />
          <button className="ripple w-full text-primary hover:bg-creamLight rounded-md border-2 border-primary py-2.5" type="submit">
            CREATE ACCOUNT
          </button>
        <Link href={Routes.signIn} className='text-base mt-4 hover:underline cursor-pointer px-5 pt-2 pb-5'>Already have account? Sign in!</Link>
        <ErrorText>{errorMessage}</ErrorText>
      </form>
    </div>
  )
}