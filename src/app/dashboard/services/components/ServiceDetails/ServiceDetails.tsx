import { getService } from "../../data";
import useFetch from "@/lib/hooks/useFetch";
import { Service } from "../../types/service";
import Loader from "@/components/Loader/loader";
import ServiceDetailsHeader from "./ServiceDetailsHeader";
import ServiceDetailsView from "./ServiceDetailsView";
import ServiceDetailsForm from "./ServiceDetailsForm";

type ServicesListProps = {
    id?: string;
}

export default function ServiceDetails({ id }: ServicesListProps) {
  const { data, error, isLoading } = useFetch<Service>(
    getService,
    id,
    { initialyLoading: true });

  return (
    <div className="flex flex-1 rounded-md flex-col">
      {isLoading ? (
        <div className="flex flex-1 rounded-md bg-white">
          <Loader />
        </div>) : (
        <>
          <ServiceDetailsHeader className="mb-2" title={data!.name} status={data!.status} />
          <ServiceDetailsView />
          <ServiceDetailsForm />
        </>
      )}
    </div>
  );
}
