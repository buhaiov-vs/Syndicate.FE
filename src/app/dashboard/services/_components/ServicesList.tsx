'use client';

import clsx from "clsx";
import Link from "next/link";
import { ActionsBar, SearchBar } from "@/components";
import { useCallback, useMemo, useState } from "react";
import { IconButton } from "@/lib/components";
import { Service } from "../_lib/types";
import { NewServiceInput, ServiceDeletePrompt } from "../_components";

type ServicesListProps = {
  activeServiceId?: string,
  services?: Service[],
  id?: string
}

export function ServicesList({ services, id }: ServicesListProps) {
  const [ search, setSearch ] = useState("");
  const [ addingInProgress, setAddingInProgress ] = useState(false);
  const [ deleteInProgress, setDeleteInProgress ] = useState(false);

  const toggleAdd = useCallback(() => {
    setAddingInProgress(!addingInProgress);
  }, [addingInProgress, setAddingInProgress])

  const handleDelete = useCallback(() => {
    setDeleteInProgress(!deleteInProgress);
  }, [deleteInProgress, setDeleteInProgress])

  const selectedService = useMemo(() => services?.find(x => x.id === id), [services, id]);

  return (
    <>
      <SearchBar
        placeholder="service name"
        onChange={setSearch}
      />
      <ActionsBar className='mt-2'>
        <IconButton
          onClick={toggleAdd}
          className='addService w-full h-8'
          icon="/images/add.svg"
          iconClassName={"transition " + (addingInProgress ? 'rotate-45' : "")}
          alt="add"
          h={32}
          w={32}
        />
      </ActionsBar>
        <div className={"flex flex-col flex-1 " + (addingInProgress || "mt-1")}>
          {deleteInProgress && id && <ServiceDeletePrompt id={id} name={selectedService!.name} onApprove={handleDelete} onDecline={() => setDeleteInProgress(false)} />}
          <NewServiceInput className={clsx({"hidden": !addingInProgress, "": !addingInProgress })} key="addInput" onSubmit={() => setAddingInProgress(false)} />
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
    </>
  );
}
