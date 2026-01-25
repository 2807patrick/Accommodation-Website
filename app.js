/*app.js*/

/* Listings */
const LISTINGS = [
  {
    id: 'l1',
    title: 'Cozy Single Room near Main Campus',
    price: 220,
    distance: 0.6, // km
    description: 'A bright single room in a quiet shared house. Close to campus and transit, utilities included.',
    images: [
      'images/room1-a.jpg',
      'images/house1.jpg',
    ],
    rooms: 1,
    type: 'room',
    location: 'Main Campus'
  },
  {
    id: 'l2',
    title: 'Modern 2-Bed Room (Walking distance)',
    price: 430,
    distance: 1.2,
    description: 'Two-bed room with kitchen, fast wifi and study areas. Ideal for two students.',
    images: [
      'images/room2-a.jpg',
      'images/house1.jpg'
    ],
    rooms: 2,
    type: 'apartment',
    location: 'Central'
  },
  {
    id: 'l3',
    title: 'Affordable Shared House (3+ rooms)',
    price: 150,
    distance: 3.5,
    description: 'Large shared house with big kitchen and garden. Split bills and shared lounge.',
    images: [
      'images/multi-bed.jpg',
      'images/house1.jpg'
    ],
    rooms: 3,
    type: 'shared',
    location: 'Suburb'
  },
  {
    id: 'l4',
    title: 'Quiet Apartment for Focused Study',
    price: 370,
    distance: 0.9,
    description: 'Compact apartment with private kitchen, perfect for students who want privacy.',
    images: [
      'images/sitting3.jpg',
      'images/room2-k.jpg'
    ],
    rooms: 1,
    type: 'apartment',
    location: 'Main Campus'
  },
  {
    id: 'l5',
    title: 'Large 5-Bed Family House (students welcome)',
    price: 500,
    distance: 6.0,
    description: 'Spacious house suitable for a group of students. Secure area, parking included.',
    images: [
      'images/sitting4.jpg'
    ],
    rooms: 3,
    type: 'shared',
    location: 'East Side'
  },
  {
    id: 'l6',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l7',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l8',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l9',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l10',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l11',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l12',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l13',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l14',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l15',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l16',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l17',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l18',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l19',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
  {
    id: 'l20',
    title: ' ',
    price: ' ',
    distance: ' ',
    description: ' ',
    images: [

    ],
    rooms: ' ',
    type: ' ',
    location: ' '
  },
];

/* Utilities & State */
const state = {
  listings: LISTINGS.slice(), // could be loaded from backend later
  favorites: loadFavorites(), // Set of ids (string)
};

/* localStorage favorites functions */
function loadFavorites() {
  try {
    const raw = localStorage.getItem('campus_favs');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    console.warn('Failed to load favorites', e);
    return new Set();
  }
}
function saveFavorites() {
  try {
    localStorage.setItem('campus_favs', JSON.stringify(Array.from(state.favorites)));
    updateFavCount();
  } catch (e) {
    console.warn('Failed to save favorites', e);
  }
}

/* Simple router */
function route() {
  const hash = location.hash || '#/';
  const app = document.getElementById('app');

  updateActiveNav();

  // close mobile nav if open
  document.getElementById('main-nav').classList.remove('open');

  if (hash === '#/' || hash === '#') {
    renderHome();
  } 
  else if (hash.startsWith('#/listings')) {
    renderListings();
  } 
  else if (hash.startsWith('#/listing/')) {
    const id = hash.split('/')[2];
    renderDetail(id);
  } 
  else if (hash.startsWith('#/contact')) {
    renderContact();
  } 
  else {
    renderNotFound();
  }
}

/* CLOSE MENU WHEN CLICKING OUTSIDE */
document.addEventListener('click', (e) => {
  const nav = document.getElementById('main-nav');
  const menuBtn = document.getElementById('mobile-menu-btn');

  if (!nav.classList.contains('open')) return;

  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

/* Initial DOM hooks */
document.addEventListener('DOMContentLoaded', () => {
  // mobile menu toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('open');
  });

  // home search button event uses delegation when home is rendered

  // Favorites button shows list or navigates to #/listings filtered to favs (simple: go to listings)
  document.getElementById('favorites-btn').addEventListener('click', () => {
    location.hash = '#/listings';
  });

  // click on nav links close mobile nav
  document.querySelectorAll('[data-route]').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('main-nav').classList.remove('open');
    });
  });

  updateFavCount();

  // run router once and on hash change
  route();
  window.addEventListener('hashchange', route);
});

