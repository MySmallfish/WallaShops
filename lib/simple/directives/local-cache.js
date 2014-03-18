(function (S) {
    S.LocalCacheDirective = ["fileManager", "remoteStorage", "fileUtils", function (fileManager, remoteStorage, fileUtils) {
        return {
            restrict: "A",
            scope: true,
            link: {
                post: function (scope, element, attrs) {
                    console.log("LINK");
                    if (window.cordova) {
                        attrs.$observe("src", function (value) {
                            if (!scope._visited && value.length) {
                                scope._visited = true;
                                cache(value);
                            }
                        });

                        function cache(src) {
                            console.log("CACHE", src);
                            if (src) {
                                var directory = "images-cache",
                                    fileName = "file--" +  fileUtils.fileName(src);
                                function set(url) {
                                    console.log("SET", url);
                                    $(element).attr("src", url);
                                }
                                function fail(error) {
                                    console.log("Error: ", error);
                                }
                                function setLocalImageUrl(fileEntry) {
                                    console.log("Set Local Image", fileEntry.toNativeURL());
                                    if (fileEntry) {
                                        set(fileEntry.toNativeURL());
                                    }
                                }

                                function dowloadFile(fileEntry) {
                                    console.log("download file", src, fileEntry.fullPath, fileEntry.toURL());
                                    remoteStorage.downloadFile({
                                        url: encodeURI(src),
                                        filePath: fileEntry.toURL()
                                    },setLocalImageUrl, fail);
                                }

                                function downloadProductImage() {
                                    console.log("download product image", src);
                                    fileManager.getFile(directory, fileName,null, dowloadFile, fail);
                                }

                                fileManager.find(directory, fileName, setLocalImageUrl, downloadProductImage);

                            }
                        };

                    }


                }
            }
        };
    }];
})(Simple);

