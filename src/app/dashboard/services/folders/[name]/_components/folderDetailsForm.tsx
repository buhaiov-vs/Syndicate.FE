"use client";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { ResizableTextArea } from "@/lib/components";
import { ControlledInput } from '@/lib/components';
import { TagsInput } from '@/components';
import { Masks, ValidationMessages, ValidationRules } from '@/lib/consts';
import { updateServicesFolder } from '@/app/dashboard/services/_lib/actions';
import { Service } from '@/app/dashboard/services/_lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TimespanPicker } from '@/components';
import { Folder } from '@/lib/types/features';

export type FolderForm = {
  name: string
}

const schema = yup
  .object({
    name: yup.string().required(ValidationMessages.required)
  })
  .required();

type ServiceDetailsFormProps = {
  folder: Folder<Service>
}

export function ServicesFolderDetailsForm({
  folder
}: ServiceDetailsFormProps) {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FolderForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: folder.name,
    },
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<FolderForm> = async (data) => {
    const [, errors] = await updateServicesFolder(folder.name, data);
    
    if (errors?.length) {
      errors.forEach((value) => {
        toast.error(value.message, {
          className: 'whitespace-pre-wrap',
          toastId: folder.name
        });
      });

      return;
    }

    router.back();
    router.refresh();
  }

  return (
    <>
      <form id='services-folder-details-form' onSubmit={handleSubmit(submitHandler)} className="flex flex-col p-5 py-8 w-1/2">
        <ControlledInput 
          control={control}
          title='Name'
        />
      </form>
    </>
  );
}
