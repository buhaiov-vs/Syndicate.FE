'use client';

import ActionsBar from "@/components/ActionsBar/ActionsBar";
import Loader from "@/components/Loader/loader";
import SearchBar from "@/components/SearchBar/searchBar";
import Image from 'next/image';
import { useCallback, useEffect, useState } from "react";
import NewServiceInput from './components/NewServiceInput';
import ServiceDeletePrompt from './components/ServiceDeletePrompt';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import ServicesList from "./components/ServicesList";
import { useServicesContext } from './context';
import { getServices } from "./data";
import { Service } from "./types/service";

export default function ServicesPageContent() {
    const [ search, setSearch ] = useState("");
    const [ error, setError ] = useState("");
    const [ isServicesLoading, setIsServicesLoading ] = useState(true);
    const [ services, setServices ] = useState<Array<Service>>([]);
    const [ selectedService, selectService ] = useState<Service | null>(null);
    const [ addingInProgress, setAdd ] = useState(false);
    const [ deleteInProgress, setDelete ] = useState(false);
    const [ newService, addNewService ] = useState<Service | null>(null);
    const [ needRefresh, refresh ] = useState(false);
    const { lastRefresh } = useServicesContext();

    useEffect(() => {
      const call = async () => {
        try {
          setIsServicesLoading(true);
          const [ data, error ] = await getServices();
        
          if(error) {
            setError(error.message);
          } else if (data)
          {
            setServices(data);
            selectService(newService);
            addNewService(null);
            if(data.length == 1) {
              selectService(data[0]);
            }
          }
        } finally {
          setIsServicesLoading(false);
        }
      }

      call();
    }, [needRefresh, ]);

    const toggleAdd = useCallback(() => {
      setAdd(!addingInProgress);
    }, [addingInProgress])

    const handleDelete = useCallback(() => {
      setDelete(!deleteInProgress);
      selectService(null);
      refresh(!needRefresh);
    }, [deleteInProgress, needRefresh])

    const handleNewServiceSubmit = useCallback((newService: Service) => {
      setAdd(false);
      addNewService(newService);
      refresh(!needRefresh);
    }, [needRefresh]);

    return error ? (
        <div>
          {error}
        </div>
      ) : (
        <>
          <div className="flex flex-row mb-4 h-full">
            <div className="flex flex-col p-2 bg-white w-1/6 shadow-md rounded mr-4">
              <SearchBar
                placeholder="service name"
                onChange={setSearch}
              />
              <ActionsBar className='mt-2'>
                <div
                  onClick={toggleAdd}
                  className='addService flex cursor-pointer select-none w-full h-8 justify-center border border-cream border-solid rounded-md hover:bg-cream active:bg-creamAccent'>
                  <Image
                    src="/images/add.svg"
                    className={"transition " + (addingInProgress ? 'rotate-45' : "")}
                    alt="add"
                    height={32}
                    width={32}
                  />
                </div>
              </ActionsBar>
              { isServicesLoading ? (
                  <Loader wrapperClassName="mt-8" text="Loading services list..." />
                ) : (
                  <div className={"flex flex-col flex-1 " + (addingInProgress || "mt-1")}>
                    {deleteInProgress && <ServiceDeletePrompt service={selectedService!} onApprove={handleDelete} onDecline={() => setDelete(false)} />}
                    {addingInProgress && <NewServiceInput key="addInput" onSubmit={handleNewServiceSubmit} />}
                    {(services.length || addingInProgress) ? (
                    <ServicesList
                      activeService={selectedService}
                      services={services}
                      onSelect={selectService}
                    />) : (
                      <p className='self-center mt-8'>No services yet. Let's create one</p>
                    )}
                  </div>
                )
              }
            </div>
            {selectedService ? (
              <div className="w-5/6 rounded mr-4 flex">
                <ServiceDetails id={selectedService?.id} />
              </div>) : (
                <div className="w-5/6 mr-4"></div> 
              )
            }
          </div>
        </>
      );
}