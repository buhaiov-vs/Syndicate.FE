"use client";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { ResizableTextArea } from "@/lib/components";
import { ControlledInput } from '@/lib/components';
import { TagsInput } from '@/components';
import { Masks, Regexs, ValidationMessages, ValidationRules } from '@/lib/consts';
import { ResponseError } from '@/lib/types/response';
import { updateService } from '@/app/dashboard/services/_lib/actions';
import { Service } from '@/app/dashboard/services/_lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TimespanPicker } from '@/components';

export type ServiceForm = {
  id: string,
  name: string,
  description?: string,
  tags: string[],
  price: string,
  duration: number
}

const schema = yup
  .object({
    id: yup.string().required(),
    name: yup.string().required(ValidationMessages.required),
    description: yup.string().max(ValidationRules.Service.Description.maxLength),
    price: yup.string().required(ValidationMessages.required).matches(Regexs.price, ValidationMessages.priceFormat),
    tags: yup.array().of(yup.string().required().max(ValidationRules.Service.Tag.maxLength)).min(ValidationRules.Service.Tag.minCount, ValidationMessages.required).max(ValidationRules.Service.Tag.maxCount).required(),
    duration: yup.number().required(ValidationMessages.required).min(ValidationRules.Service.Duration.min).max(ValidationRules.Service.Duration.max),
  })
  .required();

type ServiceDetailsFormProps = {
  service: Service
}

export default function ServiceDetailsForm({
  service
}: ServiceDetailsFormProps) {
  const router = useRouter();
  const { handleSubmit, control } = useForm<ServiceForm>({
    mode: 'onSubmit',
    defaultValues: {
      id: service.id,
      name: service.name,
      description: service.description,
      tags: service.tags,
      price: service.price,
      duration: service.duration
    },
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<ServiceForm> = async (data) => {
    const [, error] = await updateService(data);
    
    if (error) {
      toast.error(error.message);

      return;
    }

    router.push('/');
  }

  return (
    <>
      <form id='service-details-form' onSubmit={handleSubmit(submitHandler)} className="flex flex-col p-5 py-8 w-1/2">
        <ControlledInput 
          control={control}
          title='Name'
        />
        <ResizableTextArea
          maxHeight="200px"
          maxLength={ValidationRules.Service.Description.maxLength}
          control={control}
          className='mt-4'
          textareaClassName="appearance-none border border-creamAccent rounded-md text-primary py-2.5 px-4"
          title='Description'
        />
        <div className='mt-4'>
          <TagsInput
            maxTagsCount={ValidationRules.Service.Tag.maxCount}
            tagMaxLength={ValidationRules.Service.Tag.maxLength}
            tagMinLength={ValidationRules.Service.Tag.minLength}
            control={control}
            title="Tags"
          />
        </div>
        <div className='flex flex-row'>
          <div className='flex mt-4 mr-4'>
            <ControlledInput
              control={control}
              title='Price'
              inputClassName='currencyInput'
              mask={Masks.price}
            />
          </div>
          <div className='flex mt-4 flex-col'>
            <TimespanPicker
              title="Duration"
              control={control}
            />
          </div>
        </div>
      </form>
    </>
  );
}
