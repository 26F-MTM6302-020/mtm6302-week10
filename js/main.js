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
        <button class="favourite" data-id="${$cat.id}" aria-pressed="false"><span aria-hidden="true">♡</span> Favourite</button>
      </div>
    </article>
  `)
}

// WEEK 9 — STEP 1: Build steps/01.js together here.

// WEEK 9 — STEP 2: Build steps/02.js together here.

// WEEK 9 — STEP 3: Build steps/03.js together here.

// WEEK 9 — STEP 4: Build steps/04.js together here.

// WEEK 9 — STEP 5: Build steps/05.js together here.

