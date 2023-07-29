import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFolder } from "../../api/createFolder";
import { sendFilesToDisk } from "../../api/sendFilesToDisk";
import { fetchUrl } from "../../api/fetchUrl";
import "./customForm.css";

const CustomForm = () => {
  const [textFileInput, setTextFileInput] =
    useState<string>("Файлы не выбраны");

  const urlHasLoaded = (responses: any, files: any) => {
    for (const response of responses) {
      if (response.href) {
        sendFilesToDisk(response.href, files);
      } else {
        throw new Error("запрос с ошибкой");
      }
    }
  };

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
      onSubmit={async ({ files, folderName }, {resetForm}) => {
        const nameFiles = files.map((file) => file["name"]);
        const response = await createFolder(folderName);
        console.log(response);

        Promise.all(nameFiles.map((nameFile) => fetchUrl(folderName, nameFile)))
          .then((responses) => {
            urlHasLoaded(responses, files) 
            resetForm()
            setTextFileInput('Файлы не выбраны')
          })
          
      }}
    >
      {(formik) => {
        return (
          <Form method="post" encType="multipart/form-data">
            <section>
              <article>
                <label htmlFor="folderName" className="label">
                  Название папки:
                </label>
                <Field
                  type="text"
                  id="folderName"
                  name="folderName"
                  className="input"
                />
                <ErrorMessage
                  name="folderName"
                  component="div"
                  className="error"
                />
              </article>
              <article>
                <label htmlFor="file" className="label">
                  Выберите файлы для загрузки (от 1 до 100):
                </label>
                <div>
                  <div className="field__wrapper">
                    <input
                      type="file"
                      name="files"
                      id="field__file-2"
                      className="field field__file"
                      multiple
                      onChange={(event: any) => {
                        const files = event.target.files;
                        if (files) {
                          setTextFileInput(`Выбрано файлов: ${files.length}`);
                          let myFiles = Array.from(files);
                          formik.setFieldValue("files", myFiles);
                        }
                      }}
                    />

                    <label
                      className="field__file-wrapper"
                      htmlFor="field__file-2"
                    >
                      <div className="field__file-button">Выбрать</div>
                      <div className="field__file-fake">{textFileInput}</div>
                    </label>
                  </div>
                  {/* <input
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
                  /> */}
                </div>
                <ErrorMessage name="files" component="div" className="error" />
              </article>
            </section>

            <p>
              <button className="button" type="submit">
                Загрузить
              </button>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
