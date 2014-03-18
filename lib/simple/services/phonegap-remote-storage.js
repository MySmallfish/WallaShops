(function (S) {
    S.PhoneGapRemoteStorage = function ($q, phoneGap) {

        function downloadFile(options, onSuccess, onFailure) {

            if (!options) {
                throw new Error("Options must be specified.");
            }


            var url = options.url;
            var result = $q.defer(); //alert("DDD" + url);
            var fileTransfer = new FileTransfer();
            function fail(error) {
                if (onFailure) {
                    onFailure(error);
                }
                //console.error(error, "Error downloading file.");
                result.reject(error);
            }



            function win(entry) {
                if (onSuccess) {
                    onSuccess(entry);
                }             //   console.log("Successfully downloaded file: ", entry.toURL());
                result.resolve(entry);
            }

            try {
                fileTransfer.download(url, options.filePath, win, fail, true);

            } catch (e) {
                onFailure(e);
            }
            return result.promise;
        }

        function uploadFile(options, onSuccess, onFailure) {
            var result = $q.defer();
            try {
                var fileTransfer = new FileTransfer(),
                    fileUploadOptions = new FileUploadOptions();
                fileUploadOptions.fileKey = "file";
                //fileUploadOptions.httpMethod = "PUT";
                fileUploadOptions.httpMethod = "POST";
                fileUploadOptions.mimeType = options.contentType || "image/jpeg";
                fileUploadOptions.fileName = options.fileName;
                fileUploadOptions.chunkedMode = false;
                fileUploadOptions.headers = options.sheaders;

                function win(args) {
                    console.log("Attachment uploaded successfully.", args);
                    if (onSuccess) {
                        onSuccess(args);
                    }
                    result.resolve(args);
                }

                function fail(e) {
                    console.log("Attachment Upload Failure, error: ", e);
                    console.log("Attachment Upload Failed, error text: ", e.body);
                    if (onFailure) {
                        onFailure(e);
                    }
                    result.reject(e);
                }

                console.log("Uploading Attachment: ", options);
                fileTransfer.upload(options.localUrl, options.remoteUrl, win, fail, fileUploadOptions, true);
            } catch (e) {
                console.log("Attachment Upload Exception caught, error: ", e);
                result.reject(e);
            }
            return result.promise;
        }

        return {
            uploadFile: phoneGap(uploadFile),
            downloadFile: phoneGap(downloadFile)
        };
    };
})(Simple);