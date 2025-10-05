
const coursesModel = require("../../models/placeholder.schema") // ye wala model populate or relation bane ke liye parent api bani hai


exports.create = async (request, response) => {

    const data = new coursesModel({
        label: request.body.label,
        placeholder: request.body.placeholder,
     
    });
await data.save().then((result) => {
                const res = {
                    status: true,
                    message: "placeholder or label created successfully",
                    data: result,
                };
                response.send(res);
            })
            .catch((error) => {
                const error_messages = [];

                for (let field in error.errors) {
                    error_messages.push(error.errors[field].message);
                }

                const res = {
                    status: false,
                    message: "Something went wrong",
                    error_messages: error_messages,
                };
                response.send(res);
            });
   
}


exports.view = async (req, res) => {
  try {
    const result = await coursesModel.find();

    if (result.length > 0) {
      return res.status(200).send({
        status: true,
        message: "Record found successfully !!",
        data: result,
      });
    } else {
      // अगर कोई रिकॉर्ड नहीं मिला (result.length === 0)
      return res.status(404).send({
        status: false,
        message: "No Record found !!",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong !!",
      error: error.message,
    });
  }
};



exports.details = async (request, response) => {
  console.log(request.params.id);
  await coursesModel.findById(request.params.id).then((result) => {
    if (result) {
      const res = {
        status: true,
        message: 'Record found successfully !!',
        data: result,
      };
      response.send(res);
    } else {
      const res = {
        status: false,
        message: 'No Record found !!',
        data: '',
      };
      response.send(res);
    }
  }).catch((error) => {
    const res = {
      status: false,
      message: 'Something went wrong !!',
    };
    response.send(res);
  });
};

exports.update = async (request, response) => {
  const data = {
    label: request.body.label,
    placeholder: request.body.placeholder,
    
  };
    await coursesModel.updateOne({ _id: request.params.id }, { $set: data }).then((result) => {
    const res = {
      status: true,
      message: 'Record updated successfully',
      data: result,
    };
    response.send(res);
  }).catch((error) => {
    let error_messages = [];

    if (error.errors) {
      for (let field in error.errors) {
        error_messages.push(error.errors[field].message);
      }
    } else {
      error_messages.push(error.message);
    }

    const res = {
      status: false,
      message: 'Something went wrong',
      error_messages: error_messages,
    };

    response.status(500).send(res);
  });
};



exports.delete = async (request, response) => {
  try {
    const id = request.params.id;
    const result = await coursesModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return response.status(404).send({
        status: false,
        message: "Record not found",
      });
    }

    response.send({
      status: true,
      message: "Record deleted successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



