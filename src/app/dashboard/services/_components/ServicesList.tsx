'use client';

import clsx from "clsx";
import Link from "next/link";
import { ActionsBar, SearchBar } from "@/components";
import { useCallback, useEffect, useState } from "react";
import { IconButton } from "@/lib/components";
import { Service } from "../_lib/types";
import { useParams } from "next/navigation";
import { createServicesFolder, draftService } from "../_lib/actions";
import { NewItemInput } from "./NewItemInput";
import { ResponseError } from "@/lib/types/response";
import { useRouter } from "next/navigation";
import Routes from "@/lib/routes";

type ServicesListProps = {
  activeServiceId?: string,
  services?: Service[],
  id?: string
}

export function ServicesList({ services }: ServicesListProps) {
  const router = useRouter();
  const { id } = useParams();

  const [ search, setSearch ] = useState("");
  const [ error, setError ] = useState("");

  const [ newValue, setNewValue ] = useState("");
  const [ addingServiceInProgress, setAddingServiceInProgress ] = useState(false);
  const [ addingFolderInProgress, setAddingFolderInProgress ] = useState(false);

  const toggleAddService = useCallback(() => {
    setAddingServiceInProgress(!addingServiceInProgress);
    setAddingFolderInProgress(false);
  }, [addingServiceInProgress, setAddingServiceInProgress])

  const toggleAddFolder = useCallback(() => {
    setAddingFolderInProgress(!addingFolderInProgress);
    setAddingServiceInProgress(false);
  }, [addingFolderInProgress, setAddingFolderInProgress])

  const handleSubmit = async () => {
    if (!newValue)
      setError("Provide name");

    let result: Service | undefined;
    let errors: ResponseError[] | undefined;
    if (addingServiceInProgress) {
      [ result , errors ] = await draftService(newValue);
    } else if (addingFolderInProgress) {
      [ , errors ] = await createServicesFolder(newValue);
    }
  
    if(errors?.length) {
      setError(errors[0].message);
    } else {
      setError("");
      
      if (addingServiceInProgress) {
        router.push(`${Routes.dashboardServices}/${result!.id}`);
      } else if (addingFolderInProgress) {
        router.push(`${Routes.dashboardServicesFolders}/${newValue}`);
      }
      
      router.refresh();
    }
  };

  useEffect(() => {

  }, [search])

  return (
    <>
      <SearchBar
        placeholder="service name"
        onChange={setSearch}
      />
      <ActionsBar className='mt-2'>
        <IconButton
          onClick={toggleAddFolder}
          className='w-1/3 h-8'
          icon={addingFolderInProgress ? "/images/folder-x.svg" : "/images/folder.svg"}
          alt="add"
          h={32}
          w={32}
        />
        <IconButton
          onClick={toggleAddService}
          className='flex flex-1 addService h-8 ml-3'
          icon="/images/add.svg"
          iconClassName={"transition " + (addingServiceInProgress ? 'rotate-45' : "")}
          alt="add"
          h={32}
          w={32}
        />
      </ActionsBar>
      {(addingServiceInProgress || addingFolderInProgress) && 
        <NewItemInput
          onSubmit={handleSubmit}
          onChange={(e) => setNewValue(e.currentTarget.value)}
          value={newValue}
        />
      }
      <div className={clsx("h-full overflow-auto", { "mt-3": !addingServiceInProgress })}>
        <div className="flex flex-col flex-1">
        {services ? (
          services.map(x =>
            <Link key={x.id} href={`/dashboard/services/${x.id}`}>
              <div key={x.id} className={clsx("p-2 pl-4 hover:bg-creamAccent cursor-pointer", { "bg-cream": x.id === id })}>
                <div className="line-clamp-2 overflow-ellipsis break-all">
                    {x.name}
                </div>
              </div>
            </Link>
          )
        ) : (
          <p className='self-center mt-8'>No services yet. Let&apos;s create one</p>
        )}
        </div>
      </div>
    </>
  );
}
