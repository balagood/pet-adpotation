import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  createUpdate,
} from "../slices/fosterUpdateSlice";


const FosterUpdateForm = () => {


  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const loading = useSelector(
    (state) => state.fosterUpdate?.loading
  );



  const [photoFiles, setPhotoFiles] = useState([]);



  const [formData, setFormData] = useState({

    description: "",
    healthStatus: "",
    weight: "",
    petId: "",



  });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!formData.description.trim()) {

      toast.error(
        "Description is required"
      );

      return;

    }



    try {


      await dispatch(

        createUpdate({

          fosterId: id,
          description: formData.description,
          petId:formData.petId,
          healthStatus: formData.healthStatus,
          weight: formData.weight,
          photoFiles,
          //updateData: formData,
          //photoFiles,

        })

      ).unwrap();



      toast.success(
        "Foster update added successfully"
      );



      navigate(
        `/foster-updates/${id}`
      );


    } catch (error) {


      toast.error(
        error || "Something went wrong"
      );


    }


  };



  return (

    <div className="max-w-3xl mx-auto p-6">


      <div className="bg-white shadow-lg rounded-xl p-8">


        <h2 className="text-3xl font-bold mb-6 text-center">
          Add Foster Pet Update
        </h2>



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          {/* Description */}

          <div>

            <label className="font-semibold">
              Description *
            </label>


            <textarea

              name="description"

              value={formData.description}

              onChange={handleChange}

              placeholder="Enter pet condition update"

              className="w-full border p-3 rounded mt-1"

              rows="4"

            />

          </div>




          {/* Health Status */}

          <div>

            <label className="font-semibold">
              Health Status
            </label>


            <input

              type="text"

              name="healthStatus"

              value={formData.healthStatus}

              onChange={handleChange}

              placeholder="Example: Healthy, Vaccinated, Needs Care"

              className="w-full border p-3 rounded mt-1"

            />

          </div>





          {/* Weight */}

          <div>

            <label className="font-semibold">
              Weight (KG)
            </label>


            <input

              type="number"

              name="weight"

              value={formData.weight}

              onChange={handleChange}

              placeholder="Enter pet weight"

              className="w-full border p-3 rounded mt-1"

            />

          </div>





          {/* Photos */}

          <div>

            <label className="font-semibold">
              Upload Progress Photos
            </label>


            <input

              type="file"

              multiple

              accept="image/*"

              onChange={(e)=>
                setPhotoFiles(
                  Array.from(e.target.files)
                )
              }

              className="w-full border p-2 rounded mt-1"

            />


          </div>





          {/* Submit Button */}

          <div className="flex justify-end">


            <button

              type="submit"

              disabled={loading}

              className={`px-6 py-3 rounded-lg text-white font-semibold ${
                
                loading
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"

              }`}

            >

              {loading
                ? "Saving..."
                : "Save Update"
              }


            </button>


          </div>




        </form>


      </div>


    </div>

  );

};



export default FosterUpdateForm;