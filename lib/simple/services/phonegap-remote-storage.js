(function (S) {
    S.PhoneGapRemoteStorage = function ($q, phoneGap) {

        function downloadFile(options) {
            if (!options) {
                throw new Error("Options must be specified.");
            }

            var fileTransfer = new FileTransfer(),
                downloadOptions = {
                    headers: options.headers
                };
            var url = options.url;
            var result = $q.defer();

            function onFailure(error) {
                console.error(error, "Error downloading file.");
                result.reject(error);
            }

            function onSuccess(entry) {
                console.log("Successfully downloaded file: ", entry.toURL());
                result.resolve({
                    entry: entry,
                    url: entry.toURL()
                });
            }

            try {
                fileTransfer.download(url, options.filePath, onSuccess, onFailure, true, downloadOptions);

            } catch (e) {
                onFailure(e);
            }
            return result.promise;
        }

        function uploadFile(options) {
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

                function onSuccess(args) {
                    console.log("Attachment uploaded successfully.", args);
                    result.resolve(args);
                }

                function onFailure(e) {
                    console.log("Attachment Upload Failure, error: ", e);
                    console.log("Attachment Upload Failed, error text: ", e.body);
                    result.reject(e);
                }

                console.log("Uploading Attachment: ", options);
                fileTransfer.upload(options.localUrl, options.remoteUrl, onSuccess, onFailure, fileUploadOptions, true);
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