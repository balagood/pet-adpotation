import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserApplications } from "../slices/applicationSlice";

export default function MyApplications() {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.applications.list);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.applications.loading);

  useEffect(() => {
    //dispatch(fetchUserApplications("69ad2f4daf6855f9de25df86"));
    dispatch(fetchUserApplications(user._id));
  }, [dispatch,user]);
  if(loading){
    return <p className="text-center">Loading....</p>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {apps.map((app) => (
          <div
            key={app._id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-2">
              {app.petId?.name}
            </h3>

            <p className="text-sm text-gray-600">
              Breed: {app.petId?.breed}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span
                className={`font-semibold ${
                  app.status === "approved"
                    ? "text-green-600"
                    : app.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {app.status}
              </span>
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}