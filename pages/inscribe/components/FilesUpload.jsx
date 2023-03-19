import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { serialize } from "object-to-formdata";

import { uploadAndProcessFiles } from "../../../services/api/order";
import { withAsync } from "../../../utils/withAsync";

export default function FilesUpload({
  files = [],
  optimize,
  setFiles,
  setOptimize,
  setOrderType,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);

  const fileTypes = ["JPG", "PNG"];

  const handleFilesChange = async (selectedFiles = []) => {
    if (selectedFiles.length > 1) {
      setOrderType("bulk");
    }
    await fileUploadHandler(selectedFiles);
  };

  const fileUploadHandler = async (files = []) => {
    setIsLoading(true);
    const result = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      const payload = {
        files: file,
        optimize: optimize ? "true" : "false",
      };

      const formData = serialize(payload, {
        noFilesWithArrayNotation: true,
      });

      const { error, response } = await withAsync(() =>
        uploadAndProcessFiles(formData)
      );

      if (response?.success) {
        result.push(response.result);
      }
    }

    setFiles(result);

    setIsLoading(false);
  };

  return (
    <div className="mb-6">
      <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
        Image
        <span className="text-red">*</span>
      </label>

      {files.length ? (
        <p className="dark:text-jacarta-300 text-2xs mb-3">
          Successfully uploaded {files.length} files
        </p>
      ) : (
        <p className="dark:text-jacarta-300 text-2xs mb-3">
          Drag or choose your file to upload
        </p>
      )}

      {isLoading && (
        <div className="dark:bg-jacarta-700 max-h-60 overflow-y-auto dark:border-jacarta-600 border-jacarta-100 group relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white h-60 p-4 text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-accent"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="dark:text-jacarta-300 text-sm mt-6">
              Uploading your files. Please wait.
            </p>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="dark:bg-jacarta-700 max-h-60 overflow-y-auto dark:border-jacarta-600 border-jacarta-100 group relative flex flex-col items-center rounded-lg border-2 border-dashed bg-white h-60 p-4 text-center">
          {files.length > 0 && (
            <div className="relative z-10 flex flex-col gap-4 w-full cursor-pointer">
              {files.map((file) => {
                const { optimization } = file;
                if (optimization) {
                  const originalSize = (
                    optimization?.original_size / 1000
                  ).toFixed(2);
                  const optimizedSize = (
                    optimization?.kraked_size / 1000
                  ).toFixed(2);

                  let percentSaved = (
                    100 -
                    (optimization?.kraked_size / optimization?.original_size) *
                      100
                  ).toFixed(2);

                  return (
                    <div className="dark:bg-jacarta-600 w-full flex flex-col gap-2 py-4">
                      <p className="normal-case font-body text-base">
                        {file.name}
                      </p>
                      <div className="flex justify-center gap-2">
                        <p className="normal-case font-body text-sm">
                          <s>{originalSize} KB</s>
                        </p>
                        <p className="normal-case font-body text-sm">
                          {optimizedSize} KB
                        </p>
                        <p className="normal-case font-body text-sm dark:bg-jacarta-400 px-2 rounded">
                          {percentSaved}% saved
                        </p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="dark:bg-jacarta-600 w-full flex flex-col gap-2 py-4">
                    <p className="normal-case font-body text-base">
                      {file.name}
                    </p>
                    <div className="flex justify-center gap-2">
                      <p className="normal-case font-body text-sm">
                        {(file.size / 1000).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!files.length && (
            <div className="relative z-10 h-full flex flex-col justify-center items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
              </svg>
              <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                size: 100 MB
              </p>
            </div>
          )}
          <div className="dark:bg-jacarta-600 bg-jacarta-50 z-20 absolute inset-4 cursor-pointer rounded opacity-0">
            <FileUploader
              handleChange={handleFilesChange}
              name="file"
              types={fileTypes}
              classes="file-drag"
              maxSize={100}
              minSize={0}
              multiple
            />
          </div>
        </div>
      )}
      <div className="mt-8 flex items-center space-x-2">
        <input
          defaultChecked={optimize}
          checked={optimize}
          onChange={(evt) => setOptimize(evt.target.checked)}
          type="checkbox"
          id="terms"
          className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
        />
        <label className="dark:text-white text-lg">Optimize Images</label>
      </div>
    </div>
  );
}
