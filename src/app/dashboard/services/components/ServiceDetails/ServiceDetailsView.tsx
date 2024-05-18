import { Service } from "../../types/service";

type ServiceDetailsViewProps = {
  service: Service
}

export function ServiceDetailsView({ service }: ServiceDetailsViewProps) {
  return (
    <div className="flex flex-1 bg-white rounded-md px-5">
      View: {service.name}
    </div>
  );
}
