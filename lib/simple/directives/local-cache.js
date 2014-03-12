(function (S) {
    S.LocalCacheDirective = ["fileManager", "remoteStorage", "fileUtils", function (fileManager, remoteStorage, fileUtils) {
        return {
            restrict: "A",
            scope: true,
            link: {
                post: function (scope, element, attrs) {
                    if (window.cordova) {
                        attrs.$observe("src", function (value) {
                            if (!scope._visited) {
                                scope._visited = true;
                                cache(value);
                            }
                            //attrs.$set("src", "http://test.wallashops.co.il/Images/Header/WallashopsLogo.png");
                        });

                        function cache(src) {
                            if (src) {
                                var directory = "cache",
                                    fileName = "file-" + fileUtils.fileName(src);
                                console.log("CACHING IMAGE ", src, " TO FILE ", fileName);
                                function set(url) {
                                    $(element).attr("src", url);
                                    console.log("NEW URL: ", url, $(element).attr("src"));
                                }

                                function setLocalImageUrl(fileEntry) {
                                    
                                    console.log("SETTING FILE IMAGE URL", fileEntry ? fileEntry.toNativeURL() : "(null)" );
                                    if (fileEntry) {
                                        set(fileEntry.toNativeURL());
                                    }
                                }

                                function dowloadFile(fileEntry) {
                                    console.log("DOWNLOADING FILE: ", fileEntry.fullPath, fileEntry.toURL());
                                    remoteStorage.downloadFile({
                                        url: product.imageUrl,
                                        filePath: fileEntry.toURL()
                                    }).then(function (entry) {
                                        console.log("FILE DOWNLOADED: ", entry.fullPath, entry.toURL());
                                        setLocalImageUrl(entry);
                                    });
                                }

                                function downloadProductImage() {
                                    return fileManager.getFile(directory, fileName).then(dowloadFile, function(e) {
                                        console.log("Error", e);
                                    });
                                }


                                var result = fileManager.find(directory, fileName).then(setLocalImageUrl, downloadProductImage);
                                return result;
                            }
                        };

                    }


                }
            }
        };
    }];
})(Simple);

