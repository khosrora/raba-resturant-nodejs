var Kavenegar = require('kavenegar');

var api = Kavenegar.KavenegarApi({
    apikey: process.env.SMS_KEY
});


exports.sendSms = (phoneNumber, message) => {
    api.Send({
        message: message,
        sender: "10004346",
        receptor: phoneNumber
    },
        function (response, status) {
            console.log(response);
            console.log(status);
        });
}
