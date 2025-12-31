const ProjectModel = require("../../models/Project.schema");
const fs = require("fs");
const path = require("path");

exports.create = async (request, response) => {
  try {
    const data = new ProjectModel({
      image: request.file ? request.file.filename : null,
      title: request.body.title,
      description: request.body.description,
      technologies: request.body.technologies,
      github: {
        frontend: request.body.github?.frontend,
        backend: request.body.github?.backend,
      },
      link: request.body.link,
      status: request.body.status ?? true,
    });

    await data
      .save()
      .then((result) => {
        response.send({
          status: true,
          message: "Project created successfully",
          data: result,
        });
      })
      .catch((error) => {
        const error_messages = [];
        if (error.errors) {
          for (let field in error.errors) {
            error_messages.push(error.errors[field].message);
          }
        }

        response.send({
          status: false,
          message: "Something went wrong",
          error_messages: error_messages,
        });
      });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ============================
// VIEW ALL PROJECTS
// ============================
exports.view = async (req, res) => {
  try {
    const result = await ProjectModel.find({ deleted_at: null });

    if (result.length > 0) {
      return res.status(200).send({
        status: true,
        message: "Record found successfully !!",
        data: result,
        imageBaseUrl: "/uploads/Project/",
      });
    } else {
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

// ============================
// PROJECT DETAILS (BY ID)
// ============================
exports.details = async (request, response) => {
  await ProjectModel.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.send({
          status: true,
          message: "Record found successfully !!",
          data: result,
        });
      } else {
        response.send({
          status: false,
          message: "No Record found !!",
          data: "",
        });
      }
    })
    .catch(() => {
      response.send({
        status: false,
        message: "Something went wrong !!",
      });
    });
};

// ============================
// UPDATE PROJECT
// ============================
exports.update = async (request, response) => {
  const data = {
    image: request.body.image,
    title: request.body.title,
    description: request.body.description,
    technologies: request.body.technologies,
    github: {
      frontend: request.body.github?.frontend,
      backend: request.body.github?.backend,
    },
    link: request.body.link,
    status: request.body.status,
    updated_at: new Date(),
  };

  await ProjectModel.updateOne({ _id: request.params.id }, { $set: data })
    .then((result) => {
      response.send({
        status: true,
        message: "Record updated successfully",
        data: result,
      });
    })
    .catch((error) => {
      let error_messages = [];

      if (error.errors) {
        for (let field in error.errors) {
          error_messages.push(error.errors[field].message);
        }
      } else {
        error_messages.push(error.message);
      }

      response.status(500).send({
        status: false,
        message: "Something went wrong",
        error_messages: error_messages,
      });
    });
};

// ============================
// STATUS CHANGE (ACTIVE / INACTIVE)
// ============================
exports.statusChange = async (request, response) => {
  try {
    const { status } = request.body;
    const id = request.params.id;

    if (typeof status !== "boolean") {
      return response.status(400).send({
        status: false,
        message: "Status must be true or false",
      });
    }

    const result = await ProjectModel.updateOne(
      { _id: id, deleted_at: null },
      {
        $set: {
          status: status,
          updated_at: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return response.status(404).send({
        status: false,
        message: "Record not found or already updated",
      });
    }

    response.send({
      status: true,
      message: "Status updated successfully",
      data: {
        id: id,
        status: status,
      },
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ============================
// DELETE PROJECT (SOFT DELETE)
// ============================
exports.delete = async (request, response) => {
  try {
    const id = request.params.id;

    const project = await ProjectModel.findById(id);

    if (project && project.image) {
      const imagePath = path.join(
        __dirname,
        "../../../uploads/Project",
        project.image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const result = await ProjectModel.updateOne(
      { _id: id },
      { $set: { deleted_at: new Date() } }
    );

    if (result.modifiedCount === 0) {
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
