const Yup = require('yup');



exports.tagsValidation = Yup.object().shape({
    tag: Yup.string()
        .min(2, "فیلد تگ نباید کمتر از 2 کاراکتر باشد")
        .max(20, "فیلد تگ نباید بیشتر از 20 کاراکتر باشد")
        .required("فیلد تگ الزامی می باشد"),
})

exports.blogsValidation = Yup.object().shape({
    title: Yup.string()
        .required("عنوان متن الزامی می باشد"),
    image: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    text: Yup.string()
        .required("فیلد متن الزامی می باشد"),
    comment: Yup.string()
        .required(" ارسال نظر ادمین الزامی است"),
    tags: Yup.array()
        .required(" ارسال تگ الزامی است"),
})




exports.foodsValidation = Yup.object().shape({
    image: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    meal: Yup.string()
        .required("وارد کردن نوع وعده الزامی است"),
    name: Yup.string()
        .required("وارد کردن نام غذا الزامی است"),
    price: Yup.string()
        .required("وارد کردن قیمت غذا الزامی است"),
    detail: Yup.string()
        .required("وارد کردن جزئیات غذا الزامی است"),
})