import axios from "axios";
import { validateObject } from "./Validator";

const hostForm = (editorData) => {
  console.log("This is the editor Data ", editorData);
  const result = validateObject(editorData);
  if (result === true) {
    let url = "http://localhost:8080/api/web";
    console.log("YHI se ho rhi hai API call");
    axios
      .post(`${url}/hostsite`, {
        heading: editorData.Heading,
        description: editorData.Description,
        footer: editorData.Footer,
        formName: editorData.FormName,
        blobName: editorData.FormNameWithId,
        showEmailBox: editorData.showEmailBox,
        showRatingBox: editorData.showRatingBox,
      })
      .then(function (response) {
       return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log(`Field "${result}" is empty.`);
  }
};
export { hostForm };
