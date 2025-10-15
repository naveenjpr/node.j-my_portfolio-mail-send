const AddNewFieldModel = require("../../models/Add_new_field.schema");

exports.create =  (request, response) => {
  console.log("Request Body:", request.body);
  console.log("Request File:", request.file);
  const data = new AddNewFieldModel({
    title: request.body.title,
    date: request.body.date,
    author: request.body.author,
  });

  if (request.file && request.file.filename) {
    data["imageUrl"] = request.file.filename; // <- asi bhi likh sekte hai magar dono me se ake he
  }

  data.save()
    .then((success) => {
      response.status(200).json({
        success: true,
        message: "Field created successfully",
        data: success,
      });
    })
    .catch((error) => {
      console.error("Save error:", error);
      response.status(500).json({
        status: false,
        message: "Internal server error",
        error: error.message || error,
      });
    });
};

exports.view =  (request, response) => {
   AddNewFieldModel.find({ deleted_at: null })
    .then((result) => {
      if (result.length > 0) {
        var res = {
          status: true,
          message: "Data Found",
          imageurlpath:"uploads/Addnewfield",
          data: result,
        };
        response.status(200).json(res);
      } else {
        var res = {
          status: false,
          message: "Data Not Found",
          data: [],
        };
        response.status(200).json(res);
      }
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "Internal Server Error",
        error: error,
      };
      response.status(500).json(res);
    });
};

// exports.details = async (request, response) => {
//   try {
//     const { id } = request.params;

//     const field = await AddNewFieldModel.findOne({
//       _id: id,
//       deleted_at: null
//     });

//     if (!field) {
//       return response.status(404).json({
//         success: false,
//         message: "Field not found"
//       });
//     }

//     response.status(200).json({
//       success: true,
//       message: "Field retrieved successfully",
//       data: field
//     });

//   } catch (error) {
//     console.error("Error retrieving field:", error);
//     response.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });
//   }
// }

// exports.update = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const { title, date, author, imageUrl } = request.body;

//     // Find field and check if it exists
//     const existingField = await AddNewFieldModel.findOne({
//       _id: id,
//       deleted_at: null
//     });

//     if (!existingField) {
//       return response.status(404).json({
//         success: false,
//         message: "Field not found"
//       });
//     }

//     // Prepare update data
//     const updateData = {
//       title: title || existingField.title,
//       date: date || existingField.date,
//       author: author || existingField.author,
//       imageUrl: imageUrl || existingField.imageUrl,
//       updated_at: Date.now()
//     };

//     // Add logoUrl if file is uploaded
//     if (request.file) {
//       updateData.logoUrl = request.file.filename;
//     }

//     const updatedField = await AddNewFieldModel.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     response.status(200).json({
//       success: true,
//       message: "Field updated successfully",
//       data: updatedField
//     });

//   } catch (error) {
//     console.error("Error updating field:", error);
//     response.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });
//   }
// }

// exports.delete = async (request, response) => {
//   try {
//     const { id } = request.params;

//     const field = await AddNewFieldModel.findOne({
//       _id: id,
//       deleted_at: null
//     });

//     if (!field) {
//       return response.status(404).json({
//         success: false,
//         message: "Field not found"
//       });
//     }

//     // Soft delete by setting deleted_at timestamp
//     await AddNewFieldModel.findByIdAndUpdate(id, {
//       deleted_at: Date.now()
//     });

//     response.status(200).json({
//       success: true,
//       message: "Field deleted successfully"
//     });

//   } catch (error) {
//     console.error("Error deleting field:", error);
//     response.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });
//   }
//
