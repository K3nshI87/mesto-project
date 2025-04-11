// константы
const cardTemplate = document.querySelector('#card-template').content; // шаблон карточки
const placesList = document.querySelector('.places__list'); // список мест
const profilePopup = document.querySelector('.popup_type_edit'); // попап для редактирования профиля (имя, описание).
const cardPopup = document.querySelector('.popup_type_new-card'); // попап для добавления новой карточки с местом.
const imagePopup = document.querySelector('.popup_type_image'); // попап для отображения изображения при клике на картинку карточки.
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const profileName = document.querySelector('.profile__title'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // описание профиля
const nameInput = document.querySelector('.popup__input_type_name'); // имя при открытии попапа
const descriptionInput = document.querySelector('.popup__input_type_description'); // описание при открытии попапа
const profileCloseButton = profilePopup.querySelector('.popup__close'); // кнопка для закрытия попапа редактирования профиля.
const profileFormElement = document.forms['edit-profile']; // форма, которая используется для редактирования профиля
const jobInput = profileFormElement.querySelector('.popup__input_type_description'); // ?
const addCardButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const closeCardPopupButton = cardPopup.querySelector('.popup__close'); // кнопка для закрытия попапа добавления карточки.
const cardForm = document.forms['new-place']; // форма для добавления новой карточки
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name'); // имя карточки
const cardLinkInput = cardForm.querySelector('.popup__input_type_url'); // название ссылки

// функция создания карточки
function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем карточку
  const cardImage = cardElement.querySelector('.card__image'); // картинка карточки
  const cardTitle = cardElement.querySelector('.card__title'); // название карточки
  const likeButton = cardElement.querySelector('.card__like-button'); // кнопка лайка
  const deleteButton = cardElement.querySelector('.card__delete-button'); // кнопка удаления

  cardImage.src = data.link; // ссылка на картинку
  cardImage.alt = data.name; // ссылка на описание картинки
  cardTitle.textContent = data.name; // текст заголовка

  // обработчик лайка
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // обработчик корзины (удаления)
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // обрабочтик открытия попапа картинки
  cardImage.addEventListener('click', () => {
    const imagePopup = document.querySelector('.popup_type_image'); // попап картинки
    const popupImage = imagePopup.querySelector('.popup__image'); // сама картинка из попапа
    const popupCaption = imagePopup.querySelector('.popup__caption'); // подпись к картинке

    // подставляем в попапы нужную информацию
    popupImage.src = data.link; 
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;

    // открываем попап
    openModal(imagePopup);
  });
  return cardElement;
}

//отрисовка всех карточек из массива initialCards
initialCards.forEach(cardData => { 
    const card = createCard(cardData);
    placesList.appendChild(card);
  });
  
// Универсальная функция открытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Универсальная функция закрытия попапа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// открытие формы и заполнение данными
function handleProfileEdit() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

profileEditButton.addEventListener('click', handleProfileEdit); // открывает попап редактирования профиля
profileCloseButton.addEventListener('click', () => closeModal(profilePopup)); // крестик попапа редактирования профиля

// обработчик отправки формы
function handleProfileFormSubmit(evt) {
  // отключаем стандартное поведение
  evt.preventDefault();
  // получаем значения полей
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // вставляем значения в разметку
  profileName.textContent = newName;
  profileDescription.textContent = newJob;
  // закрываем попап
  closeModal(profilePopup);
}

// обработчик на форму
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// открытие попапа карточки
function openAddCardPopup() {
  cardNameInput.value = ''; // очищаем поля
  cardLinkInput.value = '';
  openModal(cardPopup); // открываем попап
}

// закрытие попапа по крестику
function closeAddCardPopup() {
  closeModal(cardPopup); // закрываем попап
}

// обработчики
addCardButton.addEventListener('click', openAddCardPopup);
closeCardPopupButton.addEventListener('click', closeAddCardPopup);

function handleCardFormSubmit(evt) {
  evt.preventDefault(); // предотвращаем перезагрузку
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = createCard({ name, link }); // используем уже существующую функцию
  placesList.prepend(newCard); // добавляем в начало
  closeModal(cardPopup); // закрываем попап
}

//  обработчик на форму
cardForm.addEventListener('submit', handleCardFormSubmit);

// закрытие попапа с картинкой по крестику
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

// добавляем анимацию всем попапам
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});
