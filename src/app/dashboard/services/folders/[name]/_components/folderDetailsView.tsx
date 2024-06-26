import { Service } from '@/app/dashboard/services/_lib/types';
import { Folder } from '@/lib/types/features';

type ServicesFolderDetailsViewProps = {
  folder: Folder<Service>
}

export function ServicesFolderDetailsView({
  folder
}: ServicesFolderDetailsViewProps) {
  return (
    <div className='flex flex-1 flex-col p-5 py-8'>
      <div className='flex flex-row'>
        {folder.name}
      </div>
    </div>
  );
}
