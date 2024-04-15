import { Service } from "../types/service";

type ServicesListProps = {
    services: Service[];
    onSelect: (item: Service) => void,
    activeService: Service | null,
}

export default function ServicesList({ activeService, services, onSelect }: ServicesListProps) {
  return (
    <>
      {services.map(x =>
        <div className={"p-2 pl-4 hover:bg-creamAccent cursor-pointer " + (activeService?.id === x.id && "bg-cream")}>
        <div
          key={x.id}
          onClick={() => onSelect(x)}
          className="line-clamp-2 overflow-ellipsis break-all"
        >
          {x.name}
        </div>
        </div>
      )}
    </>
  );
}
