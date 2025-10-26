const { message } = require("statuses");
const multiStepForm = require("../../models/multiStepForm.schema");

exports.create = (request, response) => {
  const data = new multiStepForm({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phone: request.body.phone,
    street: request.body.street,
    city: request.body.city,
    state: request.body.state,
    zipCode: request.body.zipCode,
    highestDegree: request.body.highestDegree,
    institution: request.body.institution,
    graduationYear: request.body.graduationYear,
    company: request.body.company,
    position: request.body.position,
    years: request.body.years,
    jobType: request.body.jobType,
    salary: request.body.salary,
    location: request.body.location,
    Status: request.body.Status,
  });
  data
    .save()
    .then((success) => {
      response.status(200).json({
        success: true,
        message: "Form submitted successfully",
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

exports.view = (request, response) => {
  multiStepForm
    .find()
    .then((result) => {
      if (result.length > 0) {
        const res = {
          status: true,
          message: "find data successfully",
          data: result,
        };
        response.send(res);
      } else {
        result = {};
      }
    })
    .catch((error) => {
      const res = {
        status: false,
        message: "Something went wrong",
        error: error,
      };
      response.send(res);
    });
};

exports.statuschange = (request, response) => {
  multiStepForm.findOne({
    _id: request.body.id,
  });

  if (multiStepForm == null) {
    var res = {
      status: false,
      message: "id not match in the database",
    };

    response.send(res);
    return;
  }
  multiStepForm
    .updateOne(
      { _id: request.body.id },
      {
        $set: {
          Status: request.body.Status,
        },
      }
    )

    .then((result) => {
      var res = {
        status: true,
        message: "status updated successfully",
        data: result,
      };
      response.send(res);
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "status not updated",
        error: error,
      };
      response.send(res);
    });
};

exports.delete = (request, response) => {
  multiStepForm
    .findByIdAndDelete(request.params.id)
    .then(() => {
      var res = {
        status: true,
        message: "data deleted successfully",
      };
      response.send(res);
    })
    .catch(() => {
      var res = {
        status: false,
        message: "data not deleted",
      };
      response.send(res);
    });
};
exports.details = (request, response) => {
  multiStepForm
    .findById(request.params.id)
    .then((result) => {
      if (result != "") {
        var res = {
          status: true,
          message: "data found successfully",
          data: result,
        };

        response.send(res);
      } else {
        var res = {
          status: false,
          message: "no record found",
        };
        response.send(res);
      }
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "something went wrong",
        error: error,
      };
      response.send(res);
    });
};
exports.update = async (request, response) => {
  const data = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phone: request.body.phone,
    street: request.body.street,
    city: request.body.city,
    state: request.body.state,
    zipCode: request.body.zipCode,
    highestDegree: request.body.highestDegree,
    institution: request.body.institution,
    graduationYear: request.body.graduationYear,
    company: request.body.company,
    position: request.body.position,
    years: request.body.years,
    jobType: request.body.jobType,
    salary: request.body.salary,
    location: request.body.location,
  };

  multiStepForm
    .updateOne(
      {
        _id: request.params.id,
      },
      {
        $set: data,
      }
    )
    .then((result) => {
      var res = {
        status: true,
        message: "record updated successfully",
        data: result,
      };

      response.send(res);
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "record not updated",
        error: error,
      };

      response.send(res);
    });
};
