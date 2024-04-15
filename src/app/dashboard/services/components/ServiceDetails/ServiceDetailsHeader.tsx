import ServiceStatus from "../../types/serviceStatus";

type ServiceDetailsHeaderProps = {
    title: string;
    status: ServiceStatus;
    className: string;
}

export default function ServiceDetails({ title, status, className }: ServiceDetailsHeaderProps) {
  return (
    <div className={"flex justfy-between border-b border-cream items-center h-12 py-2 px-5 bg-white rounded-md " + className}>
        <div className="flex flex-row">
            <div className="bg-creamAccent rounded-md px-5 mr-3">
                {ServiceStatus[status]}
            </div>
            {title}
        </div>
        <div className="">
            <div className="border">
                <Image 
                    
                />
            </div>
        </div>
    </div>
  );
}
