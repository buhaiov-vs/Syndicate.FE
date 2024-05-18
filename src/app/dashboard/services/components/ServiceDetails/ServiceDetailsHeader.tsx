import { IconButton } from "@/lib/components";
import ServiceStatus from "../../types/serviceStatus";

type ServiceDetailsHeaderProps = {
    title: string;
    status: ServiceStatus;
    className: string;
    onEditClick: () => void;
    onEditCancelClick: () => void;
    isEdit: boolean
}

export function ServiceDetailsHeader({ title, status, className, onEditClick, onEditCancelClick, isEdit }: ServiceDetailsHeaderProps) {
  return (
    <div className={"flex flex-row justify-between border-b border-cream items-center h-12 py-2 px-5 bg-white rounded-md " + className}>
      <div className="flex items-center flex-row flex-1">
        <div className="flex justify-center items-center bg-creamAccent rounded-md px-5 mr-3 h-8">
            {ServiceStatus[status]}
        </div>
        {title}
      </div>
      <div className="flex">
        { isEdit ? (
          <div className="flex flex-row">
            <button 
              form="service-details-form"
              className="ripple px-4 w-36 h-8 text-primary hover:bg-creamLight rounded-md border border-primary" type="submit">
              SAVE
            </button>
            <IconButton
                onClick={onEditCancelClick}
                className="w-36 pl-2 h-8 border-error hover:bg-error hover:text-white ml-5 justify-between"
                icon="/images/add.svg"
                iconClassName="rotate-45"
                prefix="CANCEL"
                alt="Cancel"
                h={32}
                w={32}
            />
          </div>) : (
          <div className="">
            <IconButton
                onClick={onEditClick}
                className="w-36 h-8 pl-2 border-black"
                prefix="EDIT"
                icon="/images/pencil.svg"
                alt="Edit"
                h={32}
                w={32}
            />
          </div>)}
      </div>
    </div>
  );
}
