const navBtn = document.querySelector('.nav-placeholder-btn');
const noteContainer = document.querySelector('.note-container');
const noteAddBtn = document.querySelector('.note-add-btn');
const noteCancelBtn = document.querySelector('.note-footer-btn .note-cancel-btn');
const notePlaceholderTitle = document.querySelector('.title');
const notePlaceholderCategory = document.querySelector('.category');
const noteFooterDescription = document.querySelector('.footer-input');
const noteDeleteMessageContainer = document.querySelector('.note-delete-message-container');

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const wholeDateToPrint = `${day}/${month}/${year}`;

navBtn.addEventListener('click', function(event) {
    event.preventDefault();
    console.log("clicked!");
    noteContainer.classList.remove('note');
});

noteAddBtn.addEventListener('click', function() {
    const notePlaceHolderTitleValue = notePlaceholderTitle.value;
    const notePlaceholderCategoryValue = notePlaceholderCategory.value.toLowerCase();
    const noteFooterDescriptionValue = noteFooterDescription.value;

    const newStorageNoteContainer = document.createElement('div');
    newStorageNoteContainer.classList.add('storage-data-container', 'storage-data-container-toggle');

    const unorderedList = document.createElement('ul');
    unorderedList.style.listStyleType = 'none';

    const categoryListItem = document.createElement('li');
    const titleListItem = document.createElement('li');
    titleListItem.classList.add('title-list-item');

    const footerDescriptionListItem = document.createElement('li');
    footerDescriptionListItem.classList.add('footer-description-list-item');

    const dateListItem = document.createElement('li');
    dateListItem.classList.add('date-list-item');

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const footerNoteStorage = document.createElement('div');
    footerNoteStorage.classList.add('footer-note-storage');

    const checkboxImgEl = document.createElement('i');
    checkboxImgEl.classList.add('fa-regular', 'fa-square', 'icons', 'custom-checkbox');

    const editPencilImgEl = document.createElement('i');
    editPencilImgEl.classList.add('fa-solid', 'fa-pencil', 'icons');

    const binImgEl = document.createElement('i');
    binImgEl.classList.add('fa-solid', 'fa-trash-can', 'icons');

    dateListItem.textContent = wholeDateToPrint;
    titleListItem.textContent = notePlaceHolderTitleValue;
    categoryListItem.textContent = notePlaceholderCategoryValue;
    footerDescriptionListItem.textContent = noteFooterDescriptionValue;

    categoryContainer.appendChild(categoryListItem);
    iconsContainer.appendChild(checkboxImgEl);
    iconsContainer.appendChild(editPencilImgEl);
    iconsContainer.appendChild(binImgEl);
    unorderedList.appendChild(titleListItem);
    footerNoteStorage.appendChild(categoryContainer);
    footerNoteStorage.appendChild(iconsContainer);
    unorderedList.appendChild(footerDescriptionListItem);
    unorderedList.appendChild(dateListItem);

    document.body.appendChild(newStorageNoteContainer);
    newStorageNoteContainer.appendChild(footerNoteStorage);
    newStorageNoteContainer.appendChild(unorderedList);

    noteContainer.classList.add('note');

    const styleCategory = newStorageNoteContainer.querySelector('.category-container');
    const categories = {
        'work': 'red',
        'sport': 'green',
        'pets': 'yellow',
        'food': 'steelblue',
        'other': 'grey'
    };

    if (categories.hasOwnProperty(notePlaceholderCategoryValue)) {
        styleCategory.style.background = categories[notePlaceholderCategoryValue];
        styleCategory.style.color = 'white';
    }

    notePlaceholderTitle.value = '';
    notePlaceholderCategory.value = '';
    noteFooterDescription.value = '';

    let isEditButtonCreated = false;

    editPencilImgEl.addEventListener('click', function() {
        if (!isEditButtonCreated) {
            noteContainer.classList.remove('note');
            notePlaceholderTitle.value = notePlaceHolderTitleValue;
            notePlaceholderCategory.value = notePlaceholderCategoryValue;
            noteFooterDescription.value = noteFooterDescriptionValue;

            noteAddBtn.style.display = 'none';

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';
            const noteFooterBtn = document.querySelector('.note-footer-btn');
            noteFooterBtn.appendChild(editBtn);

            editBtn.addEventListener('click', function() {
                titleListItem.textContent = notePlaceholderTitle.value;
                categoryListItem.textContent = notePlaceholderCategory.value;
                footerDescriptionListItem.textContent = noteFooterDescription.value;

                noteContainer.classList.add('note');
                noteAddBtn.style.display = 'block';
                noteFooterBtn.removeChild(editBtn);
                isEditButtonCreated = false
            });

            isEditButtonCreated = true;
        }
    });

    binImgEl.addEventListener('click', function() {
        noteDeleteMessageContainer.classList.remove('note-delete-message-toggle');

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        document.body.style.overflow = 'hidden';

        const noteDeleteCancelBtn = document.querySelector('.note-delete-cancel-btn');
        const noteDeleteDeleteBtn = document.querySelector('.note-delete-delete-btn');

        noteDeleteCancelBtn.addEventListener('click', function() {
            noteDeleteMessageContainer.classList.add('note-delete-message-toggle');

            document.body.removeChild(overlay);
            document.body.style.overflow = 'auto';
        });

        noteDeleteDeleteBtn.addEventListener('click', function() {
            noteDeleteMessageContainer.classList.add('note-delete-message-toggle');
            newStorageNoteContainer.classList.add('note-delete-message-toggle');

            document.body.removeChild(overlay);
            document.body.style.overflow = 'auto';
        });
    });

    let oneClickElementCheckCount = 0;

    checkboxImgEl.addEventListener('click', function() {
        oneClickElementCheckCount++;

        const customCheckbox = newStorageNoteContainer.querySelector('.custom-checkbox');

        if (oneClickElementCheckCount % 2 === 1) {
            customCheckbox.style.backgroundColor = '#808080';
            newStorageNoteContainer.style.background = '#c8c8c880';
            newStorageNoteContainer.style.color = '#808080';
            newStorageNoteContainer.style.textDecoration = 'line-through';

        } else {
            customCheckbox.style.backgroundColor = '#ffff';
            newStorageNoteContainer.style.background = '#ffff';
            newStorageNoteContainer.style.color = '#000000';
            newStorageNoteContainer.style.textDecoration = 'none';
        }
    });

});

noteCancelBtn.addEventListener('click', function() {
    noteContainer.classList.add('note');
    isEditButtonCreated = false;
});
