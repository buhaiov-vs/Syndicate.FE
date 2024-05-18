import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { Service } from "../../types/service";
import { ResizableTextArea } from "@/lib/components";
import { ControlledInput } from '@/lib/components';
import { TagsInput } from '@/components';
import { TimespanPicker } from '@/components/TimeSpanPicker/TimeSpanPicker';
import { Masks, Regexs, ValidationMessages, ValidationRules } from '@/lib/consts';
import { updateService } from '../../actions';
import { ResponseError } from '@/lib/types/response';

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
  service: Service,
  onSubmit?: () => void,
  onSuccess?: () => void,
  onError?: (error: ResponseError) => void
}

export function ServiceDetailsForm({
  service,
  onSubmit,
  onSuccess,
  onError
}: ServiceDetailsFormProps) {
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
    onSubmit && onSubmit();
  debugger;
    var [, error] = await updateService(data);
    
    if (error) {
      onError && onError(error);

      return;
    }

    onSuccess && onSuccess();
  }

  return (
    <div className="flex flex-1 bg-white rounded-md">
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
    </div>
  );
}
