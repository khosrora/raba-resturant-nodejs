exports.get404 = async (req, res) => {
    try {
        res.render("errors/404", {
            layout: "./layouts/mainLayouts",
            path: "/error",
            pageTitle: "404 صفحه",
            headerTitle: "متاسفانه صفحه مورد نظر پیدا نشد",
            breadCrumb: "404",
        })
    } catch (err) {
        console.log(err);
    }
}

exports.get500 = (req, res) => {
    res.render("errors/500", {
        layout: "./layouts/mainLayouts",
        path: "/error500",
        pageTitle: "500 صفحه",
        headerTitle: "متاسفانه مشکلی در سرور بوجود آمده است",
        breadCrumb: "500",
    })
}
