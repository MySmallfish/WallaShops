(function (S) {
    S.LocalCacheDirective = ["fileManager", "remoteStorage", "fileUtils", function (fileManager, remoteStorage, fileUtils) {
        return {
            restrict: "A",
            scope: true,
            link: {
                post: function (scope, element, attrs) {
                    if (window.cordova) {
                        attrs.$observe("src", function (value) {
                            if (!scope._visited && value.length) {
                                scope._visited = true;
                                cache(value);
                            }
                            //attrs.$set("src", "http://test.wallashops.co.il/Images/Header/WallashopsLogo.png");
                        });

                        function cache(src) {
                            if (src) {
                                var directory = "images-cache",
                                    fileName = fileUtils.fileName(src);
                                function set(url) {
                                    $(element).attr("src", url);
                                }
                                function fail(error) {
                                    console.log("Error: ", error);
                                }
                                function setLocalImageUrl(fileEntry) {
                                    if (fileEntry) {
                                        set(fileEntry.toNativeURL());
                                    }
                                }

                                function dowloadFile(fileEntry) {
                                    remoteStorage.downloadFile({
                                        url: encodeURI(src),
                                        filePath: fileEntry.toURL()
                                    },
                                    setLocalImageUrl, fail);
                                }

                                function downloadProductImage() {
                                    fileManager.getFile(directory, fileName, dowloadFile, fail);
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

