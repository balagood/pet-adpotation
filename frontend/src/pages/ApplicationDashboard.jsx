import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchShelterApplications,updateApplication} from "../slices/applicationSlice";
import toast from "react-hot-toast";

export default function ApplicationDashboard() {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.applications.list);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.applications.loading);
  //const shelterId = "69ad867e7cb038246537335d"; 
  //const shelterId = "69ad867e7cb038246537335d"; 
  useEffect(() => {
    if(user?._id){
      console.log("Fetching for shelter",user._id);
      dispatch(fetchShelterApplications(user._id));
    }
  }, [dispatch,user]);

  const handleUpdate = async (id, status) => {
    try {
      console.log("Updating:", id, status);

      await dispatch(updateApplication({ id, status })).unwrap();

      toast.success(`Status changed to ${status}`);

      dispatch(fetchShelterApplications(user._id));
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Application Dashboard</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {apps.map((app) => (
          <div
            key={app._id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-2">
              Pet: {app.petId?.name}
            </h3>

            <p>User: {app.userId?.name}</p>
            <p>Email: {app.userId?.email}</p>

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

           
            {app.status === "submitted" && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleUpdate(app._id, "approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleUpdate(app._id, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}