import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUrlForUploading } from "../../api/getUrlForUploading";

const fileToDataUri = (files: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result);
    };
    reader.readAsDataURL(files);
  });

const sendFilesToDisk = async (url: any, files: string[]) => {
  let data = await fileToDataUri(files[0]);
  console.log(data)

  
  const token = "y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec";
  const headers = {
    "Content-Type": "application/binary",
    Authorization: `OAuth ${token}`,
  };

  let response = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });
  let result = await response.json();
};

const CustomForm = () => {
  const path =
    "https://cloud-api.yandex.net/v1/disk/resources/upload/?path=testFolder";
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
        sendFilesToDisk(url, files);
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