function updateActiveNav() {
  const hash = location.hash || '#/';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');

    if (
      (hash === '#/' && href === '#/') ||
      (hash.startsWith('#/listings') && href === '#/listings') ||
      (hash.startsWith('#/contact') && href === '#/contact')
    ) {
      link.classList.add('active');
    }
  });
}

/* RENDERING FUNCTIONS */

/* Helper: create card element for listing */
function createCard(listing) {
  const card = document.createElement('div');
  card.className = 'card';
  // thumb div with background image
  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  thumb.style.backgroundImage = `url('${listing.images[0]}')`;
  card.appendChild(thumb);

  const body = document.createElement('div');
  body.className = 'card-body';
  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = listing.title;
  body.appendChild(title);

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.innerHTML = `<span class="badge-pill">${listing.type}</span><span class="text-muted">${listing.location}</span>`;
  body.appendChild(meta);

  const info = document.createElement('div');
  info.className = 'card-meta';
  info.innerHTML = `<div class="price">$${listing.price}/mo</div><div>${listing.distance} km</div>`;
  body.appendChild(info);

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const viewBtn = document.createElement('button');
  viewBtn.className = 'muted';
  viewBtn.textContent = 'View';
  viewBtn.addEventListener('click', () => {
    location.hash = `#/listing/${listing.id}`;
  });

  const favBtn = document.createElement('button');
  favBtn.className = 'icon-btn';
  favBtn.title = 'Save to favorites';
  favBtn.innerText = state.favorites.has(listing.id) ? '❤ Saved' : '♡ Save';
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
    favBtn.innerText = state.favorites.has(listing.id) ? '❤ Saved' : '♡ Save';
  });

  actions.appendChild(viewBtn);
  actions.appendChild(favBtn);
  body.appendChild(actions);

  card.appendChild(body);
  return card;
}

/* HOME */
function renderHome() {
  const container = document.getElementById('app');
  const tpl = document.getElementById('home-template').content.cloneNode(true);
  container.innerHTML = '';
  container.appendChild(tpl);

  // featured: top 3 by price descending (example logic)
  const featuredEl = document.getElementById('featured-list');
  const featured = state.listings.slice().sort((a,b)=>b.price-a.price).slice(0,4);
  featured.forEach(l => featuredEl.appendChild(createCard(l)));

  // hero search actions
  const input = document.getElementById('hero-search');
  const btn = document.getElementById('hero-search-btn');

  function runSearch() {
    const q = input.value.trim();
    if (!q) return;

    localStorage.setItem('campus_quick_query', q);
    location.hash = '#/listings';
  }

  btn.addEventListener('click', runSearch);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runSearch();
    }
  });

}

