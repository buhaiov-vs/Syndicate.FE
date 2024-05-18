import { getService } from "../../data";
import useFetch from "@/lib/hooks/useFetch";
import { Service } from "../../types/service";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "@/lib/components";
import { ServiceDetailsForm, ServiceDetailsHeader, ServiceDetailsView } from ".";
import { toast } from "react-toastify";
import { ResponseError, ResponseErrorType } from "@/lib/types/response";

type ServicesListProps = {
    id?: string;
}

export default function ServiceDetails({ id }: ServicesListProps) {
  const [isEdit, setEdit] = useState(false);
  const { data, error, isLoading } = useFetch<Service>(
    getService,
    id,
    { initialyLoading: true }
  );

  useEffect(() => {
    setEdit(false);
  }, [id])

  const handleEditClick = useCallback(() => {
    setEdit(true);
  }, [])

  const handleEditCancelClick = useCallback(() => {
    setEdit(false);
  }, [])

  const handleEditError = useCallback((error: ResponseError) => {
    if(error.type !== ResponseErrorType.network)
      toast.error(error.message);
  }, []);

  return (
    <div className="flex flex-1 rounded-md flex-col">
      {isLoading && !error ? (
        <div className="flex flex-1 rounded-md bg-white">
          <Loader />
        </div>) : (
        <>
          <ServiceDetailsHeader
            className="mb-2"
            title={data!.name}
            status={data!.status}
            isEdit={isEdit}
            onEditClick={handleEditClick}
            onEditCancelClick={handleEditCancelClick}
          />
          { isEdit ? (
            <ServiceDetailsForm service={data!} onSuccess={handleEditCancelClick} onError={handleEditError} />
          ) : (
            <ServiceDetailsView service={data!} />
          )}
        </>
      )}
    </div>
  );
}
