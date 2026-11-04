// PROVIDED: catalogue, page references, and initial gallery.
const $cats = [
  { id: 'taco', name: 'Taco', bio: 'A playful explorer who loves cardboard boxes.', image: 'images/kitten1.jpeg' },
  { id: 'mochi', name: 'Mochi', bio: 'A quiet companion and expert sunbeam finder.', image: 'images/kitten2.jpeg' },
  { id: 'pepper', name: 'Pepper', bio: 'The fastest toy mouse catcher in the café.', image: 'images/kitten3.jpeg' },
  { id: 'waffles', name: 'Waffles', bio: 'A champion napper with a very loud purr.', image: 'images/kitten4.jpeg' }
]
// Select the page elements we will update.
const $gallery = document.querySelector('#gallery')
const $status = document.querySelector('#status')
// Keep the current choices in JavaScript; the page displays these values.
let $favouriteIds = []
let $selectedCatId = ''
let $notes = []
let $isDark = false

// Only trusted catalogue values are inserted into this HTML string.
for (const $cat of $cats) {
  $gallery.insertAdjacentHTML('beforeend', `
    <article class="card">
      <img src="${$cat.image}" alt="${$cat.name}, a café cat">
      <h3>${$cat.name}</h3>
      <p>${$cat.bio}</p>
      <div class="actions">
        <button class="view-profile" data-id="${$cat.id}">View profile</button>
        <button class="favourite" data-id="${$cat.id}" aria-pressed="false"><span aria-hidden="true">🖤</span> Favourite</button>
      </div>
    </article>
  `)
}

// WEEK 9 — STEP 1: Build steps/01.js together here.
const $themeButton = document.getElementById("theme-toggle")

$themeButton.addEventListener("click", toggleTheme)

function toggleTheme() {
  $isDark = !$isDark // ! - is the not opperator that will reverse the existing value
  updateTheme()
}

function updateTheme() {
  document.body.classList.toggle('dark', $isDark) // toggles the class based on $isDark value
  $themeButton.setAttribute("aria-pressed", $isDark)
  $themeButton.textContent = $isDark ? "Use light background" : "Use dark background"
  // ?.. :.. syntax for if-then statement
}

// WEEK 9 — STEP 2: Build steps/02.js together here.
const $profileButtons = document.querySelectorAll(".view-profile")

for (const $button of $profileButtons) {
  $button.addEventListener("click", showProfile)
}

function showProfile($event) {
  const $cat = findCat($event.target.dataset.id)
  $selectedCatId = $cat.id

  showNotes() // function from step 4 to show notes in profile

  document.getElementById("profile-image").src = $cat.image
  document.getElementById("profile-image").alt = $cat.name + ", a cafe cat"
  document.getElementById("profile-name").textContent = $cat.name
  document.getElementById("profile-bio").textContent = $cat.bio
  document.getElementById("profile").hidden = false
  document.getElementById("notes-fieldset").disabled = false
}

function findCat($id) {
  for (const $cat of $cats) {
    if ($cat.id === $id) {
      return $cat
    }
  }
}

// WEEK 9 — STEP 3: Build steps/03.js together here.

$gallery.addEventListener("click", toggleFavourite)

function toggleFavourite($event) {
  const $button = $event.target.closest(".favourite") // closest method finds the closest element to the target based on a given css selector

  if (!$button) {
    // console.log("not the Fav button")
    return
  }

  const $id = $button.dataset.id

  // check if the id already exists in the array
  const $index = $favouriteIds.indexOf($id)

  if ($index === -1) {
    // push is used to add the id to the array
    $favouriteIds.push($id)
  } else {
    // splice is used here to remove one item from the $index
    $favouriteIds.splice($index, 1)
  }
  updateFavourites()
}

function updateFavourites() {
  const $buttons = document.querySelectorAll(".favourite")
  for (const $button of $buttons) {
    const $catId = $button.dataset.id
    const $isFavourite = $favouriteIds.includes($catId) // includes will return true of false
    $button.classList.toggle('selected', $isFavourite)
    $button.setAttribute('aria-pressed', $isFavourite)
    $button.innerHTML = $isFavourite ? `<span aria-hidden="true">❤️</span> Favourited` : `<span aria-hidden="true">🖤</span> Favourite`
  }
  document.getElementById("favourite-count").textContent = $favouriteIds.length
}

// WEEK 9 — STEP 4: Build steps/04.js together here.
const $notesForm = document.getElementById("notes-form")
const $notesList = document.getElementById("notes-list")

$notesForm.addEventListener("submit", addNote)

function addNote($event) {
  $event.preventDefault()
  const $text = $notesForm.elements.note.value

  if ($text === '' || $selectedCatId === '') {
    $status.textContent = "Select a cat and enter a note."
    return
  }

  $notes.push({ catId: $selectedCatId, text: $text })

  showNotes()

  $notesForm.reset()
  $notesForm.elements.note.focus()
  $status.textContent = "Note added."
}

function showNotes() {
  $notesList.replaceChildren()
  for (let $i = 0; $i < $notes.length; $i++) {
    const $note = $notes[$i]
    // only display the notes for the selected cat
    if ($note.catId === $selectedCatId) {
      $noteTemplate = `
        <li>
          <span>
            ${$note.text}
          <button class="remove-note" data-index="{$i}">Remove</button>
          </span>
        </li>
      `
      $notesList.insertAdjacentHTML('beforeend', $noteTemplate)
    }
  }
}

// WEEK 9 — STEP 5: Build steps/05.js together here.

$notesList.addEventListener("click", removeNote)

function removeNote($event) {
  const $button = $event.target.closest(".remove-note")
  if (!$button) return

  const $index = Number($button.dataset.index)
  $notes.splice($index, 1)
  showNotes()
  $status.textContent = "Note removed"
}