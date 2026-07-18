const myBag = [];

const bag = document.getElementById("btn-bag");
const modal = document.getElementById("bag-modal");

bag.onclick = () => {
  modal.style.display = "flex";
};

document.getElementById("close-modal").onclick = () => {
  modal.style.display = "none";
};

function renderBag() {
  const ul = document.getElementById("bag-items");

  ul.innerHTML = "";

  myBag.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name}</span>

      <div>
          <strong>x${item.count}</strong>

          <button class="remove">❌</button>
      </div>
    `;
    li.querySelector(".remove").onclick = () => {
      item.count--;

      if (item.count === 0) {
        myBag.splice(index, 1);
        const button = document.querySelector(
          `.item[data-name="${item.name}"]`,
        );

        button.style.background = "";
      }

      renderBag();
    };
    ul.appendChild(li);
  });

  document.getElementById("bag-total").textContent = `총 ${myBag.length}종류`;
}

function flyToBag(item) {
  const clone = item.cloneNode(true);

  clone.classList.add("fly-item");

  document.body.appendChild(clone);

  const start = item.getBoundingClientRect();
  const end = bag.getBoundingClientRect();

  clone.style.left = start.left + "px";
  clone.style.top = start.top + "px";

  let t = 0;

  function animate() {
    t += 0.03;

    if (t >= 1) {
      clone.remove();

      bag.classList.add("bag-bounce");

      setTimeout(() => {
        bag.classList.remove("bag-bounce");
      }, 400);

      return;
    }

    const x = start.left + (end.left - start.left) * t;

    const y =
      start.top + (end.top - start.top) * t - 150 * Math.sin(Math.PI * t);

    clone.style.left = x + "px";
    clone.style.top = y + "px";

    clone.style.transform = `scale(${1 - t * 0.7}) rotate(${720 * t}deg)`;

    clone.style.opacity = 1 - t;

    requestAnimationFrame(animate);
  }

  animate();
}

document.querySelectorAll(".item").forEach((item) => {
  item.onclick = () => {
    const name = item.dataset.name;

    const existing = myBag.find((obj) => obj.name === name);

    if (existing) {
      existing.count++;
    } else {
      myBag.push({
        name,
        count: 1,
      });
    }

    item.style.background = "#b7f7c5";

    renderBag();

    flyToBag(item);
  };
});
