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
                                var directory = "images-cache1",
                                    fileName =  fileUtils.fileName(src);
                                console.log("CACHING IMAGE ", src, " TO FILE ", fileName);
                                function set(url) {
                                    console.log("STTING URL", url);
                                    $(element).attr("src", url);
                                    console.log("NEW URL: ", url, $(element).attr("src"));
                                }

                                function setLocalImageUrl(fileEntry) {
                                    console.log("SETTING FILE IMAGE URL", fileEntry.toNativeURL());
                                    if (fileEntry) {
                                        set(fileEntry.toNativeURL());
                                    }
                                }

                                function dowloadFile(fileEntry) {
                                    console.log("DOWNLOADING FILE: ", fileEntry.fullPath, fileEntry.toURL());
                                    remoteStorage.downloadFile({
                                        url: encodeURI(src),
                                        filePath: fileEntry.toURL(),
                                        onSuccess: function (entry) {
                                            console.log("FILE DOWNLOADED: ", entry.fullPath, entry.toURL());
                                            setLocalImageUrl(entry);
                                        },
                                        onFailure: function(error) {
                                            console.log("Error", error);
                                        }
                                    });
                                }

                                function downloadProductImage() {
                                    console.log("DOWNLOADING...");
                                    fileManager.getFile(directory, fileName, dowloadFile, function(e) {
                                        console.log("FAILED TO GET FILE", e);
                                    });
                                }

                                var result = fileManager.find(directory, fileName,setLocalImageUrl, downloadProductImage);
                                return result;
                            }
                        };

                    }


                }
            }
        };
    }];
})(Simple);