/* LISTINGS (search + filters) */
function renderListings() {
  const container = document.getElementById('app');
  const tpl = document.getElementById('listings-template').content.cloneNode(true);
  container.innerHTML = '';
  container.appendChild(tpl);
  initSidebarToggle();

  // DOM refs for controls
  const grid = document.getElementById('listings-grid');
  const applyBtn = document.getElementById('apply-filters');
  const resetBtn = document.getElementById('reset-filters');
  const quickSearch = document.getElementById('quick-search');
  const sortSelect = document.getElementById('sort-select');

  // Pre-fill quick-search from hero if present
  const q = localStorage.getItem('campus_quick_query') || '';
  if (q) {
    quickSearch.value = q;
    localStorage.removeItem('campus_quick_query');
  }

  // render function based on current filters
  function showListings() {
    grid.innerHTML = '';
    const filterLocation = document.getElementById('filter-location').value.trim().toLowerCase();
    const filterType = document.getElementById('filter-type').value;
    const filterPrice = Number(document.getElementById('filter-price').value) || Infinity;
    const filterDistance = Number(document.getElementById('filter-distance').value) || Infinity;
    const filterRooms = document.getElementById('filter-rooms').value;
    const quick = quickSearch.value.trim().toLowerCase();
    const sort = sortSelect.value;

    let items = state.listings.slice();

    // Apply filters
    if (filterLocation) {
      items = items.filter(it => (it.location || '').toLowerCase().includes(filterLocation));
    }
    if (filterType) {
      items = items.filter(it => it.type === filterType);
    }
    items = items.filter(it => it.price <= filterPrice);
    if (filterDistance !== Infinity) {
      items = items.filter(it => it.distance <= filterDistance);
    }
    if (filterRooms) {
      if (filterRooms === '3+') items = items.filter(it => it.rooms >= 3);
      else items = items.filter(it => String(it.rooms) === filterRooms);
    }

    // quick search (title or description)
    if (quick) {
      items = items.filter(it => (it.title + ' ' + it.description).toLowerCase().includes(quick));
    }

    // Sorting
    if (sort === 'price-asc') items.sort((a,b)=>a.price-b.price);
    else if (sort === 'price-desc') items.sort((a,b)=>b.price-a.price);
    else if (sort === 'distance-asc') items.sort((a,b)=>a.distance-b.distance);
    else { /* featured default: keep original order */ }

    // Render cards
    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = 'No listings found. Try adjusting filters.';
      empty.className = 'text-muted';
      grid.appendChild(empty);
    } else {
      items.forEach(l => grid.appendChild(createCard(l)));
    }
  }

  // attach events
  applyBtn.addEventListener('click', () =>{
    showListings();
    autoCloseSidebar();
  });

  resetBtn.addEventListener('click', () => {
    ['filter-location','filter-type','filter-price','filter-distance','filter-rooms'].forEach(id=>{
      document.getElementById(id).value = '';
    });
    quickSearch.value = '';
    sortSelect.value = 'featured';
    showListings();
    autoCloseSidebar();
  });

  quickSearch.addEventListener('input', debounce(showListings, 250));
  sortSelect.addEventListener('change', showListings);

  // initial display
  showListings();
}

