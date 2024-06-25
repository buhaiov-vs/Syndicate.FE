import { Service } from '@/app/dashboard/services/_lib/types';
import { getDurationHumanFriendly, getPriceHumanFriendly } from '@/lib/utils';

type ServiceDetailsViewProps = {
  service: Service
}

export default function ServiceDetailsView({
  service
}: ServiceDetailsViewProps) {
  return (
    <div className='flex flex-1 flex-col p-5 py-8'>
      <div className='flex flex-row'>
      Price: {getPriceHumanFriendly(service.price)}
      </div>
      <div className='flex flex-row'>
      Duration: {getDurationHumanFriendly(service.duration)}
      </div>
      <div className='flex flex-row'>
      Tags: {service.tags.join(', ')}
      </div>
      <div className='flex flex-row break-all whitespace-pre-wrap'>
        Description: 
        <br/>
        {service.description}
      </div>
    </div>
  );
}
