import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const inputElement = feedbackFormEl.querySelector('input[name="email"]');
const textareaElement = feedbackFormEl.querySelector(
  'textarea[name="message"]'
);

const formTransitionJson = JSON.parse(
  localStorage.getItem('feedback-form-state')
);

if (formTransitionJson) {
  inputElement.value = formTransitionJson.email;
  textareaElement.value = formTransitionJson.message;
} else {
  inputElement.value = '';
  textareaElement.value = '';
}

const throttledFormElement = throttle(saveFormState, 500);

feedbackFormEl.addEventListener('input', throttledFormElement);

function saveFormState() {
  const formTransitionJson = {
    email: inputElement.value,
    message: textareaElement.value,
  };

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(formTransitionJson)
  );
}

feedbackFormEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const emailEl = inputElement.value;
  const currentMessage = textareaElement.value;

  console.log({ email: emailEl, message: currentMessage });

  localStorage.removeItem('feedback-form-state');

  inputElement.value = '';
  textareaElement.value = '';
}
