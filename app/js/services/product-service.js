(function (_, S, WS) {

    WS.ProductService = ["$q", "dailyCacheService", "wallaShopsApi", "remoteStorage", "fileManager", function ($q, dailyCacheService, wallaShopsApi, remoteStorage, fileManager) {

        function getOtherInterestedPromotionsCategories() {

            return wallaShopsApi.getOtherInterestedPromotionsCategories();
        }

        function getBestSellersPromotionsCategories() {

            return wallaShopsApi.getBestSellersPromotionsCategories();
        }

        function getPromotionsCategories() {

            return wallaShopsApi.getPromotionsCategories();
        }


        function search(parameters) {

            var result = $q.when({});

            if (parameters.searchTerm) {
                result = wallaShopsApi.getSearchProducts(parameters.searchTerm);
            } else {
                if (parameters.mainCategoryId) {
                    result = wallaShopsApi.getMainCategoryProducts(parameters);
                } else if (parameters.subCategoryId) {
                    result = wallaShopsApi.getSubCategoryProducts(parameters);
                } else if (parameters.subSubCategoryId) {
                    result = wallaShopsApi.getSubSubCategoryProducts(parameters);
                }
            }


            return result.then(cacheProductsImages);
        }

        function cacheProductImage(product) {
            var directory = "ImagesCache",
                fileName = product.id + ".jpg";

            function setLocalImageUrl(fileEntry) {
                if (fileEntry) {
                    product.localImageUrl = fileEntry.toURL();
                } else {
                    product.localImageUrl = null;
                }
            }

            function dowloadFile(fileEntry) {
                remoteStorage.downloadFile({
                    url: product.imageUrl,
                    filePath: fileEntry.fullPath
                }).then(setLocalImageUrl);
            }

            function downloadProductImage() {
                return fileManager.getFile(directory, fileName).then(dowloadFile);
            }

            // reset
            setLocalImageUrl();

            fileManager.find(directory, fileName).then(setLocalImageUrl, downloadProductImage);

        }

        function cacheProductsImages(products) {
            _.each(products, cacheProductImage);
            return products;
        }

        return {
            getOtherInterestedPromotionsCategories: getOtherInterestedPromotionsCategories,
            getBestSellersPromotionsCategories: getBestSellersPromotionsCategories,
            getPromotionsCategories: getPromotionsCategories,
            search: search
        };

    }];

})(_, Simple, WallaShops);