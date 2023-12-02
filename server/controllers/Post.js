import PostModel from "../modals/PostModel.js";

export const Create = async (req, res) => {
  // console.log("file name: " + req.file.filename);
  // console.log(req.file);
  try {
    const respond = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      file: req.file.filename,
    });
    res.json({ message: "Created Successfully" });
  } catch (error) {
    console.log(error);
  }
};
