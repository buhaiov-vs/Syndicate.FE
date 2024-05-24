import { useLocalStorage } from "@/lib/utils/localStorage";
import { LocalStorageKeys } from "@/lib/consts";

export default function DashboardPage() {
    return (
      <>
        <div className="flex h-1/2 flex-row flex-row mb-4">
          <div className="bg-white shadow-md rounded mr-4 flex flex-1">USER ID</div>
          <div className="bg-white shadow-md rounded flex flex-1">DASHBOARD</div>
        </div>
        <div className="flex h-96 flex-row mb-4">
          <div className="bg-white shadow-md rounded mr-4 flex flex-1">Body #3</div>
          <div className="bg-white shadow-md rounded flex flex-1">Body #3</div>
        </div>
        <div className="flex h-96 flex-row">
          <div className="bg-white shadow-md rounded mr-4 flex flex-1">Body #3</div>
          <div className="bg-white shadow-md rounded flex flex-1">Body #3</div>
        </div>
      </>
    )
}