/**
 * All input text are uppercase
 */
document.querySelectorAll("input[type='text']").forEach((element) => {
element.addEventListener("input", () => {
    element.value = element.value.toUpperCase();
});
});