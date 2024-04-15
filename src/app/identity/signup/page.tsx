'use client';

import Routes from '@/lib/routes'
import ErrorText from '@/components/ErrorText';
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signup } from '../actions';
import { useLocalStorage } from '@/lib/utils/localStorage';
import Consts from '@/lib/consts';
import { useState } from 'react';
import SignupResponse from '../types/signupResponse';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
 
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

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormState>({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SignupFormState> = async (data) => {
    const response: SignupResponse = await signup(data);
    
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
        <div className='text-base'>welcome to</div>
        <div className="text-4xl mb-12">SYNDICATE</div>
          <div className="w-1/3 mb-8 flex flex-col relative">
            <input autoFocus className={"appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4"} id="name" type="text" placeholder=' ' {...register("name")} />
            <label className="py-2.5 px-4">name</label>
            <ErrorText condition={errors.name} placeholder='&nbsp;'>{errors.name?.message}</ErrorText>
          </div>
          <div className="w-1/3 mb-8 flex flex-col relative">
            <input className="appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4" id="username" type="text" placeholder=' ' {...register("username")} />
            <label className="py-2.5 px-4">username</label>
            <ErrorText condition={errors.username} placeholder='&nbsp;'>{errors.username?.message}</ErrorText>
          </div>
          <div className="w-1/3 mb-8 flex flex-col relative">
            <input className="appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4" id="password" type="password" placeholder=' ' {...register("password")} />
            <label className="py-2.5 px-4">password</label>
            <ErrorText condition={errors.password} placeholder='&nbsp;'>{errors.password?.message}</ErrorText>
          </div>
          <div className="w-1/3 mb-8 flex flex-col relative">
            <input className="appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4" id="email" type="email" placeholder=' ' {...register("email")} />
            <label className="py-2.5 px-4">email</label>
            <ErrorText condition={errors.email} placeholder='&nbsp;'>{errors.email?.message}</ErrorText>
          </div>
          <button className="ripple w-full text-primary hover:bg-creamLight rounded-md border-2 border-primary py-2.5" type="submit">
            CREATE ACCOUNT
          </button>
        <Link href={Routes.signIn} className='text-base mt-4 hover:underline cursor-pointer px-5 pt-2 pb-5'>Already have account? Sign in!</Link>
        <ErrorText condition={errorMessage} placeholder='&nbsp;'>{errorMessage}</ErrorText>
      </form>
    </div>
  )
}