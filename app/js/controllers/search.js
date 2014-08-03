(function (_, S, WS) {

    WS.SearchController = ["$timeout", "$q", "$scope", "$filter", "$location", "productService", "dailyCacheService", "safeApply", function ($timeout, $q, $scope, $filter, $location, productService, dailyCacheService, safeApply) {
        
        function buildSearchParameters(routeParameters) {
            var productParameters = {
            };

            if (routeParameters.searchTerm) {
                $scope.searchText = productParameters.searchTerm = routeParameters.searchTerm;
            }
            return productParameters;
        }

        
        $scope.$on("WallaShops.Search", refresh);

        var transactionId = 0;
        function fetch(productParameters) {
            transactionId++;
            productParameters.transactionId = transactionId;
            var category = $scope.currentCategory;

            var products = productService.search(productParameters);

            return products.then(function (results) {
                return { category: category, items: results.items, parameters: results.parameters, transactionId: results.parameters.transactionId };
            });
        }

        var iterator = function (a, n) {
            var current = 0,
                l = a.length;
            return function () {
                
                var end = current + n;
                var part = a.slice(current, end);
                current = end <= l ? end : 0;
                return part;
            };
        };
        var next;
        $scope.currentProductsPages = [];
        var pageSize = 12;
        var stopLoading, loadTimeout;
        
        function shouldStop(tId) {
            
            if (stopLoading || tId !== transactionId) {
                stopLoading = false;
                if (loadTimeout) {
                    clearTimeout(loadTimeout);
                }
                safeApply($scope);
                return true;
            }

        }

        function load(items) {
            
            if (shouldStop(items.transactionId)) {
                return;
            }
            var products = items.items;
            if (products && products.length) {
                next = iterator(products, pageSize);
                $scope.firstProductPage = next();
                if (products.length > pageSize) {
                    var page = next();

                    function loadPage() {
                        if (shouldStop(items.transactionId)) {
                            return;
                        }
                        if (page.length == pageSize) {
                            $scope.currentProductsPages.push(page);
                            requestAnimationFrame(function() { safeApply($scope); });
                            page = next();

                            loadTimeout = setTimeout(loadPage, 320);
                        } else {
                            if (page.length > 0) {
                                $scope.currentProductsPages.push(page);
                                safeApply($scope);
                            }
                        }
                    }

                    $timeout(loadPage, 100);
                }
            } else {
                $scope.firstProductPage = [];
            }

            return products;
        }


        function extractCategoryParameters() {

            var routeParameters = {
                searchTerm: $scope.searchTerm
            };

            return routeParameters;
        }

        function displayError(error) {

            $scope.fatalError = error;
        }
        
        function refresh() {
            $scope.clear(true);
            $scope.currentProductsPages = [];
            $scope.firstProductPage = [];
            $scope.notifyProgress()
                .then(extractCategoryParameters)
                .then(buildSearchParameters)
                .then(fetch)
                .then(load)
                .catch(displayError)
                .finally($scope.stopProgress);

        }

        function find(categories, id) {
            var category = _.find(categories, function (item) {
                return item.id == id;
            });

            if (!category) {
                for (var i = 0; i < categories.length; i++) {
                    var found = find(categories[i].categories, id);
                    if (found) {
                        category = found;
                        break;
                    }
                }
            }

            return category;
        }

        //refresh();
        $scope.$root.$broadcast("WallaShops.Search");

    }];



})(_, Simple, WallaShops);