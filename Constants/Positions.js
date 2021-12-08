export const positions = {
    10: 'Gardien',
    20: 'Défenseur',
    21: 'Latéral',
    30: 'Milieu défensif',
    31: 'Milieu offensif',
    40: 'Attaquant',
};

export function createPositionInitialFilters(positions) {
    let initial_filters = {};
    for (const [key] of Object.entries(positions)) {
        initial_filters[key] = false
    }
    return initial_filters
}
