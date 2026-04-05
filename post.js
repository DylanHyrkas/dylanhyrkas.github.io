const params = new URLSearchParams(window.location.search);
const post = params.get("post");
const container = document.getElementById("post-content");

if (!post) {
  container.innerHTML = "<p>No post specified.</p>";
} else {
  fetch(`posts/${post}.md`)
    .then((res) => {
      if (!res.ok) throw new Error("Not found");
      return res.text();
    })
    .then((md) => {
      container.innerHTML = marked.parse(md);
      const h1 = container.querySelector("h1");
      if (h1) {
        h1.classList.add("hacker");
        h1.dataset.value = h1.innerText;
        document.title = `${h1.innerText} — Dhyrk`;
      }
    })
    .catch(() => {
      container.innerHTML = "<p>Post not found.</p>";
    });
}
