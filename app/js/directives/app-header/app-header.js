(function (S, WS) {
    WS.FiltersMenuDirective = ["safeApply", function (safeApply) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="menu"/>',
        scope: {
            items: "=",
            all: "@",
            hide: "&",
            selectedItem: "="
        },
        link: function (scope, element, attrs) {
            scope.$watch("items", renderMenu);

            function markClickStarted() {
                $(".click-started").removeClass("click-started").removeClass("click-ended");
                $(this).closest("li.menu-item").addClass("click-started");
            }
            function markClickEnded() {
                $(".click-started").removeClass("click-started").removeClass("click-ended");
                $(this).closest("li.menu-item").addClass("click-ended");
            }

            if (typeof attrs.markable !== "undefined") {
                element.addClass("markable");
            }
            var li = $("<li/>").addClass("menu-item"), ul = $("<ul/>"), textDiv = $("<div/>").addClass("menu-item-text");

            function reloadMenu() {
                renderMenu(scope.items);
                element.removeClass("selected");
            }


            scope.$on("WallaShops.clearSelectedFilterValues", reloadMenu);
            function clearSelection(targetLi) {
                targetLi.siblings("li").andSelf().removeClass("selected");
                element.removeClass("selected");
            }

            function render(items, container, parentItem) {
                var thisUl = ul.clone().appendTo(container);

                if (!parentItem) {
                    thisUl.addClass("root");
                    li.clone().addClass("menu-all").appendTo(thisUl).click(function () {
                        event.stopPropagation();
                        reloadMenu();
                        scope.$root.$broadcast("WallaShops.clearSelectedFilterValues");
                        safeApply(scope);   
                    }).append(textDiv.clone().text(scope.all || "All"));
                };
                _.each(items, function (item) {
                    var thisItem = li.clone().appendTo(thisUl).data("menu-item", item), textElement = textDiv.clone();
                    if (item.id) {
                        thisItem.attr("data-id", item.id);
                    }
                    textElement.text(item.title || "").appendTo(thisItem);
                    if (parentItem) {
                        thisItem.attr("data-parent-id", parentItem.id);
                        if (item.items) {
                            thisItem.addClass("mid");
                        }
                    }
                    textElement.mousedown(markClickStarted);
                    textElement.mouseup(markClickEnded);
                    textElement.click(function () {
                        event.stopPropagation();
                        markClickStarted();

                        var target = $(this), parentLi = target.closest("li"),
                            alreadySelected = parentLi.is(".selected");
                        clearSelection(parentLi);
                        
                        if (!alreadySelected) {
                            scope.selectedItem = null;
                            if (parentLi.is(".mid")) {
                                var parentUl = parentLi.closest("ul");
                                if (!parentUl.closest("li").is("[data-parent-id]")) {
                                    parentUl.appendTo(element);
                                    $("ul.root li:not(:first-child)", element).remove();
                                }
                            }
                            parentLi.addClass("selected");
                            parentLi.parent("ul").closest("li").addClass("selected");
                            element.addClass("selected");
                            
                        }

                        if (parentLi.is(".leaf")) {
                            scope.selectedItem = parentLi.data("menu-item");
                            if (scope.hide) {
                                scope.hide();
                            }
                        }

                        safeApply(scope);
                    });

                    if (item.items && item.items.length) {
                        render(item.items, thisItem, item);
                    } else {
                        thisItem.addClass("leaf");
                    }

                    markClickEnded();
                });
            }

            function renderMenu(items) {
                element.empty();
                if (items) {

                    render(items, element);
                }
            }
        }
    }
}
    ];
    WS.MenuDirective = ["safeApply",
        function (safeApply) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="menu"/>',
                scope: {
                    items: "=",
                    all: "@",
                    hide: "&",
                    selectedItem: "="
                },
                link: function (scope, element, attrs) {
                    scope.$watch("items", renderMenu);
                    function markClickStarted() {
                        $(".click-started").removeClass("click-started").removeClass("click-ended");
                        $(this).closest("li.menu-item").addClass("click-started");
                    }
                    function markClickEnded() {
                        $(".click-started").removeClass("click-started").removeClass("click-ended");
                        $(this).closest("li.menu-item").addClass("click-ended");
                    }

                    if (typeof attrs.markable !== "undefined") {
                        element.addClass("markable");
                    }
                    var li = $("<li/>").addClass("menu-item"), ul = $("<ul/>"), textDiv = $("<div/>").addClass("menu-item-text");

                    function clearSelection() {
                        $("li", element).removeClass("selected");
                        element.removeClass("selected");
                        scope.selectedItem = null;
                    }

                    function render(items, container, parentItem) {
                        var thisUl = ul.clone().appendTo(container);

                        if (!parentItem) {
                            thisUl.addClass("root");
                            li.clone().addClass("menu-all").appendTo(thisUl).click(function () {
                                event.stopPropagation();
                                renderMenu(scope.items);
                                element.removeClass("selected");
                                scope.$emit("WallaShops.ClearAll");
                            }).append(textDiv.clone().text(scope.all || "All"));
                        };

                        _.each(items, function (item) {
                            var thisItem = li.clone().appendTo(thisUl).data("menu-item", item), textElement = textDiv.clone();
                            textElement.mousedown(markClickStarted);
                            textElement.mouseup(markClickEnded);
                            thisItem.attr("data-id", item.id);
                            textElement.text(item.title || "").appendTo(thisItem);
                            if (parentItem) {
                                thisItem.attr("data-parent-id", parentItem.id);
                                if (item.items) {
                                    thisItem.addClass("mid");
                                }
                            }

                            textElement.click(function () {
                                event.stopPropagation();

                                var target = $(this), parentLi = target.closest("li");
                                clearSelection();
                                if (parentLi.is(".mid")) {
                                    var parentUl = parentLi.closest("ul");
                                    if (!parentUl.closest("li").is("[data-parent-id]")) {
                                        parentUl.appendTo(element);
                                        $("ul.root li:not(:first-child)", element).remove();
                                    }
                                }
                                parentLi.addClass("selected");
                                parentLi.parent("ul").closest("li").addClass("selected");
                                element.addClass("selected");
                                scope.selectedItem = parentLi.data("menu-item");

                                if (parentLi.is(".leaf")) {

                                    if (scope.hide) {
                                        scope.hide();
                                    }
                                }

                                safeApply(scope);
                            });

                            if (item.items && item.items.length) {
                                render(item.items, thisItem, item);
                            } else {
                                thisItem.addClass("leaf");
                            }
                        });
                    }

                    scope.$root.$on("WallaShops.ClearCategoriesRequested", reload);
                    function reload() {
                        clearSelection();
                        renderMenu(scope.items);
                    }
                    function renderMenu(items) {
                        element.empty();
                        if (items) {

                            render(items, element);
                        }
                    }
                }
            }
        }
    ];
    WS.AppMenuDirective = ["$timeout", function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/menu/app-menu.html',
            scope: false,
            replace: true,
            link: function (scope, element) {
                $(document.body).append(element);
                scope.$watch("categoryMenuSelected", function (value) {
                    if (value) {
                        scope.$root.$broadcast("WallaShops.MenuTabSelected", { tab: "Category" });
                    } else {
                        scope.$root.$broadcast("WallaShops.MenuTabSelected", { tab: "Filter" });
                    }
                });
                $(".nav-tabs a", element).click(function (e) {
                    e.preventDefault();
                    var select = $(this).data("select");
                    if ($(this).closest(".category-tab").attr("disabled") == "disabled") {
                        return false;
                    }
                    $timeout(function () {
                        
                        scope[select](e);
                    });
                    return false;
                });
                scope.$watch("currentCategory", function (category) {
                    var filtersEnabled = false;
                    if (category && category.level == 2) {
                        filtersEnabled = true;
                    }

                    if (filtersEnabled) {
                        $("#filterTab", element).removeAttr("disabled");
                    } else {
                        $("#filterTab", element).attr("disabled", "disabled");
                    }
                });
            }
        };
    }];
    WS.AppHeaderDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/app-header/app-header.html',
        scope: false,
        replace: true,
        controller: ["$scope", "config", "$timeout", function ($scope, config, $timeout) {
            var wsUrl = config.wsUrl;

            $scope.openUserCard = function () {
                window.open(wsUrl + "/service/customer/CustomerMainPage.aspx", "_system");
            };

            $scope.preventefault = function ($event) {
                $event.preventDefault();
            };

            $(".content-container").click(function () {

                $timeout(function () {
                    $scope.menuVisible = false;
                });
            });

        }],
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...
        }
    };

})(Simple, WallaShops);