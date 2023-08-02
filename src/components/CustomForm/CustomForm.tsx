import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createFolder,
  fetchHref,
  uploadFilesToDisk,
} from "../../api/yandexDiskApi";
import "./customForm.css";
import { convertFileToBlob } from "../../helpers/convertFileToBlob";
import type { TErrors, TLink } from "../../types";

const CustomForm = () => {
  const [textFileInput, setTextFileInput] =
    useState<string>("Файлы не выбраны");
  const [errorFolderName, setErrorFolderName] = useState<string | null>(null);
  const [duplicateFiles, setDuplicateFiles] = useState<string | null>(null);
  const [isDataUpload, setIsDataUpload] = useState<boolean | null>(null);
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false);
  const refInput = useRef<HTMLInputElement | null>(null);
  const focusInputField = () => {
    refInput.current?.focus();
  };

  const validate = (folderName: string, files: string[]) => {
    const errors: TErrors = {};

    if (folderName.length > 15) {
      errors.folderName = "Максимальное количество символов - 15";
    } else if (errorFolderName) {
      console.log("fsdf");
      setErrorFolderName(null);
    }

    if (files.length < 1) {
      errors.files = "Выберите минимум 1 файл";
    } else if (files.length > 100) {
      errors.files = "Нельзя выбрать больше 100 файлов";
    }

    return errors;
  };


  useEffect(() => {
    focusInputField();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDuplicateFiles(null)
    } , 10000);
  }, [duplicateFiles]);

  useEffect(() => {
    setTimeout(() => {
      setIsDataUpload(null)
    }, 15000);
  }, [isDataUpload]);

  return (
    <Formik
      initialValues={{ files: [], folderName: "" }}
      validate={({ files, folderName }) => validate(folderName, files)}
      onSubmit={async ({ files, folderName }, { resetForm }) => {
        setBtnDisabled(true);

        const errorMessage = await createFolder(folderName);
        if (errorMessage) {
          setErrorFolderName(errorMessage);
          setBtnDisabled(false);
          focusInputField();

          return false;
        }

        const nameFiles = files.map((file) => file["name"]);

        const links = await Promise.all(
          nameFiles.map((nameFile) => fetchHref(folderName, nameFile))
        );
        console.log(links);
        const correctHrefs: string[] = [];
        const duplicateFiles: string[] = [];

        links.forEach((link: string | TLink) => {
          if (typeof link === "string") {
            duplicateFiles.push(link);
          } else {
            correctHrefs.push(link.href);
          }
        });

        console.log(correctHrefs, duplicateFiles);

        const blobFilesPromises = files.map(
          async (file) => await convertFileToBlob(file)
        );
        const blobFiles = await Promise.all(blobFilesPromises);

        

        const responses = await Promise.all(
          correctHrefs.map((href, index) =>
            uploadFilesToDisk(href, blobFiles[index] as Blob)
          )
        );

        responses.forEach((response) => {
          if (!response.ok) {
            setIsDataUpload(false);
          }
        });
        
        if (duplicateFiles.length) {
          setDuplicateFiles(duplicateFiles.join(", "));
        }
        setIsDataUpload(true);
        setBtnDisabled(false);
        resetForm();
        setTextFileInput("Файлы не выбраны");
      }}
    >
      {({ setFieldValue }) => {
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
                {errorFolderName ? (
                  <div className="error">{errorFolderName}</div>
                ) : null}
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
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const files = event.target.files;
                        if (files) {
                          setTextFileInput(`Выбрано файлов: ${files.length}`);
                          let myFiles = Array.from(files);
                          setFieldValue("files", myFiles);
                        }
                      }}
                    />

                    <label
                      className="field__file-wrapper"
                      htmlFor="field__file-2"
                    >
                      <div
                        className="field__file-button"
                        tabIndex={0}
                        role="button"
                      >
                        Выбрать
                      </div>
                      <div className="field__file-fake">{textFileInput}</div>
                    </label>
                  </div>
                </div>
                <ErrorMessage name="files" component="div" className="error" />
                {duplicateFiles ? (
                  <div className="warning">{`Файлы - ${duplicateFiles} уже присутсвуют на диске`}</div>
                ) : null}
              </article>
            </section>
            <p style={{ margin: "35px 0" }}>
              Поля, помеченные звездочкой (*), являются обязательными.
            </p>
            <div>
              {isDataUpload === true ? (
                <div className="success">
                  Поздравляю! Файлы успешно сохранены в Яндекс Диске
                </div>
              ) : isDataUpload === false ? (
                <div className="success">
                  При загрузке файлов произошла ошибка. Повторите загрузку снова
                </div>
              ) : null}
            </div>
            <p>
              <button
                className="button"
                type="submit"
                tabIndex={0}
                disabled={isBtnDisabled}
              >
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
