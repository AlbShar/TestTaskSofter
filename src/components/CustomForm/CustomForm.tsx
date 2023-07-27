import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUrlForUploading } from "../../api/getUrlForUploading";
import { sendFilesToDisk } from "../../api/sendFilesToDisk";

const CustomForm = () => {
  const path =
    "https://cloud-api.yandex.net/v1/disk/resources/upload/?path=testFolder7";
  return (
    <Formik
      initialValues={{ files: [] }}
      validationSchema={Yup.object({
        files: Yup.array()
          .min(1, "select at least 1 file")
          .max(100, "max select 100 files"),
      })}
      onSubmit={async ({ files }) => {
        const url = await getUrlForUploading(path);
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
