import { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createFolder } from "../../api/createFolder";
import { sendFilesToDisk } from "../../api/sendFilesToDisk";
import { fetchUrl } from "../../api/fetchUrl";
import "./customForm.css";

const CustomForm = () => {
  const [textFileInput, setTextFileInput] =
    useState<string>("Файлы не выбраны");
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false);
  const refInput = useRef<HTMLInputElement | null>(null);

  const urlHasLoaded = (responses: any, files: any) => {
    for (const response of responses) {
      if (response.href) {
        sendFilesToDisk(response.href, files);
      } else {
        throw new Error("запрос с ошибкой");
      }
    }
  };

  useEffect(() => {
    refInput.current?.focus();
  }, [])

  return (
    <Formik
      initialValues={{ files: [], folderName: "" }}
      validationSchema={Yup.object({
        files: Yup.array()
          .min(1, "Выберите минимум 1 файл")
          .max(100, "Нельзя выбрать больше 100 файлов"),
        folderName: Yup.string()
          .max(15, "Максимальное количество символов - 15")
      })}
      onSubmit={async ({ files, folderName }, {resetForm}) => {
        setBtnDisabled(true);
        const nameFiles = files.map((file) => file["name"]);
        const response = await createFolder(folderName);
        console.log(response);

        Promise.all(nameFiles.map((nameFile) => fetchUrl(folderName, nameFile)))
          .then((responses) => {
            urlHasLoaded(responses, files) 
            resetForm()
            setTextFileInput('Файлы не выбраны')
            setBtnDisabled(false);
          })
          
      }}
    >
      {(formik) => {
        return (
          <Form method="post" encType="multipart/form-data">
            <section>
              <article>
                <label htmlFor="folderName" className="label">
                  Название папки
                </label>
                <Field
                  type="text"
                  id="folderName"
                  name="folderName"
                  className="input"
                  innerRef={refInput}
                  placeholder="Имя папки"
                />
                <ErrorMessage
                  name="folderName"
                  component="div"
                  className="error"
                />
              </article>
              <article>
                <label htmlFor="file" className="label">
                  Выберите файлы для загрузки (от 1 до 100)
                  <abbr title="Обязательное поле"> *</abbr>
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
                      <div className="field__file-button" tabIndex={0} role="button">Выбрать</div>
                      <div className="field__file-fake">{textFileInput}</div>
                    </label>
                  </div>
                </div>
                <ErrorMessage name="files" component="div" className="error" />
              </article>
            </section>
            <p style={{margin: '35px 0'}}>Поля, помеченные звездочкой (*), являются обязательными.</p>
            <p>
              <button className="button" type="submit" tabIndex={0} disabled={isBtnDisabled}>
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
