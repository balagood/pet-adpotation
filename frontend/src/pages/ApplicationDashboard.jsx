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
  <div className="w-full max-w-7xl mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6">
      Application Dashboard
    </h2>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500">Total</p>
        <h3 className="text-2xl font-bold">
          {apps.length}
        </h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500">Pending</p>
        <h3 className="text-2xl font-bold text-yellow-500">
          {apps.filter(
            (a) =>
              a.status === "submitted" ||
              a.status === "pending"
          ).length}
        </h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500">Approved</p>
        <h3 className="text-2xl font-bold text-green-600">
          {apps.filter(
            (a) => a.status === "approved"
          ).length}
        </h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500">Rejected</p>
        <h3 className="text-2xl font-bold text-red-600">
          {apps.filter(
            (a) => a.status === "rejected"
          ).length}
        </h3>
      </div>
    </div>

    {/* Applications */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {apps.map((app) => (
        <div
          key={app._id}
          className="bg-white shadow rounded-xl p-4"
        >
          <h3 className="font-bold text-lg">
            {app.petId?.name}
          </h3>

          <p>User: {app.userId?.name}</p>
          <p>{app.userId?.email}</p>

          <p className="mt-2">
            Status:
            <span className="ml-2 font-semibold">
              {app.status}
            </span>
          </p>

          {(app.status === "submitted" ||
            app.status === "pending") && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() =>
                  handleUpdate(
                    app._id,
                    "approved"
                  )
                }
                className="flex-1 bg-green-500 text-white py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  handleUpdate(
                    app._id,
                    "rejected"
                  )
                }
                className="flex-1 bg-red-500 text-white py-2 rounded"
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