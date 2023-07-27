import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const token = 'y0_AgAAAAAhFQf_AAo_kQAAAADoy4lMzCcknY2wS5irsvvOc2y3R_QkNec';

async function getUrl() {
  let response = await fetch(
    "https://cloud-api.yandex.net/v1/disk/resources/upload/?path=testFolder",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `OAuth ${token}`,
      },
    }
  );
  let result = await response.json();
  console.log(result);
}

const CustomForm = () => {
  return (
    <Formik
      initialValues={{ files: [] }}
      validationSchema={Yup.object({
        files: Yup.array()
          .min(1, "select at least 1 file")
          .max(100, "max select 100 files"),
      })}
      onSubmit={(values) => {
        getUrl();
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
