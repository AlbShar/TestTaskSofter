import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFolder } from "../../api/createFolder";
import { sendFilesToDisk } from "../../api/sendFilesToDisk";
import { fetchUrl } from "../../api/fetchUrl";

const CustomForm = () => {
  return (
    <Formik
      initialValues={{ files: [] }}
      validationSchema={Yup.object({
        files: Yup.array()
          .min(1, "select at least 1 file")
          .max(100, "max select 100 files"),
      })}
      onSubmit={async ({ files }) => {
        const folderName = "test";
        const href = await createFolder(folderName);
        const url = await fetchUrl(folderName);
        const response = await sendFilesToDisk(url, files);
        console.log(response)
      }}
    >
      {(formik) => {
        return (
          <Form method="post" encType="multipart/form-data">
            <div>
              <label htmlFor="file">
                Выберите файлы для загрузки (от 1 до 100):
              </label>
              <div>
                <input
                  type="file"
                  id="file"
                  name="files"
                  multiple
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files) {
                      let myFiles = Array.from(files);
                      formik.setFieldValue("files", myFiles);
                    }
                  }}
                />
              </div>
            </div>
            <ErrorMessage name="files" />
            <p>
              <button type="submit">Submit</button>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
