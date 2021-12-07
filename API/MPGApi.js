export function getPlayersFromApi () {
    return fetch('https://api.mpg.football/api/data/championship-players-pool/1')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}
