const Yup = require('yup');



exports.personalValidation = Yup.object().shape({
    image: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    address: Yup.string()
        .min(4, "فیلد آدرس نباید کمتر از 4 کاراکتر باشد")
        .max(500, "فیلد آدرس نباید بیشتر از 500 کاراکتر باشد")
        .required("فیلد آدرس الزامی می باشد"),
})

exports.opinionValidation = Yup.object().shape({
    image: Yup.string().required("لطفا ابتدا اطلاعات کاربری خود را کامل کنید"),
    fullname: Yup.string()
        .required("نام و نام خانوادگی الزامی می باشد")
        .min(4, "نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد")
        .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
    phone: Yup.string()
        .required("شماره تماس الزامی می باشد"),
    opinion: Yup.string()
        .min(4, "فیلد نظر نباید کمتر از 4 کاراکتر باشد")
        .max(1000, "فیلد نظر نباید بیشتر از 1000 کاراکتر باشد")
        .required("فیلد نظر الزامی می باشد"),
})
