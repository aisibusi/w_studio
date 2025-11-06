
/* Load products.json and render product cards */
async function loadProducts(){
  try{
    const res = await fetch('products.json');
    const products = await res.json();
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    products.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="price">${p.price}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }catch(e){
    console.error(e);
    document.getElementById('product-grid').innerHTML = '<p>Failed to load products.json</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadProducts);
