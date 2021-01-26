function getDataFromApi(searchTerm) {
  const url = `https://restcountries.eu/rest/v2/name/${searchTerm}`;
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $(".js-search-results").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(data) {
  let results = `
    <h2>${data[0].name}</h2>
    <ul>
      <li>Population: ${data[0].population} people</li>
      <li>Capital: ${data[0].capital}</li>
      <li>Region: ${data[0].region}</li>
    </ul>
  `;
  $('.js-search-results').empty().html(results).removeClass('hidden');
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query);
  });
}

$(watchSubmit);