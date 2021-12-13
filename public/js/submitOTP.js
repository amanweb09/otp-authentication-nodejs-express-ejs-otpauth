const getOTPButton = document.querySelector('button#getOTP');

getOTPButton.addEventListener('click', (e) => {
    e.preventDefault();

    const telValue = document.querySelector('input#tel').value;


    axios.post('/get-otp', {
        tel: telValue
    })
        .then((res) => {

            if (!res.data.failureMessage) {
                const otpScreen = document.querySelector('div.otp-wrapper');
                const container = document.querySelector('div.container');

                otpScreen.style.display = 'flex';
                container.classList.add('hide');
                getOTPButton.style.display = 'none';

                const verifyOTPBtn = document.querySelector('button#verify-otp');


                verifyOTPBtn.addEventListener('click', (e) => {
                    const otpBoxes = document.querySelectorAll('input.otp-num');
                    let otpArray = [];

                    otpBoxes.forEach((box) => {
                        if (box.value.length) {
                            otpArray.push(box.value)
                        }
                    })

                    let otp = otpArray.join('');
                    let resOTP = res.data.token;

                    if (resOTP) {
                        if (otp === resOTP) {
                            //successMessage
                            new Noty({
                                text: "Woohooooo!",
                                timeOut: 1500,
                                theme: 'sunset',
                                type: 'success'
                            }).show();

                            setTimeout(() => {
                               window.location.href = '/success-screen' 
                            }, 1500);
                        }
                        else {
                            //failureMessage
                            new Noty({
                                text: "Invalid OTP! Please Try Again",
                                timeOut: 1500,
                                theme: 'sunset',
                                type: 'error'
                            }).show();

                            otpBoxes.forEach((box) => {
                                box.value = '';
                            })
                        }
                    }
                })

            }
            else {
                new Noty({
                    text: res.data.failureMessage,
                    timeOut: 1500,
                    theme: 'sunset',
                    type: 'error'
                }).show();
            }

        })
        .catch((err) => {
            console.log(err);

            new Noty({
                text: "Something went wrong :(",
                timeOut: true,
                theme: 'sunset',
                type: 'error'
            }).show();
            //failureMessage
        })
})

