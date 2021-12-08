export function getPlayersFromApi () {
    return fetch('https://api.mpg.football/api/data/championship-players-pool/1')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}


export function getPlayerDetailFromApi (id) {
    const url = 'https://api.mpg.football/api/data/championship-player-stats/' + id + '/summary';

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


export function getTeamsFromApi () {
    return fetch('https://api.mpg.football/api/data/championship-clubs')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}
