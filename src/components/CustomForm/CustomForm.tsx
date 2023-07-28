import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFolder } from "../../api/createFolder";
import { sendFilesToDisk } from "../../api/sendFilesToDisk";
import { fetchUrl } from "../../api/fetchUrl";

const urlHasLoaded = (responses: any, files: any) => {
  for (const response of responses) {
    if (response.href) {
      sendFilesToDisk(response.href, files);
    } else {
      throw new Error("запрос с ошибкой");
    }
  }
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{ files: [], folderName: "" }}
      validationSchema={Yup.object({
        files: Yup.array()
          .min(1, "Выберите минимум 1 файл")
          .max(100, "Нельзя выбрать больше 100 файлов"),
        folderName: Yup.string()
          .max(15, "Максимальное количество символов - 15")
          .required("Поле обязательное для заполнения"),
      })}
      onSubmit={async ({ files, folderName }) => {
        const nameFiles = files.map((file) => file["name"]);
        const response = await createFolder(folderName);
        console.log(response);

        Promise.all(
          nameFiles.map((nameFile) => fetchUrl(folderName, nameFile))
        ).then((responses) => urlHasLoaded(responses, files));
      }}
    >
      {(formik) => {
        return (
          <Form method="post" encType="multipart/form-data">
            <section>
              <article>
                <label htmlFor="file">Название папки:</label>
                <Field type="text" id="folderName" name="folderName" />
                <ErrorMessage name="folderName" component="div" />
              </article>
              <article>
                <label htmlFor="file">
                  Выберите файлы для загрузки (от 1 до 100):
                </label>
                <div>
                  <input
                    type="file"
                    id="file"
                    name="files"
                    multiple
                    onChange={(event: any) => {
                      const files = event.target.files;
                      if (files) {
                        let myFiles = Array.from(files);
                        formik.setFieldValue("files", myFiles);
                      }
                    }}
                  />
                </div>
                <ErrorMessage name="files" component="div" />
              </article>
            </section>

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
