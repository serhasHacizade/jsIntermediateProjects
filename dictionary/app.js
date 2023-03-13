const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("searchBtn");

btn.addEventListener("click", () => {
    const inputWord = document.getElementById("input").value;
    fetch(`${url}${inputWord}`)
        .then(res => res.json())
        .then(data => {
            result.innerHTML = `
            <div class="word">
                <h1>${inputWord}</h1>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="wordMeaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="wordExample">
                ${data[0].meanings[0].example || ""}
            </p>`;
        })
        .catch(() => {
            result.innerHTML = `<h2 class = "error">Couldn't find the word</h2>`
        });
});