function initSidebarToggle() {
  const page = document.querySelector('.listings-page');
  const sidebar = document.querySelector('.listings-sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const floatingBtn = document.getElementById('floating-filters-btn');

  if (!page || !sidebar || !toggleBtn) return;

  toggleBtn.onclick = () => {
    const isCollapsed = page.classList.toggle('sidebar-collapsed');
    toggleBtn.textContent = isCollapsed ? '☰ Filters' : '✖ Close';
  };

  floatingBtn?.addEventListener('click', () => {
    page.classList.remove('sidebar-collapsed');
    toggleBtn.textContent = '✖ Close';
  });

  // Auto-collapse on small screens
  if (window.innerWidth < 900) {
    page.classList.add('sidebar-collapsed');
  }

  document.addEventListener('click', (e) => {
  // If sidebar is already collapsed, do nothing
  if (page.classList.contains('sidebar-collapsed')) return;

  // Ignore clicks inside sidebar
  if (sidebar.contains(e.target)) return;

  // Ignore clicks on toggle buttons
  if (toggleBtn.contains(e.target)) return;
  if (floatingBtn && floatingBtn.contains(e.target)) return;

  // Otherwise, close sidebar
  page.classList.add('sidebar-collapsed');
  toggleBtn.textContent = '☰ Filters';
});
}

function autoCloseSidebar() {
  const page = document.querySelector('.listings-page');
  const toggleBtn = document.getElementById('sidebar-toggle');

  if (!page || !toggleBtn) return;

  page.classList.add('sidebar-collapsed');
  toggleBtn.textContent = '☰ Filters';
}

/* DETAIL VIEW */
function renderDetail(id) {
  const listing = state.listings.find(l => l.id === id);
  const container = document.getElementById('app');

  if (!listing) {
    renderNotFound();
    return;
  }

  const tpl = document.getElementById('detail-template').content.cloneNode(true);
  container.innerHTML = '';
  container.appendChild(tpl);

  // fill data
  document.getElementById('detail-title').textContent = listing.title;
  document.getElementById('detail-price').textContent = `$${listing.price}/mo`;
  document.getElementById('detail-distance').textContent = `${listing.distance} km`;
  document.getElementById('detail-rooms').textContent = `${listing.rooms} room(s)`;
  document.getElementById('detail-type').textContent = listing.type;
  document.getElementById('detail-description').textContent = listing.description;

  const gallery = document.getElementById('detail-gallery');
  gallery.innerHTML = '';

  // main large image element
  const large = document.createElement('div');
  large.className = 'large';
  large.style.backgroundImage = `url('${listing.images[0]}')`;
  gallery.appendChild(large);

  // thumbs
  const thumbs = document.createElement('div');
  thumbs.className = 'thumbs';
  listing.images.forEach((src, idx) => {
    const t = document.createElement('div');
    t.className = 'thumb-small';
    if (idx === 0) t.classList.add('selected');
    t.style.backgroundImage = `url('${src}')`;
    t.addEventListener('click', () => {
      large.style.backgroundImage = `url('${src}')`;
      // mark selected
      thumbs.querySelectorAll('.thumb-small').forEach(n => n.classList.remove('selected'));
      t.classList.add('selected');
    });
    thumbs.appendChild(t);
  });
  gallery.appendChild(thumbs);

  // back
  document.getElementById('back-btn').addEventListener('click', () => location.hash = '#/listings');

  // fav toggle
  const favToggle = document.getElementById('fav-toggle');
  updateFavButton(favToggle, listing.id);
  favToggle.addEventListener('click', () => {
    toggleFavorite(listing.id);
    updateFavButton(favToggle, listing.id);
  });

  // contact owner (simple)
  document.getElementById('contact-owner').addEventListener('click', () => {
    alert('This would open a contact form or mailto: link in a real app. Owner contact: owner@example.com');
  });
}

function updateFavButton(btnEl, id) {
  if (state.favorites.has(id)) {
    btnEl.textContent = '❤ Saved';
    btnEl.classList.add('primary');
  } else {
    btnEl.textContent = '♡ Save';
    btnEl.classList.remove('primary');
  }
}

/* CONTACT */
function renderContact() {
  const container = document.getElementById('app');
  const tpl = document.getElementById('contact-template').content.cloneNode(true);
  container.innerHTML = '';
  container.appendChild(tpl);

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    alert('Thank you! Your message was sent.');
    form.reset();
  });
}

/* Not found */
function renderNotFound() {
  const container = document.getElementById('app');
  container.innerHTML = '<section style="padding:2rem"><h2>Page not found</h2><p class="text-muted">Return to <a href="#/">Home</a>.</p></section>';
}

/* FAVORITES */
function toggleFavorite(id) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  saveFavorites();
}

/* update count badge in header */
function updateFavCount() {
  const el = document.getElementById('fav-count');
  if (!el) return;
  const n = state.favorites.size;
  el.textContent = n > 0 ? n : '';
}

/* Debounce helper */
function debounce(fn, wait=200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=>fn(...args), wait);
  };
}
/* END OF FILE */

/* Notes & TODO:
 - To connect to a backend: replace the LISTINGS array with a fetch() from your API and call route() after loading.
 - For more features: add pagination, map integration, authentication for owners and students, and server-side favorites storage.
 - Images used are Unsplash URLs (placeholder). Replace with proper hosted images or backend image endpoints.
*/
