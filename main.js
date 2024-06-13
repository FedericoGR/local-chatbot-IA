import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm"

const SELECTED_MODEL = 'TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC';
const engine = await CreateMLCEngine(SELECTED_MODEL,
  {
    initProgressCallback: (info) => {
      console.log('Progress',info);
    }
  });


const $ = el => document.querySelector(el);

const $form = $('form');
const $input = $('form input');
const $messages = $('ul');
const $template = $('#message-template');
const $button = $('button');
const $container = $('main');

$form.addEventListener('submit', (e) => {
  e.preventDefault(); 

const messageText = $input.value.trim();

if (messageText !== '') {
  $input.value = ''

  addMessage(messageText, 'user');
  $button.setAttribute('disabled', true);

  setTimeout(() => {
    addMessage('Respuesta del bot', 'bot');
    $button.removeAttribute('disabled');
  }, 1000);

}

function addMessage(text, sender) {
  const clonedTemplate = $template.content.cloneNode(true);
  const $newMessage = clonedTemplate.querySelector('.message')
  const $who = $newMessage.querySelector('span');
  const $text= $newMessage.querySelector('p');

  $text.textContent = text;
  $who.textContent = sender === 'bot' ? 'GPT' : 'User';
  $newMessage.classList.add(sender);
  $messages.appendChild($newMessage);
  $container.scrollTop = $container.scrollHeight;
}


});