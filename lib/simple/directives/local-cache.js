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
                            console.log("CACHING", src);
                            if (src) {
                                var directory = "images-cache",
                                    fileName =  fileUtils.fileName(src);
                                function set(url) {
                                    console.log("SET", url);
                                    $(element).attr("src", url);
                                }

                                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

                                //    var imagePath = fs.root.fullPath + "/cache/" + fileName; 

                                //    var fileTransfer = new FileTransfer();

                                //    fileTransfer.download(encodeURI(src), imagePath, function (entry) {
                                //        set(entry.toURL());
                                //    }, function (error) {
                                //        console.log("Error downloading file", error);
                                //    });
                                //});
                                function fail(error) {
                                    console.log("Error: ", error);
                                }
                                function setLocalImageUrl(fileEntry) {
                                    console.log("Set Local Image", fileEntry.toURL());
                                    if (fileEntry) {
                                        set(fileEntry.toURL());
                                    }
                                }

                                function downloadProductImage(fullPath) {
                                    console.log("download product image", src);
                                    console.log("download file", src, fullPath);
                                    remoteStorage.downloadFile({
                                        url: encodeURI(src),
                                        filePath: fullPath
                                    }, setLocalImageUrl, fail);

                                }

                                fileManager.find(directory, fileName, setLocalImageUrl, downloadProductImage);

                            }
                        }

                    }


                }
            }
        };
    }];
})(Simple);

