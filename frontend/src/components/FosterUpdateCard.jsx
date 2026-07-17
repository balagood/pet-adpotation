import React from "react";


const FosterUpdateCard = ({
  update,
  onDelete,
}) => {


  return (

    <div className="bg-white rounded-xl shadow-lg p-5">


      {/* Title */}

      <h2 className="text-xl font-bold mb-3">
        Foster Progress Update
      </h2>



      {/* Description */}

      <p className="text-gray-700">

        <strong>Description:</strong>{" "}

        {update.description}

      </p>




      {/* Health Status */}

      <p className="text-gray-700 mt-2">

        <strong>Health Status:</strong>{" "}

        {update.healthStatus || "Not Updated"}

      </p>




      {/* Weight */}

      <p className="text-gray-700 mt-2">

        <strong>Weight:</strong>{" "}

        {update.weight
          ? `${update.weight} kg`
          : "Not Updated"
        }

      </p>





      {/* Photos */}

      {
        update.photos &&
        update.photos.length > 0 && (

          <div className="mt-4">


            <h3 className="font-semibold mb-2">
              Progress Photos
            </h3>



            <div className="grid grid-cols-2 gap-3">


              {
                update.photos.map(
                  (photo,index)=> (

                    <img

                      key={index}

                      src={photo}

                      alt="Foster Update"

                      className="w-full h-32 object-cover rounded-lg"

                    />

                  )
                )
              }


            </div>


          </div>

        )
      }





      {/* Date */}

      <p className="text-sm text-gray-500 mt-4">

        Updated On:{" "}

        {
          new Date(
            update.createdAt
          ).toLocaleDateString()
        }

      </p>





      {/* Delete Button */}

      {
        onDelete && (

          <div className="mt-5 flex justify-end">


            <button

              onClick={() =>
                onDelete(update._id)
              }

              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"

            >

              Delete

            </button>


          </div>

        )
      }



    </div>

  );

};


export default FosterUpdateCard;