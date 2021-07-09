const Yup = require('yup');



exports.homeValidation = Yup.object().shape({
    title: Yup.string()
        .required(" عنوان الزامی می باشد"),
    image: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    text: Yup.string()
        .required("فیلد متن الزامی می باشد"),
})

exports.contactValidation = Yup.object().shape({
    image: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    image2: Yup.object().shape({
        name: Yup.string().required("لطفا عکس دوم را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    text1: Yup.string()
        .required(" متن الزامی می باشد"),
    text2: Yup.string()
        .required(" متن دوم الزامی می باشد"),
    text3: Yup.string()
        .required(" متن سوم الزامی می باشد"),
    phone1: Yup.string()
        .required(" شماره تماس الزامی می باشد"),
    phone2: Yup.string()
        .required("شماره تماس دوم الزامی می باشد"),
    address1: Yup.string()
        .required("  آدرس اول الزامی می باشد"),
    address2: Yup.string()
        .required("  آدرس دوم الزامی می باشد"),
    email: Yup.string()
        .required("  پست الکترونیک الزامی می باشد"),
    postalCode: Yup.string()
        .required(" کد پستی الزامی می باشد"),

})


exports.aboutValidation = Yup.object().shape({
    image1: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    title1: Yup.string()
        .required(" عنوان اول الزامی می باشد"),
    text1: Yup.string()
        .required(" متن  اول الزامی می باشد"),
    image2: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    title2: Yup.string()
        .required(" عنوان دوم الزامی می باشد"),
    text2: Yup.string()
        .required(" متن  دوم الزامی می باشد"),
    image3: Yup.object().shape({
        name: Yup.string().required("لطفا عکس را انتخاب کنید"),
        size: Yup.number().max(3000000, "عکس انتخاب شده نباید بیشتر از 3 مگابایت باشد"),
        mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png"], "فایل قابل قبول نیست")
    }),
    title3: Yup.string()
        .required(" عنوان سوم الزامی می باشد"),
    text3: Yup.string()
        .required(" متن  سوم الزامی می باشد"),
})