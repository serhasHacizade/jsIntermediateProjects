let eyeRef = document.querySelectorAll(".eye");
let events = ["mousemove", "touchmove"];


const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (error) {
        return false;
    }
};

events.forEach((eventType => {
    document.body.addEventListener(eventType, (event) => {
        eyeRef.forEach((eye) => {
            const eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
            const eyeY = eye.getBoundingClientRect().top + eye.clientHeight / 2;

            const x = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
            const y = !isTouchDevice() ? event.clientY : event.touches[0].clientY;

            const radian = Math.atan2(x - eyeX, y - eyeY);
            const rotationDegrees = radian * (180 / Math.PI) * -1 + 180;
            eye.style.transform = "rotate(" + rotationDegrees + "deg)"
        });
    })
}));